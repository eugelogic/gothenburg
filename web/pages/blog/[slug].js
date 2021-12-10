import {
    sanityClient,
    PortableText,
    urlFor,
    usePreviewSubscription
 } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import FormatDate from '../../components/FormatDate'

 // Helper function to return the correct version of the document
 // If in "preview mode" and have multiple documents, return the draft
const filterDataToSingleItem = (data, preview) => {
    if (!Array.isArray(data)) {
        return data
    }
    if (data.length === 1) {
      return data[0]
    }
    if (preview) {
      return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
    }
    return data[0]
}

const allSlugsQuery = `*[_type == 'post' && defined(slug.current)][].slug.current`

export const getStaticPaths = async () => {

    const posts = await getClient().fetch(allSlugsQuery)

    return {
        paths: posts.map((slug) => `/blog/${slug}`),
        fallback: true
    }

}

const postQuery = `*[_type == 'post' && slug.current == $slug][0]{
    _type,
    _id,
    title,
    slug,
    author->{
        name
    },
    mainImage,
    category->{
        name
    },
    publishedAt,
    body
}`

const siteSettingsQuery = `*[_type == 'siteSettings'][1]{
    siteName,
    mainNavigation[]->{
        _id,
        title,
        slug
    },
    footerNavigation[]->{
      _id,
      title,
      slug
    }
}`

export const getStaticProps = async ({ params, preview = false }) => {

    const queryParams = {slug: params.slug}
    const data = await getClient(preview).fetch(postQuery, queryParams)
    const siteSettings = await sanityClient.fetch(siteSettingsQuery)

    if (!data) return { notFound: true }

    const post = filterDataToSingleItem(data, preview)

    return {
        props: {
            preview,
            data: { post, postQuery, queryParams },
            siteSettings
        }
    }

}

const Post = ({ siteSettings, data, preview }) => {

    // `usePreviewSubscription` updates the preview content on the client-side
    const {data: previewData} = usePreviewSubscription(data?.postQuery, {
        params: data?.queryParams ?? {},
        initialData: data?.post,
        enabled: preview,
    })

    const post = filterDataToSingleItem(previewData, preview)

    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading .. .. .</div>
    }

    // the optional?.chaining is extremely important ,you can't rely on
    // a single field of data existing whilst editors are creating new documents
    return (
        <Layout siteSettings={siteSettings} template={post}>
            <article style={{ maxWidth: '600px', margin: '0 auto'}}>
                <header>
                    {post?.title && <h1>{post.title}</h1>}
                    {post?.mainImage && <Image src={urlFor(post.mainImage).url()} width={900} height={675} alt={post.mainImage.alt} />}
                    {post?.category?.name && <div>Category: {post.category.name}</div>}
                </header>
                <div>
                    {post?.body && <PortableText blocks={post.body} />}
                </div>
                <footer>
                    {post?.publishedAt && post?.author && <p>Published on: <time dateTime={post.publishedAt}><FormatDate date={post.publishedAt} /></time> by {post.author.name}</p>}
                </footer>
            </article>
            {preview &&
                <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '1rem',
                        background: 'red',
                        color: 'white',
                        maxWidth: '15rem',
                        margin: '2rem auto'
                }}>
                    <Link href="/api/exit-preview"><a>Exit Preview Mode</a></Link>
                </div>
            }
        </Layout>
    )

}

export default Post
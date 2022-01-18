import {
    sanityClient,
    urlFor,
    usePreviewSubscription
 } from '../../lib/sanity'
import PortableText from "react-portable-text";
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
        name,
        image
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
            <main className="max-w-4xl mx-auto">
                <article>
                    <header>
                        {post?.mainImage && <Image src={urlFor(post.mainImage).url()} width={900} height={675} alt={post.mainImage.alt} />}
                        {post?.category?.name && <p className="uppercase m-0 pt-4 pl-4">{post.category.name}</p>}
                        {post?.title && <h1 className="pl-4">{post.title}</h1>}
                    </header>
                    <div className="w-full px-4 pb-4">
                        {post?.body && <PortableText content={post.body} />}
                    </div>
                    <footer className="flex p-4 flex-shrink-0">
                        <div>
                        {post?.author.image && <Image src={urlFor(post?.author.image).url()} alt={post?.author.name} width={50} height={50} className="rounded-full"/>}
                        </div>
                        <div className="ml-4">
                            <p className="m-0">{post?.author && post.author.name}</p>
                            {post?.publishedAt && <time className="text-gray-500" dateTime={post.publishedAt}><FormatDate date={post.publishedAt} /></time>}
                        </div>
                    </footer>
                </article>
            </main>
            {preview &&
                <div className="text-center mb-8">
                    <Link href="/api/exit-preview"><a className="text-white uppercase px-8 py-4 bg-red-600 rounded-md hover:text-black hover:border-black hover:bg-white hover:border">Exit Preview Mode</a></Link>
                </div>
            }
        </Layout>
    )

}

export default Post
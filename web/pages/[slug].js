import { sanityClient } from '../lib/sanity'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import RenderSection from '../components/RenderSection'

const pageSlugQuery = `*[_type == "route" && defined(slug.current)]{
    'params': {
        'slug': slug.current
    }
  }`

export const getStaticPaths = async () => {

    const paths = await sanityClient.fetch(pageSlugQuery)

    return {
        paths,
        fallback: true
    }
}

const pageQuery = `*[_type == 'page' && slug.current == $slug][0]{
    _type,
    title,
    slug,
    content[] { ... }
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

export const getStaticProps = async ({ params }) => {

    const { slug } = params
    const page = await sanityClient.fetch(pageQuery, { slug })
    const siteSettings = await sanityClient.fetch(siteSettingsQuery)

    return {
        props: {
            page,
            siteSettings
        }
    }
}

const Page = ({ page, siteSettings }) => {

    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading ...</div>
    }

    // console.log(page)

    return (
        <Layout siteSettings={siteSettings} page={page}>
            <main style={{ maxWidth: '600px', margin: '0 auto'}}>
                <h1>{page?.title}</h1>
                <RenderSection sections={page?.content}/>
            </main>
        </Layout>
    )
}

export default Page

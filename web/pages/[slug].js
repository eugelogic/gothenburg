import { sanityClient } from '../lib/sanity'
import { useRouter } from 'next/router'
import Header from '../components/Header'

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
    title,
    slug,
    body
}`

const siteSettingsQuery = `*[_type == 'siteSettings'][1]{
    siteName
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

    console.log(page)

    return (
        <>
        <Header siteSettings={siteSettings} />
        <main style={{ maxWidth: '600px', margin: '0 auto'}}>
            <h1>{page?.title}</h1>
            <p>{page?.body}</p>
        </main>
        </>
    )
}

export default Page

import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ siteSettings, post, page, children }) => {

    const router = useRouter()

    return (
        <>
        <Head>
            <link rel='icon' href='./favicon.ico' />
            <meta view='viewport' content='initial-scale=1.0, width=device-width' />
            <title>
                {router.pathname === '/'
                    ? `${siteSettings?.shortDescription} | ${siteSettings?.siteName}`
                    : `${post?._type}` === 'post'
                    ? `${post?.title} | ${siteSettings?.siteName}`
                    : `${page?.title} | ${siteSettings?.siteName}`
                }
            </title>
            <meta name='description' content={siteSettings?.siteDescription} />
        </Head>
        <Header siteSettings={siteSettings} />
            {children}
        <Footer siteSettings={siteSettings} />
        </>
    )
}

export default Layout
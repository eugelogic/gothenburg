import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ siteSettings, page, children }) => {

    const pageTitle = () => {
        return (
            `${page._type}` === 'home'
                ? `${siteSettings?.shortDescription} | ${siteSettings?.siteName}`
                : `${page?.title} | ${siteSettings?.siteName}`
        )
    }

    return (
        <>
        <Head>
            <link rel='icon' href='./favicon.ico' />
            <meta view='viewport' content='initial-scale=1.0, width=device-width' />
            <title>{pageTitle()}</title>
            <meta name='description' content={siteSettings?.siteDescription} />
        </Head>
        <Header siteSettings={siteSettings} />
            {children}
        <Footer siteSettings={siteSettings} />
        </>
    )
}

export default Layout
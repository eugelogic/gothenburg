import Link from 'next/link'

const Header = ({ siteSettings }) => {

    const {siteName, mainNavigation } = siteSettings

    return (
        <header className="">
            <Link href="/">
                <a aria-label="Go Home">
                    <span className="">
                        {siteName}
                    </span>
                </a>
            </Link>
            <nav>
                <ul>
                {mainNavigation?.length > 0 && mainNavigation.map(navItem => (
                        <li key={navItem._id}>
                            <Link href={`/${navItem.slug.current}`}>
                                <a>{navItem.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header

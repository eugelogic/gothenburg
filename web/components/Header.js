import Link from 'next/link'

const Header = ({ siteSettings }) => {

    const {siteName, mainNavigation } = siteSettings

    return (
        <header className="flex flex-col items-center">
            <Link href="/">
                <a aria-label="Go Home">
                    <div className="py-4">
                        <span className="font-headings font-bold text-3xl md:text-5xl">
                            {siteName}
                        </span>
                    </div>
                </a>
            </Link>
            <nav>
                <ul className="flex">
                {mainNavigation?.length > 0 && mainNavigation.map(navItem => (
                        <li key={navItem._id} className="font-headings text-sm px-2 py-4 md:text-lg md:p-4">
                            <Link href={`/${navItem.slug.current}`}>
                                <a>
                                    {navItem.title}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header

import Link from 'next/link'

const Header = ({ siteSettings }) => {

    const {siteName, mainNavigation } = siteSettings

    return (
        <header className="flex flex-col items-center">
            <Link href="/">
                <a aria-label="Go Home" className="no-underline">
                    <div className="py-4">
                        <span className="font-headings font-bold text-3xl md:text-5xl">
                            {siteName}
                        </span>
                    </div>
                </a>
            </Link>
            <nav>
                <ul className="flex list-none m-0 p-0">
                {mainNavigation?.length > 0 && mainNavigation.map(navItem => (
                        <li key={navItem._id} className="font-headings text-sm px-2 py-4 md:text-lg md:p-4 hover:font-bold">
                            <Link href={`/${navItem.slug.current}`}>
                                <a className="no-underline">
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

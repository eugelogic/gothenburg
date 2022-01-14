import Link from 'next/link'

const Footer = ({ siteSettings }) => {

    const {footerNavigation } = siteSettings

    return (
        <footer className="flex flex-col items-center">
            <nav>
                <ul className="flex">{footerNavigation?.length > 0 && footerNavigation.map(navItem => (
                    <li key={navItem._id} className="font-headings p-2 hover:font-bold">
                        <Link href={`/${navItem.slug.current}`}>
                            <a>{navItem.title}</a>
                        </Link>
                    </li>
                ))}</ul>
            </nav>
            <a href="https://github.com/eugelogic/gothenburg" target="_blank" rel="noreferrer noopener" className="py-1">View Source Code</a>
            <p className="font-headings py-1">&copy; Gothenburg {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer
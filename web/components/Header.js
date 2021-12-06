import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header = ({ siteSettings }) => {

    const {siteName, mainNavigation } = siteSettings

    return (
        <header className={styles.header}>
            <Link href="/">
                <a aria-label="Go Home">
                    <span className={styles.siteTitle}>
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

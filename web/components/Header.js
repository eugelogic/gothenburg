import Link from 'next/link'
import styles from '../styles/Header.module.css'

const Header = ({ siteSettings }) => {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a aria-label="Go Home">
                    <span className={styles.siteTitle}>
                        {siteSettings.siteName}
                    </span>
                </a>
            </Link>
        </header>
    )
}

export default Header

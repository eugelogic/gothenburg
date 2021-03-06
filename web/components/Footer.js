import Link from 'next/link'
import styles from '../styles/Footer.module.css'

const Footer = ({ siteSettings }) => {

    const {footerNavigation } = siteSettings

    return (
        <footer className={styles.footer}>
            <nav>
                <ul>{footerNavigation?.length > 0 && footerNavigation.map(navItem => (
                    <li key={navItem._id}>
                        <Link href={`/${navItem.slug.current}`}>
                            <a>{navItem.title}</a>
                        </Link>
                    </li>
                ))}</ul>
            </nav>
            <a href="https://github.com/eugelogic/gothenburg" target="_blank" rel="noreferrer noopener">View Source Code</a>
            <p>&copy; Gothenburg {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer
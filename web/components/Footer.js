import styles from '../styles/Footer.module.css'

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <a href="https://github.com/eugelogic/gothenburg" target="_blank" rel="noreferrer noopener">View Source Code</a>
            <p>&copy; Gothenburg {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer
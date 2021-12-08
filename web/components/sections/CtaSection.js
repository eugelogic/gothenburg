import Link from 'next/link'
import styles from '../../styles/CtaSection.module.css'

const CtaSection = (props) => {

    const { heading, tagline, ctaText, ctaLink } = props

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{heading}</h2>
                <p>{tagline}</p>
                <Link href={ctaLink}>
                    <a className={styles.cta}>{ctaText}</a>
                </Link>
            </div>
        </div>
    )
}

export default CtaSection
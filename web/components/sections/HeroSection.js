import { urlFor } from '../../lib/sanity'
import styles from '../../styles/HeroSection.module.css'

const HeroSection = (props) => {

    const { heading, tagline, backgroundImage } = props

    const style = backgroundImage
    ? {
      backgroundImage: `url("${urlFor(backgroundImage)
        .width(2000)
        .auto('format')
        .url()}")`,
        backgroundPosition: 'bottom'
    }
    : {}

    return (
        <div className={styles.container} style={style}>
            <div className={styles.content}>
                <h2>{heading}</h2>
                <p>{tagline}</p>
            </div>
        </div>
    )
}

export default HeroSection
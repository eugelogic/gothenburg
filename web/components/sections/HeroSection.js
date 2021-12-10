import { urlFor } from '../../lib/sanity'

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
        <div className="" style={style}>
            <div className="">
                <h2>{heading}</h2>
                <p>{tagline}</p>
            </div>
        </div>
    )
}

export default HeroSection
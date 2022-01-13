import { urlFor } from '../../lib/sanity'

const HeroSection = (props) => {

    const { heading, tagline, backgroundImage } = props

    const style = backgroundImage
    ? {
        backgroundImage: `url("${urlFor(backgroundImage)
            .width(2000)
            .auto('format')
            .url()}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'flex-end'
    }
    : {}

    return (
        <div style={style}>
            <div className="text-white w-[56rem] mx-auto px-5 py-10 bg-transparent bg-neutral-800 bg-opacity-60">
                <h2 className="mt-3 mb-2 text-3xl">{heading}</h2>
                <p>{tagline}</p>
            </div>
        </div>
    )
}

export default HeroSection
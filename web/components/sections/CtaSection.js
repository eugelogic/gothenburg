import Link from 'next/link'

const CtaSection = (props) => {

    const { heading, tagline, ctaText, ctaLink } = props

    return (
        <div className="">
            <div className="">
                <h2>{heading}</h2>
                <p>{tagline}</p>
                <Link href={ctaLink}>
                    <a className="">{ctaText}</a>
                </Link>
            </div>
        </div>
    )
}

export default CtaSection
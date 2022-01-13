import Link from 'next/link'

const CtaSection = (props) => {

    const { heading, tagline, ctaText, ctaLink } = props

    return (
        <div className="bg-amber-600">
            <div className="max-w-[56rem] mx-auto px-5 pt-10 pb-16 text-white">
                <h2 className="mt-3 mb-2 uppercase">{heading}</h2>
                <p className="my-2">{tagline}</p>
                <div className="mt-8">
                    <Link href={ctaLink}>
                        <a className="uppercase px-8 py-4 rounded-md border border-white border-solid hover:text-black hover:border-black">{ctaText}</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CtaSection
import {
    PortableText,
} from '../../lib/sanity'

const TextSection = (props) => {

    const { heading, text } = props

    return (
        <div>
            <h2>{heading}</h2>
            <PortableText blocks={text} />
        </div>
    )
}

export default TextSection
import PortableText from "react-portable-text";

const TextSection = (props) => {

    const { heading, text } = props

    return (
        <div className="max-w-[56rem] mx-auto px-5 py-10">
            <h2>{heading}</h2>
                <PortableText className="w-full" content={text} />
        </div>
    )
}

export default TextSection
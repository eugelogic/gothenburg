import PortableText from "react-portable-text";

const TextSection = (props) => {

    const { heading, text } = props

    return (
        <div className="max-w-[56rem] mx-auto px-5 py-10">
            <h2 className="mt-3 mb-2 text-3xl">{heading}</h2>
                <PortableText
                    className="w-full"
                    content={text}
                    serializers={{
                        h1: (props) => <h1 className="mt-6 mb-2 text-3xl uppercase" {...props} />,
                        h2: (props) => <h2 className="mt-6 mb-2 text-3xl" {...props} />,
                        h3: (props) => <h3 className="mt-2 mb-1 text-2xl" {...props} />,
                        h4: (props) => <h4 className="mt-2 mb-1 text-xl" {...props} />,
                        normal: (props) => <p className="my-2" {...props} />,
                        link: (props) => <a className="underline hover:no-underline" {...props} />,
                        ul: (props) => <ul className="my-4 pl-5 list-disc" {...props} />,
                        blockquote: (props) => <blockquote className="relative my-4 p-6 text-l italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote" {...props} />
                    }}
                />
        </div>
    )
}

export default TextSection
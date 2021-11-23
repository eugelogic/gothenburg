import {
    sanityClient,
    PortableText,
    urlFor
 } from '../../lib/sanity'
import Image from 'next/image'

const postPathQuery = `*[_type == 'post' && defined(slug.current)]{
    'params': {
        'slug': slug.current
    }
}`

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch(postPathQuery)
    return {
        paths,
        fallback: false
    }

}

const postQuery = `*[_type == 'post' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author->{
        name
    },
    mainImage,
    category->{
        name
    },
    publishedAt,
    body
}`

export const getStaticProps = async ({ params }) => {

    const { slug } = params
    const post = await sanityClient.fetch(postQuery, { slug })

    return {
        props: {
            post
        }
    }

}

const Post = ({ post }) => {

    return (
        <article style={{ maxWidth: '600px', margin: '0 auto'}}>
            <header>
                <h1>{post.title}</h1>
                <Image src={urlFor(post.mainImage).url()} width={900} height={675} alt={post.mainImage.alt} />
                <div>Category: {post.category.name}</div>
            </header>
            <div>
                <PortableText blocks={post.body} />
            </div>
            <footer>
                <p>Published on: <time>{post.publishedAt}</time> by {post.author.name}</p>
            </footer>
        </article>
    )

}

export default Post
import { sanityClient } from '../lib/sanity'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const postsQuery = `*[_type == 'post']{
  _id,
  title,
  slug,
  excerpt,
  author->{
    name
  },
  mainImage,
  category->{
    name
  },
  publishedAt
}|order(publishedAt desc)`

export const getStaticProps = async () => {
  const posts = await sanityClient.fetch(postsQuery)

  return {
    props: {
      posts
    }
  }
}

const Home = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gothenburg</title>
        <meta name="description" content="NextJS & Sanity proof of concept blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Gothenburg</h1>

        <ul>
          {posts?.length > 0 &&
            posts.map((post) => (
              <li key={post._id}>
                <h2>{post.title}</h2>
              </li>
            ))}
        </ul>
      </main>
    </div>
  )
}

export default Home

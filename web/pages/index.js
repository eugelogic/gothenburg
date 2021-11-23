import { useState } from 'react'
import { sanityClient } from '../lib/sanity'
import Head from 'next/head'
import Pagination from 'react-sanity-pagination'
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

  const postsPerPage = 6
  const [items, setItems] = useState([])
  const action = (page, range, items) => {
    setItems(items)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Gothenburg</title>
        <meta name="description" content="NextJS & Sanity proof of concept blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className={styles.title}>
          Gothenburg
        </h1>

        <ul>
          {items?.length > 0 && items.map(item =>(
            <li key={item._id}>
              <h2>{item.title}</h2>
            </li>
          ))}
        </ul>

        <Pagination
          items={posts}
          action={action}
          postsPerPage={postsPerPage}
        />

      </main>

    </div>
  )
}

export default Home
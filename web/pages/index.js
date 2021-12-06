import { useState } from 'react'
import { sanityClient } from '../lib/sanity'
import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import Pagination from 'react-sanity-pagination'
import styles from '../styles/Home.module.css'

const siteSettingsQuery = `*[_type == 'siteSettings'][1]{
  siteName,
  mainNavigation[]->{
      _id,
      title,
      slug
  }
}`

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
  const siteSettings = await sanityClient.fetch(siteSettingsQuery)

  return {
    props: {
      siteSettings,
      posts
    }
  }
}

const Home = ({ siteSettings, posts }) => {

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

      <Header siteSettings={siteSettings} />

      <main style={{ maxWidth: '600px', margin: '0 auto' }}>

        <ul style={{ listStyle: 'none' }}>
          {items?.length > 0 && items.map(item =>(
            <li key={item._id}>
              <Link href={`/blog/${item.slug.current}`}>
                <a><h2>{item.title}</h2></a>
              </Link>
            </li>
          ))}
        </ul>

        <Pagination
          items={posts}
          action={action}
          postsPerPage={postsPerPage}
          className={styles.pagePagination}
        />

      </main>

    </div>
  )
}

export default Home
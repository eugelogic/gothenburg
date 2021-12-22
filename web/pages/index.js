import { useState } from 'react'
import { sanityClient, urlFor } from '../lib/sanity'
import Layout from '../components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FormatDate from '../components/FormatDate'
import Pagination from 'react-sanity-pagination'

const siteSettingsQuery = `*[_type == 'siteSettings'][1]{
  siteName,
  shortDescription,
  mainNavigation[]->{
    _id,
    title,
    slug
  },
  footerNavigation[]->{
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
    name,
    image
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
    <Layout siteSettings={siteSettings} template={{ _type: 'home' }}>
      <main className="max-w-5xl mx-auto">

        <ul className="grid gap-5 md:grid-cols-3">
          {items?.length > 0 && items.map(item =>(
            <li key={item._id}>
              <Link href={`/blog/${item.slug.current}`}>
                <a>
                  <Image src={urlFor(item.mainImage).url()} alt={item.mainImage.alt} width={780} height={585}/>
                </a>
              </Link>
              <p>{item.category.name}</p>
              <Link href={`/blog/${item.slug.current}`}>
                <a>
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                </a>
              </Link>
              <footer>
                <div>
                  <Image src={urlFor(item.author.image).url()} alt={item.author.name} width={50} height={50}/>
                </div>
                <div>
                  <p>{item.author.name}</p>
                  <time dateTime={item.publishedAt}><FormatDate date={item.publishedAt} /></time>
                </div>
              </footer>
            </li>
          ))}
        </ul>

        <Pagination
          items={posts}
          action={action}
          postsPerPage={postsPerPage}
          className="max-w-[7rem] flex justify-evenly m-auto"
        />

      </main>

    </Layout>
  )
}

export default Home
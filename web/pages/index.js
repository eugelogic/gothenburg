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

        <ul className="grid gap-5 md:grid-cols-3 list-none m-0 p-0">
          {items?.length > 0 && items.map(item =>(
            <li key={item._id} className="flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-2xl">
              <Link href={`/blog/${item.slug.current}`}>
                <a>
                  <Image src={urlFor(item.mainImage).url()} alt={item.mainImage.alt} width={780} height={585}/>
                </a>
              </Link>
              <p className="uppercase m-0 pt-4 pl-4">{item.category.name}</p>
              <div className="flex-1 flex flex-col justify-between">
                <Link href={`/blog/${item.slug.current}`}>
                  <a className="no-underline">
                    <div className="px-4 pt-4 pb-2">
                      <h2 className="text-xl m-0">{item.title}</h2>
                      <p>{item.excerpt}</p>
                    </div>
                  </a>
                </Link>
                <footer className="flex px-4 pt-2 pb-4 flex-shrink-0">
                  <div>
                    <Image src={urlFor(item.author.image).url()} alt={item.author.name} width={50} height={50} className="rounded-full"/>
                  </div>
                  <div className="ml-4">
                    <p className="m-0">{item.author.name}</p>
                    <time className="text-gray-500" dateTime={item.publishedAt}><FormatDate date={item.publishedAt} /></time>
                  </div>
                </footer>
              </div>
            </li>
          ))}
        </ul>

        <Pagination
          items={posts}
          action={action}
          postsPerPage={postsPerPage}
          className="max-w-[7rem] flex justify-evenly mx-auto my-7 font-body list-none p-0"
        />

      </main>

    </Layout>
  )
}

export default Home
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
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

      </main>

    </div>
  )
}

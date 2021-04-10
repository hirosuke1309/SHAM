import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login-SHAM</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}
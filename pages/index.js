import Head from 'next/head'
//components
import Main from '../components/Main'
import Nav from '../components/Nav'


export default function Home() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-800">
      <Head>
        <title>Speech Recognizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main />

    </div>
  )
}
import Head from 'next/head'
import {useState} from 'react'
//components
import Main from '../components/Main'
import Nav from '../components/Nav'
import Scoreboard from '../components/Scoreboard'


export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(-1);

  return (
    <div className="w-full min-h-screen pt-16 lg:pt-32 bg-gray-800">
      <Head>
        <title>Speech Recognizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />

    </div>
  )
}
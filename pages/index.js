import Head from 'next/head'
import {useState} from 'react'
//components
import Main from '../components/Main'
import Nav from '../components/Nav'
import Scoreboard from '../components/Scoreboard'


export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <div className="w-full min-h-screen pt-24 lg:pt-32 bg-gray-800">
      <Head>
        <title>Speech Recognizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <Main currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />

      <Scoreboard currentQuestion={currentQuestion} />

    </div>
  )
}
import Head from 'next/head'
import {useState} from 'react'
//components
import Dictaphone from '../components/Dictaphone'
import TransferRecognition from '../components/TransferRecognition'


export default function Home() {
  const [action, setAction] = useState(null);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <Head>
        <title>Speech Recognizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      <div className="w-full md:w-9/12 p-8 shadow">
        <div className="text-center">
          <Dictaphone setAction={setAction} />
        </div>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-5 gap-8">
          <Item action={action} id={'one'} value={1} />
          <Item action={action} id={'two'} value={2} />
          <Item action={action} id={'three'} value={3} />
          <Item action={action} id={'four'} value={4} />
          <Item action={action} id={'five'} value={5} />
          <Item action={action} id={'six'} value={6} />
          <Item action={action} id={'seven'} value={7} />
          <Item action={action} id={'eight'} value={8} />
          <Item action={action} id={'nine'} value={9} />
          <Item action={action} id={'zero'} value={0} />
        </div>
      </div>
      
    </div>
  )
}

const Item = (props) => {
  return (
    <p className={props.action == props.id ? 'w-max px-8 md:px-16 py-4 md:py-8 text-4xl rounded shadow bg-blue-400'
      : 'w-max px-8 md:px-16 py-4 md:py-8 text-4xl rounded shadow bg-gray-200'}>{props.value}</p>
  )
}
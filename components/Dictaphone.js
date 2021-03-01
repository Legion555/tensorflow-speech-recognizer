import {useEffect, useState} from 'react'
//tf dependencies
import * as tf from '@tensorflow/tfjs'
import * as speech from '@tensorflow-models/speech-commands'

const Dictaphone = ({setAction, acceptedActions}) => {
  const [model, setModel] = useState(null)
  const [labels, setLabels] = useState(null)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    loadModel()
  }, [])

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    await recognizer.ensureModelLoaded()
    console.log(recognizer)
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  }

  function argMax(arr) {
    return arr.map((x,i)=>[x,i]).reduce((r,a)=>(a[0] > r[0] ? a : r))[1];
  }

  const listenToCommands = async () => {
    setIsListening(true)
    model.listen(result => {
      const receivedAction = labels[argMax(Object.values(result.scores))]
      if (acceptedActions.includes(receivedAction)) {
        setAction(receivedAction)
      }
    }, {includeSpectrogram: true, probabilityThreshold: 0.9})
  }

  const stopListening = async () => {
    model.stopListening()
    setIsListening(false)
  }


  
  return (
    <div>
      {!isListening ?
        <button onClick={listenToCommands}
          className="p-2 rounded text-3xl shadow bg-blue-600 text-gray-100 focus:outline-none hover:bg-blue-500">Listen</button>
        :
        <button onClick={stopListening} className="p-2 rounded text-3xl shadow bg-yellow-600 text-gray-100 focus:outline-none hover:bg-yellow-500">Stop listening</button>
      }
      {/* <button onClick={listenToCommands} className={!isListening ? 'p-2 rounded text-3xl shadow bg-blue-600 text-gray-100' : 'p-2 rounded text-3xl shadow bg-yellow-600 text-gray-100'}>
        {!isListening ? 'Listen' : 'Listening...'}</button> */}
    </div>
  )
}

export default Dictaphone
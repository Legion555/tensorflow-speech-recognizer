import {useEffect, useState} from 'react'
//tf dependencies
import * as tf from '@tensorflow/tfjs'
import * as speech from '@tensorflow-models/speech-commands'

const Dictaphone = ({setAction}) => {
  const [model, setModel] = useState(null)
  const [labels, setLabels] = useState(null)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    loadModel()
  }, [])

  const loadModel = async () => {
    const recognizer = await speech.create("BROWSER_FFT");
    console.log('loaded')
    await recognizer.ensureModelLoaded()
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  }

  function argMax(arr) {
    return arr.map((x,i)=>[x,i]).reduce((r,a)=>(a[0] > r[0] ? a : r))[1];
  }

  const recognizeCommands = async () => {
    setIsListening(true)
    model.listen(result => {
      setAction(labels[argMax(Object.values(result.scores))])
    }, {includeSpectrogram: true, probabilityThreshold: 0.9})
    setTimeout(() => {
      model.stopListening()
      setIsListening(false)
    }, 10e3)
  }


  
  return (
    <div>
      <button onClick={recognizeCommands} className={!isListening ? 'p-2 rounded text-4xl shadow bg-blue-600 text-gray-100' : 'p-2 rounded text-4xl shadow bg-yellow-600 text-gray-100'}>
        {!isListening ? 'Listen' : 'Listening...'}</button>
    </div>
  )
}

export default Dictaphone
import {useEffect, useState} from 'react'
//tf dependencies
import * as tf from '@tensorflow/tfjs'
import * as speech from '@tensorflow-models/speech-commands'

const Dictaphone = () => {
  const [model, setModel] = useState(null)
  const [action, setAction] = useState(null)
  const [labels, setLabels] = useState(null)

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
    console.log(labels)
    model.listen(result => {
        const x = tf.tensor4d(result.spectrogram.data, [1].concat(model.modelInputShape().slice(1)));
        model.recognize(x)
        .then(result => {
            console.log(tf.dispose([x, result]))
        })
        .catch(err => {
            console.log(error)
        })

        // tf.dispose([x, output])
    }, {includeSpectrogram: true, probabilityThreshold: 0.9})    
    setTimeout(() => model.stopListening(), 50e2)
  }
   
  
  return (
    <div>
      <button onClick={recognizeCommands}>Listen to sound</button>
    </div>
  )
}

export default Dictaphone
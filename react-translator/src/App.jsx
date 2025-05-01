import { useRef, useEffect, useState } from 'react'
import './App.css'

import LanguageSelector from './components/LanguageSelector';
import Progress from './components/Progress';
function App() {

    // Model loading
    const [ready, setReady] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [progressItems, setProgressItems] = useState([]);
  
      // Inputs and outputs
  const [input, setInput] = useState('I love walking my dog.');
  const [sourceLanguage, setSourceLanguage] = useState('eng_Latn');
  const [targetLanguage, setTargetLanguage] = useState('fra_Latn');
  const [output, setOutput] = useState('');

   // Create a reference to the worker object 
   const worker = useRef(null);

   // We use the 'useEffect' hook to setup the worker as soon as the App component is mounted
  useEffect(() => {
    // Create the worker if it does not yet exist 
    worker.current ??= new Worker(new URL('./worker.js', import.meta.url), {
      type: 'module'
    });

    // Create a call back function for messages from the worker thread.
    const onMessageReceived = (e) => { 
      // TODO: will fill in later
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener('message', onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () => worker.current.removeEventLIstener('message', onMessageReceived);

    
  });


  const translate = () => {
    setDisabled(true);
    setOutput('');
    worker.current.postMessage({
      text: input,
      src_lang: sourceLanguage,
      tgt_lang: targetLanguage,
    });
  }

  return (
    // TODO: rest of app here
    <>
    <h1>Transformers.js</h1>
    <h2>ML-powered multilingual translation in React!</h2>

    <div className='container'>
      <div className='language-container'>
        <LanguageSelector type={"Source"} defaultLanguage={"eng_Latn"} onChange={x => setSourceLanguage(x.target.value)} />
        <LanguageSelector type={"Target"} defaultLanguage={"fra_Latn"} onChange={x => setTargetLanguage(x.target.value)} />
      </div>

      <div className='textbox-container'>
        <textarea value={input} rows={3} onChange={e => setInput(e.target.value)}></textarea>
        <textarea value={output} rows={3} readOnly></textarea>
      </div>
    </div>

    <button disabled={disabled} onClick={translate}>Translate</button>

    <div className='progress-bars-container'>
      {ready === false && (
        <label>Loading models... (only run once)</label>
      )}
      {progressItems.map(data => (
        <div key={data.file}>
          <Progress text={data.file} percentage={data.progress} />
        </div>
      ))}
    </div>
  </>
  ) 
}

export default App

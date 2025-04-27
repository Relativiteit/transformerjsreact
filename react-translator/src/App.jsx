import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
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


  return (
    // TODO: rest of app here
    console.log("")
  ) 
}

export default App

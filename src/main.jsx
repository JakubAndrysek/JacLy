import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

function NotSupported() {
  return <div className='h-full w-full bg-red-500 text-white p-8'>
    Your browser doesn't support web serial. You cannot use this application.
  </div>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
      "serial" in navigator
        ? <App />
        : <NotSupported/>
    }
  </React.StrictMode>,
)

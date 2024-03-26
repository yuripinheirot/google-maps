import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './main.css'
import { Contexts } from './contexts/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Contexts>
      <App />
    </Contexts>
  </React.StrictMode>
)

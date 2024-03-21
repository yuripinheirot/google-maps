import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './main.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleLoaderProvider } from './contexts/google-loader.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <GoogleLoaderProvider>
        <App />
      </GoogleLoaderProvider>
    </ChakraProvider>
  </React.StrictMode>
)

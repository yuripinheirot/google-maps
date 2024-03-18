import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleLoaderProvider } from './contexts/google-loader.context'
import { config } from 'dotenv'

config()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ChakraProvider>
    <GoogleLoaderProvider>
      <App />
    </GoogleLoaderProvider>
  </ChakraProvider>
)

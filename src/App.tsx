import { useEffect } from 'react'

import { Form } from './components/Form'
import { googleMapsLoader } from './api/google-maps-loader'
import { MapDisplay } from './components/MapDisplay'

function App() {
  let maps: google.maps.Map

  useEffect(() => {
    googleMapsLoader().then((map) => {
      maps = map
    })
  }, [])

  return (
    <main className='App h-full flex flex-col'>
      <div className='flex flex-1 flex-col py-8 gap-3'>
        <Form />
        <MapDisplay />
      </div>
    </main>
  )
}

export default App

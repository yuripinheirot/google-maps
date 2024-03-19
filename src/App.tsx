import { Form } from './components/Form'
import { MapDisplay } from './components/MapDisplay'
import { useMarker } from './hooks/useMarker.hook'
import { initialLocation } from './constants/config'
import { useContext } from 'react'
import { GoogleLoaderContext } from './contexts/google-loader.context'
import { Stepper } from './components/Stepper'

function App() {
  const { map, marker, placesService } = useContext(GoogleLoaderContext)

  const { clearMarkers, createMarker } = useMarker(map as google.maps.Map)

  const searchPlace = (type: string) => {
    placesService.nearbySearch(
      {
        location: initialLocation,
        radius: 500,
        type,
      },
      (results, status) => {
        clearMarkers()

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          results.forEach((place) => {
            createMarker(place)
          })
        }
      }
    )
  }

  return (
    <main className='App h-full flex flex-col '>
      <div className='flex flex-1 flex-col py-8 gap-3'>
        <Form handleSearch={(type) => searchPlace(type)} />
        {/* <MapDisplay /> */}
        <Stepper />
      </div>
    </main>
  )
}

export default App

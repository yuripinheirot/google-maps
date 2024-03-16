import { useEffect } from 'react'

import { Form } from './components/Form'
import { googleMapsLoader } from './api/google-maps-loader'
import { MapDisplay } from './components/MapDisplay'

function App() {
  const initialLocation = { lat: -5.078869240878618, lng: -42.79595746837029 }
  let placesService: google.maps.places.PlacesService
  let map: google.maps.Map
  let marker: google.maps.marker.AdvancedMarkerElement

  googleMapsLoader().then(
    ({ map: _map, placesService: place, marker: _marker }) => {
      placesService = place
      map = _map
      marker = _marker
    }
  )

  function createMarker(place: google.maps.places.PlaceResult): void {
    if (!place.geometry || !place.geometry.location) return

    new google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
    }).setMap(map)
  }

  const searchPlace = () => {
    placesService.nearbySearch(
      {
        location: initialLocation,
        radius: 500,
        type: 'restaurant',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i])
          }
        }
      }
    )
  }

  return (
    <main className='App h-full flex flex-col'>
      <div className='flex flex-1 flex-col py-8 gap-3'>
        <Form handleSearch={() => searchPlace()} />
        <MapDisplay />
        <button onClick={() => searchPlace()}></button>
      </div>
    </main>
  )
}

export default App

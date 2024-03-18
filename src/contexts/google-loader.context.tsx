import { createContext, useEffect, useState } from 'react'
import { googleMapsLoader } from '../api/google-maps-loader'

type GoogleLoaderContextType = {
  map: google.maps.Map
  placesService: google.maps.places.PlacesService
  marker: google.maps.marker.AdvancedMarkerElement
}

export const GoogleLoaderContext = createContext<GoogleLoaderContextType>({
  map: {} as google.maps.Map,
  placesService: {} as google.maps.places.PlacesService,
  marker: {} as google.maps.marker.AdvancedMarkerElement,
})

type GoogleLoaderProviderProps = {
  children: React.ReactNode
}
export const GoogleLoaderProvider = ({
  children,
}: GoogleLoaderProviderProps) => {
  const [map, setMap] = useState<google.maps.Map>()

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>()

  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement>()

  useEffect(() => {
    googleMapsLoader().then(
      ({ map: _map, placesService: _placesService, marker: _marker }) => {
        setMap(_map)
        setPlacesService(_placesService)
        setMarker(_marker)
      }
    )
  }, [])

  return (
    <GoogleLoaderContext.Provider
      value={{
        map: map as google.maps.Map,
        placesService: placesService as google.maps.places.PlacesService,
        marker: marker as google.maps.marker.AdvancedMarkerElement,
      }}
    >
      {children}
    </GoogleLoaderContext.Provider>
  )
}

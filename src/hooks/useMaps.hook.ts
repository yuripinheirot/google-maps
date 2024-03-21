import { useContext, useState } from 'react'
import { initialLocation } from '../constants/config'
import { GoogleLoaderContext } from '../contexts/google-loader.context'

export type SearchPlacePayloadType = {
  rangeLocal: number
  occupancyState: 'empty' | 'ok' | 'full'
  placeType: string
}

export const useMaps = () => {
  const { map, marker, placesService } = useContext(GoogleLoaderContext)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [placesFounded, setPlacesFounded] = useState<
    google.maps.places.PlaceResult[]
  >([])

  const createMarker = (place: google.maps.places.PlaceResult): void => {
    if (!place.geometry?.location) return

    const marker = new google.maps.Marker({
      position: place.geometry.location,
      title: place.name,
    })

    marker.setMap(map)
    setMarkers((prev) => [...prev, marker])
  }

  const clearMarkers = (): void => {
    markers.forEach((marker) => marker.setMap(null))
  }

  const searchPlace = (payload: SearchPlacePayloadType) => {
    placesService.nearbySearch(
      {
        location: initialLocation,
        radius: payload.rangeLocal,
        type: payload.placeType,
      },
      (results, status) => {
        clearMarkers()

        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setPlacesFounded(results)

          results.forEach((place) => {
            createMarker(place)
          })
        }
      }
    )
  }

  return { createMarker, clearMarkers, searchPlace }
}

import { useState } from 'react'
import { Marker } from 'react-google-maps'

export const useMarker = (map: google.maps.Map) => {
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

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

  return { createMarker, clearMarkers }
}

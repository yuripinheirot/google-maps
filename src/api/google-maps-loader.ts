import { Loader } from '@googlemaps/js-api-loader'
import { initialLocation } from '../constants/config'

export const googleMapsLoader = async () => {
  const loader = new Loader({
    apiKey: process.env.GOOGLE_API_KEY as string,
    version: 'weekly',
  })

  const { Map } = await loader.importLibrary('maps')
  const { PlacesService } = await loader.importLibrary('places')
  const { AdvancedMarkerElement } = await loader.importLibrary('marker')

  const map = new Map(document.getElementById('map') as HTMLElement, {
    center: initialLocation,
    zoom: 15,
  })

  const placesService = new PlacesService(map)

  const marker = new AdvancedMarkerElement()

  return { map, placesService, marker }
}

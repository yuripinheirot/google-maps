import { Loader } from '@googlemaps/js-api-loader'

export const googleMapsLoader = async () => {
  const initialLocation = { lat: -5.078869240878618, lng: -42.79595746837029 }
  const loader = new Loader({
    apiKey: 'AIzaSyBefyTTZjo6Rmfqul_rGi1QLbtyQmykiNY',
    version: 'weekly',
  })

  const { Map } = await loader.importLibrary('maps')

  return new Map(document.getElementById('map') as HTMLElement, {
    center: initialLocation,
    zoom: 15,
  })
}

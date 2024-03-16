import { Loader } from '@googlemaps/js-api-loader'

export const googleMapsLoader = async () => {
  const loader = new Loader({
    apiKey: 'AIzaSyBefyTTZjo6Rmfqul_rGi1QLbtyQmykiNY',
    version: 'weekly',
  })

  return loader.load().then(async () => {
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary

    return new Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })
  })
}

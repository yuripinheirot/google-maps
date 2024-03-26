import { http } from '../http'
import { PlacesNearbyResponse } from '@googlemaps/google-maps-services-js'
import { SearchNearbyPlacesQueryType } from './protocols/search-nearby-places-query.type'

export const mapsController = {
  searchNearbyPlaces: async (query: SearchNearbyPlacesQueryType) => {
    const { data } = await http.get<PlacesNearbyResponse>(
      '/maps/search/nearby',
      { params: query }
    )

    return data
  },
}

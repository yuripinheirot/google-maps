import { KeyValue } from '../../../protocols/places.type'

export const specialityPlaces: Record<string, KeyValue[]> = {
  restaurant: [
    { key: 'japonese', value: 'Japonês' },
    { key: 'árabe', value: 'Árabe' },
    { key: 'brasileira', value: 'Brasileira' },
    { key: 'americana', value: 'Americana' },
    { key: 'alemã', value: 'Alemã' },
    { key: 'Mexicana', value: 'Mexicana' },
    { key: 'Tailandesa', value: 'Tailandesa' },
    { key: 'Italiana', value: 'Italiana' },
  ],
  night_club: [
    { key: 'Pop', value: 'Pop' },
    { key: 'Eletrônica', value: 'Eletrônica' },
    { key: 'Rap / Hip-Hop', value: 'Rap / Hip-Hop' },
    { key: 'Reggae', value: 'Reggae' },
    { key: 'Samba', value: 'Samba' },
    { key: 'Funk / Reggaeton', value: 'Funk / Reggaeton' },
    { key: 'Pagode', value: 'Pagode' },
    { key: 'Sertanejo', value: 'Sertanejo' },
  ],
}

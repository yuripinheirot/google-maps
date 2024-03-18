import React from 'react'
import { Select } from '@chakra-ui/react'
import { PlacesTypes } from '../protocols/places.type'

type Props = {
  handleSearch: (type: string) => void
}
export const Form = ({ handleSearch }: Props) => {
  return (
    <section className='flex flex-col justify-center items-center gap-3'>
      <p className='text-2xl font-bold text-center text-gray-700'>
        Google maps!
      </p>
      <div className='flex gap-3'>
        <Select
          placeholder='Selecione um tipo de lugar'
          size='lg'
          onChange={(e) => handleSearch(e.target.value)}
        >
          {PlacesTypes.map(({ key, value }) => (
            <option
              key={key}
              value={key}
              defaultValue={PlacesTypes[0].value}
            >
              {value}
            </option>
          ))}
        </Select>
      </div>
    </section>
  )
}

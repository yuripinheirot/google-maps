import { Button, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import React from 'react'
import { KeyValue } from '../../../protocols/places.type'

const options: KeyValue[] = [
  { key: 'bar', value: 'bar' },
  { key: 'night_club', value: 'boate' },
  { key: 'restaurant', value: 'restaurante' },
  { key: 'cafe', value: 'café' },
  { key: 'park', value: 'parque' },
  { key: 'supermarket', value: 'supermercado' },
]

export const PlaceTypeStep = () => {
  const optionsButtons = options.map((option) => (
    <Button
      key={option.value}
      className='uppercase'
    >
      {option.value}
    </Button>
  ))

  return (
    <section>
      <Card>
        <CardHeader>
          <Text>Por fim, que categoria de lugar você procura?</Text>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-3 gap-1'>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

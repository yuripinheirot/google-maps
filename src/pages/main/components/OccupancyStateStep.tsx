import { Button, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import React from 'react'
import { KeyValue } from '../../../protocols/places.type'

const options: KeyValue[] = [
  {
    value: 'Vazio',
    key: 'empty',
  },
  {
    value: 'Ok',
    key: 'ok',
  },
  {
    value: 'Cheio',
    key: 'full',
  },
]

type Props = {
  handleSubmitStep: (value: string) => void
}

export const OccupancyStateStep = ({ handleSubmitStep }: Props) => {
  const optionsButtons = options.map((option) => (
    <Button
      key={option.value}
      onClick={(e) => handleSubmitStep(e.currentTarget.value)}
      value={option.key}
    >
      {option.value}
    </Button>
  ))

  return (
    <section>
      <Card className='flex items-center min-h-52'>
        <CardHeader>
          <Text>Um lugar cheio, ok ou vazio?</Text>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-3 gap-1'>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

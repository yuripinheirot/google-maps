import { Button, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { KeyValue } from '../../../protocols/places.type'
import { StepperStateType } from '../MainPage'

const options: KeyValue[] = [
  {
    key: 'night_club',
    value: 'baladas',
  },
  { key: 'bar', value: 'bar' },
  {
    key: 'restaurant',
    value: 'restaurante',
  },
  { key: 'cafe', value: 'café' },
  { key: 'park', value: 'parque' },
  { key: 'supermarket', value: 'supermercado' },
]

type Props = {
  handleSubmitStep: (value: string) => void
  state: StepperStateType
}

export const PlaceTypeStep = ({ handleSubmitStep, state }: Props) => {
  const optionsButtons = options.map((option) => (
    <Button
      colorScheme='teal'
      key={option.value}
      className='uppercase'
      onClick={() => handleSubmitStep(option.key.toString())}
      variant={option.key === state.PLACE_TYPE ? 'solid' : 'outline'}
    >
      {option.value}
    </Button>
  ))

  return (
    <section>
      <Card className='flex items-center min-h-52'>
        <CardHeader>
          <Text>Qual categoria de lugar você procura?</Text>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-2 gap-1'>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

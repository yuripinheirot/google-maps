import { Button, Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import { KeyValue } from '../../../protocols/places.type'

const options: KeyValue[] = [
  {
    value: '1km',
    key: 1000,
  },
  {
    value: '5km',
    key: 5000,
  },
  {
    value: '10km',
    key: 10000,
  },
  {
    value: '15km',
    key: 150000,
  },
  {
    value: '20km',
    key: 20000,
  },
  {
    value: '25km',
    key: 25000,
  },
]

type Props = {
  handleSubmitStep: (value: number) => void
}

export const RangeLocalStep = ({ handleSubmitStep }: Props) => {
  const optionsButtons = options.map((option) => (
    <Button
      key={option.value}
      onClick={(e) => handleSubmitStep(+e.currentTarget.value)}
      value={option.key}
    >
      {option.value}
    </Button>
  ))

  return (
    <section>
      <Card className='flex items-center min-h-52'>
        <CardHeader>
          <Text>Você pensa em ir à algum lugar à qual distância?</Text>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-3 gap-1'>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

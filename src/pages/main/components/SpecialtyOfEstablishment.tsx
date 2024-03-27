import { Button, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { KeyValue } from '../../../protocols/places.type'
import { StepperStateType } from '../MainPage'

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
  state: StepperStateType
}

export const SpecialtyOfEstablishment = ({
  handleSubmitStep,
  state,
}: Props) => {
  const optionsButtons = options.map((option) => (
    <Button
      colorScheme='teal'
      key={option.value}
      onClick={() => handleSubmitStep(option.key.toString())}
      variant={
        option.key === state.SPECIALTY_OF_ESTABLISHMENT ? 'solid' : 'outline'
      }
    >
      {option.value}
    </Button>
  ))

  return (
    <section>
      <Card className='flex items-center min-h-52'>
        <CardHeader>
          <Text>Qual é a especialidade do lugar?</Text>
        </CardHeader>
        <CardBody>
          <div className='grid grid-cols-3 gap-1'>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

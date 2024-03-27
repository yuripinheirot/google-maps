import { Button, Card, CardHeader, CardBody, Text } from '@chakra-ui/react'
import { StepperStateType } from '../MainPage'
import { specialityPlaces } from '../protocols/speciality-places.const'

type Props = {
  handleSubmitStep: (value: string) => void
  state: StepperStateType
}

export const SpecialtyOfEstablishment = ({
  handleSubmitStep,
  state,
}: Props) => {
  const optionsButtons = specialityPlaces[state.PLACE_TYPE].map((option) => (
    <Button
      className='grow'
      key={option.value}
      onClick={() => handleSubmitStep(option.key.toString())}
      variant={
        option.key === state.SPECIALTY_OF_ESTABLISHMENT
          ? 'secondary'
          : 'unselected'
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
          <div className='flex flex-wrap gap-1 '>{optionsButtons}</div>
        </CardBody>
      </Card>
    </section>
  )
}

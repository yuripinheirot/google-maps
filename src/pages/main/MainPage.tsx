import { Button, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useStepper } from '../../hooks/useStepper.hook'
import { Stepper } from '../../components/Stepper'
import { RangeLocalStep } from './components/RangeLocalStep'
import { OccupancyStateStep } from './components/OccupancyStateStep'
import { PlaceTypeStep } from './components/PlaceTypeStep'
import { QuestionsEnum } from './protocols/Question.enum'

type StepperStateType = {
  RANGE_LOCAL: number
  OCCUPANCY_STATE: 'empty' | 'ok' | 'full'
  PLACE_TYPE: string
}

const QuestionsMapped = {
  [QuestionsEnum.RANGE_LOCAL]:
    'Você pensa em ir à algum lugar à qual distância?',
  [QuestionsEnum.OCCUPANCY_STATE]: 'Um lugar cheio, ok ou vazio?',
  [QuestionsEnum.PLACE_TYPE]: 'Por fim, que categoria de lugar você procura?',
}

export const MainPage = () => {
  const {
    currentStep,
    nextStep,
    previousStep,
    currentIndex,
    setDataCurrentStep,
    state,
  } = useStepper<StepperStateType>([
    'RANGE_LOCAL',
    'OCCUPANCY_STATE',
    'PLACE_TYPE',
  ])

  const titleQuestion = QuestionsMapped[currentStep]

  const submitStep = (value: number | string) => {
    setDataCurrentStep(value)
    nextStep()
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='text-center'>
        <Text
          fontSize={'xx-large'}
          fontWeight={600}
        >
          O que você busca?
        </Text>
        <Text fontSize={'larger'}>Selecione 1 opção</Text>
      </div>
      <Stepper
        steps={[
          {
            label: 'RANGE_LOCAL',
            Component: <RangeLocalStep handleSubmitStep={submitStep} />,
          },
          {
            label: 'OCCUPANCY_STATE',
            Component: <OccupancyStateStep handleSubmitStep={submitStep} />,
          },
          {
            label: 'PLACE_TYPE',
            Component: <PlaceTypeStep handleSubmitStep={submitStep} />,
          },
        ]}
        currentIndex={currentIndex}
      />
      <div className='flex gap-2'>
        <Button
          onClick={previousStep}
          variant='ghost'
        >
          VOLTAR
        </Button>
      </div>
    </div>
  )
}

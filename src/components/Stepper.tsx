import React from 'react'
import { useStepper } from '../hooks/useStepper.hook'

const QuestionsEnum = {
  RANGE_LOCAL: 'RANGE_LOCAL',
  OCCUPANCY_STATE: 'OCCUPANCY_STATE',
  PLACE_TYPE: 'PLACE_TYPE',
}

const QuestionsMapped = {
  [QuestionsEnum.RANGE_LOCAL]:
    'Você pensa em ir à algum lugar à qual distância?',
  [QuestionsEnum.OCCUPANCY_STATE]: 'Um lugar cheio, ok ou vazio?',
  [QuestionsEnum.PLACE_TYPE]: 'Por fim, que categoria de lugar você procura?',
}

type StepperStateType = {
  RANGE_LOCAL: number
  OCCUPANCY_STATE: 'empty' | 'ok' | 'full'
  PLACE_TYPE: string
}

export const Stepper = () => {
  const { currentStep } = useStepper<StepperStateType>([
    'RANGE_LOCAL',
    'OCCUPANCY_STATE',
    'PLACE_TYPE',
  ])

  const subtitleQuestion = QuestionsMapped[currentStep]

  return <div>Typo</div>
}

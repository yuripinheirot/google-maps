import { Text } from '@chakra-ui/react'

type StepComponent = {
  label: string
  Component: JSX.Element
}

type Props = {
  steps: StepComponent[]
  currentIndex: number
}

export const Stepper = ({ currentIndex, steps }: Props) => {
  const RenderChildren = steps[currentIndex].Component

  return (
    <div>
      <>{RenderChildren}</>
    </div>
  )
}

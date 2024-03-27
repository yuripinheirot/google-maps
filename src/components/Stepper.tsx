type StepComponent = {
  Component: JSX.Element
}

type Props = {
  steps: StepComponent[]
  currentIndex: number
}

export const Stepper = ({ currentIndex, steps }: Props) => {
  const RenderChildren = steps[currentIndex].Component

  return (
    <div className='w-full'>
      <>{RenderChildren}</>
    </div>
  )
}

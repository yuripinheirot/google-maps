import { useEffect, useReducer } from 'react'

enum ActionTypesEnum {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  UPDATE = 'UPDATE',
  SET_DATA = 'SET_DATA',
}

type Action = { type: ActionTypesEnum; step?: string; value?: unknown }

interface StepperState<T = any> {
  currentIndex: number
  steps: string[]
  accumulator: T
}

const stepperReducer = (state: StepperState, action: Action): StepperState => {
  const actionHandlers: { [key in ActionTypesEnum]: () => StepperState } = {
    [ActionTypesEnum.NEXT]: () => ({
      ...state,
      currentIndex: Math.min(state.currentIndex + 1, state.steps.length - 1),
    }),
    [ActionTypesEnum.PREVIOUS]: () => ({
      ...state,
      currentIndex: Math.max(state.currentIndex - 1, 0),
    }),
    [ActionTypesEnum.UPDATE]: () => ({
      ...state,
      accumulator: action.value,
      currentIndex: state.steps.length - 1,
    }),
    [ActionTypesEnum.SET_DATA]: () => ({
      ...state,
      accumulator: {
        ...state.accumulator,
        [action.step!]: action.value,
      },
    }),
  }

  return (actionHandlers[action.type] || (() => state))()
}

export const useStepper = <T extends Record<string, unknown>>(
  steps: Array<keyof T & string>
): {
  currentStep: string
  currentIndex: number
  isFirstStep: boolean
  isLastStep: boolean
  update: (value: T) => void
  nextStep: () => void
  previousStep: () => void
  setDataStepper: (value: T[keyof T]) => void
  state: StepperState<T>
  getAccumulator: () => T
} => {
  const [state, dispatch] = useReducer(stepperReducer, {
    currentIndex: 0,
    steps: steps,
    accumulator: {} as T,
  })

  const currentStep = steps[state.currentIndex]
  const isFirstStep = state.currentIndex === 0
  const isLastStep = state.currentIndex === steps.length - 1

  const setDataStepper = (value: unknown) =>
    dispatch({ type: ActionTypesEnum.SET_DATA, step: currentStep, value })

  const update = (value: unknown) =>
    dispatch({ type: ActionTypesEnum.UPDATE, step: currentStep, value })

  const nextStep = () => dispatch({ type: ActionTypesEnum.NEXT })

  const previousStep = () => dispatch({ type: ActionTypesEnum.PREVIOUS })

  const getAccumulator = () => state.accumulator

  return {
    currentStep,
    currentIndex: state.currentIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    setDataStepper,
    getAccumulator,
    state,
    update,
  }
}

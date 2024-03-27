/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer } from 'react'

enum ActionTypesEnum {
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
  UPDATE = 'UPDATE',
  SET_DATA_CURRENT_STEP = 'SET_DATA',
  SET_CURRENT_STEP = 'SET_CURRENT_STEP',
  REMOVE_STEP = 'REMOVE_STEP',
  ADD_STEP = 'ADD_STEP',
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
    [ActionTypesEnum.SET_DATA_CURRENT_STEP]: () => ({
      ...state,
      accumulator: {
        ...state.accumulator,
        [action.step!]: action.value,
      },
    }),
    [ActionTypesEnum.SET_CURRENT_STEP]: () => ({
      ...state,
      currentIndex: state.steps.indexOf(action.step!),
    }),
    [ActionTypesEnum.REMOVE_STEP]: () => {
      const newSteps = state.steps.filter((step) => step !== action.step)
      const accumulator = { ...state.accumulator }
      delete accumulator[action.step!]
      return {
        ...state,
        steps: newSteps,
        accumulator,
      }
    },
    [ActionTypesEnum.ADD_STEP]: () => {
      const newSteps = [...state.steps]
      newSteps.splice(action.value as number, 0, action.step!)
      return {
        ...state,
        steps: newSteps,
      }
    },
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
  setDataCurrentStep: (value: T[keyof T]) => void
  setCurrentStep: (value: keyof T) => void
  state: StepperState<T>
  getAccumulator: () => T
  removeStep: (step: keyof T) => void
  addStep: (step: keyof T, position: number) => void
} => {
  const [state, dispatch] = useReducer(stepperReducer, {
    currentIndex: 0,
    steps: [...steps],
    accumulator: {} as T,
  })

  const currentStep = steps[state.currentIndex]
  const isFirstStep = state.currentIndex === 0
  const isLastStep = state.currentIndex === state.steps.length - 1

  const setDataCurrentStep = (value: unknown) =>
    dispatch({
      type: ActionTypesEnum.SET_DATA_CURRENT_STEP,
      step: currentStep,
      value,
    })

  const update = (value: unknown) =>
    dispatch({ type: ActionTypesEnum.UPDATE, step: currentStep, value })

  const nextStep = () => dispatch({ type: ActionTypesEnum.NEXT })

  const previousStep = () => dispatch({ type: ActionTypesEnum.PREVIOUS })

  const getAccumulator = () => state.accumulator

  const setCurrentStep = (value: keyof T) =>
    dispatch({ type: ActionTypesEnum.SET_CURRENT_STEP, value })

  const removeStep = (step: keyof T) =>
    dispatch({ type: ActionTypesEnum.REMOVE_STEP, step: step.toString() })

  const addStep = (step: keyof T, position: number) =>
    dispatch({
      type: ActionTypesEnum.ADD_STEP,
      step: step.toString(),
      value: position,
    })

  return {
    currentStep,
    currentIndex: state.currentIndex,
    isFirstStep,
    isLastStep,
    nextStep,
    previousStep,
    setDataCurrentStep,
    getAccumulator,
    state,
    update,
    setCurrentStep,
    removeStep,
    addStep,
  }
}

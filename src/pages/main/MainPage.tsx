import { Button, Text } from '@chakra-ui/react'
import { useStepper } from '../../hooks/useStepper.hook'
import { Stepper } from '../../components/Stepper'
import { RangeLocalStep } from './components/RangeLocalStep'
import { SpecialtyOfEstablishment } from './components/SpecialtyOfEstablishment'
import { PlaceTypeStep } from './components/PlaceTypeStep'
import { useQuery } from '@tanstack/react-query'
import { mapsController } from '../../api/controllers/maps.controller'
import { initialLocation } from '../../constants/config'
import { specialitiesPlaces } from './protocols/speciality-places.const'

export type StepperStateType = {
  RANGE_LOCAL: number
  SPECIALTY_OF_ESTABLISHMENT: string
  PLACE_TYPE: string
}

export const MainPage = () => {
  const {
    nextStep,
    previousStep,
    currentIndex,
    setDataCurrentStep,
    state,
    isLastStep,
    currentStep,
    removeStep,
    addStep,
  } = useStepper<StepperStateType>([
    'RANGE_LOCAL',
    'PLACE_TYPE',
    'SPECIALTY_OF_ESTABLISHMENT',
  ])

  const { refetch: searchNearby } = useQuery({
    queryKey: ['nearbySearch', state.accumulator],
    queryFn: () =>
      mapsController.searchNearbyPlaces({
        keyword: state.accumulator.SPECIALTY_OF_ESTABLISHMENT,
        radius: state.accumulator.RANGE_LOCAL,
        type: state.accumulator.PLACE_TYPE,
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      }),
    enabled: false,
  })

  const submitStep = (value: string | number) => {
    const hasSpeciality = specialitiesPlaces[value]

    setDataCurrentStep(value)

    if (currentStep === 'PLACE_TYPE' && !hasSpeciality) {
      removeStep('SPECIALTY_OF_ESTABLISHMENT')
    }
    if (currentStep === 'PLACE_TYPE' && hasSpeciality) {
      addStep('SPECIALTY_OF_ESTABLISHMENT', 2)
    }
  }

  const handleNextStep = () => {
    if (isLastStep) {
      searchNearby()
      return
    }

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
            Component: (
              <RangeLocalStep
                handleSubmitStep={submitStep}
                state={state.accumulator}
              />
            ),
          },
          {
            Component: (
              <PlaceTypeStep
                handleSubmitStep={submitStep}
                state={state.accumulator}
              />
            ),
          },
          {
            Component: (
              <SpecialtyOfEstablishment
                handleSubmitStep={submitStep}
                state={state.accumulator}
              />
            ),
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
        <Button
          onClick={handleNextStep}
          variant='ghost'
        >
          {isLastStep ? 'BUSCAR' : 'PRÓXIMO'}
        </Button>
      </div>
    </div>
  )
}

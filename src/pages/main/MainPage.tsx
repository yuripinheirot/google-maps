import { Button, Text } from '@chakra-ui/react'
import { useStepper } from '../../hooks/useStepper.hook'
import { Stepper } from '../../components/Stepper'
import { RangeLocalStep } from './components/RangeLocalStep'
import { SpecialtyOfEstablishment } from './components/SpecialtyOfEstablishment'
import { PlaceTypeStep } from './components/PlaceTypeStep'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { mapsController } from '../../api/controllers/maps.controller'
import { initialLocation } from '../../constants/config'

type StepperStateType = {
  RANGE_LOCAL: number
  SPECIALTY_OF_ESTABLISHMENT: string
  PLACE_TYPE: string
}

type SearchPlacePayloadType = {
  specialtyOfEstablishment: string
  placeType: string
  rangeLocal: number
}

export const MainPage = () => {
  const {
    nextStep,
    previousStep,
    currentIndex,
    setDataCurrentStep,
    state,
    isLastStep,
  } = useStepper<StepperStateType>([
    'RANGE_LOCAL',
    'SPECIALTY_OF_ESTABLISHMENT',
    'PLACE_TYPE',
  ])

  const [query] = useState<SearchPlacePayloadType>({
    specialtyOfEstablishment: state.accumulator.SPECIALTY_OF_ESTABLISHMENT,
    placeType: state.accumulator.PLACE_TYPE,
    rangeLocal: state.accumulator.RANGE_LOCAL,
  })

  const { refetch, data } = useQuery({
    queryKey: ['nearbySearch', query],
    queryFn: () =>
      mapsController.searchNearbyPlaces({
        keyword: query.specialtyOfEstablishment,
        radius: query.rangeLocal,
        type: query.placeType,
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      }),
  })

  useEffect(() => {
    console.log({ data })
  }, [data])

  const submitStep = (value: number | string) => {
    if (isLastStep) {
      refetch()
      return
    }

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
            label: 'SPECIALTY_OF_ESTABLISHMENT',
            Component: (
              <SpecialtyOfEstablishment handleSubmitStep={submitStep} />
            ),
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

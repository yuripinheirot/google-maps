import { MapDisplay } from './components/MapDisplay'
import { MainPage } from './pages/main/MainPage'
import { useMaps } from './hooks/useMaps.hook'

export const App = () => {
  const { searchPlace } = useMaps()

  return (
    <main className='App h-full flex flex-col '>
      <div className='flex flex-1 flex-col py-16 px-6 gap-3'>
        <MainPage handleSearchPlace={searchPlace} />
        <MapDisplay />
      </div>
    </main>
  )
}

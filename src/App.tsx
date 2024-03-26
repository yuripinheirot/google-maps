import { MainPage } from './pages/main/MainPage'

export const App = () => {
  return (
    <main className='App h-full flex flex-col '>
      <div className='flex flex-1 flex-col py-16 px-6 gap-3'>
        <MainPage />
      </div>
    </main>
  )
}

import React from 'react'

export const Form = () => {
  return (
    <section className='flex flex-col justify-center items-center gap-3'>
      <p className='text-2xl font-bold text-center text-gray-700'>
        Google maps!
      </p>
      <div className='flex gap-3'>
        <input
          className='border-2 border-gray-300 p-2 rounded-md'
          type='text'
          placeholder='lugar a ser pesquisado'
        />
        <button className='border py-2 px-4 rounded-md bg-blue-400 text-white uppercase hover:bg-blue-500'>
          pesquisar
        </button>
      </div>
    </section>
  )
}

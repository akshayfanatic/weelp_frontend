import React from 'react'
import Tours from './Tours'

const TourSection = ({sliderTitle}) => {
  return (
    <section className='container mx-auto flex flex-col gap-3 p-4 sm:my-4'>
      <h2 className='text-lg sm:text-[28px] font-medium text-Nileblue capitalize'>{sliderTitle ?? 'Top Tours'}</h2>
      <Tours />
    </section>
  )
}

export default TourSection



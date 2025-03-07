import React from 'react'

const WhatAbout = ({ continent, destinationInfo }) => {
    return (
        <div className='p-6 sm:py-8  sm:px-16 xl:px-8 2xl:px-16 '>
            <h5 className='font-medium text-[#143042] capitalize'>What About</h5>
            <h2 className='font-semibold text-3xl text-[#143042] capitalize'>{continent || "Europe"}</h2>
            {destinationInfo && destinationInfo.length > 0 ?
                <ul className='bg-white grid grid-cols-2 justify-center shadow-sm rounded-md mt-8'>
                    {destinationInfo.map((val, index) => {
                        return (
                            <li key={index} className='capitalize flex flex-col flex-wrap items-start p-2 sm:py-9 sm:px-13 odd:border-b odd:border-r even:border-b'>
                                <h3 className='font-semibold px-8 text-sm sm:text-xl'>{val.title}</h3>
                                <span className='capitalize text-xs sm:text-sm font-medium px-8 text-grayDark'>{val.description}</span>
                            </li>
                        )
                    })}
                </ul>
                : null}

        </div>
    )
}
export default WhatAbout
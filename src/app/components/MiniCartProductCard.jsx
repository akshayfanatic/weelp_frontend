import { Calendar, User } from 'lucide-react'
import React from 'react'

const MiniCartProductCard = () => {
    return (
        <div className='flex gap-2 px-6 py-4 items-center border rounded-md shadow-sm'>
            <div className='flex flex-col'>
                <h3 className='text-wrap font-medium capitalize text-Blueish text-lg'>Melaka Wonderland Water Theme</h3>
                <span className='flex gap-2 capitalize text-[#5a5a5a] text-sm mt-2 font-medium'><User size={20} className='text-[#5a5a5a]' />2 Adults, 1 Teen</span>
                <span className='flex gap-2 capitalize text-[#5a5a5a] text-sm mt-2 font-medium'><Calendar size={20} className='text-[#5a5a5a]' />3rd Oct, 11:30 AM</span>
            </div>
            <div className='flex'>
                <img src='https://picsum.photos/300/200?random=15' className='max-w-32 min-h-28 object-cover w-full h-full rounded-md' alt="logo" />
            </div>
        </div>
    )
}

export default MiniCartProductCard
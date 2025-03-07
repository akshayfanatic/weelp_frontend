import { Eye, Heart } from 'lucide-react'
export const CreatorCard = ({ imagSrc, rating, views, title, creatorLogo }) => {
    return (
        <div className='w-full max-w-full sm:max-w-sm  p-4 sm:p-6'>
            <img src={`${imagSrc ? imagSrc : "/assets/Card.png"}`} className='sm:max-w-80 w-full min-h-[350px] h-full rounded-xl object-cover' />
            <div className='px-4 flex justify-between'>

                <div className='flex flex-col'>
                    <div className='flex gap-4 pt-6'>
                        <span className='text-[#5A5A5A] flex items-center gap-2'><Heart className=' size-4 text-[#FF8686] fill-[#FF8686]' />{rating ? rating + "k" : "3.4k"}</span>
                        <span className='text-[#5A5A5A] flex items-center gap-2'><Eye className='size-4 text-[#5A5A5A]' />{views ? views : "23.4k"}</span>
                    </div>
                    <h3 className='text-[#142A38] text-lg font-medium'>{`${title ? title : "4N-3D In London"}`}</h3>
                </div>
                <div className='flex justify-between items-center'>
                    <img src={creatorLogo ? creatorLogo : '/assets/Card.png'} className='size-11 rounded-full mt-4' />
                </div>

            </div>
        </div>
    )
}


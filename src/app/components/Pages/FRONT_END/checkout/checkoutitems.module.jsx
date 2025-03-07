import { CheckoutItemCard, CheckoutPrivateTransferCard, CheckoutReview } from '@/app/components/CheckoutCards'
import React from 'react'

// This Module Handle Checkout Items
export const CheckoutItems = () => {
    return (
        <div className='flex flex-col gap-4'>
            <CheckoutItemCard />
            <CheckoutPrivateTransferCard />
            <CheckoutReview />
        </div>
    )
}

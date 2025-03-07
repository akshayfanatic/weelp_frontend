import React from 'react'
import { Card, CardTitle } from '@/components/ui/card'

const WhiteCard = ({ content }) => {
    return (
        <Card className=" w-full sm:max-w-xs h-40 flex flex-col items-start shadow-md justify-end p-4 bg-white rounded-lg">
            <CardTitle className="text-lg font-semibold text-[#143042] mt-4">{content || "city name"}</CardTitle>
        </Card>

    )
}

export default WhiteCard
import React from 'react';
import WhiteCard from '../../../WhiteCard';



const CitySection = ({ data }) => {
    if (data && data.length >0) {
        return (
            <section className="container mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 px-6 py-4 sm:py-12">
                {data && data.length > 0 && data.slice(0, 6).map((val, index) => (
                    <WhiteCard key={index} content={val?.name} />
                ))}
            </section>
        );
    }
};

export default CitySection;

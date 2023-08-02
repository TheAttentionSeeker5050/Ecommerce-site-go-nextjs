// a list style product card component
// it should show the product name, price, thumbnail and a short description

import {formatCurrency} from '@/utils/stringFormatTools';
import React from 'react'

export default function ListStyleProductCardComponent(
    {product}: any
) {

    // format price to currency
    const priceAscurrency = formatCurrency(product.price);
    
    return (
        <div className='m-3 p-4 bg-slate-200 dark:bg-slate-300 border-2 dark:border-slate-300 rounded-lg flex flex-row max-[420px]:flex-col gap-3'>
            <img className='w-64 max-[420px]:mx-auto' src={product.thumbnailSrc} alt={product.thumbnailAlt} />
            <div className='flex flex-col gap-2 justify-evenly'>

                <p className='font-bold  text-black text-xl'> {product.name}</p>
                <p className=' text-gray-700 text-justify'>{product.description}</p>
                <div className='flex flex-row justify-between'>
                    <p className='p-1.5 text-xl text-emerald-800'>{priceAscurrency}</p>
                    <button className='p-2 bg-primary-dark rounded-md text-white'>Add to Cart</button>
                </div>
            </div>
        </div>
    )

    
}
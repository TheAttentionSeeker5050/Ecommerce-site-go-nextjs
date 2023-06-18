// a tile style product card component
// it should show the product name, price, thumbnail and a short description

import formatCurrency from '@/utils/formatCurrency';
import React from 'react'

export default function TileStyleProductCardComponent(
    {product}: any
) {

    // format price to currency
    const priceAscurrency = formatCurrency(product.price);


    return (
        <div className='m-3 p-4 bg-slate-200 dark:bg-slate-300 w-72 border-2 dark:border-slate-300 rounded-lg flex flex-col gap-2'>
            <img className='' src={product.thumbnailSrc} alt={product.thumbnailAlt} />
            <p className='font-bold text-center text-black text-xl'> {product.name}</p>
            <p className='text-center text-gray-700'>{product.description}</p>
            <div className='flex flex-row justify-between'>
                <p className='p-1.5 text-xl text-emerald-800'>{priceAscurrency}</p>
                <button className='p-2 bg-primary-dark rounded-lg text-white'>Add to Cart</button>

            </div>
        </div>
    )
}
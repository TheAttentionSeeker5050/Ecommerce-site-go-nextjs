// a highlighted product card component
// used for the home page and promotional purposes
// it should show the color, title 1, title 2, button text, button link, and a thumbnail
// name, price, thumbnail and a short description
'use client'
import React from 'react'

export default function HighlightCardComponent(
    {  title1, title2, buttonText, buttonLink, thumbnailSrc, thumbnailAlt }: {
        cardColor: string,
        cardColorDark: string,
        cardSize: string,
        title1: string,
        title2: string,
        buttonText: string,
        buttonLink: string,
        thumbnailSrc: string,
        thumbnailAlt: string,
    }
) {

    

    return (
        <div className="m-3 p-4 bg-neutral-200 w-auto max-w-lg dark:bg-neutral-300 border-2 dark:border-slate-300 rounded-md flex gap-3 flex-nowrap">
            <img className='w-56 ' src={thumbnailSrc} alt={thumbnailAlt} />
            <div className='flex flex-col mx-auto gap-5 my-5 justify-between'>
                <p className='font-bold  text-black text-xl'> {title1}</p>
                <p className=' text-gray-700 text-justify'>{title2}</p>
                
                <button className='p-2 bg-primary-dark rounded-md text-white '>
                    <a href={buttonLink}>
                        {buttonText}
                    </a>
                </button>
            </div>
        </div>
    );
}
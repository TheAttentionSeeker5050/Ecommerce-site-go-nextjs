
// create a comoonent for the header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ShoppingCartWidgetComponent from './shoppingCartWidgetComponent';

// import fontawesome js and css
// import '@fortawesome/fontawesome-free/js/all.js';
// import '@fortawesome/fontawesome-free/css/all.css';

export default function HeaderComponent(toggleDarkMode: any, isDarkMode: any) {
    return (
        <header className={isDarkMode ? 'dark w-screen' : 'w-screen'} >
            <div id='search-logo-section' className='columns-3 px-2 py-3 flex-nowrap gap-3 flex justify-evenly'>
                {/* here goes the search bar, the logo and a few contact methods, and shopping cart (and prob. currency selector) */}
                <form id='search-bar-form' className='border-2 px-3 py-2 rounded-full border-gray hover:bg-slate-400  text-inherit'>
                    <input id='search-bar-input' className='w-40 dark:bg-inherit focus:outline-none border:border-0'  type='text' placeholder='Search for products' />
                    <button id='search-bar-button' type='submit'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color='gray' style={{width:20,}} />
                    </button>
                </form>

                <div id="logo-section" className='flex flex-row gap-x-2 my-auto'>
                    <h1 className='my-auto text-lg'>Pet shop X</h1>
                    <FontAwesomeIcon icon={faPaw}  style={{color: "#1ccea2", width:32,}} />
                </div>

            </div>

            <div id='browse-categories-section' className='flex flex-row flex-nowrap justify-between p-3'>
                {/* here goes the categories of the shop, like shop for clothes, food, toys, etc. or by animal (metadata and other labels for categorizing the products) */}
                <div id="header-product-categories">
                    {/* product categories here */}
                    <ul className='flex-row flex-wrap flex gap-2'>
                        <li>Toys</li>
                        <li>Food</li>
                        <li>Clothes</li>
                        <li>Accessories</li>
                        <li >Training Utils</li>
                    </ul>
                </div>

                <ShoppingCartWidgetComponent />
                
            </div>
        </header>
    )
}
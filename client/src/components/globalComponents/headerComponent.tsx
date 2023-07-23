
// create a comoonent for the header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLocationDot, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ShoppingCartWidgetComponent from './shoppingCartWidgetComponent';

// import fontawesome js and css
// import '@fortawesome/fontawesome-free/js/all.js';
// import '@fortawesome/fontawesome-free/css/all.css';

export default function HeaderComponent(ToggleDarkMode: any, isDarkMode: any) {
    return (
        <header className={'w-full'} >
            {/* this is large screen version */}
            <div id="desktop-header-wrapper" className='hidden phone:grid'>
                Page Header on Large Screens
            </div>
            {/* here we will display the mobile header wrapper */}
            <div id="mobile-header-wrapper" className='grid phone:hidden grid-cols-8 grid-rows-2 p-3 '>
                <div id='mobile-header-menu' className='col-start-1 row-auto text-center my-auto'><FontAwesomeIcon icon={faBars}/></div>
                <div id='mobile-header-account' className='col-auto row-auto text-center my-auto'><FontAwesomeIcon icon={faUser} /></div>
                <div id='mobile-header-company-logo' className='col-auto col-span-4 row-auto text-2xl dark:text-green-300 text-center my-3'>Pet Shop X</div>
                <div id='mobile-header-location' className='col-auto row-auto text-center my-auto'><FontAwesomeIcon icon={faLocationDot} /></div>
                <div id='mobile-header-cart' className='col-auto row-auto mx-auto my-auto'>
                    <ShoppingCartWidgetComponent />
                </div>
                <div id='mobile-header-search' className='col-start-1 col-span-8 row-start-2 row-span-1 px-4'>
                    {/* Bottom Search Bar */}
                    <form id='search-bar-form' className='w-full border-2 px-3 py-2 rounded-full border-gray hover:bg-slate-200 hover:text-black text-inherit my-2 flex flex-row justify-between'>
                        <input id='search-bar-input' className='w-40 dark:bg-inherit focus:outline-none border:border-0'  type='text' placeholder='Search for products' />
                        <button id='search-bar-button' type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='gray' style={{width:20,}} />
                        </button>
                    </form>    
                </div>
            </div>
                        
        </header>
    )
}
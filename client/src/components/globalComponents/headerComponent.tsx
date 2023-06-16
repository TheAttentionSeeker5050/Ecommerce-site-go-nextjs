
// create a comoonent for the header
import React from 'react';

// import fontawesome js and css
import '@fortawesome/fontawesome-free/js/all.js';
import '@fortawesome/fontawesome-free/css/all.css';

export default function HeaderComponent() {
    return (
        <header className='w-screen'>
            {/* <div className='container-lg flex flex-wrap px-2 py-6 gap-3 justify-evenly text-base'> */}
            <div id='search-logo-section' className='container-lg flex flex-wrap px-2 py-3 gap-3'>
                {/* here goes the search bar, the logo and a few contact methods, and shopping cart (and prob. currency selector) */}
                {/* create search bar form */}
                {/* <form id='search-bar-form' className='flex flex-row justify-center items-center'> */}
                <form id='search-bar-form' className='border-2 px-3 py-2 rounded-full'>
                    <input id='search-bar-input' type='text' placeholder='Search for products' />
                    <button id='search-bar-button' type='submit'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>

                <div id="logo-section">
                    {/* <FontAwesomeIcon icon="fa-solid fa-paw-simple" style={{color: "#1ccea2",}} /> */}
                    Pet shop X
                </div>

            </div>
            <div id='browse-categories-section'>
                here goes the categories of the shop, like shop for clothes, food, toys, etc. or by animal (metadata and other labels for categorizing the products)
            </div>
        </header>
    )
}
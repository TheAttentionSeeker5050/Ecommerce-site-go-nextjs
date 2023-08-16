// create footer component using tsx next react
'use client'

import React from 'react';
import { ToggleThemeSwitch } from './toggleThemeSwitch';

export default function FooterComponent(
    { isDarkMode, ToggleDarkMode }: { isDarkMode: any, ToggleDarkMode: any }
) {

    return (
        <footer className={isDarkMode ? 'dark w-full' : 'w-full'}>
            <div className='container-lg flex flex-wrap  py-6 gap-3 justify-evenly '>
                <div>
                    <p className='font-semibold text-lg'>Our Store</p>
                    <p>1234 Fake Street</p>
                    <p>City, State 12345</p>
                    <p>123-456-7890</p>
                </div>
                <div>
                    {/* pet shop store sections here by animal */}
                    <p className='font-semibold text-lg'>Shop for</p>
                    <p>Dogs</p>
                    <p>Cats</p>
                    <p>Birds</p>
                    <p>Reptiles</p>
                </div>
                <div>
                    {/* social media links here */}
                    <p className='font-semibold text-lg'>Follow Us</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div>
                    {/* contact and other pages */}
                    <p className='font-semibold text-lg'>Pages</p>
                    <p>Contact Us</p>
                    <p>FAQ</p>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
                    <div>
                        Dark mode: <ToggleThemeSwitch darkMode={isDarkMode} toggleDarkMode={ToggleDarkMode} 
                        />
                    </div>
            </div>
            <p className='text-center my-3'>This website was made by Nicolas Castellano.</p>
        </footer>
    )
}
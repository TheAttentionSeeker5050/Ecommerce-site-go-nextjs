// create footer component using tsx next react
'use client'

import React from 'react';
import { ToggleSwitch } from '../buttons/toggleSwitch';
// import { themeReducer, initialThemeState } from '@/data/reducers/themeReducer';
import { useReducer } from 'react';
import { init } from 'next/dist/compiled/@vercel/og/satori';
import { ToggleThemeSwitch } from './toggleThemeSwitch';

export default function FooterComponent(toggleDarkMode: any, isDarkMode: any) {

    // reducer for toggling between light and dark theme
    // -----------------------------------------------------------------------
    

    return (
        <footer className={isDarkMode ? 'dark w-screen' : 'w-screen'}>
            <div className='container-lg flex flex-wrap px-2 py-6 gap-3 justify-evenly text-base'>
                <div>
                    <p className='font-semibold text-lg'>Our Store</p>
                    {/* have a fake address here */}
                    <p>1234 Fake Street</p>
                    <p>City, State 12345</p>
                    {/* fake phone number */}
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
                        Dark mode: <ToggleThemeSwitch />
                    </div>
            </div>
            <div className='text-center'>
                <p>This website was made by Nicolas Castellano.  
                    
                </p>
                <p className='text-lg font-bold text-danger text-center'>This is not a real shop. It is just for showing my web developer skills only. Please purchase your pet products somewhere else.</p> 
            </div>
        </footer>
    )
}
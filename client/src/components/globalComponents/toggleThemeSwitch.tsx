// toggle switch component using tailwind nextjs and typescript
// Date: 9/18/2021

import React, { useState, useEffect } from 'react';
// import { useTheme } from "next-themes";
// import { shouldUseDarkTheme, toggleDarkTheme } from '@/data/localstorage/colorTheme';



export function ToggleThemeSwitch(
    { darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void}
) {
    


    return (
        <div className="mt-5">
            <label className="relative inline-block w-16 h-9 rounded-full">
                <input type="checkbox" className="peer opacity-0 w-0 h-0"  
                    // onClick={toggleDarkMode}
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral rounded-full duration-300 before:content-[''] before:absolute before:w-7 before:h-7 before:bottom-1 before:left-1 before:rounded-full
                    before:bg-white before:duration-300 peer-checked:before:translate-x-7 peer-checked:bg-primary"></span>
            </label>
        </div>
    )
}
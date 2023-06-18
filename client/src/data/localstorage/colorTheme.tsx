import React, { useState } from 'react';



export function shouldUseDarkTheme() {
    //   this function is used to check if the user has selected dark theme or not
    // return true if user has selected dark theme

    if (window.localStorage.theme === "dark" || (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return true;
        // return localStorage.getItem("colorTheme") === "dark";
    } else {
        return false;
    }

}

export function toggleDarkTheme(darkModeChecked: boolean) {
    // this function is used to toggle between dark and light theme

    if (darkModeChecked === true) {
        window.localStorage.theme = "light";
        // document.documentElement.classList.remove("dark");
    } else if (darkModeChecked === false) {
        window.localStorage.theme = "dark";
        // document.documentElement.classList.add("dark");
    } 
    
    useDarkTheme();

}

function useDarkTheme() {
    // apply the dark theme on screen load

    if (window.localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}
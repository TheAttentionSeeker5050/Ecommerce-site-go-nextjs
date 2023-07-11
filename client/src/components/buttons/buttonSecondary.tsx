// buttons with secondary color scheme
// this is no longer used and will be remade completely with a new color scheme adjusted to the new design I am working on

import React from 'react';

interface ButtonSecondaryWithRedirectProps {
    text: string;
    href: string;
    disabled?: boolean;
}


export function ButtonRedirectSecondary(props: ButtonSecondaryWithRedirectProps) {
    return (
        <a
            className={`bg-secondary text-white py-2 px-4 m-2 rounded-full ${
                props.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }
            hover:bg-secondary-hover
            `}
            href={props.href}
        >
            {props.text}
        </a>
    );
}


// this button will execute a function when clicked withouth passing handlers as props
// needs to be on pages with use client
interface ButtonSecondaryWithActionProps {
    text: string
    onClick: () => void
    disabled?: boolean
    children?: React.ReactNode
    
}


export function ButtonWithActionSecondary(props: ButtonSecondaryWithActionProps) {
    return (
        <button
        className={`bg-secondary dark:bg-neutral-light text-white py-2 px-4 m-2 rounded-full ${
            props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }
        hover:bg-secondary-hover
        `}
        onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

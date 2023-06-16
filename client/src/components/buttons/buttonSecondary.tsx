// buttons with secondary color scheme

import React from 'react';

interface ButtonPrimaryWithRedirectProps {
    text: string;
    href: string;
    disabled?: boolean;
}

export function ButtonRedirectSecondary(props: ButtonPrimaryWithRedirectProps) {
    return (
        <a
            className={`bg-secondary text-white py-2 px-4 m-2 rounded-full ${
                props.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            href={props.href}
        >
            {props.text}
        </a>
    );
}


// this button will execute a function when clicked withouth passing handlers as props
// needs to be on pages with use client
interface ButtonPrimaryWithActionProps {
    text: string
    onClick: () => void
    disabled?: boolean
    children?: React.ReactNode
    
}


export function ButtonWithActionPrimary(props: ButtonPrimaryWithActionProps) {
    return (
        <button
        className={`bg-primary text-white py-2 px-4 m-2 rounded-full ${
            props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}
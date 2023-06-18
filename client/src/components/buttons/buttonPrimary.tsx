

import React from 'react'
export function ButtonRedirectPrimary({
    text,
    href,
    disabled,
}: {
    text: string
    href: string
    disabled?: boolean
}) {
    return (
        <a
        className={`bg-primary text-white py-2 px-4 m-2 rounded-full ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
        }
        hover:bg-primary-hoverdark
        `}
        href={href}
        >
            {text}
        </a>
    )
}

// this button will execute a function when clicked withouth passing handlers as props
interface ButtonPrimaryProps {
    text: string
    onClick: () => void
    disabled?: boolean
    children?: React.ReactNode
    
}


export function ButtonWithActionPrimary(props: ButtonPrimaryProps) {
    return (
        <button
        className={`bg-primary text-white py-2 px-4 m-2 rounded-full ${
            props.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }
        hover:bg-primary-hover
        `}
        onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}
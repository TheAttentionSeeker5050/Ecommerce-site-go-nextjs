

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
        className={`bg-primary dark:text-black dark:bg-primary-dark text-white py-2 px-4 m-2 rounded-full ${
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
    onClick?: () => void
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

export function ButtonWithActionPrimaryRoundedSm(props: ButtonPrimaryProps) {
    return (
        <button
        className={`bg-primary text-white py-2 px-4 m-2 rounded-sm ${
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

export function SubmitButtonPrimary(
    props: ButtonPrimaryProps,
) {
    return (
        <button type="submit"  className="bg-primary dark:bg-primary-dark dark:text-black text-white py-2 px-8 my-4 mx-auto w-max rounded-full hover:bg-primary-hover">
            {props.text}
        </button>
    )
}
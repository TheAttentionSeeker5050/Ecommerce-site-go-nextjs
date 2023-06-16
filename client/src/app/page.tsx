'use client'
import { ButtonRedirectPrimary, ButtonWithActionPrimary} from "@/components/buttons/buttonPrimary";
import { ButtonRedirectSecondary, ButtonWithActionSecondary } from "@/components/buttons/buttonSecondary";


export default function Page() {
    return <div>
        <h1>Hello, Next.js!</h1>
        <ButtonRedirectPrimary text='Browse products' href='/products' />
        <ButtonWithActionPrimary text='Browse products' onClick={() => {alert()}} />
        <ButtonRedirectSecondary text='Browse products' href='/products' />
        <ButtonWithActionSecondary text='Browse products' onClick={() => {alert()}} />
    </div>
}
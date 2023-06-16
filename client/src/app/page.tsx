'use client'
import { ButtonRedirectPrimary, ButtonWithActionPrimary} from "@/components/buttons/buttonPrimary";


export default function Page() {
    return <div>
        <h1>Hello, Next.js!</h1>
        <ButtonRedirectPrimary text='Browse products' href='/products' />
        <ButtonWithActionPrimary text='Browse products' onClick={() => {alert()}} />
    </div>
}
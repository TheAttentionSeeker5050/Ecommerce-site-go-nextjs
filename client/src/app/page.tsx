'use client'
import { ButtonRedirectPrimary, ButtonWithActionPrimary} from "@/components/buttons/buttonPrimary";
import { ButtonRedirectSecondary, ButtonWithActionSecondary } from "@/components/buttons/buttonSecondary";
import { ToggleSwitch } from "@/components/buttons/toggleSwitch";
import {useTheme} from 'next-themes'

export default function Page() {
    return <div>
        <h1 className="dark:text-danger">Hello, Next.js!</h1>
        {/* <ToggleSwitch label="Toggle Switch" onChange={(value) => console.log(value)} /> */}
        {/* <ToggleSwitch  handleContext={(value) => console.log("toggled value on sw: "+value)}/> */}
    </div>
}
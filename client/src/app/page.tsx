'use client'

import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary"



export default function Page() {

    return (
        <div id="p-content" className="">
            {/* <h1 >hello home page</h1>
            <br />
            <br />

            <ButtonRedirectPrimary text="Login" href="/login" />
            <ButtonRedirectPrimary text="Register" href="/register" /> */}

            {/* create a product highlight container with image */}
            <div className="flex flex-row flex-nowrap w-full justify-around">
                <div className="">
                    <img className="w-60" src="https://pixabay.com/get/g24cd529966d1ead6a9aed659f85893f6f4ce048e667aede16e4c0af0a7201b4ca5830dd12ca55c6620b97044a11dbacf_1280.jpg" />
                    <p className="text-xl">Product Name</p>
                    <p className="text-xl">$100</p>
                </div>

                <div className="">
                    <h1 className="text-2xl font-bold">Product Highlight</h1>
                    <p className="text-lg">Check out our latest product</p>
                </div>
                
            </div>

    
        </div>
    )
}
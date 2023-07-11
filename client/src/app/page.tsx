'use client'

import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary"
import { ButtonRedirectSecondary } from "@/components/buttons/buttonSecondary"
import ProductHighlightedContainer from "@/components/containers/productHighlightedContainer"


export default function Page() {

    // product highlight dummy data
    const productData = {
        productName: "Product Name",
        price: 100,
        productImageSrc: "https://pixabay.com/get/g24cd529966d1ead6a9aed659f85893f6f4ce048e667aede16e4c0af0a7201b4ca5830dd12ca55c6620b97044a11dbacf_1280.jpg",
        productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident maxime adipisci nemo cumque sint quia blanditiis minus, inventore rerum necessitatibus nisi fugit doloremque itaque",
        productHighlight: "taste this delicious product",
        productLink: "https://www.google.com",
    }

    return (
        <div id="p-content" className="">
            <ProductHighlightedContainer {...productData} />
            
            {/* container for the trending products */}
            
            {/* <h1 >hello home page</h1>
            <br />
            <br />

            <ButtonRedirectPrimary text="Login" href="/login" />
            <ButtonRedirectPrimary text="Register" href="/register" /> */}

            

    
        </div>
    )
}
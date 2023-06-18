'use client'

import ListStyleProductCardComponent from "@/components/cards/listStyleProductCardComponent"
import TileStyleProductCardComponent from "@/components/cards/tileStyleProductCardComponent"
import formatPercentage from "@/utils/formatPercentage"
import { format } from "path"


export default function Page() {

    return <div>
        <h1 className="dark:text-danger">Hello, Next.js!</h1>
        <TileStyleProductCardComponent product={{name: "test product", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est sunt praesentium odit ipsum veniam totam eaque nihil ex deserunt assumenda mollitia voluptatibus, quos illo quibusdam voluptate maxime dolore vero soluta tempora? Nisi atque porro assumenda?", price: 10.65, thumbnailSrc: "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg", thumbnailAlt: "doggy" }}/>
        <ListStyleProductCardComponent product={{name: "test product", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est sunt praesentium odit ipsum veniam totam eaque nihil ex deserunt assumenda mollitia voluptatibus, quos illo quibusdam voluptate maxime dolore vero soluta tempora? Nisi atque porro assumenda?", price: 10.5665468549, thumbnailSrc: "https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg", thumbnailAlt: "doggy" }}/>

        
    </div>
}
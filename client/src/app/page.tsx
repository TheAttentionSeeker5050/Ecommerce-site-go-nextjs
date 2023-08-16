'use client'



import { handleGetRequests } from "@/functions/handlers/handleGenericRequests";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        // fetch the products from the server using our get request handler
        handleGetRequests("/products/products/random/20")
        .then((data) => {
            // if the request was successful, dispatch the products to the redux store
            if (!data.error) {
                setProducts(data)
                console.log(data)
            } else {
                setError(true)
            }
            setLoading(false)
        })
        .catch((err) => {
            setError(true)
            setLoading(false)
        })
    }, [])

    return (
        <div id="p-content" className="">
            <h1 className="text-4xl font-bold text-center py-3">Browse Some of Our Products</h1>
            
            {loading ? (
                <div className="flex justify-center items-center">
                    ...loading
                </div>
            ) : error ? (
                <div className="flex justify-center items-center">
                    Error loading products
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-xl gap-3 px-3 mx-auto">
                {products.map((product:any) => (
                    <Link href={`/product-pages/product/${product.id}`} key={product.id}>
                        <div className="w-32 mx-auto p-2 dark:hover:shadow-white hover:shadow-lg hover:shadow-zinc-500 ">
                            <Image width={120} height={120} alt={product.name} className="w-28 rounded-md mx-auto" 
                            src={product.product_image || "https://imagedelivery.net/TCjTQ2jntwoaDOUnNfWb7Q/65e3dd69-66fa-49c8-3f8a-3bbb97958100/public"} />
                            <p className="text-md text-center">
                                {product.name}
                            </p>
                            <p className="text-md text-center font-bold">
                                ${product.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            )}
        </div>
    )
}
"use client";
import { ButtonWithActionPrimary } from "@/components/buttons/buttonPrimary";
import { updateShoppingCart } from "@/data/redux/api/cartAPIHandlers";
import { reduxStore } from "@/data/redux/reduxStore";
import { addItemToShoppingCart, removeAllUnitsOfItemFromShoppingCart } from "@/data/redux/shoppingCartStore";
import {formatCurrency} from "@/utils/stringFormatTools";
import Image from "next/image";
import { useState } from "react";


export default function IndividualProductPageContainer(
    {product_data}: { product_data: any }
    ) {

    // the state variables for the product containet
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [addToCartMessage, setAddToCartMessage] = useState<string>("");

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductQuantity(parseInt(e.target.value));
    }

    const handleAddToCart = () => {
        // add the product to the cart

        // prepare the payload for the item
        const itemPayload = {
            productId: product_data.id.toString(),
            quantity: productQuantity,
        }

        // add the items to the cart store on redux
        reduxStore.dispatch(addItemToShoppingCart(itemPayload));

        // add a message to the user
        setAddToCartMessage(`${productQuantity} units of ${product_data.name} were added to cart`);

        // update the data on the server using thunk
        reduxStore.dispatch(updateShoppingCart());
        
        // make the message disappear after 3 seconds
        setTimeout(() => {
            setAddToCartMessage("");
        }, 3000);

    }

    const handleDeleteItemFromCart = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        // delete the item from the cart

        // prepare the payload for the item
        const itemPayload = {
            productId: product_data.id.toString(),
            quantity: productQuantity,
        }

        // use the reducers to delete the item from the cart
        reduxStore.dispatch(removeAllUnitsOfItemFromShoppingCart(itemPayload));

        // add a message to the user
        setAddToCartMessage("Item deleted from cart");

        // update the data on the server using thunk
        reduxStore.dispatch(updateShoppingCart());

        // make the message disappear after 3 seconds
        setTimeout(() => {
            setAddToCartMessage("");
        }, 3000);

        
    }

    
    return ( 
        <div id="p-content" className="max-w-4xl my-8 flex flex-col gap-5 mx-auto">
            <div id="upper-prod-container" className="tablet:grid-rows-4 tablet:grid tablet:grid-cols-3 px-4 flex flex-col gap-3">

                <h2 id="product-title" className="text-lg font-bold tablet:col-start-2 tablet:col-span-2 tablet:row-start-1 tablet:row-end-2">
                    {product_data.name}
                </h2>
                <div id="product-image" className="tablet:col-start-1 tablet:col-span-1 tablet:row-start-1 tablet:row-end-4 mx-auto p-2">
                    {/* will replace image with a carousell widget element */}
                    <Image width={250} height={250} src={product_data.product_image} alt={product_data.product_image_alt} className="rounded-md"/>
                </div>
                <div id="product-price-highlights" className="text-md font-semibold text-brand-vivid tablet:col-start-2 tablet:col-end-3  tablet:row-start-2 tablet:row-end-5 p-2 dark:text-brand-light">
                    {formatCurrency(product_data.price)}
                </div>
                <div id="product-purchase-widget" className="p-4 border-2 flex flex-col gap-3 rounded-lg dark:bg-gray-light text-black  tablet:col-start-3 tablet:col-end-4 tablet:row-start-2 tablet:row-end-4">
                    <span className="">Quantity</span>
                    {/* a dropdown widget here */}
                    <select name="product-quantity" value={productQuantity} onChange={handleChangeQuantity} defaultValue={"1"} id="product-quantity-select" className="p-2 border-2 dark:text-black">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <ButtonWithActionPrimary onClick={handleAddToCart} text="Add to cart" />
                    {/* delete from cart button */}
                    <button className="p-2 rounded-full border-2 border-white bg-red-500 text-white" onClick={handleDeleteItemFromCart}>Delete from cart</button>
                    <p className="text-center text-sm text-red-500">{addToCartMessage}</p>
            </div>
            </div>
            <div id="productDescription" className="px-4">
                <h2 className="font-semibold text-md my-3">Product Description:</h2> 
                <div className="text-justify text-sm">
                    <p className="mb-2">{product_data.description}</p>

                </div>
            </div>
            {/* and now a purchase widget */}
            
        </div>
    )
}



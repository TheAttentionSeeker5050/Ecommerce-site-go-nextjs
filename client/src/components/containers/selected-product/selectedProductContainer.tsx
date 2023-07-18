import { ButtonWithActionPrimary } from "@/components/buttons/buttonPrimary";
import formatCurrency from "@/utils/formatCurrency";



export default function IndividualProductPage(
    {product_data}: { product_data: any }
    ) {
    return ( 
        <div id="p-content" className="w-full max-w-4xl mx-auto my-3">
            <div id="top-prod-container" className="grid-rows-5 grid grid-cols-3 my-3">

                <h2 id="product-title" className="text-lg font-bold col-start-2 col-span-2 row-start-1 row-end-2">
                    {product_data.productName}
                </h2>
                <div id="product-price-highlights" className="text-md font-semibold text-red-600 col-start-2 col-end-3 col-span-1 row-start-2 row-end-6">
                    {formatCurrency(product_data.price)}
                </div>
                <div id="product-image" className="col-start-1 col-span-1 row-start-1 row-end-6">
                    {/* will replace image with a carousell widget element */}
                    <img src={product_data.productImageSrc} alt={product_data.productName} className="w-60"/>
                </div>
                <div id="product-purchase-widget" className="p-4 border-2 flex flex-col gap-3 rounded-lg dark:bg-gray-light text-black  col-start-3 col-end-4 row-start-2 row-end-6">
                    <span className="">Quantity</span>
                    {/* a dropdown widget here */}
                    <select name="product-quantity" id="product-quantity-select" className="p-2 border-2 dark:text-black">
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
                    <ButtonWithActionPrimary onClick={
                        () => {
                            alert('this button will add the product to the cart')
                    } } text="Add to cart" />
            </div>
            </div>
            <div id="productDescription">
                <span>Product Description:</span> <br/>
                {product_data.productDescription}
            </div>
            {/* and now a purchase widget */}
            
        </div>
    )
}
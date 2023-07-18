import { ButtonWithActionPrimary } from "@/components/buttons/buttonPrimary";
import formatCurrency from "@/utils/formatCurrency";



export default function IndividualProductPage(
    {product_data}: { product_data: any }
    ) {
    return ( 
        <div id="p-content" className="w-full">
            <h1 id="product-title">
                {product_data.productName}
            </h1>
            <div id="product-price">
                {formatCurrency(product_data.price)}
            </div>
            <div id="product-image">
                <img src={product_data.productImageSrc} alt={product_data.productName} className="w-60"/>
            </div>
            <div id="productDescription">
                <span>Product Description:</span> <br/>
                {product_data.productDescription}
            </div>
            {/* and now a purchase widget */}
            <div id="product-purchase-widget">
                <span>Quantity</span>
                {/* a dropdown widget here */}
                <select name="product-quantity" id="product-quantity-select">
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
    )
}
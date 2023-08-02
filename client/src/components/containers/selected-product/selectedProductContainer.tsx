import { ButtonWithActionPrimary } from "@/components/buttons/buttonPrimary";
import formatCurrency from "@/utils/formatCurrency";
import Image from "next/image";


export default function IndividualProductPageContainer(
    {product_data}: { product_data: any }
    ) {
        
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
                <div id="product-price-highlights" className="text-md font-semibold text-red-600 tablet:col-start-2 tablet:col-end-3  tablet:row-start-2 tablet:row-end-5 p-2 dark:text-orange-light">
                    {formatCurrency(product_data.price)}
                </div>
                <div id="product-purchase-widget" className="p-4 border-2 flex flex-col gap-3 rounded-lg dark:bg-gray-light text-black  tablet:col-start-3 tablet:col-end-4 tablet:row-start-2 tablet:row-end-4">
                    <span className="">Quantity</span>
                    {/* a dropdown widget here */}
                    <select name="product-quantity" defaultValue={"1"} id="product-quantity-select" className="p-2 border-2 dark:text-black">
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
            <div id="productDescription" className="px-4">
                <h2 className="font-semibold text-md my-3">Product Description:</h2> 
                <div className="text-justify text-sm">
                    {/* {product_data.description.map((paragraph: string, i: number) => {
                        return <p className="mb-2" key={i}>{paragraph}</p>
                        }) // THIS IS SUPPOSED TO BE IMPLEMENTED FOR MULTIPLE PARAGRAPHS, BUT FOR THE MOMENT WE WILL ONLY HAVE ONE PARAGRAPH
                    }  */}

                    <p className="mb-2">{product_data.description}</p>

                </div>
            </div>
            {/* and now a purchase widget */}
            
        </div>
    )
}
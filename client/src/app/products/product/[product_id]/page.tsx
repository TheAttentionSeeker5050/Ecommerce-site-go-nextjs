export default function IndividualProductPage({params}: { params: {product_id: string} }) {
    return ( 
        <div id="p-content" className="w-full">
            <h1>
                Hello, Next.js! product page {params.product_id} page
            </h1>
        </div>
    )
}
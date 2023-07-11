export default function ProductFilterContainer(

) {
    return (
        <div id="products-container-wrapper" className="flex flex-col my-5 w-auto mx-4 w-3/12 max-w-xs hidden sm:flex">
            <div id="products-container-upper-view-opts " className="bg-primary-light dark:bg-primary-dark dark:text-black text-white p-4 rounded-t-xl border-2 border-black dark:border-white flex flex-col flex-wrap  gap-3 ">
                Filters    
            </div>
            <div id="products-container-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">
                <ul>
                    <li>Your</li>
                    <li>Products</li>
                    <li>Filters</li>
                    <li>Will</li>
                    <li>Go</li>
                    <li>Here</li>
                </ul>
            </div>
        </div>
    )
}
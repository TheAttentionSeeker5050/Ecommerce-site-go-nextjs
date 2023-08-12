// create a component for the shopping cart widget
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ShoppingCartWidgetComponent() {

    const [cartSize, setCartSize] = useState(12);

    return (
        <Link href={"/cart"} id="header-shopping-cart" className='my-auto flex flex-row gap-2'>

            {/* shopping cart here, you could also add a number stating the number of items in cart */}
            {/* the cart contents globe should be conditional if the cart is full */}

            {cartSize > 0 ? <div className='text-sm rounded-lg bg-danger flex p-1 text-white text-center my-auto'>{cartSize}</div> : <div>  </div>}
            <FontAwesomeIcon icon={faShoppingCart} className='my-auto'/>
        </Link>
    )
}
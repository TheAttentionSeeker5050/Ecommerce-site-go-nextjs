// create a component for the shopping cart widget
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { reduxStore } from '@/data/redux/reduxStore';

export default function ShoppingCartWidgetComponent() {

    const [cartSize, setCartSize] = useState(reduxStore.getState().shoppingCart.value.totalItems);

    useEffect(() => {
        // subscribe to the shopping cart
        const subscribeShoppingCart = reduxStore.subscribe(() => {
            // get the redux state of the shopping cart and set it to the cart state
            setCartSize(reduxStore.getState().shoppingCart.value.totalItems);
        });
        return () => {
            subscribeShoppingCart();
        }
    }, [])


    return (
        <Link href={"/cart"} id="header-shopping-cart" className='my-auto flex flex-row gap-2'>

            {/* shopping cart here, you could also add a number stating the number of items in cart */}
            {/* the cart contents globe should be conditional if the cart is full */}

            {
                cartSize > 10 ? <div className='text-xs rounded-full bg-danger flex p-1 px-1 text-white text-center my-auto'>{cartSize}</div> 
            : 
                cartSize > 0 ? <div className='text-xs rounded-full bg-danger flex p-1 px-3 text-white text-center my-auto'>{cartSize}</div> 
            : 
                <div>  </div>
            }
            <FontAwesomeIcon icon={faShoppingCart} className='my-auto'/>
        </Link>
    )
}
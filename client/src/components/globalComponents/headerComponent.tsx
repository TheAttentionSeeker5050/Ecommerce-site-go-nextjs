
// create a comoonent for the header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLocationDot, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import ShoppingCartWidgetComponent from './shoppingCartWidgetComponent';
import Link from 'next/link';
import { reduxStore } from '@/data/redux/reduxStore';



export default function HeaderComponent(ToggleDarkMode: any, isDarkMode: any) {

    // set state for the session is open value
    const [isSessionOpenState, setIsSessionOpenState] = React.useState(reduxStore.getState().sessionIsOpen.value);

    useEffect(() => {

        const subscribeSession = reduxStore.subscribe(() => {
            setIsSessionOpenState(reduxStore.getState().sessionIsOpen.value);
        });

        return () => {
            subscribeSession();
        }
    },[]);
    

    

    
    return (
        <header className={'w-full'} >
            {/* this is large screen version */}
            <div id="desktop-header-wrapper" className='hidden phone:block'>
                <div id="desktop-header-top" className='flex flex-row flex-wrap justify-center gap-5'>
                    <Link href={"/"} id="desktop-header-logo" className='text-2xl dark:text-brand-light text-brand-vivid font-bold text-center my-3'>
                        Pet Shop X
                    </Link>
                    <div id='desktop-header-search' className='w-96'>

                        <form id='desktop-search-bar-form' className='w-full border-2 px-3 py-2 rounded-full border-gray hover:bg-slate-200 hover:text-black text-inherit my-2 flex flex-row justify-between'>
                            <input id='desktop-search-bar-input' className='w-40 dark:bg-inherit focus:outline-none border:border-0'  type='text' placeholder='Search for products' />
                            <button id='desktop-search-bar-button' type='submit'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color='gray' style={{width:20,}} />
                            </button>
                        </form>
                    </div>
                    {isSessionOpenState === true ?
                    <Link href={"/account"} id='desktop-header-account' className='my-auto'>
                        <FontAwesomeIcon icon={faUser} />
                    </Link>
                    : null}
                    {isSessionOpenState === true ?
                    <Link href={"/logout"} id="desktop-header-logout" className='my-auto'>
                        Logout
                    </Link>:null}
                    {isSessionOpenState === false ?
                    <Link href={"/login"} id="desktop-header-login" className='my-auto'>
                        Log In
                    </Link>:null}   
                    <div id='desktop-header-cart' className='my-auto'>
                        <ShoppingCartWidgetComponent />
                    </div>
                </div>
                <div id="desktop-header-bottom" className='flex flex-row flex-wrap justify-center gap-5 bg-brand-vivid  dark:bg-background-light dark:text-black  text-white my-3 py-2'>
                    <Link href={"/product-pages/category"}>Shop By Category</Link>
                    <Link href={"/product-pages/pet"}>Shop By Pet</Link>
                    <Link href={"/product-pages"}>Products on Sale</Link>
                </div>
            </div>
            {/* here we will display the mobile header wrapper */}
            <div id="mobile-header-wrapper" className='grid phone:hidden grid-cols-8 grid-rows-2 p-3 '>
                <div id='mobile-header-menu' className='col-start-1 row-auto text-center my-auto'><FontAwesomeIcon icon={faBars}/></div>
                <div id='mobile-header-account' className='col-auto row-auto text-center my-auto'><FontAwesomeIcon icon={faUser} /></div>
                <div id='mobile-header-company-logo' className='col-auto col-span-4 row-auto text-2xl dark:text-brand-light text-brand-vivid font-bold text-center my-3'>Pet Shop X</div>
                <div id='mobile-header-location' className='col-auto row-auto text-center my-auto'><FontAwesomeIcon icon={faLocationDot} /></div>
                <div id='mobile-header-cart' className='col-auto row-auto mx-auto my-auto'>
                    <ShoppingCartWidgetComponent />
                </div>
                <div id='mobile-header-search' className='col-start-1 col-span-8 row-start-2 row-span-1 px-4 w-full '>
                    {/* Bottom Search Bar */}
                    <form id='mobile-search-bar-form' className='border-2 px-3 py-2 rounded-full border-gray hover:bg-slate-200 hover:text-black text-inherit my-2 flex flex-row justify-between'>
                        <input id='mobile-search-bar-input' className='w-40 dark:bg-inherit focus:outline-none border:border-0'  type='text' placeholder='Search for products' />
                        <button id='mobile-search-bar-button' type='submit'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color='gray' style={{width:20,}} />
                        </button>
                    </form>    
                </div>
            </div>
                        
        </header>
    )
}
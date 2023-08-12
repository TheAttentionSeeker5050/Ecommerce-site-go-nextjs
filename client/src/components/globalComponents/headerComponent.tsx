
// create a comoonent for the header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faLocationDot, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import ShoppingCartWidgetComponent from './shoppingCartWidgetComponent';
import Link from 'next/link';
import { reduxStore } from '@/data/redux/reduxStore';
import { setSessionIsOpen } from '@/data/redux/sessionIsOpenStore';
import { useRouter } from "next/navigation";
import { handlePostRequests } from '@/functions/handlers/handleGenericRequests';



export default function HeaderComponent(ToggleDarkMode: any, isDarkMode: any) {

    // set state for the session is open value
    const [isSessionOpenState, setIsSessionOpenState] = React.useState(reduxStore.getState().sessionIsOpen.value);
    const [productDropdownIsOpen, setProductDropdownIsOpen] = React.useState(false);
    const [accountDropdownIsOpen, setAccountDropdownIsOpen] = React.useState(false);

    const router = useRouter();

    useEffect(() => {

        const subscribeSession = reduxStore.subscribe(() => {
            setIsSessionOpenState(reduxStore.getState().sessionIsOpen.value);
        });

        return () => {
            subscribeSession();
        }
    },[]);

    const handleLogout = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        reduxStore.dispatch(setSessionIsOpen(false));
        
        // make a logout request to the server
        handlePostRequests("/user/logout", {})

        // redirect to home page
        router.push("/login");
    }

    const handleMobileProductMenuDropdown = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {
        const accountDropdown = document.getElementById("mobile-menu-account-trigger-btn");
        // close the account menu dropdown if it is open
        if (accountDropdownIsOpen) {
            accountDropdown?.classList.remove("block");
            accountDropdown?.classList.add("hidden");
            setAccountDropdownIsOpen(false);
        }

        // get the mobile menu dropdown
        const mobileMenuDropdown = document.getElementById("mobile-header-menu-dropdown");
        if (mobileMenuDropdown) {
            if (productDropdownIsOpen) {
                // use css transition in tailwind to animate the dropdown
                mobileMenuDropdown.classList.remove("block");
                mobileMenuDropdown.classList.add("hidden");
                setProductDropdownIsOpen(false);
            } else {
                mobileMenuDropdown.classList.remove("hidden");
                mobileMenuDropdown.classList.add("block");
                setProductDropdownIsOpen(true);
            }
        }
    }

    const handleMobileAccountMenuDropdown = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {

        const productDropdown = document.getElementById("mobile-header-menu-dropdown");
        // close the product menu dropdown if it is open
        if (productDropdownIsOpen) {
            productDropdown?.classList.remove("block");
            productDropdown?.classList.add("hidden");
            setProductDropdownIsOpen(false);
        }

        // get the mobile menu dropdown
        const mobileMenuDropdown = document.getElementById("mobile-menu-account-trigger-btn");
        if (mobileMenuDropdown) {
            if (accountDropdownIsOpen) {
                // use css transition in tailwind to animate the dropdown
                mobileMenuDropdown.classList.remove("block");
                mobileMenuDropdown.classList.add("hidden");
                setAccountDropdownIsOpen(false);
            } else {
                mobileMenuDropdown.classList.remove("hidden");
                mobileMenuDropdown.classList.add("block");
                setAccountDropdownIsOpen(true);
            }
        }
    }


    const handleMenuOptionClicked = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        // get the mobile menu dropdown
        const productMenuDropdown = document.getElementById("mobile-header-menu-dropdown");
        // hide the menu dropdown
        productMenuDropdown?.classList.remove("block");
        productMenuDropdown?.classList.add("hidden");

        const accountMenuDropdown = document.getElementById("mobile-menu-account-trigger-btn");
        // hide the menu dropdown
        accountMenuDropdown?.classList.remove("block");
        accountMenuDropdown?.classList.add("hidden");
        setProductDropdownIsOpen(false);
        setAccountDropdownIsOpen(false);
    }
    
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
                    <Link href={"#"} onClick={handleLogout}  id="desktop-header-logout" className='my-auto'>
                        Logout
                    </Link>:null}
                    {isSessionOpenState === false ?
                    <Link href={"/login"} id="desktop-header-login" className='my-auto'>
                        Log In
                    </Link>:null}   
                    <Link href={"/cart"} id='desktop-header-cart-link' className='my-auto'>
                        <ShoppingCartWidgetComponent />
                    </Link>
                </div>
                <div id="desktop-header-bottom" className='flex flex-row flex-wrap justify-center gap-5 bg-brand-vivid  dark:bg-background-light dark:text-black  text-white my-3 py-2'>
                    <Link href={"/product-pages/category"}>Shop By Category</Link>
                    <Link href={"/product-pages/pet"}>Shop By Pet</Link>
                    <Link href={"/product-pages"}>Products on Sale</Link>
                </div>
            </div>
            {/* here we will display the mobile header wrapper */}
            <div id="mobile-header-wrapper" className='grid phone:hidden grid-cols-8 grid-rows-2 p-3 '>
                <div id='mobile-header-menu' className='col-start-1 col-span-1 row-start-1 row-span-1 text-center my-auto'>
                    <FontAwesomeIcon icon={faBars} className='relative' onClick={handleMobileProductMenuDropdown}/>
                    

                    {/* mobile menu */}
                    <div id='mobile-header-menu-dropdown' className='hidden absolute left-0 z-10 w-56 mt-6 origin-top-left bg-white dark:bg-background-light dark:text-black text-black rounded-lg shadow-lg' onClick={handleMenuOptionClicked}>
                        <div id='mobile-header-menu-dropdown-content' className='flex flex-col gap-2 p-2'>
                            <Link href={"/product-pages/category"}>Shop By Category</Link>
                            <Link href={"/product-pages/pet"}>Shop By Pet</Link>
                            <Link href={"/product-pages"}>Products on Sale</Link>
                        </div>
                    </div>
                    
                </div>
                <div id='mobile-authenticated-user-menu' className='col-start-2 col-span-1 row-start-1 row-span-1 text-center my-auto'>
                    <Link href={"#"}  id='mobile-menu-account' className='relative  text-center my-auto'  ><FontAwesomeIcon onClick={handleMobileAccountMenuDropdown} icon={faUser} /></Link>
                    {
                        isSessionOpenState === true ?

                        <div id='mobile-menu-account-trigger-btn' className='hidden absolute left-0 z-10 w-56 mt-6 origin-top-left bg-white dark:bg-background-light dark:text-black text-black rounded-lg shadow-lg' onClick={handleMenuOptionClicked}>
                            <div id='mobile-menu-account-dropdown' className='flex flex-col gap-2 p-2'>
                                <Link href={"/account"}>Account</Link>
                                <Link href={"#"} onClick={handleLogout}>Logout</Link>
                            </div>
                        </div>

                    : <Link href={"/login"} id='mobile-header-account' className=' text-center my-auto'>Login</Link>
                    }
                </div>
                <div id='mobile-header-company-logo' className='col-start-3 col-span-4 row-auto text-2xl dark:text-brand-light text-brand-vivid font-bold text-center my-3'>Pet Shop X</div>
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
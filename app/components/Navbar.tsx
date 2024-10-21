'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { a, div } from "framer-motion/client";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const hideNavbarRoutes: any = ['/Login', '/Register', '/admin'];

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, []);

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        const id = setTimeout(() => setDropdownOpen(false), 200);
        setTimeoutId(id);
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        toast('Logging Out', { icon: '👏' });
        setTimeout(() => {
            router.push('/Login');
        }, 1500);
    }



    return (
        <>
            {!hideNavbarRoutes.includes(pathname) && (
                <nav className="flex justify-between items-center bg-black px-8 sm:px-16 py-4 shadow-md">
                    <Toaster />
                    <Link href='/'>
                        <div className="font-semibold text-3xl text-white">Square</div>
                    </Link>

                    <div className="flex gap-6 text-white">
                        <FlyoutLink
                            href="#"
                            FlyoutContent={HomeContent}
                        >
                            Home
                        </FlyoutLink>
                        <FlyoutLink
                            href="#"
                            FlyoutContent={CategoryContent}
                        >
                            Category
                        </FlyoutLink>
                        <FlyoutLink
                            href="#"
                            FlyoutContent={PageContent}
                        >
                            Pages
                        </FlyoutLink>
                    </div>


                    <div className="flex gap-3">
                        {/* User profile  */}

                        <div className="rounded-full flex justify-center cursor-pointer  text-white">
                            <FlyoutLink 
                            href='#'
                            FlyoutContent={UserContent}
                            ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 13 13" fill="none">
                                    <path d="M11.9688 8.25225C11.538 7.87367 11.0155 7.54657 10.4157 7.28007C10.1593 7.16621 9.8593 7.28165 9.74544 7.53794C9.63158 7.79423 9.74702 8.09425 10.0033 8.20821C10.509 8.43296 10.9448 8.70442 11.2984 9.01516C11.7343 9.3982 11.9844 9.95283 11.9844 10.5371V11.4766C11.9844 11.7566 11.7566 11.9844 11.4766 11.9844H1.52344C1.24345 11.9844 1.01562 11.7566 1.01562 11.4766V10.5371C1.01562 9.95283 1.26566 9.3982 1.70157 9.01516C2.21464 8.56428 3.70951 7.51562 6.5 7.51562C8.57201 7.51562 10.2578 5.82983 10.2578 3.75781C10.2578 1.6858 8.57201 0 6.5 0C4.42799 0 2.74219 1.6858 2.74219 3.75781C2.74219 4.96912 3.31844 6.04823 4.21107 6.73586C2.57774 7.09489 1.56172 7.786 1.0312 8.25225C0.3759 8.828 0 9.66074 0 10.5371V11.4766C0 12.3166 0.683365 13 1.52344 13H11.4766C12.3166 13 13 12.3166 13 11.4766V10.5371C13 9.66074 12.6241 8.828 11.9688 8.25225ZM3.75781 3.75781C3.75781 2.24578 4.98797 1.01562 6.5 1.01562C8.01203 1.01562 9.24219 2.24578 9.24219 3.75781C9.24219 5.26984 8.01203 6.5 6.5 6.5C4.98797 6.5 3.75781 5.26984 3.75781 3.75781Z" fill="white"></path>
                                </svg></FlyoutLink>
                        </div>


                        {/* Wishlist  */}
                        <Link href='/user/wishlist'>
                            <div className="   rounded-full flex justify-center cursor-pointer  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 16 15" fill="none">
                                    <path d="M5.83326 12.3957L5.83364 12.396C6.31474 12.8239 6.85978 13.3088 7.42508 13.8247C7.58386 13.9698 7.78797 14.05 8 14.05C8.21192 14.05 8.41614 13.9698 8.57481 13.8249C9.14139 13.3078 9.68729 12.8221 10.1692 12.3936L10.1692 12.3936L10.1724 12.3908C11.5802 11.1386 12.8006 10.053 13.6507 8.98235C14.6034 7.78266 15.05 6.64083 15.05 5.39134C15.05 4.17994 14.6521 3.06008 13.927 2.23912L13.8895 2.27222L13.927 2.23912C13.1929 1.40814 12.1848 0.95 11.0891 0.95C10.2691 0.95 9.518 1.22086 8.85802 1.75361C8.54218 2.00852 8.25501 2.31722 8.00001 2.67479C7.74509 2.31721 7.45782 2.00852 7.1421 1.75361L7.14209 1.75361C6.4821 1.22086 5.73101 0.95 4.91101 0.95C3.81522 0.95 2.80722 1.40814 2.07315 2.23912L2.07315 2.23912C1.34801 3.06008 0.95 4.17994 0.95 5.39134C0.95 6.64083 1.39674 7.78266 2.34939 8.98246C3.19971 10.0533 4.42069 11.1393 5.82921 12.392L5.83081 12.3935L5.83118 12.3938L5.83326 12.3957ZM6.43202 11.6699L6.4316 11.6696L6.42946 11.6677C6.42938 11.6676 6.4293 11.6676 6.42922 11.6675C5.04686 10.4379 3.85778 9.38006 3.05907 8.37413C2.23425 7.33541 1.86999 6.41652 1.86999 5.39134C1.86999 4.41677 2.18394 3.5274 2.75094 2.88547C3.30926 2.25352 4.07603 1.90595 4.91101 1.90595C5.52125 1.90595 6.08161 2.10817 6.57759 2.50845C7.02057 2.86603 7.33007 3.31905 7.51193 3.63725L7.51194 3.63726C7.6149 3.81729 7.7973 3.92609 8 3.92609C8.2027 3.92609 8.3851 3.81729 8.48806 3.63726C8.67004 3.31905 8.97954 2.86602 9.42242 2.50844C9.9184 2.10817 10.4787 1.90595 11.0891 1.90595C11.924 1.90595 12.6909 2.25352 13.2491 2.88547C13.8161 3.52739 14.13 4.41677 14.13 5.39134C14.13 6.41652 13.7657 7.33541 12.941 8.37413C12.1424 9.37995 10.9536 10.4375 9.57153 11.6669L9.57087 11.6675C9.57087 11.6675 9.57087 11.6675 9.57086 11.6675C9.09651 12.0892 8.56005 12.5665 7.99889 13.0761C7.44099 12.5674 6.90539 12.091 6.43202 11.6699Z" fill="white" stroke="white" strokeWidth="0.1"></path>
                                </svg>
                            </div>
                        </Link>

                        {/* User cart */}
                        <Link href='/user/cart'>
                            <div className="   rounded-full flex justify-center cursor-pointer  text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.63906 0C4.91051 0 3.48322 1.28895 3.26567 2.95833H2.87365C2.28453 2.95832 1.796 2.9583 1.41259 3.01187C1.00952 3.06819 0.647347 3.19254 0.371908 3.50028C0.0964673 3.80802 0.0128707 4.18172 0.00140834 4.58853C-0.00949549 4.97551 0.0444692 5.46105 0.109544 6.04654L0.291714 7.68605C0.427815 8.91103 0.534705 9.87314 0.716258 10.6209C0.902349 11.3873 1.17912 11.9855 1.69296 12.4454C2.20728 12.9057 2.83532 13.1145 3.62188 13.2147C4.38983 13.3125 5.36498 13.3125 6.60741 13.3125H6.67072C7.9131 13.3125 8.88828 13.3125 9.65621 13.2147C10.4428 13.1145 11.0708 12.9057 11.5852 12.4454C12.099 11.9855 12.3757 11.3873 12.5618 10.6209C12.7434 9.87314 12.8503 8.91109 12.9864 7.6861L13.1686 6.04654C13.2336 5.46106 13.2876 4.97551 13.2767 4.58853C13.2652 4.18172 13.1817 3.80802 12.9062 3.50028C12.6308 3.19254 12.2686 3.06819 11.8655 3.01187C11.4821 2.9583 10.9936 2.95832 10.4044 2.95833H10.0124C9.79501 1.28908 8.36756 0 6.63906 0ZM6.63906 0.8875C7.87641 0.8875 8.90503 1.78121 9.11459 2.95833H4.16346C4.37295 1.78133 5.40171 0.8875 6.63906 0.8875ZM1.03321 4.09217C1.11054 4.00577 1.23326 3.93305 1.5354 3.89083C1.85013 3.84686 2.27613 3.84583 2.90639 3.84583H10.3717C11.002 3.84583 11.428 3.84686 11.7427 3.89083C12.0448 3.93305 12.1675 4.00577 12.2449 4.09217C12.3222 4.17858 12.3809 4.30858 12.3895 4.61353C12.3985 4.93119 12.3525 5.3547 12.2829 5.9811L12.1078 7.55647C11.9674 8.81991 11.866 9.7254 11.6994 10.4115C11.5358 11.0853 11.3218 11.49 10.9933 11.7841C10.6652 12.0778 10.2373 12.246 9.54409 12.3343C8.8387 12.4242 7.92002 12.425 6.63906 12.425C5.35807 12.425 4.43941 12.4242 3.73402 12.3343C3.04073 12.246 2.61294 12.0778 2.28485 11.7841C1.95627 11.49 1.7423 11.0853 1.5787 10.4115C1.41212 9.7254 1.31066 8.81991 1.17027 7.55647L0.995235 5.9811C0.925631 5.3547 0.879606 4.93119 0.888557 4.61353C0.897148 4.30858 0.955871 4.17858 1.03321 4.09217Z" fill="white"></path>
                                    <path d="M10.1893 5.76874C10.1893 6.09552 9.92437 6.36041 9.59765 6.36041C9.27087 6.36041 9.00598 6.09552 9.00598 5.76874C9.00598 5.44198 9.27087 5.17708 9.59765 5.17708C9.92437 5.17708 10.1893 5.44198 10.1893 5.76874Z" fill="white"></path>
                                    <path d="M4.27208 5.76874C4.27208 6.09552 4.00718 6.36041 3.68041 6.36041C3.35365 6.36041 3.08875 6.09552 3.08875 5.76874C3.08875 5.44198 3.35365 5.17708 3.68041 5.17708C4.00718 5.17708 4.27208 5.44198 4.27208 5.76874Z" fill="white"></path>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </nav>
            )}
        </>
    );
}

interface FlyoutContentData {
    [key: string]: string;
}

const FlyoutLink = ({ children, href, FlyoutContent }: {
    children: any,
    href: any,
    FlyoutContent: any,
}) => {
    const [open, setOpen] = useState(false);
    const showFlyout = open;
    const [categoryHover, setCategoryHover] = useState(false);

    return (
        <div
            onMouseEnter={() => {
                setOpen(true);
            }}
            onMouseLeave={() => {
                setOpen(false);
            }}
            className="relative h-fit w-fit">
            <a className="relative text-white" href={href} onMouseEnter={() => setCategoryHover(true)} onMouseLeave={() => setCategoryHover(false)}>{children}
                <span
                    style={{
                        transform: categoryHover ? "scaleX(1)" : "scaleX(0)",
                    }}
                    className="absolute -bottom-2 -left-2 -right-2 h-[0.05rem] origin-left rounded-full bg-indigo-300 transition-transform duration-300 ease-out">
                </span>
            </a>
            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        style={{ x: "-50%" }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute left-1/2 top-12 b-white text-black ">
                        <div className="absolute -top-6 left-0 right-0 h-6 "></div>
                        <FlyoutContent />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
interface Category {
    [key: string]: string;
}

const CategoryContent = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const categoryObj = {
        "apple": "https://www.apple.com",
        "samsung": "https://www.samsung.com",
        "boat": "https://www.boat-lifestyle.com",
        "acer": "https://www.acer.com",
        "charger": "#",
    };

    return (
        <div className="w-40 bg-black p-6 shadow-2xl -left-11 absolute">
            <div className="space-y-2 text-white">
                {Object.entries(categoryObj).map(([key, url], index) => (
                    <motion.div
                        key={index}
                        className="relative"
                        whileHover={{ scale: 1.1 }} // Grows the item on hover
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                    >
                        <motion.a
                            href={url}
                            className="block w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }} // Fade-in effect
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </motion.a>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{
                                scaleX: hoveredIndex === index ? 1 : 0,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="absolute -bottom-1 -left-2 -right-2 h-[0.05rem] origin-right rounded-full bg-indigo-300"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};


const HomeContent = () => {
    return (
        <div className="w-[70vw] h-full bg-black text-white flex  p-6 mx-auto space-x-6">
            {/* Welcome Section */}
            <div className="w-1/4 space-y-4 flex flex-col items-start text-lg">
                <h2 className="text-2xl font-bold">Welcome to Our Website</h2>
                <p className="leading-relaxed">
                    Explore the latest features and offerings from our services. Navigate through the menu to discover more.
                </p>
                <div className="space-y-2">
                    <a href="#menu1" className="hover:underline">Menu 1</a>
                    <a href="#menu2" className="hover:underline">Menu 2</a>
                    <a href="#menu3" className="hover:underline">Menu 3</a>
                </div>
            </div>

            {/* Categories Section */}
            <div className="w-1/4 text-center p-4">
                <h3 className="text-xl font-semibold mb-2">Category Page</h3>
                <ul className="space-y-2">
                    <li><a href="#airpods" className="hover:underline">AirPods</a></li>
                    <li><a href="#headphones" className="hover:underline">Headphones</a></li>
                    <li><a href="#laptops" className="hover:underline">Laptops</a></li>
                    <li><a href="#mobiles" className="hover:underline">Mobiles</a></li>
                    <li><a href="#smartwatches" className="hover:underline">Smart Watches</a></li>
                    <li><a href="#speaker" className="hover:underline">Speaker</a></li>
                </ul>
            </div>

            {/* Product Features Section */}
            <div className="w-1/4 text-center p-4">
                <h3 className="text-xl font-semibold mb-2">Feature Product</h3>
                <ul className="space-y-2">
                    <li><a href="#product-video" className="hover:underline">Product Video</a></li>
                    <li><a href="#simple-product" className="hover:underline">Simple Product</a></li>
                    <li><a href="#countdown-timer" className="hover:underline">Product Countdown Timer</a></li>
                    <li><a href="#color-swatch" className="hover:underline">Product Color Swatch</a></li>
                </ul>
            </div>

            {/* Image Sections */}
            <div className="w-1/4 text-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Feature 1"
                    className="rounded-lg shadow-md hover:scale-105 transform transition duration-300"
                />
                <p className="mt-2 text-sm">Feature 1</p>
            </div>

            <div className="w-1/4 text-center">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Feature 2"
                    className="rounded-lg shadow-md hover:scale-105 transform transition duration-300"
                />
                <p className="mt-2 text-sm">Feature 2</p>
            </div>
        </div>
    );
}


const PageContent = () => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const pagesObj = {
        "Home": "/",
        "About Us": "/about",
        "Services": "/services",
        "Products": "/products",
        "Contact Us": "/contact",
        "Careers": "/careers",
        "FAQ": "/faq",
        "Support": "/support",
        "Terms of Service": "/terms-of-service",
        "Privacy Policy": "/privacy-policy"
    };

    return (
        <div className="w-48 bg-black p-6 shadow-2xl -left-8 absolute">
            <div className="space-y-2 text-white" >
                {Object.entries(pagesObj).map(([key, url], index) => (
                    <motion.div key={index}
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.a
                            href={url}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }}
                            className="block w-full"
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </motion.a>
                        <span
                            style={{
                                transform: hoveredIndex === index ? "scaleX(1)" : "scaleX(0)",
                            }}
                            className="absolute -bottom-1 -left-2 -right-2 h-[0.05rem] origin-right rounded-full bg-indigo-300 transition-transform duration-300 ease-out">
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const UserContent = () => {
    const router =useRouter();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const pagesObj = {
        'Profile': '/',
        'Logout': '/Login',
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        toast('Logging Out', { icon: '👏' });
        setTimeout(() => {
            router.push('/Login');
        }, 1500);
    }

    return (
        <div className="w-28 bg-black p-6 shadow-2xl absolute -right-5">
            <div className="space-y-2 text-white">
                {Object.entries(pagesObj).map(([key, url], index) => (
                    <motion.div
                        key={index}
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        <motion.a
                            href={url}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }}
                            className="block w-full"
                            onClick={() => {
                                if (key === 'Logout') logout();
                            }}
                        >
                            {key}
                        </motion.a>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-indigo-300 origin-left"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
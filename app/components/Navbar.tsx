'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import { useRouter, usePathname } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

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
                <nav className="flex items-center bg-white px-8 sm:px-16 py-4 shadow-md">
                    <Toaster />
                    <Link href='/'>
                        <div className="font-black text-2xl text-black-600">Square</div>
                    </Link>

                    <div
                        className="relative ml-auto"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button
                            className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200"
                        >
                            <i className="ri-user-line"></i> Profile
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <ul className="py-2">
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                    {userRole === 'admin' && (
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => router.push('/admin')}
                                        >
                                            Admin Panel
                                        </li>
                                    )}
                                    
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={logout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <Link href='/user/cart'>
                        <div className="ml-6 border p-2 h-full w-10 rounded-full flex justify-center cursor-pointer hover:bg-black hover:text-white hover:border-none transition duration-200">
                            <i className="ri-shopping-cart-line"></i>
                        </div>
                    </Link>
                </nav>
            )}
        </>
    );
}

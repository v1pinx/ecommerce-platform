import { useEffect, useState } from "react"
import axios from "axios";
import 'remixicon/fonts/remixicon.css';
import { useRouter } from "next/navigation";
import toast, {Toaster } from 'react-hot-toast';

export default function Navbar() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleMouseEnter = () => {
        if(timeoutId) clearTimeout(timeoutId);
        setDropdownOpen(true);
    }

    const handleMouseLeave = () => {
        const id : any = setTimeout(() => setDropdownOpen(false), 200);
        setTimeoutId(id);
    }

    function redirectToLogin(){
        router.push('/Login')
    }
    function logout(){
        localStorage.removeItem('token');
        toast('Logging Out',{
            icon: '👏',
        });
        setTimeout(() => {
            router.push('/Login');
        }, 1500)
    }
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get('https://fakestoreapi.com/products/categories');
    //             setCategories(response.data);
    //         } catch (error) {
    //             console.error("Error fetching categories:", error);
    //         }
    //     };

    //     fetchCategories();
    // },[]);

    return (
        <nav className="flex items-center bg-white px-8  sm:px-16 py-4 ">
            <Toaster />
            <div className="font-black text-2xl text-black-600 sm:mr-12">
                Square
            </div>

            <div className="flex-grow mx-4">
                <input
                    type="text"
                    className=" bg-gray-100 h-12 w-full rounded-md px-4 focus:outline-none focus:border-teal-500"
                    placeholder="Search for products, brands and more"
                />
            </div>

            <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                >
                <button
                    className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200"
                    onClick={logout}
                    >
                    <i className="ri-user-line"></i> Profile
                </button>
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="ml-6 border p-2 h-full w-10 rounded-full flex justify-center cursor-pointer hover:bg-black hover:text-white hover:border-none transition duration-200">
                <i className="ri-shopping-cart-line"></i>
            </div>
        </nav>

    )
} 
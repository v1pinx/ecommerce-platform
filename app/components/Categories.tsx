'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [brandDropdown, setBrandDropdown] = useState(false);
    const [classDropdown, setClassDropdown] = useState(false);
    const [screenSizeDropdown, setScreenSizeDropdown] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('api/products/category');
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    },[]);

    const handleMouseEnter = (x: any) => {
        if (timeoutId) clearTimeout(timeoutId);
        x(true);
    }

    const handleMouseLeave = (x: any) => {
        const id: any = setTimeout(() => x(false), 200);
        setTimeoutId(id);
    }
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function redirectToCategoryList(c : any) {
        router.push(`?category=${c}`);
        setTimeout(() => {
            window.location.reload();
        },100);
    }

   
    return (
        <div className=" px-8  sm:px-16  py-2 border-t border-b border-teal-500">
            <div className="max-w-4xl flex justify-between items-center m-auto">
                <div> Browse products</div>
                
                <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(setClassDropdown)}
                    onMouseLeave={() => handleMouseLeave(setClassDropdown)}
                >

                    <div className="cursor-pointer">Categories</div>
                    {classDropdown && (
                        <div className="absolute -left-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <ul className="">
                                {categories.map((c: string) => (
                                    <li key={c} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm" onClick={() => redirectToCategoryList(c)}>{capitalizeFirstLetter(c)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <div>Sort By</div>
                    <div><ul></ul></div>
                </div>
            </div>
        </div>
    )
}
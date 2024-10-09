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
                const response = await axios.get('https://fakestoreapi.in/api/products/category');
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    })

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

    function redirectToCategoryList() {
        router.push('/categories')
    }
    const laptopBrandData = [
        'HP',
        'Lenovo',
        'Dell',
        'Apple',
        'Asus',
        'Acer',
        'Samsung',
        'Other brands',
    ];


    const laptopScreenSizeData = [
        '10" - 13.9',
        '14" - 16.9"',
        '17" - 21"',
    ]
    return (
        <div className=" px-8  sm:px-16  py-2 border-t border-b border-teal-500">
            <div className="max-w-4xl flex justify-between items-center m-auto">
                <div> Browse laptops</div>
                <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(setBrandDropdown)}
                    onMouseLeave={() => handleMouseLeave(setBrandDropdown)}
                >

                    <div className="cursor-pointer">Brands</div>
                    {brandDropdown && (
                        <div className="absolute -left-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <ul className="">
                                {laptopBrandData.map((brand: string) => (
                                    <li key={brand} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm">{capitalizeFirstLetter(brand)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
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
                                    <li key={c} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm" onClick={redirectToCategoryList}>{capitalizeFirstLetter(c)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(setScreenSizeDropdown)}
                    onMouseLeave={() => handleMouseLeave(setScreenSizeDropdown)}
                >

                    <div className="cursor-pointer">Screen size</div>
                    {screenSizeDropdown && (
                        <div className="absolute -left-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <ul className="">
                                {laptopScreenSizeData.map((c: string) => (
                                    <li key={c} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm">{c}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
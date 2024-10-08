import { useState } from "react";

export default function Categories() {
    const [brandDropdown, setBrandDropdown] = useState(false);
    const [classDropdown, setClassDropdown] = useState(false);
    const [screenSizeDropdown, setScreenSizeDropdown] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = (x : any) => {
        if (timeoutId) clearTimeout(timeoutId);
        x(true);
    }

    const handleMouseLeave = (x : any) => {
        const id: any = setTimeout(() => x(false), 200);
        setTimeoutId(id);
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

    const laptopClassData = [
        'Budget',
        'Mainstream',
        'Ultraportable',
        'Business',
        'Gaming',
        'CAD/3D modeling',
    ]

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
                                    <li key={brand} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm">{brand}</li>
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

                    <div className="cursor-pointer">Class</div>
                    {classDropdown && (
                        <div className="absolute -left-20 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            <ul className="">
                                {laptopClassData.map((c: string) => (
                                    <li key={c} className="px-4 py-2 hover:bg-teal-600 hover:text-white hover:font-bold cursor-pointer rounded-sm">{c}</li>
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
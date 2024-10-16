import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Filter() {
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    // const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortBy, setSortBy] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleCategoryChange = (e : any) => {
        setCategory(e.target.value);
    };

    // const handlePriceChange = (e) => {
    //     const { value, name } = e.target;
    //     setPriceRange((prev) => {
    //         const newRange = [...prev];
    //         if (name === "min") {
    //             newRange[0] = Number(value);
    //         } else {
    //             newRange[1] = Number(value);
    //         }
    //         return newRange;
    //     });
    // };

    const handleSortChange = (e : any) => {
        setSortBy(e.target.value);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('api/products/category');
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="border-2 border-gray-300 rounded-lg p-4 shadow-lg max-w-xs mx-auto">
            <h2 className="text-lg font-bold mb-4">Filter</h2>
            
            {loading ? ( // Show loading state
                <div>Loading categories...</div>
            ) : (
                <>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select 
                            value={category} 
                            onChange={handleCategoryChange} 
                            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Price Range</label>
                        <div className="flex items-center space-x-2">
                            <input 
                                type="number" 
                                name="min" 
                                value={priceRange[0]} 
                                onChange={handlePriceChange} 
                                className="border border-gray-300 rounded-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                placeholder="Min"
                            />
                            <input 
                                type="number" 
                                name="max" 
                                value={priceRange[1]} 
                                onChange={handlePriceChange} 
                                className="border border-gray-300 rounded-md p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500" 
                                placeholder="Max"
                            />
                        </div>
                    </div> */}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Sort By</label>
                        <select 
                            value={sortBy} 
                            onChange={handleSortChange} 
                            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Select</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                            <option value="rating" disabled>Rating</option>
                        </select>
                    </div>

                    <button 
                        className="w-full bg-teal-600 text-white font-bold py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        onClick={() => {
                            router.push(`?category=${category}&sort=${sortBy}`);
                            setTimeout(() => {
                                window.location.reload();
                            },500)
                        }}
                    >
                        Apply Filters
                    </button>
                </>
            )}
        </div>
    );
}

import { useEffect, useState } from "react"
import axios from "axios";

export default function Navbar() {
    const [categories, setCategories] = useState([]);

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
        <nav>
            <div>
                Square
            </div>

            <ul>
                <li>Categories</li>
            </ul>

            <button>Login</button>
        </nav>
    )
} 
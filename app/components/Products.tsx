import React, { useEffect, useState } from "react";
import axios from "axios";



const Products = () => {
    const [products, setProducts] = useState<{ id: number; title: string; image: string; price: number; }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (err : any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product">
                        <h2>{product.title}</h2>
                        <img src={product.image} alt={product.title} style={{ width: '100px' }} />
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

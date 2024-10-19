import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    popular: boolean;
    discount: number;
}

interface NewProduct {
    title: string;
    image: string;
    price: string;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    popular: boolean;
    discount: number;
}

const ProductsPanel: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState<NewProduct>({
        title: '',
        image: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        color: '',
        category: '',
        popular: false,
        discount: 0,
    });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        const response = await axios.get(`/api/products?page=${currentPage}&limit=${productsPerPage}`);
        setProducts(response.data);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('/api/products', newProduct);
        fetchProducts();
        setShowModal(false);
        resetForm();
    };

    const resetForm = () => {
        setNewProduct({
            title: '',
            image: '',
            price: '',
            description: '',
            brand: '',
            model: '',
            color: '',
            category: '',
            popular: false,
            discount: 0,
        });
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/products/${id}`);
        fetchProducts();
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1) {
            setCurrentPage(newPage);
        }
    };

    // Filtered products based on search term
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Product Management</h1>

            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => setShowModal(true)}
                >
                    Add Product
                </button>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 px-3 py-2 w-1/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
                />
            </div>

            {/* Modal for Adding Product */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                        <form onSubmit={handleSubmit}>
                            {Object.keys(newProduct).map((key) => (
                                <div key={key} className="mb-4">
                                    <label className="block mb-1 text-gray-600">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <input
                                        type={["price", "discount"].includes(key) ? 'number' : key === "popular" ? 'checkbox' : 'text'}
                                        name={key}
                                        value={key === "popular" ? undefined : (newProduct as any)[key]}
                                        checked={key === "popular" ? (newProduct as any)[key] : undefined}
                                        onChange={handleChange}
                                        className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-150"
                                        required={!["description", "brand", "model", "color", "category"].includes(key)}
                                    />
                                </div>
                            ))}
                            <div className="flex justify-between">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                                    type="submit"
                                >
                                    Add Product
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Product List</h2>
            <div className="overflow-y-auto max-h-96 border border-gray-300 rounded-lg shadow-md">
                <table className="min-w-full border-collapse border border-gray-200 bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-500">ID</th>
                            <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-500">Title</th>
                            <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-500">Price</th>
                            <th className="border border-gray-300 p-3 text-left text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-100 transition duration-200">
                                    <td className="border border-gray-300 p-3 text-sm">{product.id}</td>
                                    <td className="border border-gray-300 p-3 text-sm">{product.title}</td>
                                    <td className="border border-gray-300 p-3 text-sm">${product.price}</td>
                                    <td className="border border-gray-300 p-3 text-sm">
                                        <button
                                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition duration-200"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="border border-gray-300 p-3 text-sm text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition duration-200"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage}
                </span>
                <button
                    className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400 transition duration-200"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={filteredProducts.length < productsPerPage} // Disable Next button if less than productsPerPage
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPanel;

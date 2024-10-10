'use client'
import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
    id: number;
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

interface CartDetail{
    productId: number;
    quantity: number;
}


export default function Cart() {
    const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const deliveryCharges = 0;
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    const totalDiscount = cartItems.reduce((total, item) => total + item.discount, 0);
    const fetchedProductIds = new Set<string>();


    useEffect(() => {
        const userId = localStorage.getItem("id"); 
        const fetchCartDetails = async () => {
            const response = await axios.get(`/api/get-cart?userId=${userId}`);

            if (response.status === 200) {
                setCartDetails(response.data.cart);
                console.log("Cart details fetched successfully");
            }
            else{
                console.log("Error fetching cart details"); 
            }

        }
        fetchCartDetails();
    },[])

    useEffect(() => {
        const fetchCartItems = async (productId: any) => {
            try {
                const response = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
                
                if (!fetchedProductIds.has(productId)) {
                    fetchedProductIds.add(productId); // Mark this product as fetched
                    setCartItems((prevItems) => {
                        return [...prevItems, response.data.product];
                    });
                }
            } catch (error) {
                console.error(`Error fetching product ${productId}:`, error);
            }
        };
    
        if (cartDetails.length > 0) {  
            cartDetails.forEach((item: any) => {
                fetchCartItems(item.productId);
                console.log("Fetching of ", item.productId);
            });
        }
        
    }, [cartDetails]);
  
    

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-lg">Your cart is empty!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Cart Products (Wider Column) */}
                    <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-start mb-6 border-b pb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-32 h-32 object-cover rounded-md border border-gray-200"
                                />
                                <div className="ml-4 flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                    <p className="text-gray-600">{item.model}</p>
                                    <div className="flex items-center mt-2">
                                        <p className="text-xl font-bold text-teal-600">
                                            ₹{item.price - item.discount}
                                        </p>
                                        <span className="line-through text-gray-500 ml-2">₹{item.price}</span>
                                    </div>
                                    <p className="text-green-600">− ₹{item.discount} ({((item.discount / item.price) * 100).toFixed(0)}% Off)</p>
                                    <p className="text-gray-500">Delivery by Mon Oct 14 | ₹{deliveryCharges} Free</p>
                                    <button
                                        className="mt-2 text-red-500 hover:text-red-700 font-semibold"
                                        // onClick={() => handleDelete(item.id)} // Uncomment and implement delete logic
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Price Details (Narrower Column) */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Price ({cartItems.length} item)</span>
                            <span className="font-bold text-gray-800">₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Discount</span>
                            <span className="text-red-500">− ₹{totalDiscount}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-700">Delivery Charges</span>
                            <span className="text-gray-500">₹{deliveryCharges} Free</span>
                        </div>
                        <div className="border-t pt-2 mb-4">
                            <div className="flex justify-between font-bold text-gray-800">
                                <span>Total Amount</span>
                                <span>₹{totalAmount - totalDiscount}</span>
                            </div>
                            <p className="text-green-600 mt-2">You will save ₹{totalDiscount} on this order</p>
                        </div>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Add coupon code"
                                className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button className="mt-2 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200">
                                Apply Coupon
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

interface CartDetail {
    productId: number;
    quantity: number;
}

export default function Cart() {
    const [cartDetails, setCartDetails] = useState<CartDetail[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const fetchedProductIds = new Set<string>();

    const deliveryCharges = 0;
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState<number>(0);
    const [error, setError] = useState<string>("");

    const validCoupons: Record<string, number> = {
        "SAVE50": 50, // 50% discount coupon
        "SAVE99": 99,  // 99% discount coupon
        "SQUARE": 99.99
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const cartDetail = cartDetails.find(detail => detail.productId === item.id);
        const quantity = cartDetail ? cartDetail.quantity : 1;
        return total + (item.price * quantity);
    }, 0);

    const cartDiscount = cartItems.reduce((total, item) => {
        const cartDetail = cartDetails.find(detail => detail.productId === item.id);
        const quantity = cartDetail ? cartDetail.quantity : 1;
        return total + ((item.discount || 0) * quantity);
    }, 0);

    const totalDiscount = Math.max(cartDiscount, discount);

    const handleApplyCoupon = () => {
        if (validCoupons[coupon]) {
            setDiscount((totalAmount * validCoupons[coupon]) / 100); // Calculate discount from coupon
            setError("");
            toast.success("Coupon applied successfully!");
        } else {
            setDiscount(0);
            setError("Invalid coupon code.");
            toast.error("Invalid coupon code.");
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("id");
        const fetchCartDetails = async () => {
            try {
                const response = await axios.get(`/api/get-cart?userId=${userId}`);
                if (response.status === 200) {
                    setCartDetails(response.data.cart);
                    console.log("Cart details fetched successfully");
                } else {
                    console.log("Error fetching cart details");
                }
            } catch (error) {
                console.error("Error fetching cart details:", error);
            }
        };
        fetchCartDetails();
    }, []);

    useEffect(() => {
        const fetchCartItems = async (productId: number) => {
            try {
                const response = await axios.get(`https://fakestoreapi.in/api/products/${productId}`);
                if (!fetchedProductIds.has(String(productId))) {
                    fetchedProductIds.add(String(productId));
                    setCartItems((prevItems) => [...prevItems, response.data.product]);
                }
            } catch (error) {
                console.error(`Error fetching product ${productId}:`, error);
            }
        };

        if (cartDetails.length > 0) {
            cartDetails.forEach((item) => {
                fetchCartItems(item.productId);
            });
        }
    }, [cartDetails]);

    const deleteFromCart = async (productId: string) => {
        const userId = localStorage.getItem("id"); // Assuming userId is stored in localStorage
    
        if (!userId) {
            console.error("User is not logged in.");
            return;
        }
    
        try {
            const response = await axios.delete("/api/delete-from-cart", {
                data: {
                    productId,
                    userId
                }
            });
    
            if (response.status === 200) {
                // Remove the item from cartItems after successful deletion
                setCartItems(prevItems => prevItems.filter(item => String(item.id) !== productId));
                toast.success("Item removed successfully");
                console.log("Product successfully removed from the cart.");
            } else {
                console.error("Error removing product from the cart:", response.data.message);
            }
        } catch (error) {
            console.error("An error occurred while trying to remove the product from the cart:", error);
        }
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        setCartDetails(prevDetails =>
            prevDetails.map(detail =>
                detail.productId === productId
                    ? { ...detail, quantity: newQuantity }
                    : detail
            )
        );
    };

    const handlePayment = () => {
        // Placeholder function for handling payment
        toast.success("Payment successful!");
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <Toaster /> {/* Toaster for notifications */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-lg">Your cart is empty!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column - Cart Products (Wider Column) */}
                    <div className="md:col-span-2 bg-white shadow-lg rounded-lg p-6">
                        {cartItems.map((item) => {
                            const cartDetail = cartDetails.find(detail => detail.productId === item.id);
                            const quantity = cartDetail ? cartDetail.quantity : 1;

                            return (
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
                                                ₹{(item.price - (item.discount || 0)) * quantity}
                                            </p>
                                            <span className="line-through text-gray-500 ml-2">
                                                ₹{item.price * quantity}
                                            </span>
                                        </div>
                                        <p className="text-green-600">− ₹{(item.discount || 0) * quantity} ({(((item.discount || 0) / item.price) * 100).toFixed(0)}% Off)</p>
                                        <p className="text-gray-500">Delivery by Mon Oct 14 | ₹{deliveryCharges} Free</p>
                                        
                                        {/* Quantity Selector */}
                                        <div className="mt-2">
                                            <label htmlFor={`quantity-${item.id}`} className="text-gray-700">
                                                Quantity:
                                            </label>
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                className="border rounded-md w-16 ml-2 text-center"
                                                min={1}
                                                value={quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            />
                                        </div>

                                        <button 
                                            className="mt-2 text-red-500 hover:text-red-700 font-semibold" 
                                            onClick={() => deleteFromCart(String(item.id))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Pay Button */}
                        <div className="flex justify-between items-center mt-6">
                            <h2 className="text-2xl font-bold">Total: ₹{(totalAmount - totalDiscount).toFixed(2)}</h2>
                            <button 
                                className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700 transition duration-200"
                                onClick={handlePayment}
                            >
                                Pay Now
                            </button>
                        </div>
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
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-700">Delivery Charges</span>
                            <span className="text-green-600">₹{deliveryCharges}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-2">
                            <span className="font-bold text-gray-800">Total Amount</span>
                            <span className="font-bold text-gray-800">₹{(totalAmount - totalDiscount).toFixed(2)}</span>
                        </div>
                        
                        {/* Coupon Input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                className="border rounded-md w-full px-3 py-2"
                                placeholder="Enter coupon code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <button 
                                className="bg-teal-600 text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-teal-700 transition duration-200"
                                onClick={handleApplyCoupon}
                            >
                                Apply Coupon
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

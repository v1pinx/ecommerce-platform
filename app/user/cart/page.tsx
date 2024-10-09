'use client'
import { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Panasonic 20 L Solo Microwave Oven",
      model: "NN-ST26JMFDG, Silver",
      seller: "OmniTechRetail",
      price: 7490,
      discountedPrice: 5790,
      discount: 1700,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Samsung 32 L Convection Microwave Oven",
      model: "MC32K7056CW, White",
      seller: "Samsung Store",
      price: 14990,
      discountedPrice: 9990,
      discount: 5000,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    },
    // Add more items as needed
  ]);

  const totalAmount = cartItems.reduce((total, item) => total + item.discountedPrice, 0);
  const totalDiscount = cartItems.reduce((total, item) => total + item.discount, 0);
  const deliveryCharges = 40; // Example delivery charge

  const handleDelete = (id : any) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

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
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-md border border-gray-200"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">{item.model}</p>
                  <p className="text-gray-600">Seller: {item.seller}</p>
                  <div className="flex items-center mt-2">
                    <p className="text-xl font-bold text-teal-600">
                      ₹{item.discountedPrice}
                    </p>
                    <span className="line-through text-gray-500 ml-2">₹{item.price}</span>
                  </div>
                  <p className="text-green-600">− ₹{item.discount} ({((item.discount / item.price) * 100).toFixed(0)}% Off)</p>
                  <p className="text-gray-500">Delivery by Mon Oct 14 | ₹{deliveryCharges} Free</p>
                  <button
                    className="mt-2 text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleDelete(item.id)}
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
              <span className="font-bold text-gray-800">₹{totalAmount + totalDiscount + deliveryCharges}</span>
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
                <span>₹{totalAmount}</span>
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

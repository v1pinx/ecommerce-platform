'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProduct = async (id: any) => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        const product = response.data;
        setProduct(product);
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error('Error fetching product details');
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct(id);
  }, [id]);

  async function addToCart() {
    try {
      const userId = localStorage.getItem('id');
      if (!userId) {
        toast.error('Please login to add to cart');
        return;
      }
      const response = await axios.post('/api/add-to-cart', {
        userId,
        productId: id
      });
      toast.success('Product added to cart');
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error('Error adding to cart');
    }
  }

  if (loading) return <div className="flex items-center justify-center h-screen"><span className="loader"></span></div>; 

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center bg-gray-50 p-6 md:flex-row md:gap-10">
        {/* Product Image */}
        <div className="flex justify-center w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="object-cover rounded-lg shadow-lg max-w-xs md:max-w-md transition-transform transform hover:scale-105 hover:shadow-2xl hover:opacity-90 duration-300"
            
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="mb-4">
            <span className="text-2xl font-semibold text-gray-800">${product.price.toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-red-500 text-lg ml-2">
                {product.discount}% off
              </span>
            )}
          </div>

          <div className="text-gray-600 space-y-2 mb-6">
            <div><strong>Category:</strong> {product.category}</div>
            <div><strong>Brand:</strong> {product.brand}</div>
            <div><strong>Model:</strong> {product.model}</div>
            <div><strong>Color:</strong> {product.color}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-200"
              onClick={addToCart}
            >
              ADD TO CART
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

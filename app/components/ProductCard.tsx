import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, ExternalLink } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color: string;
  category: string;
  discount: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className="group relative w-full max-w-sm bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
      {/* Discount Tag */}
      {product.discount > 0 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
            -{product.discount}% OFF
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/20 to-transparent" />
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Quick Action Buttons */}
        <div className="absolute bottom-4 left-0 right-0 px-4 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-center space-x-2">
            <Link href={`/products/${product.id}`} className="w-full">
              <button className="w-full bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-white transition-colors duration-200 flex items-center justify-center">
                <Eye className="w-4 h-4 mr-2" />
                Quick View
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="text-gray-600">
            <span className="font-medium text-gray-800">Brand:</span> {product.brand}
          </div>
          {/* <div className="text-gray-600">
            <span className="font-medium text-gray-800">Model:</span> {product.model}
          </div> */}
          {/* <div className="text-gray-600">
            <span className="font-medium text-gray-800">Color:</span> {product.color}
          </div> */}
          {/* <div className="text-gray-600">
            <span className="font-medium text-gray-800">Category:</span> {product.category}
          </div> */}
        </div>

        {/* Price Section */}
        <div className="flex items-baseline mb-4">
          <span className="text-2xl font-bold text-indigo-600">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/products/${product.id}`} className="flex-1">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200">
              View Details
            </button>
          </Link>
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
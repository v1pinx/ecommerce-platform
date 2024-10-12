import Link from 'next/link';

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
    <div className="max-w-xs rounded-lg overflow-hidden shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        className="w-full h-48 object-contain transition duration-300 ease-in-out hover:scale-110"
        src={product.image}
        alt={product.title}
      />
      <div className="px-4 py-4 bg-white">
        <h2 className="font-semibold text-lg text-gray-800 truncate">{product.title}</h2>
        <p className="text-xs text-gray-500 mt-1 truncate">{product.description.slice(0, 100)}...</p>
        
        <div className="mt-3 text-gray-700 text-sm">
          <p className="mb-1"><span className="font-semibold">Brand:</span> {product.brand}</p>
          <p className="mb-1"><span className="font-semibold">Model:</span> {product.model}</p>
          <p className="mb-1"><span className="font-semibold">Color:</span> {product.color}</p>
          <p className="mb-1"><span className="font-semibold">Category:</span> {product.category}</p>
        </div>

        <div className="mt-3">
          <span className="text-xl font-bold text-green-600">${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="ml-2 line-through text-gray-400">${product.price.toFixed(2)}</span>
          )}
          <span className="ml-2 text-sm text-red-500">Save {product.discount}%</span>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link href={`/products/${product.id}`}>
            <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200">
              <i className="ri-eye-line"></i> View Details
            </button>
          </Link>
          <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition duration-200">
            <i className="ri-amazon-line"></i> Amazon
          </button>
        </div>
      </div>
    </div>
  );
}

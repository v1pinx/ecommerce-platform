'use client';
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import toast, { Toaster } from 'react-hot-toast';

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

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
  const searchParams = useSearchParams();

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const url = `/api/products?page=${page}&limit=${productsPerPage}&type=${category}&sort=${sortBy}`;
      const response = await axios.get(url);
      const fetchedProducts = response.data;

      if (fetchedProducts.length === 0 && currentPage > 1) {
        toast.error('No more products available.');
      }

      setProducts(fetchedProducts);
      if (!category) {
        toast.success(`Products loaded Successfully`);
      }
    } catch (error) {
      console.error('Error fetching data', error);
      toast.error('Failed to load products!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, category, sortBy, productsPerPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/products/category');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleNextPage = () => {
    if (products.length === productsPerPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleProductsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="p-6 mt-8">
      <div className='font-bold text-5xl text-center mb-12'>Product Gallery</div>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <div className="w-64">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {capitalizeFirstLetter(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className="w-64">
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        <div className="w-64">
          <label className="block text-sm font-medium mb-1">Products Per Page</label>
          <select
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="w-64">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>

        <span>Page {currentPage}</span>

        <button
          onClick={handleNextPage}
          disabled={products.length < productsPerPage}
          className="px-3 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Export the component wrapped in a Suspense boundary
export default function ProductShowcaseWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductShowcase />
    </Suspense>
  );
}

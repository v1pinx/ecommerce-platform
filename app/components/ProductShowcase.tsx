import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import toast, { Toaster } from "react-hot-toast";

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

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const totalPages = 8;
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.in/api/products?page=${page}&limit=${productsPerPage}`
        );
        const fetchedProducts = response.data.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          description: product.description,
          brand: product.brand,
          model: product.model,
          color: product.color,
          category: product.category,
          discount: product.discount || 0,
        }));

        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };


    fetchProducts(currentPage);

  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-4">Product Showcase</h1>
      {/* <div className="w-96 mx-4 invisible sm:visible">

        <input
          type="text"
          className="bg-gray-100 h-12  rounded-l-md px-4 focus:outline-none focus:border-teal-500"
          placeholder="Search for products, brands, and more"
          value={searchQuery}
          onChange={handleSearch} // Update search query on change
        />

      </div> */}
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

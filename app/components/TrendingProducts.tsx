export default function TrendingProducts() {
    const products = [
        {
            id: 1,
            name: 'Apple MacBook Pro',
            price: '$1999',
            image: 'https://via.placeholder.com/300', // Replace with actual product image URLs
        },
        {
            id: 2,
            name: 'Sony WH-1000XM5 Headphones',
            price: '$399',
            image: 'https://via.placeholder.com/300',
        },
        {
            id: 3,
            name: 'Samsung Galaxy S23 Ultra',
            price: '$1199',
            image: 'https://via.placeholder.com/300',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-white text-5xl font-bold mb-8">Trending Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

const ProductCard = ({ product }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
            />
            <div className="text-black absolute bottom-0 mx-auto max-w-full    z-10 ">Add to cart</div>
            </div>
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <p className="text-gray-400 mt-2">{product.price}</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Add to Cart
            </button>
        </div>
    );
};

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const product = await axios.get('/api/products?limit=infinity');
            // const user = await axios.get('/api/user');
            setTotalProducts(product.data.length);
            // setTotalUsers(user.data.length);
        };
        fetchData();
    }, []);

    return (
        <main className="flex-1 bg-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stats Cards */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Total Products</div>
                    <div className="mt-2 text-3xl font-semibold">{totalProducts}</div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Total Users</div>
                    <div className="mt-2 text-3xl font-semibold">{totalUsers}</div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Orders</div>
                    <div className="mt-2 text-3xl font-semibold">78</div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Revenue</div>
                    <div className="mt-2 text-3xl font-semibold">$12,345</div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-700">Recent Orders</h2>
                <table className="min-w-full mt-4 table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Order ID</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Total</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 text-sm">#0001</td>
                            <td className="px-4 py-2 text-sm">John Doe</td>
                            <td className="px-4 py-2 text-sm">$123.45</td>
                            <td className="px-4 py-2 text-sm">Shipped</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 text-sm">#0002</td>
                            <td className="px-4 py-2 text-sm">Jane Smith</td>
                            <td className="px-4 py-2 text-sm">$234.56</td>
                            <td className="px-4 py-2 text-sm">Pending</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 text-sm">#0003</td>
                            <td className="px-4 py-2 text-sm">Chris Lee</td>
                            <td className="px-4 py-2 text-sm">$345.67</td>
                            <td className="px-4 py-2 text-sm">Delivered</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

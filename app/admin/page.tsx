'use client'
import { useState } from 'react';
import 'remixicon/fonts/remixicon.css';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition duration-200 ease-in-out md:relative md:translate-x-0`}>
                <h1 className="text-2xl font-semibold text-center text-white">Admin Panel</h1>
                <nav className="mt-10">
                    <a href="#" className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
                        <i className="ri-bar-chart-line h-5 w-5"></i> {/* Replaced with Remix Icon */}
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
                        <i className="ri-file-list-line h-5 w-5"></i> {/* Replaced with Remix Icon */}
                        <span>Products</span>
                    </a>
                    <a href="#" className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
                        <i className="ri-user-line h-5 w-5"></i> {/* Replaced with Remix Icon */}
                        <span>Users</span>
                    </a>
                    <a href="#" className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
                        <i className="ri-settings-3-line h-5 w-5"></i> {/* Replaced with Remix Icon */}
                        <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md">
                        <i className="ri-logout-box-line h-5 w-5"></i> {/* Replaced with Remix Icon */}
                        <span>Logout</span>
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                    <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="ri-menu-line w-6 h-6 text-gray-700"></i> {/* Replaced with Remix Icon */}
                    </button>
                    <div className="text-xl font-semibold">Admin Dashboard</div>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Admin</span>
                        <img src="/user-avatar.png" alt="profile" className="w-8 h-8 rounded-full object-cover" />
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 bg-gray-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Stats Cards */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-500">Total Products</div>
                            <div className="mt-2 text-3xl font-semibold">123</div>
                        </div>

                        <div className="bg-white shadow-md rounded-lg p-4">
                            <div className="text-sm font-medium text-gray-500">Total Users</div>
                            <div className="mt-2 text-3xl font-semibold">456</div>
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

                    {/* Charts Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
                            <div className="mt-4">
                                {/* Replace with actual chart */}
                                <div className="h-48 bg-gray-200"></div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold text-gray-700">User Growth</h2>
                            <div className="mt-4">
                                {/* Replace with actual chart */}
                                <div className="h-48 bg-gray-200"></div>
                            </div>
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
            </div>
        </div>
    );
}

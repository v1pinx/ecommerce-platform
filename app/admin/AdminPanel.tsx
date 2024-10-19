import { useState } from "react";

export default function AdminPanel() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
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
    )
}
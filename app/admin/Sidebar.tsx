import React from 'react';


interface SidebarProps {
    setActiveSection: (section: string) => void;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    handleLogout: () => void; // New prop for logout handling
}



const Sidebar: React.FC<SidebarProps> = ({ setActiveSection, sidebarOpen, setSidebarOpen, handleLogout }) => {
    
    return (
        <aside
            className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                transition duration-200 ease-in-out md:relative md:translate-x-0`}
        >
            <h1 className="text-2xl font-semibold text-center">Admin Panel</h1>
            <nav className="mt-10">
                <button
                    className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md w-full text-left"
                    onClick={() => setActiveSection('dashboard')}
                >
                    <i className="ri-bar-chart-line h-5 w-5"></i>
                    <span>Dashboard</span>
                </button>
                <button
                    className="flex items-center space-x-4 p-2 text-white hover:bg-gray-700 rounded-md w-full text-left"
                    onClick={() => setActiveSection('products')}
                >
                    <i className="ri-file-list-line h-5 w-5"></i>
                    <span>Products</span>
                </button>
                {/* Logout Button */}
                <button
                    className="flex items-center space-x-4 p-2 text-white hover:bg-red-600 rounded-md w-full text-left mt-10"
                    onClick={handleLogout}
                >
                    <i className="ri-logout-box-line h-5 w-5"></i>
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;

"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProductsPanel from "./ProductsPanel";
import toast , {Toaster} from "react-hot-toast";
import { useRouter } from 'next/navigation';
import fetchAdmin from "./../lib/fetchAdminRole";

const AdminPanel = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push('/Login');
                return;
            }

            const access = await fetchAdmin(token);
            if (!access) {
                router.push('/Login');
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        toast('Logging Out', { icon: '👏' });
        setTimeout(() => {
            router.push('/Login');
        }, 1500);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Toaster />
            <Sidebar setActiveSection={setActiveSection} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} handleLogout={handleLogout} />
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow-md py-4 px-4 flex justify-between items-center">
                    <button
                        className="md:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <i className="ri-menu-line w-6 h-6 text-gray-700"></i>
                    </button>
                    <div className="text-xl font-semibold">Admin Dashboard</div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    {activeSection === "dashboard" && (
                        <h2 className="text-2xl font-bold">Welcome to the Admin Dashboard</h2>
                    )}
                    {activeSection === "products" && <ProductsPanel />}
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;

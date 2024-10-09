"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProtectedData from "./lib/fetchProtectedData";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Categories from "./components/Categories";
import LaptopCard from "./components/LaptopCard";
import ProductShowcase from "./components/ProductShowcase";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Token not found");
                router.push('/Login');
                return;
            }

            const access = await fetchProtectedData(token);
            console.log(access);
            if (!access) {
                console.log("No access");
                router.push('/Login');
            }
            setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Categories />
            <ProductShowcase />
        </>
    );
}

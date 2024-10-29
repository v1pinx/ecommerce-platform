"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProtectedData from "./lib/fetchProtectedData";
import Link from "next/link";
import ImageSlider from "./components/ImageSlider";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push('/Login');
                return;
            }

            const access = await fetchProtectedData(token);
            if (!access) {
                ("No access");
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
            <ImageSlider />
            <Main />
        </>
    );
}

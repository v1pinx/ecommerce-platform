"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import fetchProtectedData from "./lib/fetchProtectedData";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Add loading state

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
            setLoading(false); // Set loading to false after checking auth
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    return (
        <div>Working</div>
    );
}

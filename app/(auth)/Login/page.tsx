"use client"
import { useState } from 'react';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });
            toast.success(response.data.message);

            setTimeout(() => {
                router.push('/');
            }, 1500)

        }
        catch (error: any) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid credentials");
            } else if (error.response && error.response.status === 404) {
                toast.error("Missing fields");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            <Toaster />
        </form>
    )
}
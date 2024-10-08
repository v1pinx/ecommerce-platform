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
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            console.log(response.data.token);

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
        <div className='min-h-screen flex justify-center items-center flex-col'>
            <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg  flex flex-col'>
                <h2 className='font-semibold mb-10 text-center text-3xl'>Welcome Back</h2>

                <div className='relative mb-2'>
                    <input
                        type="email"
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=' '
                        className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
                    />
                    <label
                        className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
                        htmlFor='email'
                    >
                        Email Address
                    </label>
                </div>

                <div className='relative mb-2'>
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder=' '
                        className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
                    />
                    <label
                        className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
                        htmlFor='email'
                    >
                        Password
                    </label>
                </div>



                <button type="submit" className='bg-teal-600 text-white rounded-md h-14'>Login</button>
                <Toaster />
            </form>

            <div>Don't have an account? <a href="" className='text-teal-500'>Sign up</a></div>
        </div>
    )
}
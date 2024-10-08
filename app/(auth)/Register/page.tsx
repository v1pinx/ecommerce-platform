"use client"
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSubmit(e: any) {
        e.preventDefault();

        try {
            const response = await axios.post('/api/register', {
                name,
                email,
                password
            })
            toast.success(response.data.message);

            setTimeout(() => {
                router.push('/Login');
            }, 1500)
        }
        catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error("User already exists. Try again");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    return (
        <>
            <div className='min-h-screen flex justify-center items-center flex-col'>
                <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg  flex flex-col'>
                    <h2 className='font-semibold mb-10 text-center text-3xl'>Welcome</h2>

                    <div className='relative mb-2'>
                        <input
                            type="text"
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder=' '
                            className='mb-4 p-4 border border-b-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200 w-96 h-14'
                        />
                        <label
                            className='text-xl text-gray-400 text-opacity-80 absolute left-0 top-0 mx-6 mt-3 px-1 transition duration-200 input-text'
                            htmlFor='name'
                        >
                            Name
                        </label>
                    </div>

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



                    <button type="submit" className='bg-teal-600 text-white rounded-md h-14 hover:bg-teal-700 transition duration-200'>Sign up</button>
                    <Toaster />
                </form>

                <div>Already have an account? <a href="/Login" className='text-teal-500'>Log in</a></div>
            </div>
            <div >

            </div>



        </>

    )
}
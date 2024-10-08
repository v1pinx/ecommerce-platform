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


        <div >
  <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-md rounded-lg space-y-6">
    <h2 >Register</h2>
    <input 
      type="text" 
      placeholder="Name" 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
      required 
    />
    <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)} 
      required 
      
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)} 
      required 
    />
    <button 
      type="submit" 
    >
      Register
    </button>
    <Toaster />
  </form>
</div>


    )
}
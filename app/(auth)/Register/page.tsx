"use client"
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast'; 


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e : any){
        e.preventDefault();

        try {
            const response = await axios.post('/api/register', {
                name,
                email,
                password
            })
            console.log(response.data.message);
        }
        catch (e) {
            toast.error("Email already exist")
        }
    }

    return (


        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Register</button>
            <Toaster />
        </form>
    )
}
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [emailId, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { emailId, password });
            if (response.data === "login Successfully")
            {
                console.log("User Login Successfully");
                
                navigate("/body");
            }
            else {
                console.log("Authentication failed: Incorrect email or password");
            }
        } catch (error) {
            console.log("Error during authentication:", error);
        }
    };

  return (
    <div className=' bg-orange-300 w-screen h-screen flex items-center justify-center'>
    <div className='bg-white border-black border-2 px-10 py-8 rounded-lg'>
        <h1 className='flex items-center justify-center font-bold text-2xl mb-3 '>Login</h1>

        <form className='flex items-center justify-between flex-col gap-4 ' onSubmit={handleSubmit}>
                  
                  <input className='border-zinc-500 border-2 p-1' type="text" name='email' placeholder='Enter EmailId' onChange={(e) => setEmail(e.target.value)} />
                  <input className='border-zinc-500 border-2 p-1' type="text" name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />

                  <button className='bg-blue-600 hover:bg-blue-800 rounded-lg text-white px-16 py-2' type='submit'>Login</button>

                  <p>Don't Have An Account</p>
                  <Link className='bg-blue-600 hover:bg-blue-800 rounded-lg text-white px-16 py-2' to='/'>Signup</Link>
              </form>
          </div>
    </div>
  )
}

export default Login
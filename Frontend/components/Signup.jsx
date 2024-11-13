import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Signup = () => {

    const [firstName, setName] = useState("")
    const [emailId, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:5000/signup",{
                firstName,emailId,password
            })
            .then(result => {
                console.log(result)
                if(result.data ){
                    navigate("/login")
                }
           
            })
            .catch(err => console.log(err))
        }

        
        catch(e){
            console.log(e);

        }

    }

    
  return (
      <div className=' bg-orange-300 w-screen h-screen flex items-center justify-center'>
          <div className='bg-white border-black border-2 px-10 py-8 rounded-lg'>
              <h1 className='flex items-center justify-center font-bold text-2xl mb-3 '>SignUp</h1>
              <form className='flex items-center justify-between flex-col gap-4 ' onSubmit={handleSubmit}>
                  
                  <input className='border-zinc-500 border-2 p-1' type="text" name='Name' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
                  <input className='border-zinc-500 border-2 p-1' type="text" name='email' placeholder='Enter EmailId' onChange={(e) => setEmail(e.target.value)} />
                  <input className='border-zinc-500 border-2 p-1' type="password" name='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />

                  <button className='bg-blue-600 hover:bg-blue-800 rounded-lg text-white px-16 py-2' type='submit'>  
                      SignUp  
                  </button>

                  <p>Already Have Account</p>

                  <Link className='rounded-lg bg-blue-600 hover:bg-blue-800 text-white px-16 py-2' to='/login'>   
                      Login   
                  </Link> 
              </form>     
          </div>
    </div>
  )
}

export default Signup
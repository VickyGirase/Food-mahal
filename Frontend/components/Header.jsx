import FoodFireLogo from "../images/Food Fire Logo.png";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Title = () => {
    
    return (
      <img className="w-20 " src={FoodFireLogo} alt="" />
    )
}

const Header = () => {
    const [isloggedin, setisloggedin] = useState(true)
    const cartItems = useSelector((store) => store.cart.items)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/logout")
        .then(result => {
            console.log(result)
            if(result.data ){
                navigate("/")
            }
       
        })
        .catch(err => console.log(err))
    }
    return (
    <div className="flex top-0 left-0 right-0 shadow-xl justify-between p-2 items-center bg-slate-400 ">
        <Title />

        <ul className="flex gap-14 text-black font-semibold ">
            <li className="text-black hover:bg-orange-500 rounded-lg p-2 hover:text-white "><Link to="/body">Home</Link></li>
            <li className="text-black hover:bg-orange-500 rounded-lg p-2 hover:text-white "><Link to="/about">About</Link></li>
                <li className="text-black hover:bg-orange-500 rounded-lg p-2 hover:text-white "><Link to="/contact">Contact</Link></li>
                
                <li className="text-black hover:bg-orange-500 rounded-lg p-2 hover:text-white "><Link to="/cart">Cart { cartItems.length}</Link></li>
                
            <li>
                    {isloggedin ? (
                        <button className="text-red-600 bg-yellow-400 rounded-lg p-1.5 font-bold" onClick={handleSubmit}>Logout</button>
                    ) :
                        <button className="text-blue-700 font-bold bg-yellow-400 rounded-lg p-1.5" onClick={() => setisloggedin(true)}>Login</button>}    
            </li>
                
        </ul>
        
    </div>


    )
}

export default Header
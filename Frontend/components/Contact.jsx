import { useState } from "react";
import contact from "../images/Contact-Us.png";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  const [message, setMessage] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
    }
  return (
    <>
   <Header/>
    <div className="flex justify-around m-10 mt-14">
      <div className="contact-left">
      <img src={contact} alt="Contact us" />
      </div>
      <div className="flex items-center flex-col">
      <h1 className="text-4xl font-bold text-slate-800">Contact us</h1>
                <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
          <input className=" w-96 p-2 border-orange-600 border rounded-lg mt-5" type="text" placeholder="Name" required/>
                    <input className="w-96 p-3 border-orange-600 rounded-lg border mt-5" type="email" placeholder="Email" required/>
                    <textarea className="w-96 p-3 border-orange-600 border rounded-lg mt-5" placeholder="Type your Message here..." required></textarea>
                    <button className="bg-orange-600 w-36 ml-32 p-2 text-white font-semibold rounded-lg hover:bg-green-600" type="submit">Submit</button>
                    {message && <span>Thanks for contacting FoodFire, We will reply ASAP.</span>}
               </div>
                </form>
      </div>
      </div>
      <Footer/>
      
    </>
  );
};

export default Contact;

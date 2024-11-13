import food from "../images/burger-image.png";
import Header from "./Header";
import Footer from "../components/Footer"

const About = () => {
 
  return (
    <>
   
    <Header/>
      <div className="flex justify-around m-5 p-12 bg-white shadow-2xl pb-10">
        <div>
          <h1 className="font-bold text-slate-700 text-7xl flex flex-col gap-5">
            Welcome to <br /> The world of <br />
            <span className="bg-orange-500 text-white rounded-lg p-3">Tasty & Fresh Food</span>
          </h1>
          <h4 className="text-2xl font-bold font-mono mt-7 text-slate-700">
            "Better you will feel if you eat a Food<span className="text-orange-600">Fire</span> healthy
            meal"
          </h4>
        </div>
        <div className="about-right">
          <img src={food} alt="Food Image" />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;

import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function filterData(searchText, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return resFilterData;
}

const Body = () => {

  const [searchText, setSearchText] = useState("");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
      const json = await response.json();
      console.log("Fetched data:", json);

      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData = jsonData?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          if (checkData !== undefined) {
            return checkData;
          }
        }
        throw new Error("No restaurant data found in the response");
      }

      const resData = await checkJsonData(json);
      console.log("Processed data:", resData);

      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`);
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  if (!allRestaurants) return null;

  return (
    <>
      <Header/>
      <div className="flex justify-center">
        <input
          type="text"
          className="border-2 border-black w-1/2 my-6 p-1.5 rounded-l-lg placeholder:text-slate-600"
          placeholder="Search a restaurant you want..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="bg-orange-400 rounded-r-lg p-2 font-normal flex items-center justify-center my-6 hover:bg-green-500 text-white"
          onClick={() => {
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      <div className="flex w-auto flex-wrap items-center justify-center self-stretch">
        {filteredRestaurants.map((restaurant) => {
          return (
            <Link
              to={"/restaurant/" + restaurant?.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCard {...restaurant?.info} />
            </Link>
          );
        })}
      </div>
      <Footer/>
    </>
  );
};

export default Body;

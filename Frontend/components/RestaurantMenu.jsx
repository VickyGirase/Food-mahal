import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header"
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from "../utils/constants";
import { useDispatch } from "react-redux";
import {addItem} from "../utils/cartSlice"

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const dispatch = useDispatch()

  const handleAddItem = () => {
    dispatch(addItem("hello"))
  }

  useEffect(() => {
    getRestaurantInfo(); 
  }, []);

  async function getRestaurantInfo() {
    try {
      const response = await fetch(swiggy_menu_api_URL + resId);
      const json = await response.json();
      const restaurantData = json?.data?.cards?.map(x => x.card)?.
                             find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;
      setRestaurant(restaurantData);

      const menuItemsData = json?.data?.cards.find(x=> x.groupedCard)?.
                            groupedCard?.cardGroupMap?.REGULAR?.
                            cards?.map(x => x.card?.card)?.
                            filter(x=> x['@type'] == MENU_ITEM_TYPE_KEY)?.
                            map(x=> x.itemCards).flat().map(x=> x.card?.info) || [];
      
      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find(x => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      })
      setMenuItems(uniqueMenuItems);
    } catch (error) {
      setMenuItems([]);
      setRestaurant(null);
      console.log(error);
    }
  }

  return (
    <>
     {/* <Header/> */}
    <div className="mt-3">
      <div className="flex bg-black text-white p-5">
        <img
          className="w-72 ml-52 rounded-lg"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className="ml-10">
          <h2 className="font-semibold text-4xl text-slate-300 mt-7">{restaurant?.name}</h2>
          <p className="font-medium text-slate-400 mt-2">{restaurant?.cuisines?.join(", ")}</p>
          <div className="flex justify-between font-semibold text-slate-300 mt-3">
            <div className="" style={
            (restaurant?.avgRating) < 4
              ? { backgroundColor: "var(--light-red)" }
              : (restaurant?.avgRating) === "--"
              ? { backgroundColor: "white", color: "black" }
              : { color: "white" }
          }>
            <i className="fa-solid fa-star"></i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="mx-44 mt-12 mb-12">
            <h3 className="font-bold text-lg text-slate-600">Recommended</h3>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className="flex flex-col gap-14">
            {menuItems.map((item) => (
              <div className="flex justify-between gap-24 mx-44" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="font-bold text-slate-600">{item?.name}</h3>
                  <p className="text-slate-500">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="text-sm text-slate-500">{item?.description}</p>
                </div>
                <div className="">
                  {item?.imageId && (
                    <img
                      className="w-48"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="bg-orange-600 text-base px-5 py-1 ml-4 mt-2 mb-2 rounded-lg font-semibold hover:bg-green-500" onClick={()=> handleAddItem()}> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default RestaurantMenu;

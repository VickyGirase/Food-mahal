import { IMG_CDN_URL } from "../utils/constants";

// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRatingString,
}) => {
  return (
    <div className="w-64  m-3 cursor-pointer rounded-lg shadow-2xl">
      <img className="p-2 rounded-2xl" src={IMG_CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold text-lg ml-2 mt-2">{name}</h3>
      <h5 className="font-normal text-xs ml-2 mt-2">{cuisines.join(", ")}</h5>
      <h5 className="font-normal text-xs ml-2 mt-1" >{areaName}</h5>
      <span className="flex justify-around mt-3 ">
        <h4 className="bg-green-500 mb-3 text-white font-semibold text-sm px-4 py-1 rounded-lg">
        <i class="fa-solid fa-star"></i>
          {avgRatingString}
        </h4>
        <h4 className="mb-3 font-bold text-sm text-slate-600">•</h4>
        <h4 className="mb-3 font-bold text-sm text-slate-600">{sla?.lastMileTravelString ?? '2.0 km'}</h4>
        <h4 className="mb-3 font-bold text-sm text-slate-600">•</h4>
        <h4 className="mb-3 font-bold text-sm  text-slate-600">{costForTwo ?? '₹200 for two'}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;

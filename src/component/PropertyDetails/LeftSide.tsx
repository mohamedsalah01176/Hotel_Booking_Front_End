import image from "../../assets/R (1).jpg";
import PlaceOffer from "./PlaceOffer";

const LeftSide = () => {
  return (
    <div className="grow">
        <p className="text-xl font-medium">Entire rental unit in Hurghada 2, Egypt</p>
        <p className=" text-gray-600 ">3 guests - 1 bedroom - 2 beds - 1 bath</p>
        <div className="mt-7 flex items-center gap-5">
          <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
          <div>
            <h2 className="text-lg font-medium">Hosted by Gubran</h2>
            <p className="text-sm text-gray-600">Superhost2 years hosting</p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <p className="font-medium text-gray-700  w-[90%]">Enjoy a great travel experience in this apartment with the heart of the tourist center in Hurghada and directly to enjoy pure air and wonderful sea view and see the sunrise. You can even lay on the bed and it is located next to two public beaches and a long promenade for a walk. Its location enables you to move to several destinations with ease through microbus such as Carrefour(City Centre), the Central Fish Market and Sheraton Street, which has many restaurants, cafes, antique shops and gifts as well as the area of Al Dahar with its old markets
          There is fast WiFi for the listing only</p>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <h2 className="text-3xl font-semibold">What this place offers</h2>
        <PlaceOffer title="Shared beach access"/>
        <PlaceOffer title="TV"/>
        <PlaceOffer title="Wifi"/>
        <PlaceOffer title="Kitchen"/>
        <PlaceOffer title="TbBeach"/>
      </div>
  )
}

export default LeftSide
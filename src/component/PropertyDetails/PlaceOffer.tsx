import { 
  IoWifiSharp, IoCarSportOutline, IoRestaurantOutline, IoBonfireOutline 
} from "react-icons/io5";
import { MdOutlineTv, MdPool, MdWater } from "react-icons/md";
import { TbToolsKitchen2, TbGrill, TbBeach } from "react-icons/tb";
import { LuWashingMachine, LuParkingMeter, LuPiano, LuBicepsFlexed, LuAlarmSmoke, LuFireExtinguisher } from "react-icons/lu";
import { FaRegSnowflake,  FaHouseFloodWater, FaPersonSkiing, FaTree } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { PiFirstAidKitLight } from "react-icons/pi";

import { FaHotTub } from "react-icons/fa";
import type { JSX } from "react";
import { GiShower } from "react-icons/gi";
const PlaceOffer = ({title,serviceEn}:{title:string | undefined,serviceEn:string}) => {

  let icon: JSX.Element;
  console.log(serviceEn?.toLowerCase())
  switch (serviceEn?.toLowerCase()) {
    case "wifi":
      icon = <IoWifiSharp className="text-4xl" />;
      break;
    case "tv":
    case "television":
      icon = <MdOutlineTv className="text-4xl" />;
      break;
    case "kitchen":
      icon = <TbToolsKitchen2 className="text-4xl" />;
      break;
    case "washer":
    case "washing machine":
      icon = <LuWashingMachine className="text-4xl" />;
      break;
    case "free parking on premises":
    case "free parking on the site":
      icon = <IoCarSportOutline className="text-4xl" />;
      break;
    case "paid parking on premises":
    case "park parking on the site":
      icon = <LuParkingMeter className="text-4xl" />;
      break;
    case "air conditioning":
    case "conditioning":
      icon = <FaRegSnowflake className="text-4xl" />;
      break;
    case "dedicated workspace":
    case "custom workplace":
      icon = <BsPersonWorkspace className="text-4xl" />;
      break;
    case "swimming pool":
      icon = <MdPool className="text-4xl" />;
      break;
    case "hot tub":
    case "jacuzzi":
      icon = <FaHotTub className="text-4xl" />;
      break;
    case "grill":
      icon = <TbGrill className="text-4xl" />;
      break;
    case "outdoor dining area":
    case "external dining area":
      icon = <IoRestaurantOutline className="text-4xl" />;
      break;
    case "fire pit":
    case "fireplace":
      icon = <IoBonfireOutline className="text-4xl" />;
      break;
    case "piano":
      icon = <LuPiano className="text-4xl" />;
      break;
    case "lake access":
    case "access":
      icon = <FaHouseFloodWater className="text-4xl" />;
      break;
    case "exercise equipment":
    case "sports equipment":
      icon = <LuBicepsFlexed className="text-4xl" />;
      break;
    case "beach access":
      icon = <MdWater className="text-4xl" />;
      break;
    case "ski-in/ski-out":
    case "internal/external ski":
      icon = <FaPersonSkiing className="text-4xl" />;
      break;
    case "outdoor shower":
    case "external shower":
      icon = <GiShower className="text-4xl" />;
      break;
    case "smoke alarm":
    case "smoke detector":
      icon = <LuAlarmSmoke className="text-4xl" />;
      break;
    case "first aid kit":
    case "several first aid":
      icon = <PiFirstAidKitLight className="text-4xl" />;
      break;
    case "fire extinguisher":
      icon = <LuFireExtinguisher className="text-4xl" />;
      break;
    case "nature":
      icon = <FaTree className="text-4xl" />;
      break;
    default:
      icon = <TbBeach className="text-4xl" />; // fallback icon
  }

  
  return (
    <div className="flex gap-4 text-gray-700 mt-7">
      {icon}
      <p className="text-lg font-medium">{title}</p>
    </div>
  )
}

export default PlaceOffer
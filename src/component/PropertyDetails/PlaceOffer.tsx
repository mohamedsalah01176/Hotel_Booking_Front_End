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
const PlaceOffer = ({title}:{title:string | undefined}) => {
  let icon;

  switch (title?.toLowerCase()) {
  case "wifi":
    icon = <IoWifiSharp className="text-4xl" />;
    break;
  case "tv":
    icon = <MdOutlineTv className="text-4xl" />;
    break;
  case "kitchen":
    icon = <TbToolsKitchen2 className="text-4xl" />;
    break;
  case "washer":
    icon = <LuWashingMachine className="text-4xl" />;
    break;
  case "free parking on premises":
    icon = <IoCarSportOutline className="text-4xl" />;
    break;
  case "paid parking on premises":
    icon = <LuParkingMeter className="text-4xl" />;
    break;
  case "air conditioning":
    icon = <FaRegSnowflake className="text-4xl" />;
    break;
  case "dedicated workspace":
    icon = <BsPersonWorkspace className="text-4xl" />;
    break;
  case "pool":
    icon = <MdPool className="text-4xl" />;
    break;
  case "hot tub":
    icon = <FaHotTub className="text-4xl" />;
    break;
  case "bbq grill":
    icon = <TbGrill className="text-4xl" />;
    break;
  case "outdoor dining area":
    icon = <IoRestaurantOutline className="text-4xl" />;
    break;
  case "fire pit":
    icon = <IoBonfireOutline className="text-4xl" />;
    break;
  case "piano":
    icon = <LuPiano className="text-4xl" />;
    break;
  case "lake access":
    icon = <FaHouseFloodWater className="text-4xl" />;
    break;
  case "exercise equipment":
    icon = <LuBicepsFlexed className="text-4xl" />;
    break;
  case "beach access":
    icon = <MdWater className="text-4xl" />;
    break;
  case "ski-in/ski-out":
    icon = <FaPersonSkiing className="text-4xl" />;
    break;
  case "smoke alarm":
    icon = <LuAlarmSmoke className="text-4xl" />;
    break;
  case "first aid kit":
    icon = <PiFirstAidKitLight className="text-4xl" />;
    break;
  case "fire extinguisher":
    icon = <LuFireExtinguisher className="text-4xl" />;
    break;
  case "nature":
    icon = <FaTree className="text-4xl" />;
    break;
  default:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
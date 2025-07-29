import { IoBonfireOutline, IoCarSportOutline, IoRestaurantOutline, IoWifiSharp } from "react-icons/io5"
import ServiceContainer from "./ServiceContainer"
import {  MdOutlineTv, MdPool, MdWater } from "react-icons/md"
import { TbGrill, TbToolsKitchen2 } from "react-icons/tb"
import { LuAlarmSmoke, LuBicepsFlexed, LuFireExtinguisher, LuParkingMeter, LuPiano, LuWashingMachine } from "react-icons/lu"
import { BsPersonWorkspace } from "react-icons/bs"
import { FaHotTub, FaRegSnowflake } from "react-icons/fa"
import { FaHouseFloodWater, FaPersonSkiing } from "react-icons/fa6"
import { GiShower } from "react-icons/gi";
import { PiFirstAidKitLight } from "react-icons/pi";

const Services = ({service,setService}:{service:string,setService:(val:string)=>void}) => {
  return (
    <div className="py-10 pb-16 min-h-[70vh] flex flex-col justify-center items-center">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">Tell guest what ypur place has offer</h2>
        <p className="text-gray-600 mt-1 mb-10">You can add more anenities after you puplish your listing</p>
      </div>
      <div>
        <h3 className="text-xl font-medium mb-5">What about these guest favorites?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 " >
          <ServiceContainer title="WiFi" icon={<IoWifiSharp className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="TV" icon={ <MdOutlineTv className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Kitchen" icon={<TbToolsKitchen2 className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Washer" icon={<LuWashingMachine className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Free parking on Premises" icon={<IoCarSportOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Paid parkiing on premises" icon={<LuParkingMeter className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Air Conditioning" icon={<FaRegSnowflake className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Dedicated workspace" icon={<BsPersonWorkspace className="text-3xl mt-3 mb-1"/>}/>
        </div>
        <h3 className="text-xl font-medium mt-10 mb-5">Do you have any standout amenities?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 " >
          <ServiceContainer title="Pool" icon={<MdPool className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Hot tub" icon={ <FaHotTub className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="BBQ grill" icon={<TbGrill className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Outdoor diring area" icon={<IoRestaurantOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Fire pit" icon={<IoBonfireOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Piano" icon={<LuPiano className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Lake access" icon={<FaHouseFloodWater className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Exercise equipment" icon={<LuBicepsFlexed className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Bash access" icon={<MdWater className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Sky-in/sky-out" icon={<FaPersonSkiing className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Outdoor shower" icon={<GiShower className="text-3xl mt-3 mb-1"/>}/>
        </div>
        <h3 className="text-xl font-medium mt-10 mb-5">Do you have any of these sefety items</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 " >
          <ServiceContainer title="Smoke alarm" icon={<LuAlarmSmoke className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="First aid kit" icon={ <PiFirstAidKitLight className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer title="Fire extinguisher" icon={<LuFireExtinguisher className="text-3xl mt-3 mb-1"/>}/>
        </div>
      </div>
    </div>
  )
}

export default Services
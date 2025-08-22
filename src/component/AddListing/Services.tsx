import { IoBonfireOutline, IoCarSportOutline, IoRestaurantOutline, IoWifiSharp } from "react-icons/io5"
import { MdOutlineTv, MdPool, MdWater } from "react-icons/md"
import { TbGrill, TbToolsKitchen2 } from "react-icons/tb"
import { LuAlarmSmoke, LuBicepsFlexed, LuFireExtinguisher, LuParkingMeter, LuPiano, LuWashingMachine } from "react-icons/lu"
import { BsPersonWorkspace } from "react-icons/bs"
import { FaHotTub, FaRegSnowflake } from "react-icons/fa"
import { FaHouseFloodWater, FaPersonSkiing } from "react-icons/fa6"
import { GiShower } from "react-icons/gi"
import { PiFirstAidKitLight } from "react-icons/pi"
import { useTranslation } from "react-i18next"
import ServiceContainer from "./ServiceContainer"

const Services = ({service,setService}:{service:string[],setService:(val:string[])=>void}) => {
  const { t } = useTranslation();

  return (
    <div className="py-10 pb-16 min-h-[70vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">{t("addListing.services.title")}</h2>
        <p className="text-gray-600 mt-1 mb-10">{t("addListing.services.subtitle")}</p>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-5">{t("addListing.services.favorites")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.wifi")} icon={<IoWifiSharp className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.tv")} icon={<MdOutlineTv className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.kitchen")} icon={<TbToolsKitchen2 className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.washer")} icon={<LuWashingMachine className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.free_parking")} icon={<IoCarSportOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.paid_parking")} icon={<LuParkingMeter className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.ac")} icon={<FaRegSnowflake className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.workspace")} icon={<BsPersonWorkspace className="text-3xl mt-3 mb-1"/>}/>
        </div>

        <h3 className="text-xl font-medium mt-10 mb-5">{t("addListing.services.standout")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.pool")} icon={<MdPool className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.hot_tub")} icon={<FaHotTub className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.bbq")} icon={<TbGrill className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.outdoor_dining")} icon={<IoRestaurantOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.fire_pit")} icon={<IoBonfireOutline className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.piano")} icon={<LuPiano className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.lake")} icon={<FaHouseFloodWater className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.gym")} icon={<LuBicepsFlexed className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.beach")} icon={<MdWater className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.ski")} icon={<FaPersonSkiing className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.outdoor_shower")} icon={<GiShower className="text-3xl mt-3 mb-1"/>}/>
        </div>

        <h3 className="text-xl font-medium mt-10 mb-5">{t("addListing.services.safety")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.smoke_alarm")} icon={<LuAlarmSmoke className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.first_aid")} icon={<PiFirstAidKitLight className="text-3xl mt-3 mb-1"/>}/>
          <ServiceContainer service={service} setService={setService} title={t("addListing.services.items.fire_extinguisher")} icon={<LuFireExtinguisher className="text-3xl mt-3 mb-1"/>}/>
        </div>
      </div>
    </div>
  )
}

export default Services

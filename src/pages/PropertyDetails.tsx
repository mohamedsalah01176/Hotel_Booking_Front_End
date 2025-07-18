import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import RightSide from "../component/PropertyDetails/RightSide";
import LeftSide from "../component/PropertyDetails/LeftSide";
import ImagesContainer from "../component/PropertyDetails/ImagesContainer";
import Reviews from "../component/PropertyDetails/Reviews";
// import image from "../assets/R (1).jpg";


const PropertyDetails = () => {
 

  return (
    <section className="bg-[#f7f7f7] min-h-[190vh]">
      <div className="w-[95%] md:w-[90%] mx-auto pt-7 ">
        <h1 className="text-4xl font-semibold">Hurghada Pearl</h1>
        <ImagesContainer/>
        <section className="flex flex-col md:flex-row justify-between gap-14 ">
          <LeftSide/>
          <RightSide/>
        </section>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <Reviews/>
      </div>
    </section>
  )
}

export default PropertyDetails
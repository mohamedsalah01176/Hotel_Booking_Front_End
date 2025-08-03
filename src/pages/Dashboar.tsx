import image from "../assets/mainDashboard.avif";
import { FiUsers } from "react-icons/fi";
import Footer from "../component/Footer";
import { Link } from "react-router";
import { FaRegShareSquare } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";


const Dashboar = () => {
  return (
    <>
      <div className=" min-h-[80vh] w-[90%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-7  border-b border-gray-300 pb-7">
          <div>
            <h2 className="font-semibold text-5xl">Refer a host,</h2>
            <h2 className="font-semibold text-5xl">earn a cash reward</h2>
            <div className="flex  items-center gap-3 my-8"> 
              <Link to={'addListing'} className="bg-[#e77008] p-3 px-6 font-medium rounded-3xl text-white hover:bg-[#02717e] transition-all duration-300 cursor-pointer">Get started</Link>
              <Link to={"listings"} className=" p-3 px-6 font-medium rounded-3xl text-black border hover:bg-[#02717e] hover:text-white transition-all duration-300 cursor-pointer">View Your Listings</Link>
            </div>
            <p className="text-gray-600 w-[300px] md:w-[400px] leading-5">Rewards vary by listing location, type, and size, and are only available in eligible locations</p>
          </div>
          <div>
            <img loading="lazy" src={image} alt="image" className="w-[500px]" />
          </div>
        </div>
        <div className="mb-10 pb-14">
          <h2 className="text-center text-4xl font-semibold mt-14 mb-9 ">How it works</h2>
          <div className="flex justify-center items-center flex-wrap gap-7 gap-y-10 ">
            <div className="w-[300px] text-center ">
              <FiUsers className="text-3xl mb-5 mx-auto"/>
              <h3 className="font-medium">Tell us who you’re referring</h3>
              <p className="text-gray-500">You can refer your friend to host a home, offer an experience, or provide a service.</p>
            </div>
            <div className="w-[300px] text-center">
              <FaRegShareSquare className="text-3xl mb-5 mx-auto"/>
              <h3 className="font-medium">Send them your referral link</h3>
              <p className="text-gray-500">Make sure your friend creates their listing using your unique link.</p>
            </div>
            <div className="w-[300px] text-center">
              <BsCashCoin className="text-3xl mb-5 mx-auto"/>
              <h3 className="font-medium">Get rewarded</h3>
              <p className="text-gray-500">After they complete their first eligible booking, your reward will be sent within 14 days.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Dashboar
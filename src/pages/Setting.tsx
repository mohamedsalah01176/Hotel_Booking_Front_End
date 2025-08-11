import { FaPhoneAlt, FaUser } from "react-icons/fa";
import defaultImage from "../assets/defaultUser.png"
import { FaCameraRotate } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiMiniLockClosed } from "react-icons/hi2";

const Setting = () => {
  return (
    <div className="min-h-[80vh]  bg-[#f7f7f7]">
      <div className="w-[85%] mx-auto bg-white p-5 rounded-xl">
        <h1 className="text-4xl text-[#02717e] text-center font-semibold pt-4 mb-10">Personal Setting</h1>
        <section className=" px-3 md:px-10">
          <div className="relative mx-auto w-fit">
            <img src={defaultImage} alt="User Image" className="w-[270px] h-[270px] rounded-full border-4 border-[#02717e]" />
            <button title="changeImage" className="absolute bottom-5 right-5 text-center w-[40px] h-[40px]  bg-[#02717e] rounded-full cursor-pointer hover:bg-[#e77008] transition-all duration-300">
              <FaCameraRotate className="  text-3xl text-white mx-auto" />
            </button>
          </div>
          <form className="my-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-x-7 gap-y-0">
              <div className=" mb-4 w-full md:w-[50%]">
                <label htmlFor="name" className="text-lg font-medium block"><FaUser className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>Name</label>
                <input id="name" type="text" value={"mohamed"} placeholder="Your Name" className="border p-3 rounded-lg  outline-0 border-[#02717e] mt-2 w-full" />
              </div>
              <div  className=" mb-4 w-full md:w-[50%]">
                <label htmlFor="email" className="text-lg font-medium block"><MdEmail className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>Email</label>
                <input id="email" type="text" value={"mohammedsalah1@gmail.com"} placeholder="Your Email" className="border p-3 rounded-lg  outline-0 border-[#02717e] mt-2 w-full" />
              </div>
            </div>
              <div className=" mb-4 w-full  border-b-2 border-[#02717e] pb-10">
                <label htmlFor="phone" className="text-lg font-medium block"><FaPhoneAlt  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>Phone</label>
                <div className="flex gap-3 items-center  mt-2 w-full">
                  <input id="phone" type="text" value={"01155953141"} placeholder="Your Phone" className="border p-3 rounded-lg w-full  outline-0 border-[#02717e]" />
                  <button className="text-white bg-[#02717e] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#e77008] transition-all duration-300">Verify</button>
                </div>
              </div>

                <h2 className="text-2xl font-medium text-[#02717e] text-center mb-7 mt-7">Change Password</h2>
              <div className="flex justify-center md:justify-between items-center flex-wrap gap-3 ">
                <div className=" mb-4 grow">
                  <label htmlFor="oldpassword" className="text-lg font-medium block"><HiMiniLockClosed   className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>Old Password</label>
                  <input id="oldpassword" type="password" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                </div>
                <div className=" mb-4 grow">
                  <label htmlFor="newpassword" className="text-lg font-medium block"><HiMiniLockClosed  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>New Password</label>
                  <input id="newpassword" type="password" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                </div>
                <div className=" mb-4 grow">
                  <label htmlFor="confirm" className="text-lg font-medium block"><HiMiniLockClosed  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>Confirm Passwpr</label>
                  <input id="confirm" type="password" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                </div>
              </div>
              <button className="bg-gray-500 text-white mx-auto w-[190px] px-5 py-4 rounded-xl text-lg block mt-10">Save Changes</button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Setting
import image from "../../assets/R (1).jpg"
const ShowHost = () => {
  return (
      <div className=" pb-24">
        <h2 className="text-2xl font-semibold">Meet your host</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-7 md:gap-16">
          <section className="p-7 px-14 bg-white shadow-xl flex items-center gap-16 rounded-xl mt-5">
            <div className="text-center" >
              <img src={image} alt="host" className="w-[70px] h-[70px] rounded-full mx-auto " />
              <h2 className="text-3xl font-medium">Ahmed</h2>
            </div>
            <div>
              <div className="w-[120px]">
                <p className="text-xl font-bold text-center">350</p>
                <p className="text-sm font-medium text-center">Reviews</p>
                <div className="bg-gray-300 w-full h-[2px] my-3"></div>
              </div>
              <div className="w-[120px]">
                <p className="text-xl font-bold text-center">4.6</p>
                <p className="text-sm font-medium text-center">Rating</p>
                <div className="bg-gray-300 w-full h-[2px] my-3"></div>
              </div>
              <div className="w-[120px]">
                <p className="text-xl font-bold text-center">11</p>
                <p className="text-sm font-medium text-center">Months hosting</p>
              </div>
            </div>
          </section>
          <section className="">
            <h2 className="text-lg font-medium">Ahmed is a Superhost</h2>
            <p className="mt-3 mb-5 text-gray-700">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
            <h2 className="text-lg font-medium">Host details</h2>
            <p className="mt-3 text-gray-700">Response rate: 100%</p>
            <p className="text-gray-700 mb-7">Responds within an hour</p>
            <h2 className="text-lg font-medium">Contacts details</h2>
            <p className="mt-3 text-gray-700">WhatsApp: <span className="text-[#02717e] font-medium">+201155953141</span></p>
            <p className="mt-3 text-gray-700">Email: <span className="text-[#02717e] font-medium">mohamed123@gmail.com</span></p>
          </section>
        </div>
      </div>
  )
}

export default ShowHost
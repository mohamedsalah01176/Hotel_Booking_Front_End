import image from "../../assets/R (1).jpg";

const Reviews = () => {
  return (
    <div className="grid grid-cols-2 my-12 gap-14 bg-white p-7 rounded-xl">
          <div>
            <div className="flex gap-3 items-start">
              <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
              <div>
                <p className="text-lg font-medium">Anna</p>
                <p className="text-gray-700">1 year on Airbnb</p>
              </div>
              <p>4 days age</p>
            </div>
            <p className="text-gray-800 font-medium mt-3">Beautiful, clean, tidy, frequented apartment, flexible operation.</p>
          </div>
          <div>
            <div className="flex gap-3 items-start">
              <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
              <div>
                <p className="text-lg font-medium">Anna</p>
                <p className="text-gray-700">1 year on Airbnb</p>
              </div>
              <p>4 days age</p>
            </div>
            <p className="text-gray-800 font-medium mt-3">
              Gubran is truly a Superhost! From the moment we arrived, he made sure everything was perfect. The place is beautiful
            </p>
          </div>
          <div>
            <div className="flex gap-3 items-start">
              <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
              <div>
                <p className="text-lg font-medium">Anna</p>
                <p className="text-gray-700">1 year on Airbnb</p>
              </div>
              <p>4 days age</p>
            </div>
            <p className="text-gray-800 font-medium mt-3">
              Great stay! The host was very helpful and responsive throughout. The internet was fast and reliable, which was perfect for my needs
            </p>
          </div>
          <div>
            <div className="flex gap-3 items-start">
              <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
              <div>
                <p className="text-lg font-medium">Anna</p>
                <p className="text-gray-700">1 year on Airbnb</p>
              </div>
              <p>4 days age</p>
            </div>
            <p className="text-gray-800 font-medium mt-3">
              This is a compact apartment but very unique for Hurghada in the fact that you are actually right next to the beach which really opens up your
            </p>
          </div>
          <button className="block w-[180px] text-left bg-[#e2e0e0] p-4 rounded-xl font-medium ">Show all 60 reviews</button>
        </div>
  )
}

export default Reviews
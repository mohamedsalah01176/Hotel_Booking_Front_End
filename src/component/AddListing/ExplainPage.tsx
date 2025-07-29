import image1 from "../../assets/explain1.webp";
import image2 from "../../assets/explain2.webp";
import image3 from "../../assets/explain3.webp";
const ExplainPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-10  pb-10 animate-fade-in">
      <div>
        <h2 className="text-5xl font-semibold w-[100%] md:w-[80%] leading-14">It<sup>,</sup>s easy to get started on My Hotel</h2>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center ">
        <div className="flex gap-3 py-5 border-b border-gray-400">
          <div>
            <h3 className="text-2xl font-medium">1 Tell us about your place</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">Share some basic info, like where it is and how many guests can stay</p>
          </div>
          <img loading="lazy" src={image1} alt="image1" className="w-[150px]" />
        </div>
        <div className="flex gap-3 py-5 border-b border-gray-400">
          <div>
            <h3 className="text-2xl font-medium">2 Make it stand out</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">Add 5 or more photos plus a title and description—we’ll help you out.</p>
          </div>
          <img loading="lazy" src={image2} alt="image1" className="w-[150px]" />
        </div>
        <div className="flex gap-3 py-5 ">
          <div>
            <h3 className="text-2xl font-medium">3 Finish  up and publish</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">Choose a starting price, verify a few details, then publish your listing.</p>
          </div>
          <img loading="lazy" src={image3} alt="image1" className="w-[150px]" />
        </div>
      </div>
    </div>
  )
}

export default ExplainPage
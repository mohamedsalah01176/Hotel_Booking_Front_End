import image from "../../assets/explain2.webp"
const Step2 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-[70vh] pt-5 pb-10">
      <div className="md:w-[50%]">
        <p className="font-medium">Step2</p>
        <h2 className="text-5xl font-semibold w-[100%] md:w-[80%] mt-4 mb-10">Make your place stand out</h2>
        <p className="text-gray-700  md:w-[90%] text-lg">in this step, you will add some of the amenities your place offers, plus 5 or more photes, you will create a title and description</p>
      </div>
      <div className="md:w-[35%]">
        <img loading="lazy" src={image} alt="step2" className="w-full"/>
      </div>
    </div>
  )
}

export default Step2
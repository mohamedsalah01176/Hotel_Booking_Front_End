import image from "../../assets/explain3.webp"

const Step3 = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-[70vh] pt-5 pb-10 animate-fade-in">
      <div className="md:w-[50%]">
        <p className="font-medium">Step3</p>
        <h2 className="text-5xl font-semibold w-[100%] md:w-[80%] mt-4 mb-10">Finish up and publish</h2>
        <p className="text-gray-700  md:w-[90%] text-lg">Finally, you<sup>,</sup>ll choose booking setting, setup pricing, and publish your listing</p>
      </div>
      <div className="md:w-[35%]">
        <img loading="lazy" src={image} alt="step2" className="w-full"/>
      </div>
    </div>
  )
}

export default Step3
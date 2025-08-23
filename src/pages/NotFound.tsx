import { Link } from "react-router";
import notFoundImage from "../assets/notFound.webp";
import useTitle from "../customHook/PageTitle";

const NotFound = () => {
  useTitle("Not Found")
  return (
    <div className="flex justify-center flex-col items-center h-[80vh]">
      <img loading="lazy" src={notFoundImage} alt="not Found" />
      <Link to="/home" className="bg-[#e77008] py-4 px-7 text-white rounded-xl text-lg font-medium hover:bg-[#02717e] transition-all duration-300">Go to home</Link>
    </div>
  )
}

export default NotFound

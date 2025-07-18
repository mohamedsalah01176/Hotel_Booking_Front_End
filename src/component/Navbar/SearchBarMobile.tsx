import { Search } from "lucide-react";

const SearchBarMobile = () => {
  return (
    <div className="flex items-center justify-center bg-white px-4 py-4 rounded-full shadow-lg w-full max-w-2xl mx-auto border-2 border-gray-100 ">
      <Search size={16} className=" mr-2" />
      <span className="text-sm ">Start your search</span>
    </div>
  );
};

export default SearchBarMobile;

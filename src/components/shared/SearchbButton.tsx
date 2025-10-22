import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <button
        className="w-[15.25rem] h-[3.25rem] flex items-center justify-center gap-2
        bg-gradient-to-r from-[#FF8000] to-[#C84D13]
        text-white rounded-[3.25rem] text-[0.875rem] font-semibold 
        shadow-md hover:scale-105 transition"
      >
        <Search className="w-5 h-5" />
        Search
      </button>
    </div>
  );
};

export default SearchButton;

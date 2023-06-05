import icons from "../utils/icons";
import * as api from "../api";
import { useState } from "react";

const { BiSearch } = icons;

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const response = await api.apiSearch(keyword);
      console.log("🚀 ~ handleSearch ~ response:", response);
    }
  };

  return (
    <div className="bg-main-200 px-4 py-2 rounded-full h-10 w-full flex items-center">
      <span className="text-gray-500">
        <BiSearch size={24} />
      </span>
      <input
        type="text"
        className="outline-none w-full p-2 bg-transparent"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default Search;

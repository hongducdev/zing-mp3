import icons from "../utils/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import * as actions from "../store/actions";
import path from "../utils/path";

const { BiSearch } = icons;

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({ q: keyword }).toString(),
      });
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

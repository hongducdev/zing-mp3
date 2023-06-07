import icons from "../utils/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import * as actions from "../store/actions";
import path from "../utils/path";

const { BiSearch, IoCloseOutline } = icons;

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singer } = useParams();

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
    <div className="px-4 py-2 rounded-full h-10 w-full flex items-center relative bg-main-200">
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
      {keyword && (
        <span
          className="absolute right-4 text-gray-500 cursor-pointer"
          onClick={() => setKeyword("")}
        >
          <IoCloseOutline size={24} />
        </span>
      )}
    </div>
  );
};

export default Search;

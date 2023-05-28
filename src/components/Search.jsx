import icons from "../utils/icons";

const {BiSearch} = icons;

const Search = () => {
  return (
    <div className="bg-main-200 px-4 py-2 rounded-full h-10 w-full flex items-center">
      <span className="text-gray-500">
        <BiSearch size={24} />
      </span>
      <input
        type="text"
        className="outline-none w-full p-2 bg-transparent"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;

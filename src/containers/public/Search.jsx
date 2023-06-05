import { Outlet } from "react-router-dom";

const Search = () => {
  return (
    <div className="w-full">
      <div className="h-[47px] border-b border-gray-400 flex items-center">
        <div className="px-[59px] flex items-center">
          <span className="text-2xl font-bold capitalize pr-5 border-r border-gray-400">
            Kết quả tìm kiếm
          </span>
          <div className="flex items-center gap-10 ml-5">
            <span className="uppercase text-sm font-medium border-b-2 border-main-500 text-main-500 hover:text-main-500 cursor-pointer ">
              Tất cả
            </span>
            <span className="uppercase text-sm font-medium">bài hát</span>
            <span className="uppercase text-sm font-medium">
              playlist/album
            </span>
            <span className="uppercase text-sm font-medium">nghệ sĩ</span>
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;

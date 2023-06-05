import React from "react";
import { useSelector } from "react-redux";
import { handleNumber } from "../../utils/fn";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);

  console.log("🚀 ~ SearchAll ~ searchData", searchData);

  return (
    <div className="px-[59px] w-full mt-8">
      <h3 className="text-xl font-bold mb-5">Nổi bật</h3>
      <div className="">
        {searchData?.top &&
          (searchData?.top.objectType === "artist" ? (
            <div className="bg-main-200 p-[10px] w-1/3 rounded-md flex items-center gap-4">
              <img
                src={searchData?.top?.thumbnail}
                alt="avatar"
                className="w-[84px] h-[84px] rounded-full"
              />
              <div className="flex flex-col gap-[6px] text-xs text-gray-600">
                <span className="text-xs">Nghệ sĩ</span>
                <span className="text-sm font-semibold">
                  {searchData?.top?.name}
                </span>
                <span className="">
                  {handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-main-200 p-[10px] w-1/3 rounded-md flex items-center gap-4">
              <img
                src={searchData?.top?.thumbnailM}
                alt="thumbnail"
                className="w-[84px] h-[84px] rounded-md"
              />
              <div className="flex flex-col gap-[6px] text-xs text-gray-600">
                <span className="">Bài hát</span>
                <span className="text-sm font-semibold text-black">
                  {searchData?.top?.title}
                </span>
                <span className="">{searchData?.top?.artistsNames}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchAll;

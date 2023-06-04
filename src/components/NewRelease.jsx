/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";

const { MdKeyboardArrowRight } = icons;

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  console.log("🚀 ~ NewRelease ~ newRelease:", newRelease)
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (isActive === 0) {
      setSongs(newRelease?.items?.all.slice(0, 12));
    }
    if (isActive === 1) {
      setSongs(newRelease?.items?.vPop.slice(0, 12));
    }
    if (isActive === 2) {
      setSongs(newRelease?.items?.others.slice(0, 12));
    }
  }, [isActive]);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold capitalize">{newRelease?.title}</h3>
        <span className="flex items-center gap-2 text-gray-600">
          Tất cả <MdKeyboardArrowRight size={20} />
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`${
            isActive === 0
              ? "border-main-500 bg-main-500 text-white"
              : "border-gray-400 bg-transparent"
          } border py-1 px-6 rounded-full text-xs uppercase`}
          onClick={() => setIsActive(0)}
        >
          Tất cả
        </button>
        <button
          className={`${
            isActive === 1
              ? "border-main-500 bg-main-500 text-white"
              : "border-gray-400 bg-transparent"
          } border py-1 px-6 rounded-full text-xs uppercase`}
          onClick={() => setIsActive(1)}
        >
          Việt Nam
        </button>
        <button
          className={`${
            isActive === 2
              ? "border-main-500 bg-main-500 text-white"
              : "border-gray-400 bg-transparent"
          } border py-1 px-6 rounded-full text-xs uppercase`}
          onClick={() => setIsActive(2)}
        >
          Quốc tế
        </button>
      </div>
      <div className="flex flex-wrap">
        {songs?.map((item) => (
          <div className="w-[45%] lg:w-[30%]" key={item.encodeId}>
            <SongItem
              thumbnail={item.thumbnailM}
              title={item?.title}
              sid={item?.encodeId}
              releaseDate={item?.releaseDate}
              artists={item?.artistsNames}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(NewRelease);

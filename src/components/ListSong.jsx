/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import { memo } from "react";

const ListSong = ({ totalDuration, isHideTime }) => {
  const hour = Math.floor(totalDuration / 3600);
  const minute = Math.floor((totalDuration - hour * 3600) / 60);

  const { songs } = useSelector((state) => state.music);

  return (
    <div className="w-full flex flex-col text-xs">
      {!isHideTime && (
        <div className="flex items-center justify-between uppercase px-[10px] py-4 font-medium text-gray-800">
          <span className="w-2/4">Bài hát</span>
          <span className="w-1/4">Album</span>
          <span className="w-1/4 justify-end flex">Thời gian</span>
        </div>
      )}
      <div className="">
        {songs &&
          songs?.map((song) => (
            <ListItem key={song.encodeId} songData={song} isHideNode />
          ))}
      </div>
      {totalDuration && (
        <span className="text-gray-500 mt-4">
          {songs?.length} bài hát • {hour} giờ {minute} phút
        </span>
      )}
    </div>
  );
};

export default memo(ListSong);

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { memo } from "react";
import icons from "../utils/icons";
import moment from "moment/moment";

const { IoMusicalNotesOutline } = icons;

const ListItem = ({ songData }) => {
  console.log("🚀 ~ ListItem ~ songData:", songData);
  return (
    <div className="flex items-center justify-between p-[10px]">
      <div className="flex items-center gap-[10px] w-2/4">
        <span>
          <IoMusicalNotesOutline />
        </span>
        <img
          src={songData?.thumbnail}
          alt="thumnail"
          className="w-10 h-10 rounded-sm object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">{songData?.title}</span>
          <span className="text-xs text-gray-500">{songData?.artistsNames}</span>
        </div>
      </div>
      <div className="w-1/4">
        {
          songData?.album?.title
        }
      </div>
      <div className="flex-1 flex justify-end w-1/4">
        {
          moment(songData?.duration * 1000).format("mm:ss")
        }
      </div>
    </div>
  );
};

export default memo(ListItem);

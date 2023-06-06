/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { memo } from "react";
import icons from "../utils/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { IoMusicalNotesOutline } = icons;

const ListItem = ({ songData, isHideAlbum }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-between p-[10px] border-b-[1px] border-[rgba(0. 0. 0. 0.5)] hover:bg-main-200 rounded-md cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            artists: songData?.artistsNames,
            sid: songData?.encodeId,
          })
        );
      }}
    >
      <div className="flex items-center gap-[10px] w-2/4">
        {!isHideAlbum && (
          <span>
            <IoMusicalNotesOutline />
          </span>
        )}
        <img
          src={songData?.thumbnail}
          alt="thumnail"
          className="w-10 h-10 rounded-sm object-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {songData?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songData?.artistsNames}
          </span>
        </div>
      </div>
      {!isHideAlbum && (
        <div className="w-1/4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
          {songData?.album?.title}
        </div>
      )}
      <div className="flex-1 flex justify-end w-1/4 text-xs">
        {moment(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListItem);

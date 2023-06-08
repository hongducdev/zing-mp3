/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { memo } from "react";
import icons from "../utils/icons";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { Link } from "react-router-dom";

const { IoMusicalNotesOutline, BsPlayFill } = icons;

const ListItem = ({ songData, isHideAlbum, isHideNode }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex items-center justify-between p-[10px] border-b-[1px] border-[rgba(0. 0. 0. 0.5)] group hover:bg-main-200 rounded-md cursor-pointer"
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(
          actions.setRecent({
            thumbnail: songData?.thumbnail,
            title: songData?.title,
            artists: songData?.artists,
            sid: songData?.encodeId,
          })
        );
      }}
    >
      <div className="flex items-center gap-[10px] w-2/4">
        {!isHideNode && (
          <span>
            <IoMusicalNotesOutline />
          </span>
        )}
        <div className="relative">
          <img
            src={songData?.thumbnail}
            alt="thumbnail"
            className="w-10 h-10 rounded-sm object-cover"
          />
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black bg-opacity-30 rounded-sm ">
            <BsPlayFill className="text-white text-2xl" />
            </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {songData?.title}
          </span>
          <span className="">
            {songData?.artists?.map((item, index) => (
              <span className="" key={item?.id}>
                <Link
                  to={item?.link?.split(".")[0]}
                  className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis hover:text-main-500"
                >
                  {item?.name}
                </Link>
                {index !== songData.artists.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      </div>
      {!isHideAlbum && (
        <Link
          to={songData?.album?.link?.split(".")[0]}
          className="w-1/4 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis hover:text-main-500"
        >
          {songData?.album?.title}
        </Link>
      )}
      <div className="flex-1 flex justify-end w-1/4 text-xs">
        {moment(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListItem);

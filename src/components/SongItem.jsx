/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import icons from "../utils/icons";
import AudioLoading from "./AudioLoading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { BsPlayFill } = icons;

const SongItem = ({ item }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.music);

  return (
    <div
      className="w-[45%] lg:w-[30%] flex-auto flex items-center gap-[10px] p-[10px] rounded-md cursor-pointer group hover:bg-main-200"
      onClick={() => {
        dispatch(actions.setCurSongId(item?.encodedId));
        dispatch(actions.play(true));
      }}
    >
      <div className="relative">
        <img
          src={item?.thumbnailM}
          alt="thumbnail"
          className="w-[60px] h-[60px] rounded"
        />
        <div className="bg-black bg-opacity-30 rounded text-white w-full h-full inset-0 absolute items-center justify-center hidden group-hover:flex">
          {isLoading ? <AudioLoading /> : <BsPlayFill size={24} />}
        </div>
      </div>
      <div className="">
        <h3 className="text-sm font-medium">{item?.title}</h3>
        <p className="text-xs text-gray-500">{item?.artistsNames}</p>
        <span className="text-xs text-gray-500">
          {moment(item?.releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItem);

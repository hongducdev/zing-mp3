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

const SongItem = ({
  thumbnail,
  title,
  artists,
  sid,
  releaseDate,
  order,
  percent,
  sm,
  style,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.music);

  return (
    <div
      className={`w-full flex-auto flex items-center gap-[10px] p-[10px] rounded-md cursor-pointer group hover:bg-main-200 ${
        order
          ? "text-white bg-white bg-opacity-10 hover:bg-opacity-30 py-[10px] px-4"
          : ""
      } ${style} `}
      onClick={() => {
        dispatch(actions.setCurSongId(sid));
        dispatch(actions.play(true));
        dispatch(actions.setRecent({
          thumbnail,
          title,
          artists,
          sid,
        }))
      }}
    >
      {order && (
        <span
          className={`text-3xl font-bold pr-2
      ${
        order === 1
          ? "text-[#4a90e2]"
          : order === 2
          ? "text-[#27bd9c]"
          : "text-[#e35050]"
      }
      `}
        >
          {order}
        </span>
      )}
      <div className="flex items-center gap-[10px]">
        <div className="relative">
          <img
            src={thumbnail}
            alt="thumbnail"
            className={`${
              sm ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
            } rounded`}
          />
          <div className="bg-black bg-opacity-30 rounded text-white w-full h-full inset-0 absolute items-center justify-center hidden group-hover:flex">
            {isLoading ? <AudioLoading /> : <BsPlayFill size={24} />}
          </div>
        </div>
        <div className="">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className={`text-xs ${order && "text-gray-300"}`}>
            {artists}
          </p>
          {releaseDate && (
            <span className="text-xs text-gray-500">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && (
        <span className="t text-white text-base font-bold ml-auto">
          {percent}%
        </span>
      )}
    </div>
  );
};

export default memo(SongItem);

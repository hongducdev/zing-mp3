/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as api from "../api";
import icons from "../utils/icons";

const {
  AiFillHeart,
  AiOutlineHeart,
  BiDotsHorizontalRounded,
  CiShuffle,
  CiRepeat,
  BsPlayFill,
  BsPauseFill,
  BiSkipNext,
  BiSkipPrevious,
} = icons;

const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState({});
  const [sourceSong, setSourceSong] = useState(null);
  // const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        api.apiGetDetailSong(curSongId),
        api.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) setSongInfo(res1.data.data);
      if (res2.data.err === 0) setSourceSong(res2.data.data["128"]);
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {}, [sourceSong]);

  const handleTogglePlay = () => {
    // setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-main-400 h-full px-5 flex items-center">
      <div className="w-[30%] flex-auto flex items-center gap-6">
        <div className="flex items-center gap-[10px]">
          <img
            src={songInfo?.thumbnailM}
            alt="thumnail"
            className="w-16 h-16 rounded-[4px] object-cover"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              {songInfo?.title}
            </span>
            <span className="text-xs text-gray-500">
              {songInfo?.artistsNames}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="p-1">
            <AiOutlineHeart size={16} />
          </span>
          <span className="p-1">
            <BiDotsHorizontalRounded size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex items-center flex-col">
        <div className="flex items-center gap-4 justify-center">
          <span className="p-1 cursor-pointer">
            <CiShuffle size={24} />
          </span>
          <span className="p-1 cursor-pointer">
            <BiSkipPrevious size={24} />
          </span>
          <span
            className="p-1 cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center border border-gray-500 hover:text-main-500"
            onClick={handleTogglePlay}
          >
            {isPlaying ? <BsPauseFill size={24} /> : <BsPlayFill size={24} />}
          </span>
          <span className="p-1 cursor-pointer">
            <BiSkipNext size={24} />
          </span>
          <span className="p-1 cursor-pointer">
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="">bar</div>
      </div>
      <div className="w-[30%] flex-auto">detail</div>
    </div>
  );
};

export default Player;

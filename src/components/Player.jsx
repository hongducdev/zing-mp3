/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import * as api from "../api";
import icons from "../utils/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import moment from "moment";

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
  const dispatch = useDispatch();
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState({});
  const [curTime, setCurTime] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  const [error, setError] = useState(null);

  const thumbRef = useRef(null);
  let intervalId;

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        api.apiGetDetailSong(curSongId),
        api.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      } else setError(res1.data.msg);
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        setError(res2.data.msg);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  // send error
  useEffect(() => {
    toast.error(error);
    console.log(error);
  }, [error]);

  // duration
  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime / audio.duration) * 100);
        thumbRef.current.style.right = `${100 - percent}%`;
        setCurTime(Math.round(audio.currentTime));
      }, 1000);
    } else {
      intervalId && clearInterval(intervalId);
    }
  }, [songInfo, isPlaying]);

  useEffect(() => {
    audio.pause();
    audio.load();
    if (isPlaying) audio.play();
  }, [audio]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
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
        <div className="flex items-center gap-4 justify-center mb-3">
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
        <div className="w-full flex items-center justify-center text-xs">
          <span className="">
            {moment(curTime * 1000).format("mm:ss") || "00:00"}
          </span>
          <div className="w-4/5 h-[3px] bg-main-200 mx-auto relative rounded-full">
            <div
              className="absolute rounded-full bg-main-500 h-full top-0 left-0"
              ref={thumbRef}
            ></div>
          </div>
          <span className="">
            {moment(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[30%] flex-auto">detail</div>
    </div>
  );
};

export default Player;

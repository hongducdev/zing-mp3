/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import * as api from "../api";
import icons from "../utils/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingSong from "./LoadingSong";

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
  RiRepeatOneLine,
  BsMusicNoteList,
  BsVolumeDown,
  BsVolumeMute,
} = icons;

const Player = ({ setIsShowSidebarRight }) => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState({});
  const [curTime, setCurTime] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  const [error, setError] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(100);

  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  var intervalId;

  useEffect(() => {
    const fetchDetailSong = async () => {
      setIsLoading(true);
      const [res1, res2] = await Promise.all([
        api.apiGetDetailSong(curSongId),
        api.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
        dispatch(actions.setCurSongData(res1.data.data));
        setCurTime(0);
        setIsLoading(false);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        toast.error(res2.data.msg);
        setAudio(new Audio());
        dispatch(actions.play(false));
        setCurTime(0);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent = Math.round((audio.currentTime / audio.duration) * 100);
        thumbRef.current.style.right = `${100 - percent}%`;
        setCurTime(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleToggleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.right = `${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurTime(Math.round(audio.currentTime));
  };

  const handlePrevSong = () => {
    if (songs) {
      let curSongIndex;
      songs.forEach((song, index) => {
        if (song.encodeId === curSongId) curSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[curSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleNextSong = () => {
    if (songs) {
      let curSongIndex;
      songs.forEach((song, index) => {
        if (song.encodeId === curSongId) curSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[curSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleToggleShuffle = () => {
    setIsShuffle(!isShuffle);
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
    audio.volume = e.target.value / 100;
  };

  const handleToggleMute = () => {
    if (audio.volume) {
      setVolume(0);
      audio.volume = 0;
    } else {
      setVolume(100);
      audio.volume = 1;
    }
  }

  return (
    <div className="bg-main-400 h-full px-5 flex items-center">
      <div className="w-[30%] flex-auto flex items-center gap-6">
        <div className="flex items-center gap-[10px]">
          <img
            src={songInfo?.thumbnailM}
            alt="thumbnail"
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
          <span
            className={`p-1 cursor-pointer ${
              isShuffle ? "text-main-500" : "text-black"
            }`}
            onClick={() => setIsShuffle(!isShuffle)}
          >
            <CiShuffle size={24} />
          </span>
          <span
            className={`p-1 ${
              !songs ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handlePrevSong}
          >
            <BiSkipPrevious size={24} />
          </span>
          <span
            className="p-1 cursor-pointer w-[40px] h-[40px] rounded-full flex items-center justify-center border border-gray-500 hover:text-main-500"
            onClick={handleTogglePlay}
          >
            {isLoading ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseFill size={24} />
            ) : (
              <BsPlayFill size={24} />
            )}
          </span>
          <span
            className={`p-1 ${
              !songs ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleNextSong}
          >
            <BiSkipNext size={24} />
          </span>
          <span
            className={`p-1 cursor-pointer ${
              repeatMode ? "text-main-500" : "text-black"
            }`}
            onClick={() => setRepeatMode((repeatMode + 1) % 3)}
          >
            {repeatMode === 1 ? (
              <RiRepeatOneLine size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        <div className="w-full flex items-center justify-center text-xs">
          <span className="">
            {moment(curTime * 1000).format("mm:ss") || "00:00"}
          </span>
          <div
            className="w-4/5 h-[3px] hover:h-[6px] bg-main-200 mx-auto relative rounded-full cursor-pointer"
            onClick={handleClickProgress}
            ref={trackRef}
          >
            <div
              className="absolute rounded-full bg-main-500 h-full top-0 left-0 bottom-0"
              ref={thumbRef}
            ></div>
          </div>
          <span className="">
            {moment(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[30%] flex justify-end items-center gap-4">
        <span className="cursor-pointer" onClick={
          handleToggleMute
        }>
          {
            +volume ? <BsVolumeDown size={26} /> : <BsVolumeMute size={26} />
          }
        </span>
        <input
          type="range"
          step={1}
          min={0}
          max={100}
          value={volume}
          onChange={handleChangeVolume}
        />
        <span
          className="p-2 rounded bg-main-500 cursor-pointer"
          onClick={() => setIsShowSidebarRight((prev) => !prev)}
        >
          <BsMusicNoteList size={16} />
        </span>
      </div>
    </div>
  );
};

export default Player;

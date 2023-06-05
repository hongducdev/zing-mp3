import { useEffect, useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import * as api from "../api";
import Scrollbars from "react-custom-scrollbars-2";

const { RiDeleteBinLine } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const { curSongData, curAlbumId, isPlaying } = useSelector(
    (state) => state.music
  );

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await api.apiGetDetailPlaylist(curAlbumId);
      if (response.data.err === 0) {
        setPlaylist(response.data.data);
      }
    };
    if ((curAlbumId, isPlaying)) {
      fetchAlbum();
    }
  }, [curAlbumId, isPlaying]);

  return (
    <div className="flex flex-col text-xs w-full px-2">
      <div className="h-[70px] flex-none py-[14px] flex items-center justify-between">
        <div className="flex items-center justify-between bg-main-200 font-medium p-[3px] rounded-full">
          <span
            className={`${
              !isRecent
                ? "bg-main-100 text-main-500 px-4 py-2 rounded-full"
                : "px-4 py-2"
            } cursor-pointer`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Danh sách phát
          </span>
          <span
            className={`${
              isRecent
                ? "bg-main-100 text-main-500 px-4 py-2 rounded-full"
                : "px-4 py-2"
            } cursor-pointer`}
            onClick={() => setIsRecent((prev) => !prev)}
          >
            Nghe gần đây
          </span>
        </div>
        <span
          className="p-2 rounded-full flex items-center justify-center bg-main-100 cursor-pointer"
          title="Xóa danh sách phát"
        >
          <RiDeleteBinLine size={20} />
        </span>
      </div>
      <div className="flex flex-col">
        <SongItem
          thumbnail={curSongData?.thumbnailM}
          title={curSongData?.title}
          artists={curSongData?.artistsNames}
          sid={curSongData?.sid}
          sm
          style="bg-main-500 text-white p-2"
        />
        <div className="mt-4 flex flex-col text-sm ">
          <span className="font-bold">Tiếp theo</span>
          <span className="">
            Từ playlist{" "}
            <span className="text-main-500 font-medium">{playlist?.title}</span>
          </span>
        </div>
        <div className="mt-2">
          <Scrollbars
            style={{
              width: "100%",
              height: "calc(100vh - 70px - 70px - 70px)",
              autoHide: true,
            }}
          >
            {playlist &&
              playlist?.song?.items?.map((song) => (
                <SongItem
                  key={song.encodeId}
                  thumbnail={song.thumbnailM}
                  title={song.title}
                  artists={song.artistsNames}
                  sid={song.encodeId}
                  sm
                />
              ))}
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;

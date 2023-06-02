import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import moment from "moment";
import ListSong from "../../components/ListSong";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import AudioLoading from "../../components/AudioLoading";
import icons from "../../utils/icons";

const { BsPlayFill } = icons;

const Album = () => {
  const { title, pid } = useParams();
  const { isPlaying } = useSelector((state) => state.music);
  const [detailPlaylist, setDetailPlaylist] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await api.apiGetDetailPlaylist(pid);
      if (response.data.err === 0) {
        setDetailPlaylist(response.data.data);
        dispatch(actions.loading(false));
        dispatch(actions.setPlaylist(response.data.data.song.items));
      }
    };
    fetchDetailPlaylist();
  }, [title, pid]);

  return (
    <div className="flex gap-8 w-full h-full px-[59px]">
      <div className="flex-none w-1/4">
        <div className="relative">
          <img
            src={detailPlaylist?.thumbnail}
            alt="thumbnail"
            className={`w-full object-cover shadow-md ${
              isPlaying ? "rounded-full animate-spin" : "rounded-md"
            } `}
          />
          <div
            className={`bg-black bg-opacity-0 hover:bg-opacity-40 w-full h-full absolute inset-0 flex items-center justify-center animate-none text-white group ${
              isPlaying ? "rounded-full animate-spin" : "rounded-md"
            }`}
          >
            <div className="p-2 group-hover:flex items-center justify-center border border-white rounded-full hidden ">
              {isPlaying ? <AudioLoading /> : <BsPlayFill size={30} />}
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-3 flex flex-col gap-1 text-sm text-gray-600">
          <h3 className="font-bold text-xl text-gray-900">
            {detailPlaylist?.title}
          </h3>
          <span className="">
            Cập nhật:{" "}
            {moment
              .unix(detailPlaylist?.contentLastUpdate)
              .format("DD/MM/YYYY")}
          </span>
          <span className="">{detailPlaylist?.artistsNames}</span>
          <span className="">
            {Math.round(detailPlaylist.like / 1000) + "K người yêu thích"}
          </span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "80%" }} autoHide>
        <div className="flex-auto flex flex-col overflow-y-auto">
          <span className="text-sm mb-3">
            <span className="text-gray-400">Lời tựa</span>{" "}
            {detailPlaylist?.description}
          </span>
          <div>
            <ListSong
              songs={detailPlaylist?.song?.items}
              totalDuration={detailPlaylist?.song?.totalDuration}
            />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;

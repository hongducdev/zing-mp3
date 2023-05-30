import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import moment from "moment";
import ListSong from "../../components/ListSong";
import { Scrollbars } from "react-custom-scrollbars-2";

const Album = () => {
  const { title, pid } = useParams();
  const [detailPlaylist, setDetailPlaylist] = useState({});

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await api.apiGetDetailPlaylist(pid);
      // console.log("🚀 ~ fetchDetailPlaylist ~ response:", response);
      if (response.data.err === 0) {
        setDetailPlaylist(response.data.data);
      }
    };
    fetchDetailPlaylist();
  }, [title, pid]);

  return (
    <div className="flex gap-8 w-full h-full px-[59px]">
      <div className="flex-none w-1/4">
        <img
          src={detailPlaylist?.thumbnail}
          alt="thumnail"
          className="w-full object-cover rounded-md shadow-md"
        />
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
      <Scrollbars style={{ width: "100%", height: "80%" }}>
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

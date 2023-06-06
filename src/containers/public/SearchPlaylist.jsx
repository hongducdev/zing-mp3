import React from "react";
import { useSelector } from "react-redux";
import * as api from "../../api";
import { SectionItem } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await api.apiGetArtist(searchData?.top?.alias);
      console.log("🚀 ~ fetch ~ response:", response);

      if (response.data.err === 0) setPlaylists(response.data.data.sections[1]);
    };
    fetch();
  }, [searchData]);

  console.log(playlists);

  return (
    <div className="px-[59px] w-full mt-8">
      <h3 className="text-xl font-bold mb-5 capitalize">Playlist/album</h3>
      <Scrollbars style={{ height: "calc(100vh - 200px)" }}>
        <div className="flex flex-wrap gap-5 items-start">
          {playlists?.items?.map((playlist) => (
            <SectionItem key={playlist.link} item={playlist} isShowTitle />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SearchPlaylist;

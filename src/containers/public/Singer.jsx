import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";

const Singer = () => {
  const { singer } = useParams();
  console.log("🚀 ~ Singer ~ singer:", singer);
  const [artistData, setArtistData] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.apiGetArtist(singer);
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    fetchData();
  }, [singer]);

  return <div className="flex flex-col w-full relative">
    <img src={artistData?.cover} alt="cover" className="" />
  </div>;
};

export default Singer;

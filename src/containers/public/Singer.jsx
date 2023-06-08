import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import icons from "../../utils/icons";
import { Artist, ListItem, SectionItem } from "../../components";
import { useDispatch } from "react-redux";
import actionType from "../../store/actions/actionType";
const { AiOutlineUserAdd, BsPlayFill } = icons;

const Singer = () => {
  const { singer } = useParams();
  const dispatch = useDispatch();
  const [artistData, setArtistData] = React.useState(null);

  useEffect(() => {
    dispatch({
      type: actionType.LOADING,
      payload: true,
    })
    const fetchData = async () => {
      const res = await api.apiGetArtist(singer);
      dispatch({
        type: actionType.LOADING,
        payload: false,
      })
      if (res.data.err === 0) {
        setArtistData(res.data.data);
      }
    };
    fetchData();
  }, [singer]);

  let artistSections = artistData?.sections;

  return (
    <div className="flex flex-col w-full relative">
      <div className="relative">
        <img
          src={artistData?.cover}
          alt="cover"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent px-[60px] py-6 flex flex-col justify-end">
          <div className="mb-4 gap-5 flex items-center">
            <h1 className="text-white font-bold text-[60px]">
              {artistData?.name}
            </h1>
            <span className="w-[52px] h-[52px] group hover:bg-main-500 bg-white rounded-full flex items-center justify-center hover:duration-300 hover:ease-in-out cursor-pointer">
              <BsPlayFill
                size={30}
                className="text-main-500 group-hover:text-white group-hover:duration-300 group-hover:ease-in-out"
              />
            </span>
          </div>
          <div className="text-white flex items-center gap-6">
            <span className="text-sm">
              {artistData?.follow.toLocaleString()} người quan tâm
            </span>
            <button className="uppercase text-xs py-1 px-6 rounded-full flex items-center gap-1 border border-white bg-[rgba(255,255,255,0.3)]">
              <AiOutlineUserAdd size={14} />
              <span>quan tâm</span>
            </button>
          </div>
        </div>
      </div>
      <div className="px-[59px]">
        <h3 className="text-xl font-bold my-5 capitalize">Bài hát nổi bật</h3>
        <div className="flex flex-wrap w-full justify-between gap-x-4">
          {artistSections
            ?.find((item) => item.sectionType === "song")
            ?.items?.slice(0, 6)
            .map((item) => (
              <div className="w-[45%] flex-auto" key={item.encodeId}>
                <ListItem songData={item} isHideAlbum isHideNode />
              </div>
            ))}
        </div>
        {artistSections
          ?.filter((item) => item.sectionType === "playlist")
          .map((item, index) => (
            <div className="" key={index}>
              <h3 className="text-xl font-bold my-5 capitalize">
                {item?.title}
              </h3>
              <div className="inline-flex gap-5">
                {item?.items?.slice(0, 5).map((item) => (
                  <SectionItem key={item.encodeId} item={item} />
                ))}
              </div>
            </div>
          ))}
        {artistSections
          ?.filter((item) => item.sectionType === "artist")
          .map((item, index) => (
            <div className="" key={index}>
              <h3 className="text-xl font-bold my-5 capitalize">
                {item?.title}
              </h3>
              <div className="inline-flex gap-5">
                {item?.items?.slice(0, 5).map((item) => (
                  <Artist
                    key={item.id}
                    thumbnail={item.thumbnailM}
                    name={item.name}
                    follow={item.totalFollow}
                    link={item.link}
                  />
                ))}
              </div>
            </div>
          ))}
        <h3 className="text-xl font-bold my-5 capitalize">
          Về {artistData?.name}
        </h3>
        <div className="flex gap-[30px]">
          <img
            src={artistData?.thumbnailM}
            alt="image"
            className="rounded-lg w-3/5 h-[400px] object-cover"
          />
          <div className="text-sm text-gray-700">
            <p
              className=" mb-12 line-clamp-5"
              dangerouslySetInnerHTML={{ __html: artistData?.biography || "Không có thông tin" }}
            ></p>
            <div className="flex items-center gap-12">
              <div className="flex flex-col gap-1">
                <span className="text-xl font-bold">
                  {artistData?.follow.toLocaleString()}
                </span>
                <span className="">Người quan tâm</span>
              </div>
              {artistData?.awards && (
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold">
                    {artistData?.awards.length}
                  </span>
                  <span className="">Giải thưởng</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-[200px] w-full"></div>
      </div>
    </div>
  );
};

export default Singer;

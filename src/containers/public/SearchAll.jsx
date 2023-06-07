import { useSelector } from "react-redux";
import { handleNumber } from "../../utils/fn";

import { Artist, ListItem, SectionItem } from "../../components";
import { Link } from "react-router-dom";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);


  return (
    <div className="px-[59px] w-full mt-8">
      <h3 className="text-xl font-bold mb-5 capitalize">Nổi bật</h3>
      <div className="flex items-center gap-7">
        {searchData?.top &&
          (searchData?.top.objectType === "artist" ? (
            <div className="bg-main-200 p-[10px] w-1/3 rounded-md flex items-center gap-4">
              <img
                src={searchData?.top?.thumbnail}
                alt="avatar"
                className="w-[84px] h-[84px] rounded-full"
              />
              <div className="flex flex-col gap-[6px] text-xs text-gray-600">
                <span className="text-xs">Nghệ sĩ</span>
                <Link
                  to={searchData?.top?.link}
                  className="text-sm font-semibold hover:text-main-500 hover:underline"
                >
                  {searchData?.top?.name}
                </Link>
                <span className="">
                  {handleNumber(searchData?.artists[0]?.totalFollow)} quan tâm
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-main-200 p-[10px] w-1/3 rounded-md flex items-center gap-4">
              <img
                src={searchData?.top?.thumbnailM}
                alt="thumbnail"
                className="w-[84px] h-[84px] rounded-md"
              />
              <div className="flex flex-col gap-[6px] text-xs text-gray-600">
                <span className="">Bài hát</span>
                <span className="text-sm font-semibold text-black">
                  {searchData?.top?.title}
                </span>
                <span className="">{searchData?.top?.artistsNames}</span>
              </div>
            </div>
          ))}

        {searchData?.songs?.slice(0, 2).map((item) => (
          <div
            className="bg-main-200 p-[10px] w-1/3 rounded-md flex items-center gap-4"
            key={item.encodeId}
          >
            <img
              src={item?.thumbnailM}
              alt="thumbnail"
              className="w-[84px] h-[84px] rounded-md"
            />
            <div className="flex flex-col gap-[6px] text-xs text-gray-600">
              <span className="">Bài hát</span>
              <span className="text-sm font-semibold text-black">
                {item?.title}
              </span>
              <span className="">{item?.artistsNames}</span>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold my-5 capitalize">Bài hát</h3>
      <div className="flex flex-wrap w-full justify-between gap-x-4">
        {searchData?.songs?.slice(0, 6).map((item) => (
          <div className="w-[45%] flex-auto" key={item.encodeId}>
            <ListItem songData={item} isHideAlbum isHideNode />
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold my-5 capitalize">Playlist/Album</h3>
      <div className="flex items-start gap-5">
        {searchData?.playlists?.slice(0, 5).map((item) => (
          <SectionItem key={item.encodeId} item={item} isShowTitle />
        ))}
      </div>
      <div className="">
        <h3 className="text-xl font-bold my-5 capitalize">Nghệ sĩ/OA</h3>
      </div>
      <div className="flex items-center gap-7 text-center">
        {searchData?.artists?.slice(0, 5).map((item) => (
          <Artist
            key={item.id}
            thumbnail={item.thumbnailM}
            name={item.name}
            follow={item.totalFollow}
            link={item.link}
          />
        ))}
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default SearchAll;

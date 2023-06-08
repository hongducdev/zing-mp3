/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import icons from "../utils/icons";
import { Link, useNavigate } from "react-router-dom";

const { BsPlayFill } = icons;

const SectionItem = ({ item, isShowTitle }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    const albumPath = item?.link?.split(".")[0];
    navigate(albumPath, {
      state: {
        playAlbum: true,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3 flex-auto justify-start w-1/5 text-sm cursor-pointer">
      <div className="relative group">
        <img
          src={item.thumbnailM}
          alt="thumbnail"
          className="w-full rounded-md"
        />
        <div className="w-full h-full absolute inset-0 bg-black bg-opacity-30 hidden group-hover:flex items-center justify-center rounded-md text-white">
          <div
            className="p-2 rounded-full border border-white flex items-center justify-center"
            onClick={() => handleClick(item)}
          >
            <BsPlayFill size={30} />
          </div>
        </div>
      </div>
      {!isShowTitle && (
        <p className="text-sm line-clamp-2 text-gray-800">
          {item.sortDescription}
        </p>
      )}
      {isShowTitle && (
        <div className="flex flex-col text-sm">
          <span className="font-bold hover:text-main-500 line-clamp-1">
            <Link to={item?.link?.split(".")[0]}>{item.title}</Link>
          </span>
          <span className="">
            {item?.artists?.map((item, index) => (
              <span className="" key={item?.id}>
                <Link
                  to={item?.link?.split(".")[0]}
                  className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis hover:text-main-500"
                >
                  {item?.name}
                </Link>
                {index !== item?.artists?.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
      {item.sortDescription === "" && (
        <div className="flex flex-col text-sm">
          <span className="font-bold hover:text-main-500 line-clamp-1">
            <Link to={item?.link?.split(".")[0]}>{item.title}</Link>
          </span>
          <span className="line-clamp-1">
            {item?.artists?.map((item, index) => (
              <span className="" key={item?.id}>
                <Link
                  to={item?.link?.split(".")[0]}
                  className="text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis hover:text-main-500"
                >
                  {item?.name}
                </Link>
                {index !== item?.artists?.length - 1 && ", "}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(SectionItem);

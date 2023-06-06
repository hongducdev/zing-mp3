/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */

import { memo } from "react";
import icons from "../utils/icons";
import { handleNumber } from "../utils/fn";

const { AiOutlineUserAdd } = icons;

const Artist = ({ thumbnail, name, follow }) => {
  return (
    <div className="flex flex-col gap-4 group">
      <div className="relative">
        <img
          src={thumbnail}
          alt="avatar"
          className="rounded-full object-cover"
        />
        <div className="bg-black bg-opacity-30 rounded-full absolute inset-0 hidden group-hover:block"></div>
      </div>
      <div>
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-sm font-medium hover:text-main-500">
            {name}
          </span>
          <span className="text-xs text-gray-600">
            {handleNumber(follow)} quan tâm
          </span>
        </div>
        <span className="text-xs text-white uppercase bg-main-500 rounded-full px-5 py-2 inline-flex items-center justify-center">
          <AiOutlineUserAdd size={20} />
          quan tâm
        </span>
      </div>
    </div>
  );
};

export default memo(Artist);

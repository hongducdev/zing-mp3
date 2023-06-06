/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import icons from "../utils/icons";
import SectionItem from "./SectionItem";

const { MdKeyboardArrowRight } = icons;

const Section = ({ data }) => {
  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold capitalize">{data?.title}</h3>
        <span className="flex items-center gap-2 text-gray-600">
          Tất cả <MdKeyboardArrowRight size={20} />
        </span>
      </div>
      <div className="flex items-start gap-5">
        {data &&
          data?.items
            ?.slice(0, 5)
            .map((item) => <SectionItem key={item.encodeId} item={item} />)}
      </div>
    </div>
  );
};

export default memo(Section);

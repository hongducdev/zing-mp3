import icons from "../utils/icons";
import Search from "./Search";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-6 w-full">
        <div className="flex items-center gap-6 text-[#afadae]">
          <span className="">
            <AiOutlineArrowLeft size={24} />
          </span>
          <span className="">
            <AiOutlineArrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="">dang nhap</div>
    </div>
  );
};

export default Header;

import icons from "../utils/icons";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-6 w-full">
        <div className="flex items-center gap-6 text-slate-800 cursor-pointer">
          <span className="">
            <AiOutlineArrowLeft size={24} onClick={() => navigate(-1)} />
          </span>
          <span className="">
            <AiOutlineArrowRight size={24} onClick={() => navigate(1)} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="flex-none">
        <button className="text-white bg-main-500 px-10 py-2 rounded-full">
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Header;

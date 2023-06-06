import { NavLink, Outlet } from "react-router-dom";
import { searchMenu } from "../../utils/menu";
import { useSelector } from "react-redux";

const Search = () => {
  const baseClasses =
    "uppercase text-sm font-medium  hover:text-main-500 cursor-pointer leading-[46px]";

  const { keyword } = useSelector((state) => state.music);

  return (
    <div className="w-full">
      <div className="h-[47px] border-b border-gray-400 flex items-center">
        <div className="px-[59px] flex items-center">
          <span className="text-2xl font-bold capitalize pr-5 border-r border-gray-400">
            Kết quả tìm kiếm
          </span>
          <div className="flex items-center gap-10 ml-5">
            {searchMenu.map((item) => (
              <NavLink
                to={`${item.path}?q=${keyword}`}
                key={item.path}
                className={({ isActive }) =>
                  isActive
                    ? `${baseClasses} border-b-2 border-main-500 text-main-500`
                    : `${baseClasses} text-gray-500`
                }
              >
                {item.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;

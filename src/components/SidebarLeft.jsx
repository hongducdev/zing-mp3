import { Link, NavLink } from "react-router-dom";
import { sidebarMenu } from "../utils/menu";

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[#32323D] text-[13px] flex gap-[12px] items-center";
const activeStyle =
  "py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-[12px] items-center";

const SidebarLeft = () => {
  return (
    <div className="flex flex-col bg-main-200">
      <div className="w-full h-[70px] py-4 px-6 flex items-center justify-start">
        <Link to="/">
          <img src="/logo-light.svg" alt="logo" className="w-[120px] h-10" />
        </Link>
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;

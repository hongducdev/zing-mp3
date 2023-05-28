import { Link, NavLink } from "react-router-dom";
import { sidebarMenu } from "../utils/menu";

const SidebarLeft = () => {
  return (
    <div className="flex flex-col">
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
            className="flex items-center justify-start w-full h-[50px] px-6 hover:bg-gray-100"
          >
            <div className="w-[30px] h-[30px] mr-4">
              {
                item.icons
              }
            </div>
            <span className="text-sm font-medium">Home</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;

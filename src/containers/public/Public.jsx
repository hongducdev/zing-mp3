import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto">
          <Outlet />
        </div>
        <div className="w-[329px] flex-none">
          <SidebarRight />
        </div>
      </div>
      <div className="flex-none h-[90px]">
        <Player />
      </div>
    </div>
  );
};

export default Public;

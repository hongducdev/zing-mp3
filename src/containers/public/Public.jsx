import { Outlet } from "react-router-dom";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
  return (
    <div className="w-full h-screen flex flex-col bg-main-300 relative">
      <div className="w-full h-full flex flex-auto">
        <div className="w-[240px] flex-none">
          <SidebarLeft />
        </div>
        <div className="flex-auto overflow-hidden">
          <div className="h-[70px] px-[59px] flex items-center mb-5">
            <Header />
          </div>
          <Outlet />
        </div>
        <div className="w-[329px] flex-none hidden 1600:flex animate-slide-left">
          <SidebarRight />
        </div>
      </div>
      <div className="h-[90px] fixed bottom-0 left-0 right-0 z-10 w-full">
        <Player />
      </div>
    </div>
  );
};

export default Public;

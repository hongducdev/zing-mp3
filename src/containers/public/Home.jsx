import { Header, Slide } from "../../components";
import * as api from "../../api";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await api.getHome();
      console.log("🚀 ~ fetchDataHome ~ response:", response);
    };
    fetchDataHome();
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="h-[70px] px-[59px] flex items-center">
        <Header />
      </div>
      <div className="w-full">
        <Slide />
      </div>
    </div>
  );
};

export default Home;

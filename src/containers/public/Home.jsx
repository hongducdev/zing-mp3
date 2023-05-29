import { Slide } from "../../components";
import * as api from "../../api";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await api.apiGetHome();
      console.log("🚀 ~ fetchDataHome ~ response:", response);
    };
    fetchDataHome();
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="w-full">
        <Slide />
      </div>
    </div>
  );
};

export default Home;

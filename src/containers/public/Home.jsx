import { Slider } from "../../components";
import * as api from "../../api";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await api.apiGetHome();
    };
    fetchDataHome();
  }, []);

  return (
    <div className="overflow-y-auto">
      <div className="w-full">
        <Slider />
      </div>
    </div>
  );
};

export default Home;

import { Section, Slider } from "../../components";
import * as api from "../../api";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Home = () => {
  useEffect(() => {
    const fetchDataHome = async () => {
      const response = await api.apiGetHome();
      console.log("🚀 ~ fetchDataHome ~ response:", response);
    };
    fetchDataHome();
  }, []);

    const { day, newEveryDay, top100, album } = useSelector((state) => state.app);


  return (
    <div className="overflow-y-auto">
      <div className="w-full">
        <Slider />
        <Section data = {day}/>
        <Section data = {newEveryDay}/>
        <Section data = {top100}/>
        <Section data = {album}/>
      </div>
    </div>
  );
};

export default Home;

import { ChartSection, NewRelease, Section, Slider } from "../../components";
import { useSelector } from "react-redux";

const Home = () => {
  const { playlist } = useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto">
      <div className="w-full">
        <Slider />
        {playlist?.map((item) => (
          <Section data={item} key={item.title} />
        ))}
        <NewRelease />
        <ChartSection />
        <div className="w-full h-[100px]"></div>
      </div>
    </div>
  );
};

export default Home;

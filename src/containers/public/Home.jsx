import { ChartSection, NewRelease, Section, Slider } from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { weekChart, playlist } = useSelector((state) => state.app);

  return (
    <div className="overflow-y-auto">
      <div className="w-full">
        <Slider />
        {playlist?.map((item) => (
          <Section data={item} key={item.title} />
        ))}
        <NewRelease />
        <ChartSection />
        {/* <div className="flex items-center px-[59px] w-full my-12 gap-4">
          {weekChart?.map((item) => (
            <Link key={item.link} to={item.link.split(".")[0]} className="">
              <img
                src={item?.banner}
                alt="cover"
                className="w-full object-cover rounded-md"
              />
            </Link>
          ))}
        </div> */}
        <div className="w-full h-[500px]"></div>
      </div>
    </div>
  );
};

export default Home;

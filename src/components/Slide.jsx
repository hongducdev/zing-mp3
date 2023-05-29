import { useSelector } from "react-redux";
const Slide = () => {
  const { banner } = useSelector((state) => state.app);

  console.log(banner);

  return (
    <div>
      {banner.map((item) => (
        <div className="" key={item.encodeId}>
          <img src={item.banner} alt="" className="w-1/3 object-contain" />
        </div>
      ))}
    </div>
  );
};

export default Slide;

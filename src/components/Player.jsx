import { useSelector } from "react-redux";

const Player = () => {
  const { curSongId } = useSelector((state) => state.music);

  return (
    <div className="bg-main-400 h-full px-5 flex items-center">
      <div className="w-[30%] flex-auto">detail</div>
      <div className="w-[40%] flex-auto">detail</div>
      <div className="w-[30%] flex-auto">detail</div>
    </div>
  );
};

export default Player;

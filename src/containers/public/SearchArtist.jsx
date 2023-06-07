import { useSelector } from "react-redux";
import { Artist } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";

const SearchArtist = () => {
  const { searchData } = useSelector((state) => state.music);

  return (
    <div className="px-[59px] w-full mt-8">
      <h3 className="text-xl font-bold mb-5 capitalize">Nghệ sĩ/OA</h3>
      <Scrollbars style={{ height: "calc(100vh)" }}>
        <div className="flex gap-7 justify-start flex-wrap text-center">
          {searchData?.artists?.map((item) => (
            <Artist
              key={item.id}
              thumbnail={item.thumbnailM}
              name={item.name}
              follow={item.totalFollow}
              link={item.link}
            />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
};

export default SearchArtist;

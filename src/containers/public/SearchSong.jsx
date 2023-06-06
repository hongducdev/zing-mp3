import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Scrollbars from "react-custom-scrollbars-2";
import { ListSong } from "../../components";

const SearchSong = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.music);

  useEffect(() => {
    dispatch(actions.getSearchSong(searchData?.top?.id));
  }, [searchData]);

  return (
    <div className="px-[59px] w-full mt-8">
      <h3 className="text-xl font-bold mb-5 capitalize">Bài hát</h3>
      <Scrollbars style={{ height: "calc(100vh - 200px)" }}>
        <ListSong isHideTime />
      </Scrollbars>
    </div>
  );
};

export default SearchSong;

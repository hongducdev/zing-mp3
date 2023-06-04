import { Routes, Route } from "react-router-dom";
import {
  Album,
  Home,
  Login,
  Public,
  WeekRank,
  ZingChart,
} from "./containers/public";
import path from "./utils/path";
import { useEffect } from "react";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
          <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
          <Route path={path.WEEKRANK__TITLE__PID} element={<WeekRank />} />
          <Route path={path.ZINGCHART} element={<ZingChart />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

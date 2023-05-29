/* eslint-disable no-async-promise-executor */
import actionType from "./actionType";
import * as api from "../../api";

export const getHome = () => async (dispatch) => {
  try {
    const response = await api.apiGetHome();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_HOME,
        homeData: response.data.data.items,
      });
    } else {
      dispatch({
        type: actionType.GET_HOME,
        homeData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_HOME,
      homeData: null,
    });
  }
};

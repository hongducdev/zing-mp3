import actionType from "../actions/actionType";

const initState = {
  homeData: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_HOME:
      return state;

    default:
      break;
  }
};

export default appReducer;

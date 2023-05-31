import actionType from "../actions/actionType";

const initState = {
  banner: [],
  day: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionType === "banner")
            ?.items || null,
        day:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
      };

    default:
      return state;
  }
};

export default appReducer;

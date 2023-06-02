import actionType from "../actions/actionType";

const initState = {
  banner: [],
  day: {},
  newEveryDay: {},
  top100: {},
  album: {},
  newRelease: {},
  isLoading: false,
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
        newEveryDay:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        album:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
      };
    case actionType.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      }

    default:
      return state;
  }
};

export default appReducer;

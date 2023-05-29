import actionType from "../actions/actionType";

const initState = {
  curSongId: null,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      }

    default:
      return state;
  }
};

export default musicReducer;

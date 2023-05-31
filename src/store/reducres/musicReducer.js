import actionType from "../actions/actionType";

const initState = {
  curSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case actionType.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionType.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };

    case actionType.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };

    default:
      return state;
  }
};

export default musicReducer;

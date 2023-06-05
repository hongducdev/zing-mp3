import actionType from "../actions/actionType";

const initState = {
  curSongId: null,
  curSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  curAlbumId: null,
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

    case actionType.SET_CUR_SONG_DATA:
      return {
        ...state,
        curSongData: action.data || null,
      };
    case actionType.SET_CUR_ALBUM_ID:
      return {
        ...state,
        curAlbumId: action.aid || null,
      };

    default:
      return state;
  }
};

export default musicReducer;

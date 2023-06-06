/* eslint-disable no-case-declarations */
import actionType from "../actions/actionType";

const initState = {
  curSongId: null,
  curSongData: null,
  isPlaying: false,
  atAlbum: false,
  songs: null,
  curAlbumId: null,
  recentSongs: [],
  searchData: {},
  keyword: "",
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

    case actionType.SET_RECENT:
      var songs = state.recentSongs;
      if (action.data) {
        if (state.recentSongs.some((i) => i.sid === action.data.sid)) {
          songs = songs.filter((i) => i.sid !== action.data.sid);
        }
        if (songs.length > 20) {
          songs = songs.filter((i, index, self) => index !== self.length - 1);
        }
        songs = [action.data, ...songs];
      }
      return {
        ...state,
        recentSongs: songs,
      };

    case actionType.SEARCH:
      return {
        ...state,
        searchData: action.data || {},
        keyword: action.keyword || "",
      };

    default:
      return state;
  }
};

export default musicReducer;

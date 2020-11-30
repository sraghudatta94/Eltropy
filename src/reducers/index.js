import { combineReducers } from "redux";
import {
  loadSongsReducer,
  favouriteReducer,
  categoryReducer,
  searchReducer
} from "./reducers.js";

export default combineReducers({
  allSongs: loadSongsReducer,
  favourites: favouriteReducer,
  categories: categoryReducer,
  searchResults: searchReducer
});

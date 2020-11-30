import axios from "axios";
import {
  SONGS_LIST,
  API_ERROR,
  FAVOURITE,
  UNFAVOURITE,
  ADD_CATEGORIES,
  SEARCH_SONGS
} from "./types";

export const loadAllSongs = limit => async dispatch => {
  const response = await axios.get(
    "https://itunes.apple.com/us/rss/topalbums/limit=100/json"
  );
  if (response.data.error) {
    console.log("dispatching error - " + response.data.error);
    dispatch({
      type: API_ERROR,
      payload: response.data
    });
  } else {
    // console.log("dispatching SIGN_IN response -> " + response.data);
    dispatch({
      type: SONGS_LIST,
      payload: response.data
    });
  }
};

export const markFavourite = songId => async dispatch => {
  dispatch({
    type: FAVOURITE,
    payload: songId
  });
};

export const unmarkFavourite = songId => async dispatch => {
  dispatch({
    type: UNFAVOURITE,
    payload: songId
  });
};

export const fetchCategories = songs => async dispatch => {
  var categories = [];
  for (let i = 0; i < songs.length; i++) {
    categories.push({
      id: songs[i].category.attributes["im:id"],
      name: songs[i].category.attributes["term"]
    });
  }
  dispatch({
    type: ADD_CATEGORIES,
    payload: categories
  });
};

export const searchSongs = (name, songs) => async dispatch => {
  console.log("searchSong " + name);
  var results = [];
  // var pattern = new RegExp(`${name}/gim`);
  var pattern = new RegExp(`^.*(${name}).*$`, "gim");
  for (let i = 0; i < songs.length - 90; i++) {
    const element = songs[i];
    if (pattern.exec(element["im:name"]["label"]) != null) {
      console.log("match");
      results.push(element);
    }
  }
  console.log("Results of search");
  console.log(results);
  dispatch({
    type: SEARCH_SONGS,
    payload: results
  });
};

export const clearSearch = () => async dispatch => {
  var results = [];
  dispatch({
    type: SEARCH_SONGS,
    payload: results
  });
};

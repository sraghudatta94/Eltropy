import _ from "lodash";
import {
  SONGS_LIST,
  FAVOURITE,
  UNFAVOURITE,
  ADD_CATEGORIES,
  SEARCH_SONGS
} from "../actions/types";

export const loadSongsReducer = (state = [], action) => {
  switch (action.type) {
    case SONGS_LIST:
      //   console.log(
      //     action.type + " in reducer payload ->" + JSON.stringify(action.payload)
      //   );
      // return [...state, ...action.payload.feed.entry];
      return [...action.payload.feed.entry];
    default:
      return state;
  }
};
export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      //   console.log(
      //     action.type + " in reducer payload ->" + JSON.stringify(action.payload)
      //   );
      return _.keyBy(action.payload, "id");
    default:
      return state;
  }
};
export const searchReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_SONGS:
      //   console.log(
      //     action.type + " in reducer payload ->" + JSON.stringify(action.payload)
      //   );
      // return _.keyBy(action.payload, "id");
      return [...action.payload];
    default:
      return state;
  }
};

export const favouriteReducer = (state = [], action) => {
  switch (action.type) {
    case FAVOURITE:
      console.log(state);
      console.log(
        action.type + " in reducer payload ->" + JSON.stringify(action.payload)
      );
      return [...state, action.payload];
    case UNFAVOURITE:
      console.log(
        action.type + " in reducer payload ->" + JSON.stringify(action.payload)
      );
      console.log(
        _.remove(state, id => {
          return id == action.payload;
        })
      );
      _.remove(...state, id => {
        console.log("loop" + id + "---" + action.payload);
        return id == action.payload;
      });
      return [...state];
    //   [
    // ...state,
    //   _.remove(action.payload, id => {
    //     id == action.payload;
    //   });
    //   ];
    // action.payload];
    default:
      return state;
  }
};

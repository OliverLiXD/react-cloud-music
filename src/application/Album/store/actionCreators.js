
import { fromJS } from "immutable";

import * as actionTypes from "./constants";
import { getCurrentAlbumRequest } from "../../../api/request";

export const changeCurrentAlbum = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENT_ALBUM,
    data: fromJS(data)
  };
}

export const changeEnterLoading = (data) => {
  return {
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
  };
}

export const getCurrentAlbum = (id) => {
  return (dispatch) => {
    getCurrentAlbumRequest(id).then((data) => {
      const currentAlbum = data.playlist;
      dispatch(changeCurrentAlbum(currentAlbum));
      dispatch(changeEnterLoading(false));
    }).catch(() => {console.log("getCurrentAlbum err")});
  }
}
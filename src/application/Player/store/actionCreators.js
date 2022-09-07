import { fromJS } from "immutable";
import * as actionTypes from "./constants";

import { getSongDetailRequest } from '../../../api/request';
import { INSERT_SONG } from './constants';


export const changeFullScreen = (data) => {
  return {
    type: actionTypes.CHANGE_FULL_SCREEN,
    data
  }
}

export const changePlayingState = (data) => {
  return {
    type: actionTypes.CHANGE_PLAYING_STATE,
    data
  }
}

export const changeSequencePlayList = (data) => {
  return {
    type: actionTypes.CHANGE_SEQUENCE_PLAYLIST,
    data: fromJS(data)
  }
}

export const changePlayList = (data) => {
  return {
    type: actionTypes.CHANGE_PLAYLIST,
    data: fromJS(data)
  }
}

export const changeMode = (data) => {
  return {
    type: actionTypes.CHANGE_MODE,
    data
  }
}

export const changeCurrentIndex = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENT_INDEX,
    data
  }
}

export const changeShowPlayList = (data) => {
  return {
    type: actionTypes.CHANGE_SHOW_PLAYLIST,
    data
  }
}

export const changeCurrentSong = (data) => {
  return {
    type: actionTypes.CHANGE_CURRENT_SONG,
    data: fromJS(data)
  }
}

export const insertSong = (data) => ({
  type: INSERT_SONG,
  data
});

export const getSongDetail = (id) => {
  return (dispatch) => {
    getSongDetailRequest (id).then (data => {
      let song = data.songs [0];
      dispatch (insertSong ( song));
    })
  }
}

import { fromJS } from "immutable";
import { getHotSingerListRequest, getSingerListRequest } from "../../../api/request";

import * as actionTypes from "./constants";

export const changeSingerList = (data) => {
  return {
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
  };
}

export const changeEnterLoading = (data) => {
  return {
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
  };
}

export const changePullUpLoading = (data) => {
  return {
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
  };
}

export const changePullDownLoading = (data) => {
  return {
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
  };
}

export const changePageCount = (data) => {
  return {
    type: actionTypes.CHANGE_PAGE_COUNT,
    data
  };
}

export const getSingerList = (category, alpha) => {
  return (dispatch) => {
    getSingerListRequest(category, alpha, 0).then((res) => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {console.log("getSingerList err")});
  }
}

export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();

    getSingerListRequest(category, alpha, pageCount).then((res) => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {console.log("refreshMoreSingerList err")});
  }
}

export const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then((res) => {
      const data = res.artists;
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {console.log("getHotSingerList err")})
  }
}

export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();

    getHotSingerListRequest(pageCount).then((res) => {
      const data = [...singerList, ...res.artists];
      dispatch(changeSingerList(data));
      dispatch(changeEnterLoading(false));
      dispatch(changePullDownLoading(false));
    }).catch(() => {console.log("refreshMoreHotSingerList err")})
  }
}
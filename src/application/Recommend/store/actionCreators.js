import { fromJS } from "immutable";

import * as actionTypes from "./constants";
import { getBannerRequest, getRecommendListRequest } from "../../../api/request";

export const getBannerList = () => {
  return (dispatch) => {
    getBannerRequest().then(
      (data) => {
        // debugger;
        dispatch(changeEnterLoading(false));
        dispatch(changeBannerList(data.banners));
      }
    ).catch(() => {console.log("getBannerRequest err")});
  }
}

export const getRecommendList = () => {
  return (dispatch) => {
    getRecommendListRequest().then(
      (data) => {
        // debugger;
        dispatch(changeEnterLoading(false));
        dispatch(changeRecommendList(data.result));
      }
    ).catch(() => {console.log("getRecommendList err")});
  }
}

export const changeBannerList = (data) => {
  return {
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
  }
}

export const changeRecommendList = (data) => {
  return {
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
  }
}

export const changeEnterLoading = (data) => {
  return {
    type: actionTypes.CHANGE_ENTER_LOADING,
    data: fromJS(data)
  }
}
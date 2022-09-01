import { fromJS } from "immutable";

import { getRankListRequest } from "../../../api/request";
import * as actionTypes from "./constants";

export const changeRankList = (data) => {
  return {
    type: actionTypes.CHANGE_RANK_LIST,
    data: fromJS(data)
  }
}

export const changeLoading = (data) => {
  return {
    type: actionTypes.CHANGE_LOADING,
    data
  }
}

export const getRankList = () => {
  return (dispatch) => {
    getRankListRequest().then((data) => {
      const list = data && data.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    }).catch(() => {console.log("getRankList err")});
  }
}
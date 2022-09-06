import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";

import { getRankList } from "./store/actionCreators";
import { findTrackIndex } from "../../api/utils";
import Scroll from "../../baseUI/Scroll";
import { Container } from "./style";
import RankList from "../../components/RankList";
import Album from "../Album";

function Rank(props) {
  const { rankList, loading, songsCount } = props;
  const { getRankListDispatch } = props;

  const list = rankList ? rankList.toJS() : [];

  const trackIndex = findTrackIndex(list);
  const officialList = list.slice(0, trackIndex);
  const globalList = trackIndex === list.length ? [] : list.slice(trackIndex);

  const enterDetail = useCallback((id) => {
    props.history.push(`/rank/${id}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getRankListDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let displayStyle = loading ? {"display":"none"}:  {"display": ""};
  // debugger;
  return (
    <Container songsCount={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}> 官方榜 </h1>
          <RankList rankList={officialList} enterDetail={enterDetail}></RankList>
          <h1 className="global" style={displayStyle}> 全球榜 </h1>
          <RankList rankList={globalList} global={true} enterDetail={enterDetail}></RankList>
        </div>
      </Scroll>
      <Route path={"/rank/:id"} component={Album}></Route>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    rankList: state.getIn(["rank", "rankList"]),
    loading: state.getIn(["rank", "loading"]),
    songsCount: state.getIn(['player', 'playList']).size,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDispatch() {
      dispatch(getRankList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
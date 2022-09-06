import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import { Route } from "react-router";

import HorizontalItem from "../../baseUI/HorizontalItem";
import { NavContainer, ListContainer } from "./style"
import SingerList from "../../components/SingerList";
import Scroll from "../../baseUI/Scroll";
import { 
  getSingerList, 
  getHotSingerList, 
  changeEnterLoading, 
  changePageCount, 
  refreshMoreSingerList, 
  changePullUpLoading, 
  changePullDownLoading, 
  refreshMoreHotSingerList 
} from './store/actionCreators';
import Loading from "../../baseUI/Loading";
import Singer from "../Singer";

function Singers(props) {
  const categoryTypes = [{
    name: "华语男",
    key: "1001"
  },
  {
    name: "华语女",
    key: "1002"
  },
  {
    name: "华语组合",
    key: "1003"
  },
  {
    name: "欧美男",
    key: "2001"
  },
  {
    name: "欧美女",
    key: "2002"
  },
  {
    name: "欧美组合",
    key: "2003"
  },
  {
    name: "日本男",
    key: "6001"
  },
  {
    name: "日本女",
    key: "6002"
  },
  {
    name: "日本组合",
    key: "6003"
  },
  {
    name: "韩国男",
    key: "7001"
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  },
  ];
  
  // 歌手首字母
  const alphaTypes = [{
      key: "A",
      name: "A"
    },
    {
      key: "B",
      name: "B"
    },
    {
      key: "C",
      name: "C"
    },
    {
      key: "D",
      name: "D"
    },
    {
      key: "E",
      name: "E"
    },
    {
      key: "F",
      name: "F"
    },
    {
      key: "G",
      name: "G"
    },
    {
      key: "H",
      name: "H"
    },
    {
      key: "I",
      name: "I"
    },
    {
      key: "J",
      name: "J"
    },
    {
      key: "K",
      name: "K"
    },
    {
      key: "L",
      name: "L"
    },
    {
      key: "M",
      name: "M"
    },
    {
      key: "N",
      name: "N"
    },
    {
      key: "O",
      name: "O"
    },
    {
      key: "P",
      name: "P"
    },
    {
      key: "Q",
      name: "Q"
    },
    {
      key: "R",
      name: "R"
    },
    {
      key: "S",
      name: "S"
    },
    {
      key: "T",
      name: "T"
    },
    {
      key: "U",
      name: "U"
    },
    {
      key: "V",
      name: "V"
    },
    {
      key: "W",
      name: "W"
    },
    {
      key: "X",
      name: "X"
    },
    {
      key: "Y",
      name: "Y"
    },
    {
      key: "Z",
      name: "Z"
    }
  ];

  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount, songsCount } = props;
  const { getHotSingerListDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

  const handleUpdateCatetory = (val) => {
    setCategory(val);
    updateDispatch(category, val);
  }

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(val, alpha)
  }

  useEffect(() => {
    getHotSingerListDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  return (
    <div>
      <NavContainer>
        <HorizontalItem list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCatetory} oldValue={category}></HorizontalItem>
        <HorizontalItem list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldValue={alpha}></HorizontalItem>
      </NavContainer>
      <ListContainer songsCount={songsCount}>
        <Scroll
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
          onScroll={forceCheck}
        >
          <SingerList singerList={singerList}></SingerList>
        </Scroll>
        <Loading show={enterLoading}></Loading>
      </ListContainer >
      <Route path={"/singers/:id"} component={Singer}></Route>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    singerList: state.getIn(["singers", "singerList"]),
    enterLoading: state.getIn(["singers", "enterLoading"]),
    pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
    pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
    pageCount: state.getIn(["singers", "pageCount"]),
    songsCount: state.getIn(['player', 'playList']).size,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerListDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count+1));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
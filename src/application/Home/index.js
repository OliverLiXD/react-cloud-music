import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';

import Recommend from "../Recommend";
import Rank from "../Rank";
import Singers from "../Singers";
import Player from "../Player";
import Search from "../Search";
import { Top, Tab, TabItem } from "./style";

function Home() {
  const [showSearch, setShowSearch] = useState(false);

  const setShowSearchState = useCallback((state) => {
    setShowSearch(state);
  }, [setShowSearch]);

  return (
    <div className="Home">
      <Top>
        <i className="iconfont">&#xe649;</i>
        <span className="title">网抑云</span>
        <i className="iconfont"
          onClick={() => {setShowSearch(true)}}
        >&#xe67d;</i>
      </Top>
      <Tab>
        <NavLink to={"/recommend"} activeClassName="selected"><TabItem><span></span>推荐</TabItem></NavLink>
        <NavLink to={"/singers"} activeClassName="selected"><TabItem><span>歌手</span></TabItem></NavLink>
        <NavLink to={"/rank"} activeClassName="selected"><TabItem><span>排行榜</span></TabItem></NavLink>
      </Tab>
      <Switch>
        <Route path={"/recommend"} component={Recommend}></Route>
        <Route path={"/rank"} component={Rank}></Route>
        <Route path={"/singers"} component={Singers}></Route>
        <Redirect to={"/recommend"}></Redirect>
      </Switch>
      <Search showSearch={showSearch} setShowSearchState={setShowSearchState}></Search>
      <Player></Player>
    </div>
  )
}

export default React.memo(Home);
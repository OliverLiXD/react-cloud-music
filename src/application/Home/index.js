import React from "react";
import { Route, Redirect, Switch, NavLink } from 'react-router-dom';

import Recommend from "../Recommend";
import Rank from "../Rank";
import Singers from "../Singers";
import { Top, Tab, TabItem } from "./style";
import Player from "../Player";

function Home() {
  return (
    <div className="Home">
      <Top>
        <i className="iconfont">&#xe649;</i>
        <span className="title">网抑云</span>
        <i className="iconfont">&#xe67d;</i>
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
      <Player></Player>
    </div>
  )
}

export default React.memo(Home);
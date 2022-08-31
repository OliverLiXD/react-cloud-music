import React from "react";
import LazyLoad from "react-lazyload";

import { ListWrapper, List, ListItem } from "./style";
import { getCount } from "../../api/utils";
import img from "./music.png";

function RecommendList(props) {
  const { recommendList } = props;
  return (
    <ListWrapper>
      <h1 className="title">
        推荐歌单
      </h1>
      <List>
        {
          recommendList.map((item) => {
            return (
              <ListItem key={item.id}>
                <div className="decorate"></div>
                <LazyLoad placeholder={<img width="100%" height="100%" src={img} alt="music"/>}>
                  <img src={item.picUrl + "?param=300x300"} height="100%" width="100%" alt="recommendListItem"></img>
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont">&#xe688;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(RecommendList);
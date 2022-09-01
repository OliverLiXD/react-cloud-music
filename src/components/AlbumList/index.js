import React from "react";

import { SongList, SongItem } from "./style";
import { getName, getCount } from "../../api/utils";

const AlbumList = (props) => {
  const { currentAlbum } = props;
  return (
    <SongList showBackground={props.showBackground}>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe61b;</i>
          <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe622;</i>
          <span > 收藏 ({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongItem>
        {
          currentAlbum.tracks.map ((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    { getName(item.ar) } - { item.al.name }
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    </SongList>
  )
}

export default React.memo(AlbumList);
import React from "react";

import { SongList, SongItem } from "./style";
import { getName, getCount } from "../../api/utils";

const AlbumList = React.forwardRef((props, refs) => {
  // debugger;
  const { collectCount, showCollect, songs } = props;

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    console.log (index);
  }

  return (
    <SongList showBackground={props.showBackground}>
      <div>
        <div className="first_line">
          <div className="play_all" onClick={(e) => selectItem(e, 0)}>
            <i className="iconfont">&#xe61b;</i>
            <span > 播放全部 <span className="sum">(共 {totalCount} 首)</span></span>
          </div>
          {showCollect ? (
            <div className="add_list">
              <i className="iconfont">&#xe622;</i>
              <span > 收藏 ({getCount(collectCount)})</span>
            </div>
            ) :
            ""
          }
        </div>
        <SongItem>
          {
            songs.map ((item, index) => {
              return (
                <li key={index}>
                  <span className="index">{index + 1}</span>
                  <div className="info">
                    <span>{item.name}</span>
                    <span>
                    { item.ar ? getName(item.ar): getName(item.artists) } - { item.al ? item.al.name : item.album.name}
                    </span>
                  </div>
                </li>
              )
            })
          }
        </SongItem>
      </div>
    </SongList>
  )
})

export default React.memo(AlbumList);
import React from "react";
import { connect } from "react-redux";

import { SongList, SongItem } from "./style";
import { getName, getCount } from "../../api/utils";
import * as actionCreators from "../../application/Player/store/actionCreators";

const AlbumList = React.forwardRef((props, refs) => {
  const { collectCount, showCollect, songs, songsCount } = props;
  const { changePlayListDispatch, changeCurrentIndexDispatch, changeSequencePlayListDispatch } = props

  const totalCount = songs.length;

  const selectItem = (e, index) => {
    changePlayListDispatch(songs);
    changeSequencePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
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
                <li key={index} onClick={(e) => selectItem(e, index)}>
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

const mapStateToProps = (state) => ({
  songsCount: state.getIn (['player', 'playList']).size
});

const mapDispatchToProps = (dispatch) => {
  return {
    changePlayListDispatch(data) {
      dispatch(actionCreators.changePlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(actionCreators.changeCurrentIndex(data));
    },
    changeSequencePlayListDispatch(data) {
      dispatch(actionCreators.changeSequencePlayList(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AlbumList));
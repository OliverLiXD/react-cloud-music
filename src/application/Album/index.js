import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import { Container, TopDesc, Menu } from "./style";
import Header from "../../baseUI/Header";
import AlbumList from "../../components/AlbumList";
import Scroll from "../../baseUI/Scroll";
import { HEADER_HEIGHT } from "../../api/config"
import { getCurrentAlbum, changeEnterLoading } from "./store/actionCreators";
import Loading from "../../baseUI/Loading";
import { isEmptyObject } from "../../api/utils";

function Album(props) {
  const { currentAlbum: currentAlbumImmutable , enterLoading, songsCount } = props;
  const { getCurrentAlbumDispatch } = props;
  const id = props.match.params.id;

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");

  useEffect(() => {
    getCurrentAlbumDispatch(id);
  }, [getCurrentAlbumDispatch, id]);
  let currentAlbum = currentAlbumImmutable ? currentAlbumImmutable.toJS() : [];

  const headerEl = useRef();

  const handleBack = useCallback (() => {
    setShowStatus (false);
  }, []);

  const handleScroll = (pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y/minScrollY);
    let headerDom = headerEl.current;
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = "#D44439";
      headerDom.style.opacity = Math.min(1, (percent-1)/2);
      setTitle("");
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
    }
  };

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container songsCount={songsCount}>
        <Header ref={headerEl} title={title} handleClick={handleBack}></Header>
        {
          !isEmptyObject(currentAlbum) ? 
            (
              <Scroll
              bounceTop={false}
              onScroll={handleScroll}
              >
                <div>
                  <TopDesc background={currentAlbum.coverImgUrl}>
                    <div className="background">
                      <div className="filter"></div>
                    </div>
                    <div className="img_wrapper">
                      <div className="decorate"></div>
                      <img src={currentAlbum.coverImgUrl} alt=""/>
                      <div className="play_count">
                        <i className="iconfont play">&#xe688;</i>
                        <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10} 万 </span>
                      </div>
                    </div>
                    <div className="desc_wrapper">
                      <div className="title">{currentAlbum.name}</div>
                      <div className="person">
                        <div className="avatar">
                          <img src={currentAlbum.creator.avatarUrl} alt=""/>
                        </div>
                        <div className="name">{currentAlbum.creator.nickname}</div>
                      </div>
                    </div>
                  </TopDesc>
                  <Menu>
                    <div>
                      <i className="iconfont">&#xe660;</i>
                      评论
                    </div>
                    <div>
                      <i className="iconfont">&#xe6d1;</i>
                      分享
                    </div>
                    <div>
                      <i className="iconfont">&#xe622;</i>
                      下载
                    </div>
                    <div>
                      <i className="iconfont" style={{"fontSize": "8rem"}}>&#xe7fb;</i>
                      更多
                    </div>
                  </Menu>
                  <AlbumList
                    collectCount={currentAlbum.subscribedCount}
                    showCollect={true}
                    songs={currentAlbum.tracks}
                    showBackground={true}
                  ></AlbumList>
                </div>
              </Scroll>
            )
          : ""
        }
        { enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    currentAlbum: state.getIn(["album", "currentAlbum"]),
    enterLoading: state.getIn(["album", "enterLoading"]),
    songsCount: state.getIn(['player', 'playList']).size
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentAlbumDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getCurrentAlbum(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
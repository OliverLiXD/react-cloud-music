import React, { useRef, useState, useCallback } from 'react';
import {connect} from "react-redux";
import { CSSTransition } from 'react-transition-group';

import { PlayListWrapper, ScrollWrapper } from './style';
import * as actionCreators from "../store/actionCreators";
import { prefixStyle } from './../../../api/utils';
import  { ListHeader, ListContent } from "./style";
import Scroll from "../../../baseUI/Scroll";
import { playMode } from "../../../api/config";
import { getName, findIndex } from "../../../api/utils";
import Comfirm from '../../../baseUI/Comfirm';

function PlayList(props) {
  const {
    currentIndex,
    currentSong: immutableCurrentSong,
    showPlayList,
    playList: immutablePlayList,
    mode,
    sequencePlayList: immutableSequencePlayList,
    changeMode
  } = props;
  const {
    toggleChangeShowPlayListDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeSequencePlayListDispatch,
    clearDispatch
  } = props;
  
  const currentSong = immutableCurrentSong.toJS();
  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();

  const [isShow, setIsShow] = useState(false);
  const [showComfirm,setShowComfirm] = useState(false);
  const [touch, setTouch] = useState({});

  const listContentRef = useRef();
  const playListRef = useRef();
  const listWrapperRef = useRef();

  const transform = prefixStyle("transform");

  const onEnterCB = useCallback(() => {
    // 让列表显示
    setIsShow(true);
    // 最开始是隐藏在下面
    listWrapperRef.current.style[transform] = `translate3d(0, 100%, 0)`;
  }, [transform]);
  
  const onEnteringCB = useCallback(() => {
    // 让列表展现
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0, 0, 0)`;
  }, [transform]);
  
  const onExitingCB = useCallback (() => {
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);
  
  const onExitedCB = useCallback (() => {
    setIsShow(false);
    listWrapperRef.current.style[transform] = `translate3d(0px, 100%, 0px)`;
  }, [transform]);

  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const content = current ? '&#xe624;': '';
    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{__html:content}}></i>
    )
  };

  const getPlayMode = () => {
    let content, text;
    if (mode === playMode.sequence) {
      content = "&#xe61f;";
      text = "顺序播放";
    } else if (mode === playMode.loop) {
      content = "&#xe609;";
      text = "单曲循环";
    } else {
      content = "&#xe623;";
      text = "随机播放";
    }
    return (
      <div>
        <i className="iconfont" onClick={(e) => changeMode(true)}  dangerouslySetInnerHTML={{__html: content}}></i>
        <span className="text" onClick={(e) => changeMode(true)}>{text}</span>
      </div>
    )
  };

  const handleChangeCurrentIndex = (index) => {
    if(index === currentIndex) {
      return ;
    }
    changeCurrentIndexDispatch(index);
  }

  const handleDeleteSong = (index) => {
    if(!alert("Are you ture to delete this song ?")) {
      return ;
    }
    playList.splice(index, 1);
    sequencePlayList.splice(index, 1);
// debugger;
    changePlayListDispatch(playList);
    changeSequencePlayListDispatch(sequencePlayList);
    if(index < currentIndex) {
      changeCurrentIndexDispatch(currentIndex - 1);
    }
  }

  const onTouchStart = (e) => {
    const newTouch = {
      initialized: false,
      startY: 0,
      distance: 0
    }
    listWrapperRef.current.style["transition"] = "";
    newTouch.startY = e.touches[0].pageY;
    newTouch.initialized = true;
    setTouch(newTouch);
  }

  const onTouchMove = (e) => {
    // const coalescedEvents = e.nativeEvent.getCoalescedEvents();
    // debugger;
    // console.log(coalescedEvents);
    if(!touch.initialized) {
      return ;
    }
    const distance = e.touches[0].pageY - touch.startY;
    console.log(distance);
    if(distance < 0) {
      return ;
    }
    setTouch((state) => {
      return {
        ...state,
        distance
      }
    });
    listWrapperRef.current.style.transform = `translate3D(0, ${distance}px, 0)`;
  }

  const onTouchEnd = (e) => {
    setTouch.initialized = false;
    if(touch.distance > 150) {
      toggleChangeShowPlayListDispatch(false);
      return ;
    }
    listWrapperRef.current.style["transition"] = "all 0.3s";
    listWrapperRef.current.style[transform] = `translate3d(0px, 0px, 0px)`;
  }

  return (
    <CSSTransition 
      in={showPlayList}
      timeout={300} 
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
    >
      <PlayListWrapper 
        ref={playListRef} 
        style={isShow === true ? { display: "block" } : { display: "none" }} 
        onClick={() => toggleChangeShowPlayListDispatch(false)}
      >
        <div className="list_wrapper" ref={listWrapperRef} onClick={(e) => {e.stopPropagation()}}>
          <ListHeader
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <h1 className="title">
              { getPlayMode() }
              <span className="iconfont clear" onClick={() => {setShowComfirm(true)}}>&#xe601;</span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
          <Scroll>
            <ListContent ref={listContentRef}>
              {
                playList.map((item, index) => {
                  return (
                    <li className="item" key={item.id}>
                      {getCurrentIcon(item)}
                      <span className="text"
                        onClick={() => {handleChangeCurrentIndex(index)}}
                      >{item.name} - {getName(item.ar)}</span>
                      <span className="like">
                        <i className="iconfont">&#xe8ab;</i>
                      </span>
                      <span className="delete"
                        onClick={() => {handleDeleteSong(index)}}
                      >
                        <i className="iconfont">&#xe718;</i>
                      </span>
                    </li>
                  )
                })
              }
            </ListContent>
          </Scroll>
          </ScrollWrapper>
        </div>
        {
          showComfirm ?
          (
            <Comfirm text={"是否删除全部?"} onComfirm={clearDispatch} onCancel={() => {setShowComfirm(false)}}></Comfirm>
          )
          :
          ""
        }
      </PlayListWrapper>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => {
  return {
    showPlayList: state.getIn(["player", "showPlayList"]),
    currentIndex: state.getIn(['player', 'currentIndex']),
    currentSong: state.getIn(['player', 'currentSong']),
    playList: state.getIn(['player', 'playList']),
    sequencePlayList: state.getIn(['player', 'sequencePlayList']),
    mode: state.getIn(['player', 'mode'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChangeShowPlayListDispatch(data) {
      dispatch (actionCreators.changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(actionCreators.changeCurrentIndex(data));
    },
    changeModeDispatch(data) {
      dispatch(actionCreators.changeMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(actionCreators.changePlayList(data));
    },
    changeSequencePlayListDispatch(data) {
      dispatch(actionCreators.changeSequencePlayList(data));
    },
    clearDispatch() {
      dispatch (actionCreators.changePlayList([]));
      dispatch (actionCreators.changeSequencePlayList([]));
      dispatch (actionCreators.changeCurrentIndex(-1));
      dispatch (actionCreators.changeShowPlayList(false));
      dispatch (actionCreators.changeCurrentSong({}));
      dispatch (actionCreators.changePlayingState(false));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PlayList));
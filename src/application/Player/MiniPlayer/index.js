import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { MiniPlayerContainer } from "./style";
import { getName } from "../../../api/utils";
import ProgressCircle from "../../../baseUI/ProgressCircle";

const MiniPlayer = (props) => {
  const { currentSong, fullScreen, playing, percent } = props;
  const { clickChangeFullScreen, clickChangePlayingState } = props;
  const { toggleChangeShowPlayListDispatch } = props;

  const handleTogglePlayList = (e) => {
    toggleChangeShowPlayListDispatch(true);
    e.stopPropagation();
  };


  const miniPlayerRef = useRef(null);
  return (
      <CSSTransition 
      in={!fullScreen} 
      timeout={300} 
      classNames="mini" 
      onEnter={() => {
        miniPlayerRef.current.style.display = "flex";
      }}
      onExited={() => {
        miniPlayerRef.current.style.display = "none";
      }}
    >
      <MiniPlayerContainer ref={miniPlayerRef}>
      <div className="cdIcon">\
        <div className="image_Wrapper"
          onClick={(e) => {clickChangeFullScreen(e, true)}}
        >
          <img  className={`play ${playing ? "": "pause"}`} src={currentSong.al.picUrl} alt=""></img>
        </div>
      </div>
      <div className="desc"
        onClick={(e) => {clickChangeFullScreen(e, true)}}
      >
        <h1>{currentSong.name}</h1>
        <p>{getName(currentSong.ar)}</p>
      </div>
      <div className="icon"
        onClick={(e) => {clickChangePlayingState(e, !playing)}}
      >
        <ProgressCircle radius={"10rem"} percent={percent}>
        </ProgressCircle>  
        {
          playing ?
          (
            <i className="icon-mini iconfont icon-pause">
            &#xe616;</i>
          )
          :
          (
            <i className="icon-mini iconfont icon-play">
            &#xe6a4;</i>
          )
        }
      </div>
      <div className="showPlayList"
        onClick={handleTogglePlayList}
      >
          <i className="iconfont">&#xe636;</i>
      </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default React.memo(MiniPlayer);

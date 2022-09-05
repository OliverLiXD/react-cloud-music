import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper
} from "./style";
import ProgressBar from "../../../baseUI/ProgressBar";

const NormalPlayer = (props) => {
  const { currentSong, fullScreen, playing, percent, mode } =  props;
  const { clickChangeFullScreen, clickChangePlayingState, changePercent, handlePrevious, handleNext, changeMode } =  props;
  const normalPlayerRef = useRef(null);

  return (
    <CSSTransition 
      in={fullScreen} 
      timeout={400} 
      classNames="normal" 
      onEnter={() => {
        normalPlayerRef.current.style.display = "block";
      }}
      onExited={() => {
        normalPlayerRef.current.style.display = "none";
      }}
      >
        <NormalPlayerContainer ref={normalPlayerRef}>
          <div className="background">
            <img
              src={currentSong.al.picUrl + "?param=300x300"}
              width="100%"
              height="100%"
              alt="歌曲图片"
            />
          </div>
          <div className="background layer"></div>
          <Top className="top">
            <div className="back" onClick={(e) => {clickChangeFullScreen(e, false)}}>
              <i className="iconfont icon-back">&#xe6b9;</i>
            </div>
            <h1 className="title">{currentSong.name}</h1>
            <h1 className="subtitle">{getName(currentSong.ar)}</h1>
          </Top>
          <Middle>
            <CDWrapper>
              <div className="cd">
                <img
                  className={`image play ${playing ? "": "pause"}`}
                  src={currentSong.al.picUrl + "?param=400x400"}
                  alt=""
                />
              </div>
            </CDWrapper>
          </Middle>
          <Bottom className="bottom">
            <ProgressWrapper>
              <span className="time time-l">0:00</span>
              <div className="progress-bar-wrapper">
              <ProgressBar 
                percent={percent}
                changePercent={changePercent}
              ></ProgressBar>
              </div>
              <div className="time time-r">4:17</div>
            </ProgressWrapper>
            <Operators>
              <div className="icon i-left" >
                {
                  mode === 0 ?
                  (
                    <i className="iconfont"
                    onClick={changeMode}
                    >&#xe61f;</i>
                  )
                  :
                  (
                    mode === 1 ?
                    (
                      <i className="iconfont"
                      onClick={changeMode}
                      >&#xe609;</i>
                    )
                    :
                    (
                      mode === 2 ?
                      (
                        <i className="iconfont"
                        onClick={changeMode}
                        >&#xe623;</i>
                      )
                      :
                      null
                    )
                  )
                }
              </div>
              <div className="icon i-left">
                <i className="iconfont"
                  onClick={handlePrevious}
                >&#xe78a;</i>
              </div>
              {
                playing ?
                (
                  <div className="icon i-center">
                    <i className="iconfont"
                      onClick={(e) => {clickChangePlayingState(e, false)}}
                    >&#xe629;</i>
                  </div>
                )
                :
                (
                  <div className="icon i-center">
                    <i className="iconfont"
                      onClick={(e) => {clickChangePlayingState(e, true)}}
                    >&#xe624;</i>
                  </div>
                )
              }

              <div className="icon i-right">
                <i className="iconfont"
                  onClick={handleNext}
                >&#xe7a5;</i>
              </div>
              <div className="icon i-right">
                <i className="iconfont">&#xe636;</i>
              </div>
            </Operators>
          </Bottom>
        </NormalPlayerContainer>
      </CSSTransition>

  )
}

export default React.memo(NormalPlayer);
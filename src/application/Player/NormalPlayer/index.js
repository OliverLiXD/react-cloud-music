import React, { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { getName } from "../../../api/utils";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper,
  LyricContainer,
  LyricWrapper
} from "./style";
import ProgressBar from "../../../baseUI/ProgressBar";
import Scroll from "../../../baseUI/Scroll";

const NormalPlayer = (props) => {
  const { currentSong, fullScreen, playing, percent, mode, currentLyric, currentLineNum } =  props;
  const { clickChangeFullScreen, clickChangePlayingState, changePercent, handlePrevious, handleNext, changeMode } =  props;
  const { toggleChangeShowPlayListDispatch } = props;

  const [currentState, setCurrentState] = useState("");

  const normalPlayerRef = useRef(null);
  const lyricScrollRef = useRef();
  const lyricLineRefs = useRef([]);

  const handleTogglePlayList = (e) => {
    toggleChangeShowPlayListDispatch(true);
    e.stopPropagation();
  };

  const toggleCurrentState = () => {
    if (currentState !== "lyric") {
      setCurrentState("lyric");
    } else {
      setCurrentState("");
    }
  };

  useEffect(() => {
    if (!lyricScrollRef.current) return;
    let bScroll = lyricScrollRef.current.getBScroll();
    if(!bScroll) return ;
    if (currentLineNum > 5) {
      // 保持当前歌词在第 5 条的位置
      let lineEl = lyricLineRefs.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);

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
        <NormalPlayerContainer ref={normalPlayerRef} style={{visibility: fullScreen ? "visible" : "hidden"}}>
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
            <CSSTransition
              timeout={400}
              classNames="fade"
              in={currentState !== "lyric"}
            >
              <CDWrapper style={{visibility: currentState !== "lyric"  && fullScreen ? "visible" : "hidden"}}>
                <div className="cd"
                onClick={toggleCurrentState}
                >
                  <img
                    className={`image play ${playing ? "" : "pause"}`}
                    src={currentSong.al.picUrl + "?param=400x400"}
                    alt=""
                  />
                </div>
              </CDWrapper>
            </CSSTransition>
            <CSSTransition
              timeout={400}
              classNames="fade"
              in={currentState === "lyric"}
            >
              <LyricContainer>
                <Scroll ref={lyricScrollRef}>
                  <LyricWrapper
                    style={{visibility: currentState === "lyric" ? "visible" : "hidden"}}
                    className="lyric_wrapper"
                    onClick={toggleCurrentState}
                  >
                    {
                      currentLyric
                        ? currentLyric.lines.map((item, index) => {
                        // 拿到每一行歌词的 DOM 对象，后面滚动歌词需要！ 
                        lyricLineRefs.current[index] = React.createRef();
                        return (
                          <p
                            className={`text ${
                              currentLineNum === index ? "current" : ""
                            }`}
                            key={item + index}
                            ref={lyricLineRefs.current[index]}
                          >
                            {item.text}
                          </p>
                        );
                      })
                    : <p className="text pure"> 纯音乐，请欣赏。</p>}
                  </LyricWrapper>
                </Scroll>
              </LyricContainer>
            </CSSTransition>
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
                <i className="iconfont"
                  onClick={handleTogglePlayList}
                >&#xe636;</i>
              </div>
            </Operators>
          </Bottom>
        </NormalPlayerContainer>
      </CSSTransition>

  )
}

export default React.memo(NormalPlayer);
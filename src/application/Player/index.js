import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actionCreators";
import MiniPlayer from "./MiniPlayer";
import NormalPlayer from "./NormalPlayer";
import { getSongUrl, isEmptyObject, findIndex, shuffle } from "../../api/utils";
import { playMode } from "../../api/config";
import Toast from "../../baseUI/Toast";
import PlayList from "./PlayList";
import { getLyricRequest } from "../../api/request";
import Lyric from "../../api/Lyric";

const Player = (props) => {
  const { sequencePlayList: immutableSequencePlayList, playList: immutablePlayList, currentIndex, currentSong: immutableCurrentSong  } = props;
  const { fullScreen, playing, mode, showPlayList} = props;

  const currentSong = immutableCurrentSong ? immutableCurrentSong.toJS() : {};
  const sequencePlayList = immutableSequencePlayList ? immutableSequencePlayList.toJS() : [];
  const playList = immutablePlayList ? immutablePlayList.toJS() : [];

  const { toggleChangePlayingStateDispatch, toggleChangeFullScreenDispatch, toggleChangeShowPlayListDispatch } = props;
  const { changePlayListDispatch, changeModeDispatch, changeCurrentIndexDispatch, changeCurrentSongDispatch } = props

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState("");
  // const [songReady, setSongReady] = useState(true);
  const [currentLineNum,setCurrentLineNum] = useState(-1);

  const audioRef = useRef();
  const toastRef = useRef();
  const currentLyric = useRef();
  // const currentLineNum = useRef(0);

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  useEffect(() => {
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id 
    )
      return;
    let current = playList[currentIndex];
    changeCurrentSongDispatch(current);//赋值currentSong
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id);
    // setTimeout(() => {
    //   audioRef.current.play();
    // });
    toggleChangePlayingStateDispatch(true);//播放状态
    getLyric(current.id);
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
    audioRef.current.play()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing])

  const clickChangeFullScreen = (e, state) => {
    e.stopPropagation();
    toggleChangeFullScreenDispatch(state);
  };
  const clickChangePlayingState = (e, state) => {
    e.stopPropagation();
    toggleChangePlayingStateDispatch(state);
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime*1000);
    }
  };

  const onTimeUpdate = (e) => {
    // console.log(e.target.currentTime);
    setCurrentTime(e.target.currentTime);
  };

  const changePercent = (curPercent) => {
    const currentTime = curPercent * duration;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
    if (!playing) {
      toggleChangePlayingStateDispatch(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(currentTime * 1000);
    }
  }

  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    if(!playing) {
      toggleChangePlayingStateDispatch(true);
    }
    audioRef.current.play();
  }

  const handlePrevious = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if(index < 0) {
      index = playList.length - 1;
    }
    if(!playing) {
      toggleChangePlayingStateDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  }

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if(index > playList.length - 1) {
      index = 0;
    }
    if(!playing) {
      toggleChangePlayingStateDispatch(true);
    }
    changeCurrentIndexDispatch(index);
  }

  const changeMode = (isPlayList) => {
    let newMode = (mode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序模式");
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");

    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    if(!isPlayList) {
      toastRef.current.show();
    }
  };

  const handleEnd = () => {
    if(mode === playMode.loop) {
      handleLoop();
      return ;
    }
    handleNext();
  }

  const getLyric = id => {
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop ();
    }
    // 避免 songReady 恒为 false 的情况
    getLyricRequest(id)
      .then (data => {
        lyric = data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric);
        currentLyric.current.play();
        setCurrentLineNum(0);

        // currentLineNum.current = 0;
      })
      .catch (() => {
        // songReady.current = true;
        audioRef.current.play();
      });
  };

  const handleLyric = ({lineNum, text}) => {
    if (!currentLyric.current) return;
    setCurrentLineNum(lineNum);
  };
// debugger;
  return (
    <div>
      {isEmptyObject(currentSong) ? "" 
        :
        (
          <MiniPlayer
            currentSong={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            currentTime={currentTime}
            duration={duration}
            percent={percent}
            clickChangeFullScreen={clickChangeFullScreen}
            clickChangePlayingState={clickChangePlayingState}
            toggleChangeShowPlayListDispatch={toggleChangeShowPlayListDispatch}
          ></MiniPlayer>
        )
      }
      {isEmptyObject(currentSong) ? "" 
        :
        (
          <NormalPlayer
            currentSong={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            currentTime={currentTime}
            duration={duration}
            percent={percent}
            mode={mode}
            clickChangeFullScreen={clickChangeFullScreen}
            clickChangePlayingState={clickChangePlayingState}
            changePercent={changePercent}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            changeMode={changeMode}
            toggleChangeShowPlayListDispatch={toggleChangeShowPlayListDispatch}
            currentLyric={currentLyric.current}
            // currentPlayingLyric={currentPlayingLyric}
            currentLineNum={currentLineNum}
          ></NormalPlayer>

        )
      }
      <Toast></Toast>
      <PlayList
        changeMode={changeMode}
      ></PlayList>
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={handleEnd}
      ></audio>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fullScreen: state.getIn(["player", "fullScreen"]),
    playing: state.getIn(["player", "playing"]),
    sequencePlayList: state.getIn(["player", "sequencePlayList"]),
    playList: state.getIn(["player", "playList"]),
    mode: state.getIn(["player", "mode"]),
    currentIndex: state.getIn(["player", "currentIndex"]),
    showPlayList: state.getIn(["player", "showPlayList"]),
    currentSong: state.getIn(["player", "currentSong"])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChangePlayingStateDispatch(data) {
      dispatch(actionCreators.changePlayingState(data));
    },
    toggleChangeFullScreenDispatch(data) {
      dispatch(actionCreators.changeFullScreen(data));
    },
    toggleChangeShowPlayListDispatch(data) {
      dispatch(actionCreators.changeShowPlayList(data));
    },
    changePlayListDispatch(data) {
      dispatch(actionCreators.changePlayList(data));
    },
    changeModeDispatch(data) {
      dispatch(actionCreators.changeMode(data));
    },
    changeCurrentIndexDispatch(data) {
      dispatch(actionCreators.changeCurrentIndex(data));
    },
    changeCurrentSongDispatch(data) {
      dispatch(actionCreators.changeCurrentSong(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
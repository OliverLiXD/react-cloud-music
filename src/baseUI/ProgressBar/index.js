import React, {useEffect, useRef, useState } from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
// import { prefixStyle } from './../../api/utils';

const ProgressBarWrapper = styled.div`
  height: 4rem;
  .bar-inner {
    position: relative;
    top: 2rem;
    height: 1rem;
    background: rgba(0, 0, 0, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -2rem;
      top: -2rem;
      width: 4rem;
      height: 4rem;
      .progress-btn {
        position: relative;
        top: 0.5rem;
        left: 1rem;
        box-sizing: border-box;
        width: 3.5rem;
        height: 3.5rem;
        border: 0.5rem solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
      }
    }
  }
`
const ProgressBar = (props) => {
  const { changePercent, percent } = props;
  const [touch, setTouch] = useState({});

  const progressBar = useRef(null);
  const progress = useRef(null);
  const progressBtn = useRef(null);

  useEffect(() => {
    const progressBarWidth = progressBar.current.clientWidth - progressBtn.current.clientWidth / 2;
    const newBarOffset = progressBarWidth * percent;
    changeBarOffset(newBarOffset);
  }, [percent])

  const onTouchStart = (e) => {
    const startTouch = {
      initialized: false,
      startX: 0,
      left: ""
    };
    startTouch.initialized = true;
    startTouch.startX = e.touches[0].pageX;
    startTouch.left = progress.current.clientWidth;
    setTouch(startTouch);
  }

  const onTouchMove = (e) => {
    if(!touch.initialized) {
      return ;
    }
    // debugger'
    const offsetBar = e.touches[0].pageX - touch.startX;
    const progressBarWidth = progressBar.current.clientWidth - progressBtn.current.clientWidth / 2;
    const newBarOffset = Math.min(Math.max(0, offsetBar + touch.left), progressBarWidth);
    changeBarOffset(newBarOffset);
    percentChange();
  }

  const changeBarOffset = (newBarOffset) => {
    progress.current.style.width = `${newBarOffset}px`;
    progressBtn.current.style.transform = `translate3d(${newBarOffset}px, 0, 0)`
  }

  const onTouchEnd = () => {
    const endTouch = touch;
    endTouch.initialized = false;
    setTouch(endTouch);
    percentChange();
  }

  const onClick = (e) => {
    const offsetBar = e.pageX - progressBtn.current.getBoundingClientRect().x;
    const progressBarWidth = progressBar.current.clientWidth - progressBtn.current.clientWidth / 2;
    const newBarOffset = Math.min(Math.max(0, offsetBar +  progress.current.clientWidth), progressBarWidth);
    changeBarOffset(newBarOffset);
    percentChange();
  }

  const percentChange = () => {
    const progressBarWidth = progressBar.current.clientWidth - progressBtn.current.clientWidth;
    let curPercent = progress.current.clientWidth / progressBarWidth;
    if(curPercent < 0){
      curPercent = 0;
    }
    if(curPercent > 1){
      curPercent = 1;
    }
    changePercent(curPercent);
  }

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBar} onClick={onClick}>
        <div className="progress" ref={progress}></div>
        <div className="progress-btn-wrapper" ref={progressBtn}>
          <div className="progress-btn"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          ></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default ProgressBar;
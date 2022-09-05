import React from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';

const CircleWrapper = styled.div`
  position: absolute;
  top: 0.8rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  circle {
    stroke-width: 0.5rem;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: ${style["theme-color-shadow"]};
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${style["theme-color"]};
    }
  }
`

const ProgressCircle =  (props) => {
  const {radius, percent} = props;
  // 整个背景的周长
  const dashArray = Math.PI * document.documentElement.clientWidth/10;
  // 没有高亮的部分，剩下高亮的就是进度
  const dashOffset = (1 - percent) * dashArray;

  return (
    <CircleWrapper>
      <svg width={radius} height={radius} viewBox="0 0 10rem 10rem" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="5rem" cx="5rem" cy="5rem" fill="transparent"/>
        <circle className="progress-bar" r="5rem" cx="5rem" cy="5rem" fill="transparent" 
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}/>
      </svg>
    </CircleWrapper>
  )
}

export default React.memo(ProgressCircle);
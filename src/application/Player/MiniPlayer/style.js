import styled, { keyframes } from "styled-components";

import style from "../../../assets/global-style";

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`

export const MiniPlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100rem;
  height: 15rem;
  background-color: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  padding-left: 4rem;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit {
    transform: translate3d(0, 0, 0);
    transition: all .4s
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all .4s
  }
  .image_Wrapper {
    height: 11rem;
    width: 11rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5.5rem;
      &.play {
        animation: ${rotate} 10s infinite;
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .desc {
    flex: 1;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 3.5rem;
      
    }
    p {
      margin-top: 2rem;
      font-size: 3rem;
      color: #BBA8A8;
    }
  }
  .iconfont {
    font-size: 7.5rem;
    padding: 2rem;
    color: ${style["theme-color"]};
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .icon {
    position: relative;
  }
`
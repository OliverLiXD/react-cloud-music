import styled from "styled-components";

import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.play > 0 ? "60px": 0};
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

export const ImgWrapper  = styled.div`
  background: url(${(props) => (props.bgUrl)});
  height: 0;
  width: 100%;
  background-size: cover;
  transform-origin: top;
  padding-top: 75%;
  position: relative;
  z-index: 50;
  .filter {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: rgba(7, 17, 27, 0.3);
  }
`

export const CollectButton = styled.div`
  height: 11rem;
  width: 35rem;
  background-color: ${style["theme-color"]};
  margin: 0 auto;
  border-radius: 5.5rem;
  margin-top:  -20rem;
  z-index: 50;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${style["font-color-light"]};
  .iconfont {
    font-size: 3.5rem;
    padding-left: 9rem;
  }
  .text {
    font-size: 4rem;
    padding-right: 9rem;
  }
`

export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 3rem;
  z-index: 50;
`

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`
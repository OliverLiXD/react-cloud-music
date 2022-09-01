import styled from "styled-components";

import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`

export const TopDesc = styled.div`
  background-size: 100%;
  padding: 2rem 4rem;
  padding-bottom: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 70rem;
  position: relative;
  .background {
    z-index: -1;
    background: url(${props => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(10rem);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 35rem;
    height: 35rem;
    position: relative;         
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 6rem;
      border-radius: 2rem;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }
    .play_count {
      position: absolute;
      right: 1.5rem;
      top: 1.5rem;
      font-size: 3.2rem;
      line-height: 3.2rem;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
        font-size: 3rem;
        padding-right: 0.5rem;
      }
    }
    img {
      width: 35rem;
      height: 35rem;
      border-radius:2rem;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 40rem;
    padding: 0 3rem;
    .title {
      max-height: 8rem;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: 4rem;
    }
    .person {
      display: flex;
      .avatar {
        width: 6rem;
        height: 6rem;
        margin-right: 1.5rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 6rem;
        font-size: 3.5rem;
        color: ${style["font-color-desc-v2"]};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 6rem 2rem 6rem;
  margin: -20rem 0 0 0;
  height: 15rem;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 4rem;
    text-align: center;
    font-size: 3rem;
    color: ${style["font-color-light"]};
    z-index:1000;
    font-weight: 500;
    justify-content: space-around;
    width: 12rem;
    .iconfont {
      font-size: 5rem;
    }
  }
`;
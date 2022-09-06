import styled from'styled-components';
import style from '../../../assets/global-style';

export const PlayListWrapper = styled.div `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${style["background-color-shadow"]};
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 3rem 3rem 0 0;
    background-color: ${style["highlight-background-color"]};
    transform: translate3d(0, 0, 0);
    will-change: transform;
    .list_close {
      text-align: center;
      line-height: 15rem;
      background: ${style["background-color"]};
      font-size: 4rem;
      color: ${style["font-color-desc"]};
    }
  }
`;
export const ScrollWrapper = styled.div`
  height: 95rem;
  overflow: hidden;
`;
export const ListHeader = styled.div `
  position: relative;
  padding: 4rem;
  .title {
    display: flex;
    align-items: center;
    >div {
      flex:1;
      display: flex;
      align-items: center;
      .text {
        flex: 1;
        font-size: 4rem;
        color: ${style["font-color-desc"]};
        padding-left: 2rem;
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: 6rem;
      color: ${style["theme-color"]};
    }
    .clear {
      ${style.extendClick()}
      font-size: 6rem;
    }
  }
`
export const ListContent = styled.div `
  .item {
    display: flex;
    align-items: center;
    height: 12rem;
    padding: 0 6rem 0 3rem;
    overflow: hidden;
    .current {
      flex: 0 0 4rem;
      width: 4rem;
      font-size: 4rem;
      color: ${style["theme-color"]};
    }
    .text {
      flex: 1;
      ${style.noWrap()}
      font-size: 3.8rem;
      color: ${style["font-color-desc-v2"]};
      padding: 0 3rem;
      .icon-favorite {
        color: ${style["theme-color"]};
      }
    }
    .like {
      margin-right: 3rem;
    }

    .iconfont {
      font-size: 5rem;
      color: ${style["theme-color"]};
      ${style.extendClick()}
    }
  }
`
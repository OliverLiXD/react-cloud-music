import styled from'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: all .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: all .3s;
    transform: translate3d(100%, 0, 0);
  }
`
export const ShortcutWrapper = styled.div`
  position: absolute;
  top: 14rem;
  bottom: 0;
  width: 100%;
  display: ${props => props.show ? "":"none"};
`

export const HotKey = styled.div`
  margin: 0 4rem 4rem 4rem;
  .title {
    padding-top: 4rem;
    margin-bottom: 4rem;
    font-size: 4rem;
    color: ${style["font-color-desc-v2"]};
  }
  .item {
    display: inline-block;
    padding: 2rem 3rem;
    margin: 0 4rem 2rem 0;
    border-radius: 2rem;
    background: ${style["highlight-background-color"]};
    font-size: 3.5rem;
    color: ${style["font-color-desc"]};
  }
`

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
  .title {
    margin:2rem 0 2rem 2rem;
    color: ${style["font-color-desc"]};
    font-size: 4rem;
  }
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 2rem;
  padding: 2rem 0;
  align-items: center;
  border-bottom: 0.2rem solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 4rem;
    img {
      border-radius: 1rem;
      width: 14rem;
      height: 14rem;
    }
  }
  .name {
    font-size: 3.5rem;
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`;

export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 16rem;
    align-items: center;  
    .index {
      width: 16rem;
      height: 16rem;
      line-height: 16rem;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 0.2rem solid ${style["border-color"]};
      font-size: 3.5rem;
      >span:first-child {
        color: ${style["font-color-desc"]};
      }
      >span:last-child {
        font-size: 3.5rem;
        color: #bba8a8;
      }
    }
  }
`
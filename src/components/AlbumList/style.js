import styled from "styled-components";

import style from "../../assets/global-style";

export const SongList = styled.div`
  border-radius: 2rem;
  opacity: 0.98;
  background-color: white;
  /* ${props => props.showBackground ? `background: ${style["highlight-background-color"]}`: ""} */
  .first_line {
    box-sizing: border-box;
    padding: 2rem 0;
    margin-left: 3rem;
    position: relative;
    justify-content: space-between;
    border-bottom: 0.1rem solid ${style["border-color"]};
    height: 12rem;
    .play_all {
      display: inline-block;
      line-height: 9rem;
      color: ${style["font-color-desc"]};
      .iconfont {
        font-size: 6rem;
        margin-right: 2rem;
        vertical-align: top;
        padding-bottom: 1rem;
      }
      .sum {
        font-size: 4rem;
        color: ${style["font-color-desc-v2"]};
      }
      >span {
        vertical-align: top;
        font-size: 4rem;
      }
    }
    .add_list,.isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0;
      top :0;
      bottom: 0;
      width: 30rem;
      line-height: 6rem;
      background: ${style["theme-color"]};
      color: ${style["font-color-light"]};
      font-size: 0;
      border-radius: 2rem;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 3.5rem;
        margin: 0 2rem 0 3rem;
      }
      span {
        font-size: 3.2rem;
        line-height: 6rem;
      }
    }
    .isCollected {
      display: flex;
      background: ${style["background-color"]};
      color: ${style["font-color-desc"]};
    }
}
`
export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 17rem;
    align-items: center;  
    .index {
      flex-basis: 17rem;
      width: 17rem;
      height: 17rem;
      line-height: 17rem;
      text-align: center;
      font-size: 4.5rem;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 2rem 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 0.1rem solid ${style["border-color"]};
      ${style.noWrap()}
      >span {
        ${style.noWrap()}
      }
      >span:first-child {
        color: ${style["font-color-desc"]};
        font-size: 4rem;
      }
      >span:last-child {
        font-size: 3rem;
        color: #bba8a8;
      }
    }
  }
`
import styled from "styled-components";
import style from "../../assets/global-style";

export const Top = styled.div`
  width: 100rem;
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${style["theme-color"]};
  color: #F1F1F1;
  .iconfont {
    font-size: 6rem;
  }
  .title {
    font-size: 5rem;
  }
`
export const Tab = styled.div`
  width: 100rem;
  height: 12rem;
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: space-around;
  background-color: ${style["theme-color"]};
  a {
    color: #e4e4e4;
    /* padding: 0.5rem 0; */
    &.selected {
      color: #f1f1f1;
      font-weight: 700;
      border-bottom: 0.5rem solid white;
      /* padding: 0.6rem 0; */
    }
  }
`
export const TabItem = styled.div`
  height: 6rem;
  line-height: 6rem;
  font-size: 3.7rem;
`

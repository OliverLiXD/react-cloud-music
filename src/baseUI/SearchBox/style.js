import styled from'styled-components';
import style from '../../assets/global-style';

export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 2rem;
  padding-right: 5rem;
  height: 12rem;
  background: ${style["theme-color"]};
  .icon-back {
    font-size: 6rem;
    color: ${style["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 2rem;
    line-height: 4rem;
    background: ${style["theme-color"]};
    color: ${style["highlight-background-color"]};
    /* padding: 0.5rem 0; */
    font-size: 4rem;
    outline: none;
    border: none;
    border-bottom: 0.3rem solid ${style["border-color"]};
    &::placeholder {
      color: ${style["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 4rem;
    color: ${style["background-color"]};
  }
`
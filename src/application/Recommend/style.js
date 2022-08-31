import styled from'styled-components';
import style from "../../assets/global-style";

export const Content = styled.div`
  position: fixed;
  top: 26rem;
  bottom: 0;
  left: 0;
  width: 100%;
  .before {
  position: absolute;
  top: -125rem;
  height: 150rem;
  width: 100%;
  background: ${style["theme-color"]};
  }
`
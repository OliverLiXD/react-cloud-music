import styled from'styled-components';
import style from '../../assets/global-style';

export const HeaderContainer = styled.div`
  position: fixed;
  padding: 2rem 2rem;
  padding-top: 0;
  height: 10rem;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 10rem;
  color: ${style["font-color-light"]};
  .back {
    margin-right: 5rem;
    font-size: 8rem;
    width: 4rem;
  }
  >h1 {
    font-size: 4.2rem;
    font-weight: 600;
  }
`
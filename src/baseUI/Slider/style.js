import styled from'styled-components';
import style from '../../assets/global-style';

export const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: #F2F3F4;
  .before {
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${style["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 43rem;
    overflow: hidden;
    margin: auto;
    border-radius: 1.5rem;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }
    .swiper-pagination-bullet, .swiper-pagination-bullet-active {
      height: 2rem;
      width: 2rem;
    }
  }
`
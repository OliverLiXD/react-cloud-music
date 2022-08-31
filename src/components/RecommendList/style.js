import styled from'styled-components';
// import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title {
    font-weight: 700;
    font-size: 3.8rem;
    line-height: 15rem;
    height: 15rem;
    padding-left: 2rem;
    /* background-color: #fff; */
  }
`

export const List = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const ListItem = styled.div`
  width: 32rem;
  position: relative;
  img {
    width: 32rem;
    border-radius: 1rem;
  }
  .play_count {
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #F1F1F1;
    .count {
      font-size: 3rem;
    }
    .iconfont {
      font-size: 3rem;
      margin-right: 0.8rem;
    }
  }
  .desc{
    height: 14rem;
    font-size: 3.3rem;
    overflow: hidden;
    color: #2E3030;
    line-height: 1.4;
  }
  .decorate {
  position: absolute;
  top: 0;
  width: 100%;
  height: 15rem;
  border-radius: 1rem;
  background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
}
`
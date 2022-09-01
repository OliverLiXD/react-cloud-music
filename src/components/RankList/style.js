import styled from "styled-components";

export const List = styled.ul`
  width: 100rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem;
  align-items: start;
  &::after {
    content:"";
    display:block;
    width: 66rem;
  }
`

export const ListItem = styled.li`
  /* height: ${(props) => (props.global ? "35rem" : "30rem")}; */
  width: ${(props) => (props.global ? "33rem" : "100rem")};
  padding: 1rem 0;
  position: relative;
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  align-items: center;
  .img_wrapper {
    width: ${(props) => (props.global ? "33rem" : "28rem")};
    height: ${(props) => (props.global ? "33rem" : "28rem")};
    position: relative;
  }
  img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  .update_frequecy {
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    font-size: 3rem;
    color: #F1F1F1;
  }
  .decorate {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 12rem;
    border-radius: 1rem;
    background: linear-gradient (hsla (0,0%,100%,0),hsla (0,0%,43%,.4));
  }
`

export const SongList = styled.ul`
  height: 100%;
  flex-grow: 1;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  box-sizing: border-box;
  &>li {
    font-size: 3rem;
    color: gray;
    padding: 2rem 0;
    height: 3rem;
  }
`
import styled from "styled-components";

export const List = styled.div`
  display: flex;
  overflow: hidden;
  height: 8rem;
  align-items: center;
  color: #000;
  .title {
    flex: 0 0 auto;
    &>span {
      font-size: 4rem;
      color: gray;
    }
  }
`

export const ListItem = styled.div`
  padding: 1.2rem;
  border-radius: 3rem;
  font-size: 3.6rem;
  flex: 0 0 auto;
  &.selected {
    color: #D44439;
    border: 0.5rem solid #D44439;
  }
`
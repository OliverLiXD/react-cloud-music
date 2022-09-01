import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100rem;
  padding: 2rem;
  border-bottom: 1px solid #e4e4e4;
  .img_warpper {
    margin-right: 4rem;
    img {
      width: 11.5rem;
      height: 11.5rem;
      border-radius: 1rem;
    }
  }
  .name {
    font-size: 3.5rem;
    color: #2E3030;
    font-weight: 500;
  }
`;
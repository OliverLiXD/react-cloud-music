import styled from "styled-components";

export const ComfirmWrapper = styled.div`
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  background: rgba(0,0,0,0.3);
  .Comfirmbox {
    position: absolute;
    height: 26rem;
    width: 70rem;
    margin-left: -35rem;
    margin-top: -13rem;
    left: 50%;
    top: 50%;
    border-radius: 3rem;
    background-color: #fff;
    .text {
      width: 100%;
      height: 15rem;
      text-align: center;
      line-height: 15rem;
      font-size: 4.5rem;
      color: #BBA8A8;
    }
    .button {
      display: flex;
      border-top: 1px solid #e4e4e4;
      width: 100%;
      height: 11rem;
      &>div {
        flex: 1;
        text-align: center;
        line-height: 11rem;
        font-size: 4rem;
        color: #2E3030;
      }
      .comfirm {
        border-right: 1px solid #e4e4e4;
      }
    }
  }
`
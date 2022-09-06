import React from "react"

import { ComfirmWrapper } from "./style";

const Comfirm = (props) => {
  const { text } = props;
  const { onComfirm, onCancel } = props;
  return (
    <ComfirmWrapper onClick={(e) => {e.stopPropagation()}}>
      <div className="Comfirmbox">
        <div className="text">{text}</div>
        <div className="button">
          <div className="comfirm" onClick={onComfirm}>确认</div>
          <div className="cancel" onClick={onCancel}>取消</div>
        </div>
      </div>
    </ComfirmWrapper>
  )
}

export default React.memo(Comfirm);
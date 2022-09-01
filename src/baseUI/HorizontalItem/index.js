import React, { useEffect, useRef } from "react";
import { PropTypes } from "prop-types";

import Scroll from "../Scroll";
import { List, ListItem } from "./style";

function HorizontalItem(props) {
  const { list, oldValue, title } = props;
  const { handleClick } = props;

  const spanContainer = useRef(null);

  useEffect(() => {
    let categoryDOM = spanContainer.current;
    let tagElems = categoryDOM.querySelectorAll ("span");
    let totalWidth = 0;

    Array.from (tagElems).forEach (ele => {
      totalWidth += ele.parentNode.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  })

  return (
    <Scroll direction={"horizontal"}>
      <div className="spanContainer" ref={spanContainer}>
        <List>
          <div className="title">
            <span>{title}</span>
          </div>
          {
            list.map((item) => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldValue === item.key ? "selected" : ""}`}
                  onClick={() => {handleClick(item.key)}}
                >
                  <span>{item.name}</span>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

HorizontalItem.defaultProps = {
  list: [],
  oldValue: "",
  title: "",
  handleClick: null
}

HorizontalItem.propTypes = {
  list: PropTypes.array,
  oldValue: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default React.memo(HorizontalItem);
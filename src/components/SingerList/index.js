import React from "react";
import LazyLoad from "react-lazyload";

import { List, ListItem } from "./style";
import img from "./singer.png"

function SingerList(props) {
  const { singerList } = props;
  const list = singerList.toJS();
  return (
    <List>
      {
        list.map((item) => {
          return (
            <ListItem key={item.accountId}>
              <div className="img_warpper">
                <LazyLoad placeholder={<img src={img} alt=""></img>}>
                  <img src={`${item.picUrl}?param=300x300`} alt=""></img>
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default  React.memo(SingerList);
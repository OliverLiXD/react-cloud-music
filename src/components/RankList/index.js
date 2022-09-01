import React from "react"

import { List, ListItem, SongList } from "./style";

const RankList = (props) => {
  const { rankList, global } = props;
  const { enterDetail } = props;
  return (
    <List global={global}>
      {
        rankList.map((item) => {
          return (
            <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => enterDetail(item.id)} global={global}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt=""/>
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {!global ? 
                <SongList>
                  {
                    item.tracks.map((item, index) => {
                      return <li key={index}>{index+1}. {item.first} - {item.second}</li>
                    })
                  }
                </SongList>
                :
                ""
              }
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default React.memo(RankList);
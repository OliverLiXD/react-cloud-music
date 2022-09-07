import React, { forwardRef, useEffect, useImperativeHandle, useState, useMemo } from "react";
import { withRouter } from "react-router";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import LazyLoad, {forceCheck} from 'react-lazyload';

import {
  Container,
  HotKey,
  ShortcutWrapper,
  ListItem,
  List,
  SongItem
 } from "./style";
import SearchBox from "../../baseUI/SearchBox";
import { debounce } from "../../api/utils";
import { getHotKeyWords, changeEnterLoading, getSuggestList } from "./store/actionCreators";
import Scroll from "../../baseUI/Scroll";
import musicImg from "./music.png";
import singerImg from "./singer.png";
import { getName } from '../../api/utils';
import { getSongDetail } from "../Player/store/actionCreators";

const Search = (props) => {
  const renderHotKey = () => {
    let list = hotList ? hotList.toJS (): [];
    return (
      <ul>
        {
          list.map (item => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery (item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  };

  const renderSingers = () => {
    let singers = suggestList.artists;
    if (!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌手 </h1>
        {
          singers.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => {
                setShowSearchState(false);
                props.history.push (`/singers/${item.id}`);
              }}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={singerImg} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name"> 歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const renderSongs = () => {
  return (
    <SongItem style={{paddingLeft: "20px"}}> 
      {
        songsList.map (item => {
          return (
            <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  { getName (item.artists) } - { item.album.name }
                </span>
              </div>
            </li>
          )
        })
      }
    </SongItem>
    )
  }

  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if (!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {
          albums.map ((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => {
                setShowSearchState(false);
                props.history.push(`/recommend/${item.id}`)
              }}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={musicImg} alt="music"/>}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name"> 歌单: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const {
    hotList, 
    enterLoading, 
    suggestList: immutableSuggestList, 
    songsCount, 
    songsList: immutableSongsList,
    showSearch,
    setShowSearchState
  } = props;
  
  const suggestList = immutableSuggestList.toJS();
  const songsList = immutableSongsList.toJS();
  
  const {
    getHotKeyWordsDispatch,
    changeEnterLoadingDispatch,
    getSuggestListDispatch,
    getSongDetailDispatch
  } = props;

  const [query, setQuery] = useState('');

  useEffect (() => {
    // setShowSearchState(true);
    if (!hotList.size)
      getHotKeyWordsDispatch ();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuery = (q) => {
    if (!q) return;
    setQuery (q);
    changeEnterLoadingDispatch (true);
    getSuggestListDispatch (q);
  }

  const selectItem = (e, id) => {
    getSongDetailDispatch(id);
  }

  return (
    <CSSTransition
      in={showSearch}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      // onExited={() => props.history.goBack()}
    >
      <Container> 
        {/* <div onClick={() => (hiddenSearch())}>返回</div> */}
        <div className="search_box_wrapper">
          <SearchBox
            showSearch={showSearch}
            setShowSearchState={setShowSearchState}
            handleQuery={handleQuery}
            newQuery={query}
          ></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
            </div>
          </Scroll>
        </ShortcutWrapper>
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              {renderSingers()}
              {renderAlbum()}
              {renderSongs()}
            </div>
          </Scroll>
        </ShortcutWrapper>
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = (state) => ({
  hotList: state.getIn(['search', 'hotList']),
  enterLoading: state.getIn(['search', 'enterLoading']),
  suggestList: state.getIn(['search', 'suggestList']),
  songsCount: state.getIn(['player', 'playList']).size,
  songsList: state.getIn(['search', 'songsList'])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getHotKeyWordsDispatch () {
      dispatch (getHotKeyWords());
    },
    changeEnterLoadingDispatch (data) {
      dispatch (changeEnterLoading(data))
    },
    getSuggestListDispatch (data) {
      dispatch (getSuggestList(data));
    },
    getSongDetailDispatch (id) {
      dispatch (getSongDetail(id));
    }
  }
};
// 将 ui 组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(Search)));

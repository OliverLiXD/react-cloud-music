import React, { useCallback, useState, useEffect, useRef } from "react";
// import { withRouter } from "react-router";
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux';

import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from "./style";
import Header from "../../baseUI/Header";
import AlbumList from "../../components/AlbumList";
import Scroll from "../../baseUI/Scroll";
import { HEADER_HEIGHT } from "../../api/config";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import Loading from "../../baseUI/Loading";

const Singer = (props) => {
  const [showStatus, setShowStatus] = useState(true);

  const { 
    artist:immutableArtist, 
    songs:immutableSongs, 
    loading,
  } = props;

  
  const { getSingerDataDispatch } = props;

  const artist = immutableArtist ? immutableArtist.toJS () : {};
  const songs = immutableSongs ? immutableSongs.toJS() : [];

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, [])

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  const initialHeight = useRef(0);


  const OFFSET = 10;

  useEffect (() => {
    let h = imageWrapper.current.offsetHeight;
    const id = props.match.params.id;

    songScrollWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
    getSingerDataDispatch (id);
    //eslint-disable-next-line
  }, []);


  const handleScroll = useCallback((pos) => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    const percent = Math.abs(newY /height);

    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } 

    else if (newY >= minScrollY) {
      layerDOM.style.top = `${height - OFFSET - Math.abs (newY)}px`;
      layerDOM.style.zIndex = 1;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.height = 0;
      imageDOM.style.zIndex = -1;
      buttonDOM.style["transform"] = `translate3d(0, ${newY}px, 0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } 

    else if (newY < minScrollY) {
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      headerDOM.style.zIndex = 100;
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, [])

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={artist.name} handleClick={handleBack} ref={header}></Header>
        <ImgWrapper ref={imageWrapper} bgUrl={artist.picUrl}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe622;</i>
          <span className="text"> 收 藏 </span>
        </CollectButton>
        <BgLayer ref={layer}></BgLayer>
        <SongListWrapper ref={songScrollWrapper}>
          <Scroll 
            ref={songScroll}
            onScroll={handleScroll}
          >
            <AlbumList
              collectCount={11111111}
              showCollect={false}
              songs={songs}
              showBackground={true}
            ></AlbumList>
          </Scroll>
        </SongListWrapper>
        { loading ? (<Loading></Loading>) : null}
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state => ({
  artist: state.getIn(["singer", "artist"]),
  songs: state.getIn(["singer", "songsOfArtist"]),
  loading: state.getIn(["singer", "loading"]),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getSingerDataDispatch (id) {
      dispatch (changeEnterLoading(true));
      dispatch (getSingerInfo(id));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singer));
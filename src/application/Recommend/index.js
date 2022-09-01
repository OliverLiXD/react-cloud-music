import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";

import Slider from "../../baseUI/Slider";
import RecommendList from "../../components/RecommendList";
import { Content } from "./style";
import Scroll from "../../baseUI/Scroll";
import { getBannerList, getRecommendList } from "./store/actionCreators";
import Loading from "../../baseUI/Loading";

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDispatch } = props;

  const scrollRef = useRef(null);

  useEffect(() => {
    if(bannerList.size === 0) {
      getBannerDataDispatch();
    }
    if(recommendList.size === 0) {
      getRecommendListDispatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  
  return (
    <Content>
      <Scroll className="list" ref={scrollRef} onScroll={forceCheck}>
        <div className="Recommend">
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  )
}

const mapStateToProps = (state) => {
  return {
    bannerList: state.getIn(["recommend", "bannerList"]),
    recommendList: state.getIn(["recommend", "recommendList"]),
    enterLoading: state.getIn(["recommend", "enterLoading"])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      // debugger;
      dispatch(getBannerList());
    },
    getRecommendListDispatch() {
      // debugger;
      dispatch(getRecommendList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));
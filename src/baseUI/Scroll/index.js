import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
import BScroll from "better-scroll";

import { ScrollContainer } from "./style";

const Scroll = forwardRef((props, ref) => {
  const { direction, click, refresh, /*pullUpLoading, pullDownLoading,*/ bounceTop, bounceBottom } = props;
  const { pullUp, pullDown, onScroll } = props;

  const [bScroll, setBScroll] = useState(null);
  const scrollContaninerRef = useRef(null);

  // useEffect(() => {
  //   setBScroll(new BScroll(scrollContaninerRef.current, {
  //     scrollX: direction === "horizontal",
  //     scrollY: direction === "vertical",
  //     probeType: 3,
  //     observeDOM: true,
  //     click: click,
  //     bounce:{
  //       top: bounceTop,
  //       bottom: bounceBottom
  //     }
  //   }))
  //   return () => {
  //     setBScroll(null);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if(refresh && bScroll) {
  //     bScroll.refresh();
  //   }
  // })

  // useEffect(() => {
  //   if(!bScroll || !onScroll){
  //     return ;
  //   }
  //   bScroll.on("scroll", (scroll) => {
  //     onScroll(scroll);
  //   })
  //   return () => {
  //     bScroll.off("scroll");
  //   }
  // }, [onScroll, bScroll])

  // useEffect (() => {
  //   if (!bScroll || !pullUp) return;
  //   bScroll.on('scrollEnd', () => {
  //     // 判断是否滑动到了底部
  //     if (bScroll.y <= bScroll.maxScrollY + 100){
  //       pullUp();
  //     }
  //   });
  //   return () => {
  //     bScroll.off('scrollEnd');
  //   }
  // }, [pullUp, bScroll]);

  // useEffect (() => {
  //   if (!bScroll || !pullDown) return;
  //   bScroll.on('touchEnd', (pos) => {
  //     // 判断用户的下拉动作
  //     if (pos.y > 50) {
  //       pullDown();
  //     }
  //   });
  //   return () => {
  //     bScroll.off('touchEnd');
  //   }
  // }, [pullDown, bScroll]);

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      observeDOM: true,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      //判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      //判断用户的下拉动作
      if(pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll]);


  useEffect(() => {
    if(refresh && bScroll){
      bScroll.refresh();
    }
  });

  useImperativeHandle (ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};

export default Scroll;
import React, {useRef, useState, useEffect, useMemo} from 'react';

import { SearchBoxWrapper } from "./style";
import { debounce } from './../../api/utils';


const SearchBox = (props) => {

  const { showSearch, newQuery } = props;
  const { setShowSearchState, handleQuery } = props;

  const queryRef = useRef();
  const [query, setQuery] = useState('');
  // 根据关键字是否存在决定清空按钮的显示 / 隐藏 
  const displayStyle = query ? {display: 'block'} : {display: 'none'};

  useEffect(() => {
    if(showSearch) {
      queryRef.current.focus();
    }
  }, [showSearch])

  useEffect(() => {
    if (newQuery !== query){
      setQuery(newQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newQuery]);

  const handleChange = (e) => {
    // 搜索框内容改变时的逻辑
    setQuery(e.currentTarget.value);
  };

  // 缓存方法
  let handleQueryDebounce = useMemo(() => {
    return debounce(handleQuery, 500);
  }, [handleQuery]);
  
  useEffect(() => {
    // 注意防抖
    handleQueryDebounce(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  
  useEffect(() => {
    clearQuery();
  }, [showSearch]);

  const clearQuery = () => {
    // 清空框内容的逻辑
    setQuery('');
    queryRef.current.focus();
  }

  return (
    <SearchBoxWrapper>
      <i className="iconfont icon-back" onClick={() => setShowSearchState(false)}>&#xe604;</i>
      <input ref={queryRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleChange}/>
      <i className="iconfont icon-delete" onClick={clearQuery} style={displayStyle}>&#xe8d1;</i>
    </SearchBoxWrapper>
  )
};

export default React.memo(SearchBox);
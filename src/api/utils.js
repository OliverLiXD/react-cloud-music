export const getCount = function(count) {
  if (count < 0) return;
  
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count/1000)/10 + "万";
  } else  {
    return Math.floor(count / 10000000)/ 10 + "亿";
  }
}

export const debounce = function(func, delay) {
  let timer = null;

  return function(...args) {
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout (timer);
    }, delay)
  }
}

export const findTrackIndex = (list) => {

  for(let i = 0; i < list.length; i++) {
    if(list[i].tracks.length !== 0 && list[i+1].tracks.length === 0) {
      return i + 1;
    }
  }

  return list.length;
}

export const getName = list => {
  let str = "";
  list.map ((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

export const isEmptyObject = (obj) => {
  const res = !obj || Object.keys (obj).length === 0;
  return res;
}
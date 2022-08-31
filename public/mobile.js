const devicePixelRatio = window.devicePixelRatio;
const scale = 1 / devicePixelRatio;

document
.querySelector('meta[name="viewport"]')
.setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

function setRem() {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  
  document.documentElement.style.fontSize = deviceWidth / 100 + 'px';
}

window.onresize = function() {
  setRem();
};

setRem();

// document.querySelector("body").style.fontSize = 16 + "px";
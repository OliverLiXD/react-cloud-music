const STATE_PLAYING = "STATE_PLAYING";
const STATE_PAUSE = "STATE_PAUSE";

export default class Lyric {
  constructor(lyric, handler) {
    this.lyric = lyric;
    this.handler = handler;
    this.lines = [];
    this.state = STATE_PAUSE;
    this.currentLine = -1;
    this.startTimeStamp = -1;

    this._initializeLine();
  }

  _initializeLine = () => {
    // debugger;
    const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
    const lines = this.lyric.split("\n");
    for(let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const timeResult = timeExp.exec(line);
      if(!timeResult) {
        return ;
      }
      const text = line.replace(timeExp, "").trim();
      if (text) {
        if (timeResult[3].length === 3) {
          timeResult[3] = Number(timeResult[3])/10;
        }
        this.lines.push ({
          time: Number(timeResult[1]) * 60 * 1000 + Number(timeResult[2]) * 1000 + (timeResult[3] || 0) * 10,
          text
        });
      }
    }
    this.lines.sort((a, b) => {
      return a.time - b.time;
    })
  }

  play = (offset = 0, isManual = false) => {
    if (!this.lines.length) {
      return;
    }
    // debugger;
    this.startTimeStamp = +new Date() - offset;
    this.state = STATE_PLAYING;
    this.currentLine = this._findcurLineIndex(offset);

    this._callHandler(this.currentLine - 1);

    if(this.currentLine < this.lines.length) {
      clearTimeout(this.timer);
      this._playRest(isManual);
    }
  }

  _findcurLineIndex =  (time) => {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i
      }
    }
    return this.lines.length - 1
  }

  _callHandler = (i) => {
    if (i < 0 || i > this.lines.length - 1) {
      return
    }
    // debugger;
    this.handler({
      text: this.lines[i].text,
      lineNum: i
    })
  }

  _playRest = (isManual) => {
    // debugger;
    const line = this.lines[this.currentLine];
    let delay = 0;
    if(isManual) {
      delay = line.time - (+new Date() - this.startTimeStamp);
    }else {
      const pre = this.lines[this.currentLine -1] ? this.lines[this.currentLine -1].time : 0;
      delay = line.time - pre;
    }
    // debugger;
    this.timer = setTimeout(() => {
      this._callHandler(this.currentLine++);
      if(this.currentLine < this.lines.length && this.state === STATE_PLAYING) {
        this._playRest(false);
      }
    }, delay)
  }

  togglePlay = (offset) => {
    if(this.state === STATE_PLAYING) {
      this.stop()
    } else {
      this.state = STATE_PLAYING;
      this.play(offset, true);
    }
  }

  stop = () => {
    this.state = STATE_PAUSE
    clearTimeout(this.timer)
  }

  seek = (offset) => {
    this.play(offset, true)
  }
}
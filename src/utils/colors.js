import moment from 'moment';

const dayColors = [
  { hour: 0,  color : {r: 17 , g: 35 , b: 120}},
  { hour: 8,  color : {r: 255, g: 153, b: 102}},
  { hour: 12, color : {r: 24  , g: 231, b: 227}},
  { hour: 16, color : {r: 4  , g: 202, b: 247}},
  { hour: 21, color : {r: 213, g: 138, b: 224}},
  { hour: 24,  color : {r: 17 , g: 35 , b: 120}},
];

const _interpolateRGB = (c1, c2, perc) => {
  const interpolate = (a, b) => {
    const min = Math.min(a,b);
    const max = Math.max(a,b)
    const dif = max - min;
    const add = dif/100 * perc;
    return min === a ? min + add : max - add;
  }

  const res = {
    r: interpolate(c1.r, c2.r),
    g: interpolate(c1.g, c2.g),
    b: interpolate(c1.b, c2.b)
  }

  return res;
}

const _getTimePercentage = (h1, h2, h3) => {
  const min = Math.min(h1,h2);
  const max = Math.max(h1,h2);
  const dif = max - min;
  const hin = h3-min;
  return 100/dif*hin;
} 

const getTimeColor = (asString = false) => {
  const now = moment();
  const hour = now.hour() + (now.minute()/60);
  let h1, h2 = null;

  const colors = dayColors.reduce((last, h)=>{
    if(hour > last.hour && hour < h.hour){
      h1 = last;
      h2 = h;
    }
    return h 
  }, dayColors[3])

  const perc = _getTimePercentage(h1.hour, h2.hour, hour);

  const color = _interpolateRGB(h1.color, h2.color, perc);
  return asString ? 
    `rgb(${color.r},${color.g},${color.b})` :
    color;
}

export {
  getTimeColor
}
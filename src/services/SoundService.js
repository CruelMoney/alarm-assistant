import Sound from 'react-native-sound';
import iTunes from 'react-native-itunes';
import RNIosVolume from 'react-native-ios-volume';

Sound.setCategory('Playback');

const playPlaylist = ({name, fadetime}) => {
  RNIosVolume.setVolume(0);

  iTunes.getPlaylists({query:{name:name}})
    .then(({name, playCount, tracks})=>{
      return iTunes.playTracks(tracks)
    })
    .then(RNIosVolume.getVolume)
    .then(vol => {
      _fadeSound(
        RNIosVolume.setVolume, 
        fadetime,
        vol
      );
    })
    .catch(console.log) // TODO fallback sound
}

const _loadSound = (file) => {
  return new Promise((resolve, reject)=>{
    const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      if (error) return reject(error);
      return resolve(sound);
    });
  });
} 

// Duration in ms, ease in cubic
const _fadeSound = (setVolumeFun, duration, initVolume = 0) => {
  let vol = initVolume;
  let time = 0;
  const interval = 500;
  const curve = t => t*t*t; // cubic
  const frac = 1/curve(duration);

  const ref = setInterval(()=>{
    time += time + interval;
    vol = frac*curve(time);
    if(vol >= 1){ 
      setVolumeFun(1);
      return clearInterval(ref);
    }else{
      setVolumeFun(vol);
    }
  }, interval);
}

let soundRef = null;

const playSound = async ({file, fadetime, loop, initVolume}) => {
  return new Promise(async (resolve, reject)=>{
    var sound = await _loadSound(file);
    soundRef = sound;
    loop && sound.setNumberOfLoops(-1);
    (!!initVolume || initVolume === 0) ? sound.setVolume(initVolume) : sound.setVolume(1);
    if(!!fadetime){
      _fadeSound(
        sound.setVolume, 
        fadetime, 
        initVolume
      );
    }
    sound.play((succes)=>{
      if(succes){
        return resolve(sound)
      };
      sound.reset();
      return reject('playback failed due to audio decoding errors');
    });
  });
}

const stopSound = () => {
  soundRef && soundRef.stop();
}

export {
  playSound,
  playPlaylist,
  stopSound
}
import Sound from 'react-native-sound';

Sound.setCategory('Playback');


const playPlaylist = ({id, fadetime}) => {

}

const _loadSound = (file) => {
  return new Promise((resolve, reject)=>{
    console.log("loading file")
    const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      if (error) return reject(error);
      return resolve(sound);
    });
  });
} 

const _fadeSound = (sound, duration, initVolume = 0) => {
  let vol = initVolume;
  const iTime = 500;
  const steps = duration/iTime;
  const increase = 1-initVolume
  const increasePrStep = increase/steps;

  const interval = setInterval(()=>{
    if(vol >= 1) return clearInterval(interval);
    vol += increasePrStep;
    sound.setVolume(vol);
  }, iTime);
}

const playSound = async ({file, fadetime, loop, initVolume}) => {
  return new Promise(async (resolve, reject)=>{
    var sound = await _loadSound(file);
    loop && sound.setNumberOfLoops(-1);
    (!!initVolume || initVolume === 0) ? sound.setVolume(initVolume) : sound.setVolume(1);
    if(!!fadetime){
      _fadeSound(sound, fadetime, initVolume);
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

export {
  playSound
}
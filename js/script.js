let video = document.querySelector('#vid1');
let snapshots = document.querySelector('.snapshots');
let snapshot = document.querySelector('#vidSnapshot');
let videoFrame = document.querySelector('.vidFrame');
let playBtn = document.querySelector('.play');
let loadBtn = document.querySelector('.load');
let fullscreenBtn = document.querySelector('.btn-screen');
let volumeInput = document.querySelector('.volumeInput');
let speedInput = document.querySelector('select');
let btnPhonePlay = document.querySelector('.btnPhonePlay');
let btnPhoneSkip = document.querySelectorAll('.btnPhoneSkip')
const displayModeBtn = document.querySelector('.display-mode');
const vidBar = document.querySelector('.vidBar');
const vidBarTop = document.querySelector('.vidBarTop');
const btnCenterEffect = document.querySelector('.btnCenterEffect');
const volumeBtn = document.querySelector('.volume-img');
const settingDiv = document.querySelector('.setting')
const btnsDiv = document.querySelector('.btns');
const timesDiv = document.querySelector('.times');
const sliderEl = document.querySelector("#range")
const sliderValue = document.querySelector(".valueVolume");
const btnPlayPoster = document.querySelector('.btnPlayPoster');
const loadingIcon = document.querySelector('.loading');
const titleProgress = document.querySelector('.title-progress');
const phoneBackwardBtn = document.querySelector('.btnPhoneBackward')
const phoneForwardBtn = document.querySelector('.btnPhoneForward')
const subtitle= document.querySelector('.subtitle');
let screenshot= document.querySelector(".screenshot-container");
let errorContainer = document.querySelector('.error-container');
let isMobileSize = window.innerWidth <= 920;
let isMobilePortrait = window.innerWidth <= 576;
let vidbarAndBtnPhoneShow = false;
let fullScreen = false,played =false,hasPlayedoneMore=false,canScreenshot = false;
let vol , settingActive = false;
let videoInterval;
let videoPauseInterval;
let volumeDefault;
let vidbarInterval;
let videoloaded = false;
let setVideoloaded,setTimeSkip,setTimeVideoSkip;
let changeQuality = false;
let muted=false;
let speedPervious = 1;
let timeSkip = 5;
let timeoutRangeVideoHover,isOnDisplayMode = false;
let sF; //for timeout hide vidbar and btns
let isClickedbtnFB=false;
video.addEventListener('loadeddata',()=>{
  if(video.dataset.autoplay === 'true'){
    video.muted = true;
    muted=true;
    MuteToggle();
    btnPlayPoster.classList.remove('showBtnPoster');
    hasPlayedoneMore=true;
    PlayToggle();
    if(!isMobile())
      video.addEventListener('click',clickPlayToggle);
  }else{
    if(!hasPlayedoneMore){
      btnPlayPoster.classList.add('showBtnPoster');
      errorContainer.classList.remove('show-error-container')
    }
    
  }
   console.log('video loaded');
})
function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const touchSupport = ('ontouchstart' in document.documentElement) || navigator.maxTouchPoints > 0;
  const isUserAgentMobile = /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|wpdesktop|mobile|silk/i.test(userAgent);
  return isUserAgentMobile || touchSupport;
}

if(video.autoplay){
  throw new Error('The autoplay feature should not be given, the features of the program itself should be used ');
}

function makingTimeVideoToString(time){
  let m,h,s=0;
  let t = time / 3600;
  h = parseInt(t);
  m = parseInt((t - Math.trunc(t)) * 60);
  s = parseInt((((t - Math.trunc(t)) * 60 ) - m) * 60);
  return (h > 0 ? h+':' : '' )+(m < 10 ? '0'+m : m)+':'+(s < 10 ? '0'+s : s);
}

loadingIcon.classList.add('loading-show')

//custom range video 

customRange.addEventListener('pointerdown', (e) => { 
  console.log('pointer down')
  e.preventDefault();
  const percent = getPercentFromMouseEvent(e).Darsad;
  updateSlider(percent);
  video.currentTime = (percent / 100) * video.duration;
  document.addEventListener('pointermove', onMouseMove);
  document.addEventListener('pointerup', onMouseUp);
});
video.addEventListener('timeupdate', () => { 
  const percent = (video.currentTime / video.duration) * 100;
  updateSlider(percent);
  updateLoadProgress()
});
video.addEventListener('progress', updateLoadProgress);

video.addEventListener('loadeddata', () => {
    if (video.buffered.length > 0) {
        const percent = (video.buffered.end(0) / video.duration) * 100;
        updateLoadProgress(percent);
    }
});
let customRangeHover = document.querySelector('.custom-slider-for-hover');
let customrangeActive =false;
if(!isMobile()){
  customRange.addEventListener('mousemove', (e) => {
    let offsetX = ((getPercentFromMouseEvent(e).offsetX / getPercentFromMouseEvent(e).customRangeWidth) * video.duration);
    if(settingActive){
      snapshots.style.opacity = '0';
      snapshots.style.zIndex = '0';
      return
    }
    timeoutRangeVideoHover = setTimeout(()=>{
      snapshot.parentElement.style.height = `${.5625 *snapshots.getBoundingClientRect().width}px`;
      snapshots.style.transition = 'opacity .2s ';
      snapshots.style.bottom = '65px';
      snapshots.style.opacity = '1';
      snapshots.style.zIndex = '4';
      snapshot.currentTime = offsetX; //setTime for snapshot
      let widthSnapshot =snapshot.parentElement.getBoundingClientRect().width;
      titleProgress.textContent = offsetX < 0 ? '00:00': offsetX > video.duration ? makingTimeVideoToString(video.duration) : makingTimeVideoToString(offsetX);
      snapshots.style.left = getPercentFromMouseEvent(e).offsetX <= widthSnapshot/2 ? '0px': getPercentFromMouseEvent(e).offsetX >= (getPercentFromMouseEvent(e).customRangeWidth - widthSnapshot/2) ? (getPercentFromMouseEvent(e).customRangeWidth- widthSnapshot)+'px': (getPercentFromMouseEvent(e).offsetX - widthSnapshot/2) +'px';        
      customRangeHover.style.left = getPercentFromMouseEvent(e).offsetX <= widthSnapshot/2 ? '0px': getPercentFromMouseEvent(e).offsetX >= (getPercentFromMouseEvent(e).customRangeWidth - widthSnapshot/2) ? (getPercentFromMouseEvent(e).customRangeWidth- widthSnapshot)+'px': (getPercentFromMouseEvent(e).offsetX - widthSnapshot/2) +'px';        
      customRangeHover.style.display = 'block'
    },20)    
  });
  customRange.addEventListener('mouseleave',(e)=>{
    if(settingActive)
          return
    if (!e.relatedTarget || !customRange.contains(e.relatedTarget)) {
      clearTimeout(timeoutRangeVideoHover)
        let sss = setTimeout(()=>{
      customRangeHover.style.display = 'none'
        snapshots.style.opacity = '0';
        snapshots.style.zIndex = '-1';
        snapshots.style.bottom = '-200px';
        snapshots.style.transition = 'none';
        clearTimeout(sss)
      },21)
    }
  }) 
}
playBtn.addEventListener('click',PlayToggle);
btnPlayPoster.addEventListener('click',PosterPlayToggle);
volumeBtn.addEventListener('click',MuteToggle); 
video.addEventListener('ended',finishVideo);
fullscreenBtn.addEventListener('click',FullScreenToggle);
video.addEventListener('dblclick',()=>{
  if(isMobile())
    return
  FullScreenToggle()
});
video.addEventListener('volumechange',VolumeChange)
document.querySelectorAll('.btn-picture-in-picture').forEach(btn =>{
  btn.addEventListener('click',()=>{
    video.requestPictureInPicture()
    if(fullScreen){
      fullScreen=true;
      FullScreenToggle()
    }
  })
})
document.addEventListener('keyup',(e)=>{
  if(!hasPlayedoneMore){
    return
  }
  switch(e.code){
    case 'Space' :e.preventDefault();PlayToggle(); break;
    case 'KeyM' : e.preventDefault();MuteToggle();break;
  }
})
document.addEventListener('keydown',(e)=>{ 
  if (e.code === "Space") {
    e.preventDefault(); // جلوگیری از اسکرول صفحه
}
  if(!hasPlayedoneMore){
    return
  }
  switch(e.code){
    case  'ArrowLeft' : e.preventDefault();Back5s();break;
    case 'ArrowRight' : e.preventDefault();Forward5s();break;
    case 'ArrowDown' : e.preventDefault();LowVolume();break;
    case 'ArrowUp' : e.preventDefault();LoudVolume();break;
  }
})
function showVidbarAndBtns(){
  if(settingPortraitActive)
    return
  if(isMobileSize){
    vidBar.style.opacity= '0.9';
    vidBar.style.zIndex=100;
    btnPhonePlay.style.zIndex = 10;
    btnPhonePlay.style.opacity = '0.9';
    btnPhoneSkip.forEach((skipBtn)=>{
      skipBtn.style.opacity='.9';
      skipBtn.style.zIndex=10;
    })
    vidBarTop.style.opacity= '0.9';
    vidBarTop.style.zIndex = 10;
  }else{
    vidBar.style.opacity= '0.9';
    subtitle.style.bottom='70px';
    if(fullScreen){
      vidBarTop.style.opacity= '0.9'
      vidBarTop.style.zIndex = 10;
    }
  }
  vidbarAndBtnPhoneShow=true;
}
let vidBarHover = false , settingPortraitActive=false;
let hideVidbarAndBtns = ()=>{
    if(!settingActive ){
      if(!vidBarHover){
        if(isMobileSize){
          vidBar.style.opacity= '0';
          vidBar.style.zIndex = -10;
          vidBarTop.style.opacity = '0';
          vidBarTop.style.zIndex = -10;
          btnPhonePlay.style.opacity = '0';
          btnPhonePlay.style.zIndex = -10;
          btnPhoneSkip.forEach((skipBtn)=>{
            skipBtn.style.opacity='0';
            skipBtn.style.zIndex=-10;
          })
        }else{
          vidBar.style.opacity= '0'
           vidBarTop.style.opacity = '0';
           subtitle.style.bottom = '20px'
        }
      vidbarAndBtnPhoneShow=false;
 
      }
    }
 }
videoFrame.addEventListener('mouseleave',(e)=>{
  if(isVideoFinish)
    return
  clearTimeout(sF)
  if(video.paused){
    return
  }
    hideVidbarAndBtns()
})
 if(!isMobile()){
  phoneBackwardBtn.classList.add('hide-phone-bf')
  phoneForwardBtn.classList.add('hide-phone-bf')

  videoFrame.addEventListener('mousemove',(e)=>{
    if(!hasPlayedoneMore)
      return
    if(!played)
      return
    if(hasPlayedoneMore){
      clearTimeout(sF)
      showVidbarAndBtns()
      sF = setTimeout(()=>{
        console.log('hello sf mousemove')
        if(video.paused)
          return
        hideVidbarAndBtns()
      },2000)
    }
  })
  video.addEventListener('mouseenter',()=>{
    vidBarHover = false;
  })
  vidBar.addEventListener('mouseover',(e)=>{
    if(hasPlayedoneMore){
      if(fullScreen)
        showVidbarAndBtns()
      vidBarHover=true;}
  })
  vidBar.addEventListener('mouseout',(e)=>{
    if(hasPlayedoneMore){
      vidBarHover=false;
    }
  })
  vidBarTop.addEventListener('mouseover',(e)=>{
    if(hasPlayedoneMore){
      if(fullScreen)
       showVidbarAndBtns()
      vidBarHover=true;}
  })
  vidBarTop.addEventListener('mouseout',()=>{
    if(hasPlayedoneMore){
      vidBarHover=false;
    }
  })
}

let timeoutBack5,timeoutForward5;
let tF=5,tB=5; // for time backward and forward time in phone
function Forward5s(ismobile){
  video.currentTime = parseInt(video.currentTime) + 5.5;
  if(!ismobile)
    animationBtnFB('forward','btnForward');
  else{
    let timeForward = document.querySelector('.btnPhoneTimeForward');
    timeForward.innerHTML = '+'+tF + 's'
    clearTimeout(timeoutForward5)
    isClickedbtnFB=true;
    tF+=5;
    hideVidbarAndBtns()
    phoneForwardBtn.style.opacity = 1;
    phoneForwardBtn.querySelector('span').classList.remove('hidePhoneFBandSpan')
    phoneForwardBtn.querySelector('svg').classList.remove('hidePhoneFBandSpan')
    timeoutForward5=setTimeout(()=>{
      tF=5;
      phoneForwardBtn.style.opacity = 0;
      phoneForwardBtn.querySelector('span').classList.add('hidePhoneFBandSpan')
    phoneForwardBtn.querySelector('svg').classList.add('hidePhoneFBandSpan')
      isClickedbtnFB=false;
      showVidbarAndBtns()
    },1000)
  }
}
function Back5s(ismobile){
  video.currentTime = parseInt(video.currentTime) - 5;
  if(!ismobile)
    animationBtnFB('backward','btnBackward');
  else{
    let timeBackward = document.querySelector('.btnPhoneTimeBackward');
    timeBackward.innerHTML = '-'+tB+'s';
    clearTimeout(timeoutBack5)
    phoneBackwardBtn.style.opacity = 1;
    phoneBackwardBtn.querySelector('span').classList.remove('hidePhoneFBandSpan')
    phoneBackwardBtn.querySelector('svg').classList.remove('hidePhoneFBandSpan')
    isClickedbtnFB=true;
    tB+=5;
    hideVidbarAndBtns()
    timeoutBack5=setTimeout(()=>{
      tB=5;
      phoneBackwardBtn.style.opacity = 0;
      phoneBackwardBtn.querySelector('span').classList.add('hidePhoneFBandSpan')
      phoneBackwardBtn.querySelector('svg').classList.add('hidePhoneFBandSpan')
      isClickedbtnFB=false;
      showVidbarAndBtns()
    },1000)
  }
}
let isVideoFinish = false;
function finishVideo(){
  isVideoFinish=true;
  console.log('finished');
  playBtn.classList.add('replay-svg');
  playBtn.firstElementChild.setAttribute('href','#multimedia-refresh-replay-video-icon-svgrepo-com') ;
  btnPhonePlay.firstElementChild.firstElementChild.setAttribute('href','#multimedia-refresh-replay-video-icon-svgrepo-com') 
  showVidbarAndBtns()
  clearInterval(videoInterval)
  clearInterval(videoPauseInterval);
  loadingIcon.classList.remove('loading-show')
  video.style.opacity = .5;

}
function Load(){
  // vidBar.style.opacity= '0';
  // btnPlayPoster.classList.add('showBtnPoster')
  playBtn.firstElementChild.setAttribute('href','#play-svgrepo-com');
  video.load()
}
function FullScreenToggle(){
  if(fullScreen===false){
    let valedVideo = document.querySelector('.vidFrame');
      if (valedVideo.requestFullscreen) {
          valedVideo.requestFullscreen();
      } else if (valedVideo.msRequestFullscreen) {
          valedVideo.msRequestFullscreen();
      } else if (valedVideo.mozRequestFullScreen) {
          valedVideo.mozRequestFullScreen();
      } else if (valedVideo.webkitRequestFullscreen) {
          valedVideo.webkitRequestFullscreen();
      }
      fullScreen=true;
      fullscreenBtn.firstElementChild.setAttribute('href','#collapse-svgrepo-com');
      fullscreenBtn.classList.remove('btn-expand')
      fullscreenBtn.classList.add('btn-collapse');
      displayModeBtn.style.display = 'none';
      if(isOnDisplayMode)
        video.style = 'object-fit:fill';
      if (isMobile()) {
        try {
          screen.orientation.lock('landscape');
        } catch (err) {
          console.warn('نتونستیم حالت افقی رو قفل کنیم:', err);
        }
      }
  }else{
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      }
      fullScreen=false;
      fullscreenBtn.firstElementChild.setAttribute('href','#expand-svgrepo-com');
      fullscreenBtn.classList.remove('btn-collapse')
      fullscreenBtn.classList.add('btn-expand')
      displayModeBtn.style.display = 'block';
      if(isOnDisplayMode)
        video.style = 'object-fit:contain';
      if (isMobile()) {
        try{
        screen.orientation.lock('portrait'); // قفل جهت رو بردار
        }catch(e){
          console.warn(e)
        }
      }
  }
}

function PosterPlayToggle(){
  // timeSkipTabligh.innerHTML = timeSkip+'s';
  vidBar.style.zIndex = 100 ;
  showVidbarAndBtns();
  // if(hasTablighat)
  //   btnSkipTabligh.style.display='flex';
  if(!isMobile())
    video.addEventListener('click',clickPlayToggle);
  PlayToggle()
  hasPlayedoneMore=true;
}
function clickPlayToggle(){
  // if(isTablighat)
  //   return
  if(settingActive)
    return
  PlayToggle()
}
// btnSkipTabligh.addEventListener('click',()=>{
//   console.log('btntablighskip')
//   if(!isSkip)
//     return
//   skipTablighFunc();
// })
function PlayToggle(){ 

  if(playBtn.classList.contains('replay-svg')){
    playBtn.classList.remove('replay-svg');
    played = false;
    video.style.opacity = 1 ;
    isVideoFinish=false;
  }
  if(!hasPlayedoneMore){
    btnPlayPoster.classList.remove('showBtnPoster')
    // video.style.objectFit = 'contain'; 
  }
  if(played){
    video.muted = false
    animationBtn('pause-1006-svgrepo-com',400,0.7);
    playBtn.firstElementChild.setAttribute('href','#play-svgrepo-com') 
    btnPhonePlay.firstElementChild.firstElementChild.setAttribute('href','#play-svgrepo-com') 
    btnPhonePlay.firstElementChild.classList.add('play-phone-svg')
    
    played=false;
    let playloading=false;
    videoPauseInterval= setInterval(()=>{
      if(video.readyState <=2){
        loadingIcon.classList.add('loading-show')
        btnPhonePlay.style.opacity = '0';
        btnPhonePlay.style.zIndex = -10;
        btnPhoneSkip.forEach((skipBtn)=>{
          skipBtn.style.opacity='0';
          skipBtn.style.zIndex=-10;
        })
        playloading=true;
      }else{
        if(playloading){
          loadingIcon.classList.remove('loading-show')
          if(!isClickedbtnFB)
            showVidbarAndBtns()
          playloading=false;
          clearTimeout(sF)
          // sF = setTimeout(()=>{hideVidbarAndBtns();console.log('hellow')},2000)
        }
      }
      document.querySelector('.current').textContent = makingTimeVideoToString(video.currentTime)
    })
    video.pause();
    vidBar.style.opacity= '0.9'
    clearInterval(videoInterval)
    clearTimeout(sF)

  }else{
    animationBtn('play-svgrepo-com',400,0.7);
    playBtn.firstElementChild.setAttribute('href','#pause-1006-svgrepo-com') 
    btnPhonePlay.firstElementChild.firstElementChild.setAttribute('href','#pause-1006-svgrepo-com') 
    btnPhonePlay.firstElementChild.classList.remove('play-phone-svg')
    //vidbarTimeout for hide after 3 sceconds
    clearTimeout(sF)
    sF = setTimeout(()=>{hideVidbarAndBtns();console.log('hellow play')},2000)
    played=true;
    video.play();
    //duration textContent
    document.querySelector('.duration').textContent = makingTimeVideoToString(video.duration)
    let playloading=false;
    videoInterval = setInterval(()=>{
      if(video.readyState <=2){
        loadingIcon.classList.add('loading-show')
        btnPhonePlay.style.opacity = '0';
        btnPhonePlay.style.zIndex = -10;
        btnPhoneSkip.forEach((skipBtn)=>{
          skipBtn.style.opacity='0';
          skipBtn.style.zIndex=-10;
        })
        playloading=true;
      }else{
        if(playloading){
          loadingIcon.classList.remove('loading-show')
          if(!isClickedbtnFB)
            showVidbarAndBtns()
          playloading=false;
          clearTimeout(sF)
          sF = setTimeout(()=>{hideVidbarAndBtns();console.log('hellow d')},2000)
        }
      
      }
      //currentTime textcontent
      document.querySelector('.current').textContent = makingTimeVideoToString(video.currentTime)
    })
    clearInterval(videoPauseInterval);
  }
}

vol = parseInt(volumeInput.value);
function LowVolume(){
  console.log(vol)
  if(video.volume > 0){
    if(vol<5){
      volumeInput.value = 0;
      return video.volume = 0;
    }
    vol -= 5;
    video.volume = parseFloat(vol) / 100;
    animationBtn('volume-down-megaphone-svgrepo-com',300,.6);
  }
 
}

function LoudVolume(){
  console.log(vol)
  if(video.volume < 1){
    if(vol>95){
      volumeInput.value = 100;
      return video.volume = 1;
    }
    vol += 5;
    video.volume = parseFloat(vol) / 100;
    animationBtn('volume-up-megaphone-svgrepo-com',300,.6)
  }
 
}
function MuteToggle(){
  if(video.volume > 0){
    volumeDefault = video.volume * 100;
    video.volume = 0;
    VolumeChange();
  
  }else{
    console.log(volumeDefault )
    video.volume = volumeDefault / 100;
    sliderValue.textContent = volumeDefault;
    VolumeChange()
  }
}
function VolumeChange(){
  
  if(video.volume === 0){
   volumeBtn.firstElementChild.setAttribute('href','#volume-mute-svgreop-com');
    volumeBtn.style = 'width:1.5rem;height:1.5rem'
  
styleElem = document.head.appendChild(document.createElement("style"));

styleElem.innerHTML = ".volume-img:after {opacity:1}";

// video.muted = true;
  }else{ 
    volumeBtn.style = 'width:1.65rem;height:1.65rem'

    if(video.volume < .33){
      volumeBtn.firstElementChild.setAttribute('href','#volume-up-svgreop-com');
    }else if(video.volume < .66){
      volumeBtn.firstElementChild.setAttribute('href','#volume-middle-svgreop-com');
    }
    else{
      volumeBtn.firstElementChild.setAttribute('href','#volume-down-svgreop-com');
    }
    styleElem = document.head.appendChild(document.createElement("style"));
styleElem.innerHTML = ".volume-img:after {opacity:0}";
video.muted = false;

  }
  sliderValue.textContent = parseFloat(video.volume *100).toFixed(0);
  volumeInput.value = video.volume * 100;
  sliderEl.style.background = `linear-gradient(to right, white ${video.volume*100}%, #969696 ${video.volume*100}%)`;
}

function animationBtn(n,tset,tani){
  loadingIcon.classList.remove('loading-show')
  // clearTimeout(sF);
  vidBar.style.bottom = '0'; 
  setTimeout(function(){
    btnCenterEffect.style.animation = 'none';
    btnCenterEffect.style = 'z-index : -1 !important'
  },tset) //300
  btnCenterEffect.style = 'z-index : 3 !important'
  btnCenterEffect.style.animation = `ani ${tani}s`;
  if(n.includes('play'))
    btnCenterEffect.firstElementChild.style.marginLeft = "3px";
  else
    btnCenterEffect.firstElementChild.style.marginLeft = "0";
  btnCenterEffect.firstElementChild.firstElementChild.setAttribute('href',`#${n}`);
}

function animationBtnFB(n,btnName){
  let BtnName = document.querySelector(`.${btnName}`);
  loadingIcon.classList.remove('loading-show')
  if(video.paused)
    clearTimeout(sF)
  showVidbarAndBtns()
  setTimeout(function(){
    BtnName.style.animation = 'none';
    BtnName.style = 'z-index : 0 !important'
  },400) //300
  BtnName.style = 'z-index : 3 !important'
  BtnName.style.animation = `ani2 .7s`;
  BtnName.firstElementChild.src = `./img/${n}.png`;
}

displayModeBtn.addEventListener('click',function(){
  if(displayModeBtn.classList.contains('cinema-mode')){
    isOnDisplayMode = true;
    displayModeBtn.firstElementChild.setAttribute('href','#normal-mode-svgreop-com')
    displayModeBtn.classList.remove('cinema-mode')
    displayModeBtn.classList.add('normal-mode');
    videoFrame.style.borderRadius = 0;
    videoFrame.style.width = 100+'%';
    video.style = 'object-fit:contain';

  }else{
    isOnDisplayMode = false;
    displayModeBtn.firstElementChild.setAttribute('href','#cinema-mode-svgreop-com')
    displayModeBtn.classList.add('cinema-mode')
    displayModeBtn.classList.remove('normal-mode')
    videoFrame.style.borderRadius = '1rem';
    videoFrame.style.width = 70+'%';
    video.style = 'object-fit:fill';

  }
})

function skipTablighFunc(){
  // progressDiv.style.display = 'block';
    settingDiv.style.display = 'flex';
    timesDiv.style.display = 'block';
   playBtn.style.display = 'block';
   btnSkipTabligh.style.display = 'none';
  isTablighat = false;
  clearInterval(setTimeSkip);
  clearInterval(setTimeVideoSkip);
  for(src of video.children){
    // console.log(item.dataset.value,src.dataset.label.replace('p',''))
    if(src.dataset.default === 'true'){
      console.log('meysam is good tablighat')
      video.insertBefore(src,video.children[0]);
      break;
    }
  }
  video.load();
  video.addEventListener('loadeddata',()=>{
    played=false;
    PlayToggle();
    })
}
function rangevaluecheck(val){
  if(val < 25){
    return 0.5
  }else if(val < 50){
    return 0
  }else if(val < 75){
    return -0.25
  }else{
    return -0.5
  }
}
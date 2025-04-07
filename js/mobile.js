
  videoFrame.addEventListener('touchstart',(e)=>{
    if(!hasPlayedoneMore)
      return
    if(isVideoFinish)
      return
    if(isClickedbtnFB)
      return
    if(vidbarAndBtnPhoneShow){
      if(e.target.classList.contains("btnPhonePlay") || e.target.classList.contains("btnPhoneSkip"))
        return
      if(e.target.classList.contains('vid')||e.target.classList.contains('btnphone-BF')){
      clearTimeout(sF)
        hideVidbarAndBtns()
      }
    }else{
      //open
      clearTimeout(sF)
      showVidbarAndBtns()
      sF = setTimeout(()=>{
        if(video.paused)
          return
        hideVidbarAndBtns()
      },2000)
    }  
  })
  vidBar.addEventListener('touchstart',(e)=>{
    if(hasPlayedoneMore){
      vidBarHover=true;
      clearTimeout(sF)
      
    }
  })
  vidBar.addEventListener('touchend',(e)=>{
    vidBarHover=false;
    // sF = setTimeout(()=>{
    //   if(video.paused)
    //     return
    //   hideVidbarAndBtns()
    // },2000)
  })
  vidBarTop.addEventListener('touchstart',(e)=>{
    if(hasPlayedoneMore){
      vidBarHover=true;
      clearTimeout(sF)
   
    }
  })
  vidBarTop.addEventListener('touchend',(e)=>{
    vidBarHover=false;
    // sF = setTimeout(()=>{
    //   if(video.paused)
    //     return
    //   hideVidbarAndBtns()
    // },2000)
  })
  
btnPhonePlay.addEventListener('click',()=>{
    PlayToggle()
})

phoneBackwardBtn.addEventListener('dblclick',()=>{
  if(!hasPlayedoneMore)
    return
  Back5s(true)
});
phoneForwardBtn.addEventListener('dblclick',()=>{
  if(!hasPlayedoneMore)
    return
  Forward5s(true)
});



window.addEventListener('resize',(e)=>{
    if(window.innerWidth < 920){
      videoFrame.style.width='100%'
        isMobileSize=true;
    }else{
        isMobileSize=false;
        if(!isOnDisplayMode){
          videoFrame.style.width='70%'
        }
    }
    if(window.innerWidth < 576){
      isMobilePortrait =true;
    }else{
      isMobilePortrait=false;
    }
})
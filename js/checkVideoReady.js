function checkVideoReady(videoElement,source, onSuccess, onFail, timeoutMs = 5000) {
  // if(!hasPlayedoneMore){
  //   checkUrlDefaultSource()
  // }
    let isReady = false;
    const successHandler = () => {
      if (isReady) return;
      isReady = true;
      cleanup();
      onSuccess();
    };
  //   async function checkUrlDefaultSource(){
  //     const sourcesVideo = videoElement.querySelectorAll('source');
  //   let response = await fetch(source.src, { method: 'HEAD' });
  //   if(response.ok){
  //     successHandler()

  //   }else{
  //     sourcesVideo.forEach(child=>{
  //       console.log(child)
  //       video.removeChild(child)
  //     })
  //     if (isReady) return;
  //     isReady = true;
  //     cleanup();
  //   onFail(' video source not reachable (404 or network error).');
  //   console.log('fetch false')
  //   }
  // } 
    const errorHandler = () => {
      if (isReady) return;
      isReady = true;
      cleanup();
      onFail('Video failed to load. Check the file path or network.');
    };
  
    const timeoutHandler = () => {
      if (isReady) return;
      isReady = true;
      cleanup();
      const isTryingToLoad =
        videoElement.networkState === HTMLMediaElement.NETWORK_LOADING;
        console.log(videoElement.networkState)
      if (isTryingToLoad) {
        setTimeout(timeoutHandler, 5000);
        return;
      }
      if (videoElement.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        onFail('Video source not found (check URL).');
      } else {
        onFail('Video did not load in time.');
      }
    };
  
    const cleanup = () => {
      videoElement.removeEventListener('canplay', successHandler);
      videoElement.removeEventListener('error', errorHandler);
    };
  
    videoElement.addEventListener('canplay', successHandler);
    videoElement.addEventListener('error', errorHandler);
  
    setTimeout(timeoutHandler, timeoutMs);
  
    // videoElement.load();
}
  
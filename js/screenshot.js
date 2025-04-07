let downlaodScreenshotBtn = document.querySelector('.download-screenshot-svg');
let closeScreenshotBtn = document.querySelector('.close-screenshot-svg');
let screenshotBtns = document.querySelector('.screenshot-btns');
const btnScreenshot = document.querySelectorAll('.btn-screenshot');

let dataImgScreenshot;
btnScreenshot.forEach((btn =>{
  btn.addEventListener('click',()=>{
    if(canScreenshot)
        return
    if(video.readyState >= 3){
        canScreenshot = true;
        screenshot.style.transition = 'all 0.4s';
      screenshot.style.zIndex = '22532532523'
        screenshot.style.opacity= '1'
        screenshot.style.transform = 'scale(0.9)'
      setTimeout(()=>{
        // screenshot.style.transform = 'scale(1)'
        screenshot.style.transition = 'all 0.3s'
        if(isMobileSize){
          screenshot.style.width='40%';
        screenshot.style.height = '40%';
        screenshot.style.left = '59%';
        }else{
          screenshot.style.width='25%';
        screenshot.style.height = '25%';
        screenshot.style.left = '74%';
        }
        screenshot.style.top = '2%';
        setTimeout(()=>{
            screenshotBtns.style.opacity = '1';
        },300)
      },600)
      takeScreen()
    }
    else{
      console.log('video this not loading')
    } 
  })
}))
  async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'screenshot';
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  function takeScreen() {
    var audio = new Audio('../sound/camera-sound.mp3');
    // let screens = [];
    audio.play();
    var filename = video.src;
    var w = video.videoWidth;
    var h = video.videoHeight;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    var data = canvas.toDataURL("image/jpg");
    console.log(data)
     document.querySelector(".screenshot-img").innerHTML = '<img src="' + data+ '" class="img-screenshot" />';
     dataImgScreenshot = data;
  }
  downlaodScreenshotBtn.addEventListener('click',()=>{
    downloadImage(dataImgScreenshot);
  })
  closeScreenshotBtn.addEventListener('click',()=>{
    screenshot.style.transition = 'all 0.1s';
    screenshot.style.opacity= '0';
    screenshot.style.zIndex = '-1';
    console.log('close screenshot')
    setTimeout(()=>{
        screenshot.style.transform = 'scale(1)';
        screenshot.style.width='100%';
        screenshot.style.height = '100%';
        screenshot.style.left = '0';
        screenshot.style.top = '0';
        screenshotBtns.style.opacity = '0';
        canScreenshot =false;
    },100)
  })




  // video.addEventListener('seeked',()=>{ // وقتی زمان فیلم تغییر دهیم این رویداد عمل میکند
  //   console.log('hi my seeked')
    
  // })
  
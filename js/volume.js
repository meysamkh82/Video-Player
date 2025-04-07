//default start volume
video.volume = 0.5;

//set input range for volume
VolumeChange()
volumeInput.addEventListener('input',()=>{

vol = parseFloat(volumeInput.value);
   video.volume = parseFloat(volumeInput.value) /100
})



let panelSpeed = document.querySelector('.panel-speed');
let speedItems = document.querySelectorAll('.speed-item');
let selectedSpeed = document.querySelector('.selected-speed');
speedItems.forEach(item => {
        item.addEventListener('click',()=>{
            // menuSettingToggle()
            hideMenuClickItem()
            speedItems.forEach(i => {
                i.classList.remove('item-slected-speed');
                i.classList.remove('item-slected-all');
            });
            item.classList.add('item-slected-speed');
            item.classList.add('item-slected-all');
            selectedSpeed.innerHTML = item.innerHTML;
            video.playbackRate = parseFloat(item.dataset.value);
        })
    });
  
    
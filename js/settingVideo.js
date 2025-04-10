let menuWrapper = document.querySelector('.setting-menu');
let panelMainItems = document.querySelectorAll('.item-panel-main');
let menuPanels = document.querySelectorAll('.panel');
let backItems = document.querySelectorAll('.item-back')
let panelSubs = document.querySelectorAll('.panel-sub')
let mainPanel = document.querySelector('.panel-main')
let settingBtn = document.querySelectorAll('.btn-setting');

document.addEventListener('click',closeSelectSetting);

settingBtn.forEach(btn=>{
    btn.addEventListener('click',function(){
        if(menuWrapper.classList.contains('hide-menu')){ 
            setOverflowMenuWrapper(mainPanel);
            this.style.transform = 'rotate(150deg)';
         
            menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
            mainPanel.style.opacity = '1';
            setTimeout(()=>{
                menuWrapper.classList.add('show-menu');
                menuWrapper.classList.remove('hide-menu');
            },50)
            settingActive = true;
            if(btn.classList.contains('setting-phone')){
                if(isMobilePortrait){
                    settingActive=false;
                settingPortraitActive=true;
                hideVidbarAndBtns()
                clearTimeout(sF)
                }
            }
            return;
        }
        if(btn.classList.contains('setting-phone')){
            if(isMobilePortrait){
                settingPortraitActive=false;
                settingActive=false;
                showVidbarAndBtns()
            }
        }
        menuSettingToggle();
        this.style.transform = 'rotate(0deg)';
    })
})


backItems.forEach(backItem =>{
    backItem.addEventListener('click',()=>{
        hideMenuClickItem()
        
    })
})

panelMainItems.forEach((item)=>{
    item.addEventListener('click',()=>{
        let itemPanleName = item.querySelector('.item-panel-name');
        menuPanels.forEach((menuItem)=>{
            if(menuItem.classList.contains(`panel-${itemPanleName.textContent.toLowerCase()}`)){
                console.log(menuItem.getBoundingClientRect().height)
                menuItem.style.transition = 'all 0.3s'
                menuItem.style.right='0';
                menuItem.style.opacity = '1';
                mainPanel.style.opacity = '0';
                setTimeout(() => {
                    mainPanel.style.display = 'none' ;
                    menuWrapper.style.height = menuItem.getBoundingClientRect().height + 'px';
                    // menuWrapper.scrollTop = 0; 
                    setOverflowMenuWrapper(menuItem);
                }, 50);
                return;   
            }
        })
    })
})
function hideMenuClickItem(){
    let menuWrapper = document.querySelector('.setting-menu');
    let menuPanels = document.querySelectorAll('.panel');
    let mainPanel = document.querySelector('.panel-main')
    menuPanels.forEach((menuItem)=>{
        if(!menuItem.classList.contains('panel-main')){
            menuItem.style.transition = 'all .2s'
             menuItem.style.right = '100%';
             menuItem.style.opacity = '0'
        }
    })
    setTimeout(()=>{
    mainPanel.style.display = 'block'
        menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
        mainPanel.style.opacity = '1';
        setOverflowMenuWrapper(mainPanel);
    },50)
}
function menuSettingToggle(){
        let menuWrapper = document.querySelector('.setting-menu');
        let menuPanels = document.querySelectorAll('.panel');
        let mainPanel = document.querySelector('.panel-main')
        document.querySelector('.btn-setting').style.transform = 'rotate(0deg)';
        menuWrapper.classList.add('hide-menu');
        menuWrapper.classList.remove('show-menu');
        settingActive = false;
        setTimeout(()=>{
            menuPanels.forEach((menuItem)=>{
                if(!menuItem.classList.contains('panel-main')){
                    menuItem.style.transition = 'all .001s'
                     menuItem.style.right = '100%';
                     menuItem.style.opacity = '0'
                }
            })
            setOverflowMenuWrapper(mainPanel)
            menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
            mainPanel.style.display = 'block'    
        },200)
}
function setOverflowMenuWrapper(panel){
    console.log(panel.getBoundingClientRect().height)
    if(isMobilePortrait)
        panel.getBoundingClientRect().height >= 200 ? menuWrapper.style.overflowY = 'scroll':  menuWrapper.style.overflowY = 'hidden';
    else
        panel.getBoundingClientRect().height >= 280 ? panel.getBoundingClientRect().height >= 314 ? menuWrapper.style.overflowY = 'scroll' : menuWrapper.style.overflowY = 'hidden':  menuWrapper.style.overflowY = 'hidden';
    //har item taghrib 34 px inga to shart dovom gotam age az 280 bishtar bod bor bebin az 314 px bozorgrae bad scroll emal kon baray inke alaki scroll faal nashe
}
function closeSelectSetting(element){
    const getParents = el => {
        let isTrue;
        for (isTrue=false; el; el = el.parentNode) {
        if(el.nodeName.toLowerCase() === 'html'){
            break;
        }
        if(el.classList.contains('setting-menu')){
            isTrue=true;
            break
        }
        if(el.classList.contains('btn-setting')){
            isTrue=true;
            break;
        }
        }
        return isTrue;
      };
  if( getParents(element.target)){ 
    return
  }else{
        if(settingPortraitActive && isMobilePortrait && isMobile()){
        settingPortraitActive=false;
        settingActive=false;
        showVidbarAndBtns()
        }
        menuSettingToggle()
      
  }
}
if(isDissableSub){
    for(let child of mainPanel.children){
       if(child.textContent.toLocaleLowerCase().includes('subtitle')){
        child.remove();
        break
       }
    }
    
}
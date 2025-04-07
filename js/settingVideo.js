let menuWrapper = document.querySelector('.setting-menu');
let panelMainItems = document.querySelectorAll('.item-panel-main');
let menuPanels = document.querySelectorAll('.panel');
let backItems = document.querySelectorAll('.item-back')
let panelSubs = document.querySelectorAll('.panel-sub')
let mainPanel = document.querySelector('.panel-main')
let settingBtn = document.querySelectorAll('.btn-setting');
function hideMenuClickItem(){
    let menuWrapper = document.querySelector('.setting-menu');
    let menuPanels = document.querySelectorAll('.panel');
    let mainPanel = document.querySelector('.panel-main')
    menuPanels.forEach((menuItem)=>{
        if(!menuItem.classList.contains('panel-main')){
            menuItem.style.transition = 'all .001s'
             menuItem.style.right = '100%';
             menuItem.style.opacity = '0'
        }
    })
    menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
    mainPanel.style.opacity = '1'
    if(isMobilePortrait){
        if(mainPanel.getBoundingClientRect().height >= 200){
            menuWrapper.style.overflowY = 'scroll';
       }else{
            menuWrapper.style.overflowY = 'hidden';
       }
    }else{
        if(mainPanel.getBoundingClientRect().height >= 300 || menuItem.getBoundingClientRect().height >= 230){
            menuWrapper.style.overflowY = 'scroll';
       }else{
            menuWrapper.style.overflowY = 'hidden';
       }
    }
      
}
function menuSettingToggle(){
   
        let menuWrapper = document.querySelector('.setting-menu');
        let menuPanels = document.querySelectorAll('.panel');
        let mainPanel = document.querySelector('.panel-main')
        document.querySelector('.btn-setting').style.transform = 'rotate(0deg)';
        document.querySelector('.setting-menu').classList.add('hide-menu');
        document.querySelector('.setting-menu').classList.remove('show-menu');
        settingActive = false;
        menuPanels.forEach((menuItem)=>{
            if(!menuItem.classList.contains('panel-main')){
                menuItem.style.transition = 'all .001s'
                 menuItem.style.right = '100%';
                 menuItem.style.opacity = '0'
            }
        })
        menuWrapper.style.overflowY = 'hidden';
        menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';    
}
settingBtn.forEach(btn=>{
    btn.addEventListener('click',function(){
        if(menuWrapper.classList.contains('hide-menu')){ //e.srcElement.classList.contains('hide-menu')&&
            this.style.transform = 'rotate(150deg)';
            menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
            menuWrapper.classList.add('show-menu');
            menuWrapper.classList.remove('hide-menu');
            mainPanel.style.opacity = '1';
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
        }else{
            if(btn.classList.contains('setting-phone')){
                if(isMobilePortrait){
                settingPortraitActive=false;
                settingActive=false;
                showVidbarAndBtns()
                }
            }
            menuSettingToggle();
        }
        this.style.transform = 'rotate(0deg)';
        menuWrapper.classList.add('hide-menu');
        menuWrapper.classList.remove('show-menu');
        settingActive = false;
    })
})
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
  if( getParents(element.target)){ //element.target.classList.contains('btn-setting') ||
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
document.addEventListener('click',closeSelectSetting);



backItems.forEach(backItem =>{
    backItem.addEventListener('click',()=>{
        menuPanels.forEach((menuItem)=>{
            if(!menuItem.classList.contains('panel-main')){
                 menuItem.style.right = '100%';
                 menuItem.style.opacity = '0'
            }
        })
        menuWrapper.style.overflowY = 'hidden';
        menuWrapper.style.height = mainPanel.getBoundingClientRect().height+'px';
        mainPanel.style.opacity = '1'
    })
})

panelMainItems.forEach((item)=>{
item.addEventListener('click',()=>{
    console.log(item.querySelector('.item-panel-name').textContent)
    let itemPanleName = item.querySelector('.item-panel-name');
    menuPanels.forEach((menuItem)=>{
        if(menuItem.classList.contains(`panel-${itemPanleName.textContent.toLowerCase()}`)){
            // console.log(menuItem.getBoundingClientRect().height)
            menuItem.style.transition = 'all 0.4s'
            menuItem.style.right='0';
            menuItem.style.opacity = '1';
            menuWrapper.style.height = menuItem.getBoundingClientRect().height+'px';
            
            mainPanel.style.opacity = '0';
            // console.log('menuWrapper.getBoundingClientRect().height : ',menuWrapper.getBoundingClientRect().height);
            if(isMobilePortrait){
                if(menuItem.getBoundingClientRect().height >= 200){
                    menuWrapper.style.overflowY = 'scroll';
               }else{
                    menuWrapper.style.overflowY = 'hidden';
               }
            }else{
                if(menuItem.getBoundingClientRect().height >= 300 || menuItem.getBoundingClientRect().height >= 230){
                    menuWrapper.style.overflowY = 'scroll';
               }else{
                    menuWrapper.style.overflowY = 'hidden';
               }
            }
         
            
            return;
           
        }
    })
})
})
if(isDissableSub){
    for(let child of mainPanel.children){
       if(child.textContent.toLocaleLowerCase().includes('subtitle')){
        child.remove();
        break
       }
    }
    
}
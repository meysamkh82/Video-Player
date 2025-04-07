let subtitles = [
    {label:'Off',srcleng:null,src:null,auto:true},
    {label:'English',srcleng:'en',src:'../src/subtitle/subtitles.vtt',auto:false,default:false},
    {label:'Persian',srcleng:'fa',src:'../src/subtitle/ff.vtt',auto:false,default:true}
];

let selectedSubtitle = document.querySelector('.selected-subtitle');
let panelSubtitle = document.querySelector('.panel-subtitle');
let videoTimeupdateFunc ,
isOnceChooseSubtitle=false, //entekhab shode ye sub ya na
isOnSubtitle=false,// check off or on subtitle
isDissableSub=false;
let btnSubtitle = document.querySelectorAll('.btn-subtitle');

if(subtitles.length <= 1){
    isDissableSub = true;
    btnSubtitle.forEach(btn=>{
    btn.classList.add('btn-disable');
    })
}else{
    for(child of subtitles){
        panelSubtitle.firstElementChild.innerHTML += `<li ${child.src ? "data-src="+child.src +"": ''} class="subtitle-item menu2-item ${child.auto ? 'item-slected-subtitle item-slected-all' : ''}" data-label=${child.label}>${child.label}</li>`;  
        if(child.auto){
            selectedSubtitle.textContent = child.label;
            if(child.label.toLowerCase() !== 'off'){
                isOnSubtitle=true;
                setupSubtitles(child.src);
                isOnceChooseSubtitle=true;
            }
        }
          
    }
}

let subtitleItems = document.querySelectorAll('.subtitle-item');
if(subtitleItems.length > 1){ // age subtitle mogod bod
    subtitleItems.forEach(item =>{
        item.addEventListener('click',()=>{
        if(item.classList.contains('item-slected-subtitle')){
                return
        }
        hideMenuClickItem();
        let divSubtitle = document.querySelectorAll('.div-btn-subtitle');
            subtitleItems.forEach(i => {
                i.classList.remove('item-slected-subtitle');
                i.classList.remove('item-slected-all')
            });
            item.classList.add('item-slected-subtitle');
            item.classList.add('item-slected-all');
            selectedSubtitle.innerHTML = item.innerHTML;
            if(item.dataset.label.toLowerCase() === 'off'){
                isOnSubtitle = false;
                divSubtitle.forEach(divSub=>{
                    divSub.classList.remove('onsubtitle')
                })
                StopSubtitle()
               
            }else{
                for(let sub of subtitles){
                    if(item.dataset.label === sub.label){
                        sub.default=true;
                        continue;
                    }
                    sub.default = false;
                }
                if(isOnceChooseSubtitle){
                    StopSubtitle() // age ye bar roshan shode bashe egra mishe
                }
                divSubtitle.forEach(divSub=>{
                    divSub.classList.add('onsubtitle')
                })
                isOnSubtitle=true;
                console.log(item.dataset.src)
                setupSubtitles(item.dataset.src)
                isOnceChooseSubtitle=true;
            }
        })
    })
    btnSubtitle.forEach(btn=>{
        btn.addEventListener('click',()=>{
            if(isDissableSub)
                return
            let divSubtitle = document.querySelectorAll('.div-btn-subtitle');
            subtitleItems.forEach(i => {
                i.classList.remove('item-slected-subtitle');
                i.classList.remove('item-slected-all')
            });
            if(isOnSubtitle){
                divSubtitle.forEach(divSub=>{
                    divSub.classList.remove('onsubtitle')
                })
                StopSubtitle();
                isOnSubtitle =false;
                subtitleItems[0].classList.add('item-slected-subtitle');
                subtitleItems[0].classList.add('item-slected-all');
                selectedSubtitle.innerHTML = subtitleItems[0].dataset.label;
    
            }else{
                if(subtitles.length < 1){
                    return
                }
                let useSub=false; // agar subtitle az ghabl entekhab karde ya na
                divSubtitle.forEach(divSub=>{
                    divSub.classList.add('onsubtitle')
                })
                for(let i=0;i<subtitles.length;i++){
                    if(subtitles[i].default){
                        setupSubtitles(subtitles[i].src);
                        subtitleItems[i].classList.add('item-slected-subtitle');
                        subtitleItems[i].classList.add('item-slected-all');
                        selectedSubtitle.innerHTML = subtitleItems[i].dataset.label;
                        useSub=true;
                        isOnSubtitle=true;
                        isOnceChooseSubtitle=true;
                        break;
                    }
                }
                if(!useSub){
                    subtitleItems[1].classList.add('item-slected-subtitle');
                    subtitleItems[1].classList.add('item-slected-all');
                    selectedSubtitle.innerHTML = subtitleItems[1].dataset.label;
                    setupSubtitles(subtitles[1].src);
                    isOnSubtitle=true;
                    isOnceChooseSubtitle=true;
    
                }
            }
        })
    })
    
}
function StopSubtitle(){
    let subtitleDiv = document.getElementById("customSubtitle");
    video.removeEventListener('timeupdate',videoTimeupdateFunc);
    subtitleDiv.style.opacity = '0'
    subtitleDiv.style.zIndex = '-1';
}
async function loadSubtitles(url) {
    let response = await fetch(url);
    let text = await response.text();
    console.log('hello man loaddam')

    return parseVTT(text);
}
// تبدیل VTT به یک آرایه از اشیای زیرنویس
function parseVTT(vttText) {
    let subtitles = [];
    let lines = vttText.split("\n");
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line.match(/\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3}/)) {
            let times = line.split(" --> ");
            let start = timeToSeconds(times[0]);
            let end = timeToSeconds(times[1]);
            let position = "bottom: 50px;"; // مقدار پیش‌فرض
            let text = "";
            i++; // حرکت به خط بعدی

            // خواندن تمام خطوط زیرنویس تا رسیدن به یک خط خالی یا تایم استمپ جدید
            while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/\d{2}:\d{2}:\d{2}.\d{3} --> \d{2}:\d{2}:\d{2}.\d{3}/)) {
                text += (text ? "\n" : "") + lines[i].trim();
                i++;
            }
            i--;
            // let text = lines[i + 1]?.trim() || "";
            subtitles.push({ start, end, text, position });
        }
    }
    return subtitles;
}

// تبدیل فرمت زمانی `00:00:00.000` به ثانیه
function timeToSeconds(time) {
    let parts = time.split(":");
    let seconds = parseFloat(parts[2]);
    let minutes = parseInt(parts[1]) * 60;
    let hours = parseInt(parts[0]) * 3600;
    return hours + minutes + seconds;
}

// نمایش زیرنویس در ویدیو
async function setupSubtitles(url) {
    let video = document.getElementById('vid1');
    let subtitleDiv = document.getElementById("customSubtitle");
    let subtitles = await loadSubtitles(url);
    videoTimeupdateFunc = function () {
        let currentTime = video.currentTime;
        let subtitleText = "";
        let subtitlePosition = "";
        subtitles.forEach(sub => {
            if (currentTime >= sub.start && currentTime <= sub.end) {
                subtitleText = sub.text;
                subtitlePosition = sub.position;
            }
        });
        console.log(subtitleText)
        if(subtitleText.length > 0){
            subtitleDiv.style.opacity = '1'
            subtitleDiv.style.zIndex = '20';
            subtitleDiv.textContent = subtitleText;
            // subtitleDiv.style.cssText = subtitlePosition;
        }else{
            subtitleDiv.style.opacity = '0'
            subtitleDiv.style.zIndex = '-1';
        }
       
    };

    video.addEventListener('timeupdate',videoTimeupdateFunc);
}

// btnPlayPoster.addEventListener('click',()=>{
//     console.log(video.textTracks)
// var vv = video.textTracks[1];
// vv.mode = 'showing'; //hiddenُ
// })


    // بررسی اینکه `line` برای موقعیت تعریف شده یا نه
            // if (times[1].includes("line:")) {
            //     let pos = times[1].match(/line:(\d+)%/);
            //     if (pos) {
            //         position = `top: ${100 - parseInt(pos[1])}%;`;
            //         // position = `bottom : 50%;`;
            //     }
            // }
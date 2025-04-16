const panelQuality = document.querySelector('.panel-quality');
const selectedQuality = document.querySelector('.selected-quality');
let currentTimeQuality;
let sourcesVideo = video?.querySelectorAll('source') || [];
checkFetchUrlSource().then(()=>{
  if (setupQualityMenu()) {
    setupQualitySelector();
  }
  document.querySelector('.item-back-quality').addEventListener('click',()=>{
    hideMenuClickItem()
  })
})
async function checkFetchUrlSource() {
  if (location.protocol === 'file:') {
    console.warn("در حالت file:// هستیم، fetch غیرفعاله.");
    return;
  }
  for (let i = 0; i < sourcesVideo.length; i++) {
    const source = sourcesVideo[i];
    try {
      const response = await fetch(source.src, { method: "HEAD" });
      if (!response.ok) {
        throw new Error("Source not reachable");
      }
    } catch (err) {
      console.warn("Invalid source:", source.src);
      if (source.dataset.default === 'true') {
        const next = source.nextElementSibling;
        if (next && next.tagName === 'SOURCE') {
          next.dataset.default = 'true';
          console.warn(source.dataset.label + " is default video source but it's broken, switching to next.");
        }
      }
      video.removeChild(source);
      sourcesVideo = video.querySelectorAll('source');
      i--;
    }
  }
}





function showError(message) {
  loadingIcon.classList.remove('loading-show')
  console.error(message);
  errorContainer.classList.add('show-error-container');
  errorContainer.lastElementChild.textContent = message;
}

function setupQualityMenu() {
  if (sourcesVideo.length === 0) {
    setTimeout(()=>{
      showError('No video sources found.');
    },2000)
    return false;
  }
  let hasValidSource = false;

  sourcesVideo.forEach( async source => {
    if (!source.src) return;
    hasValidSource = true;
    panelQuality.firstElementChild.innerHTML += `
      <li class="quality-item menu2-item ${source.dataset.default === 'true' ? 'item-slected-quality item-slected-all' : ''}"
          data-value="${source.dataset.label.replace('p', '')}">
        ${source.dataset.label}
      </li>
    `;
    if (source.dataset.default === 'true') {
      checkVideoReady(video,source,
        () => {
          console.log('Initial video loaded successfully.');
        },
        (msg) => {
          showError(msg);
        }
      );
      video.insertBefore(source, video.children[0]);
      snapshot.innerHTML = `<source src="${source.src}"/>`;
      snapshot.load()
   
      video.load();
    }
  });

  if (!hasValidSource) {
    setTimeout(()=>{
      showError('All video sources are empty.');
    },3000)
    return false;
  }
  return true;
}
function setupQualitySelector() {
  const qualityItems = document.querySelectorAll('.quality-item');

  if (qualityItems.length < 1) return;

  selectedQuality.innerHTML = document.querySelector('.item-slected-quality').textContent;

  qualityItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('item-slected-quality')) return;
      document.querySelectorAll('.quality-item').forEach(i => {
        i.classList.remove('item-slected-quality', 'item-slected-all');
      });
      item.classList.add('item-slected-quality', 'item-slected-all');
      selectedQuality.innerHTML = item.innerHTML;
      menuSettingToggle()
      // let sourcesVideo = video?.querySelectorAll('source') || [];
      sourcesVideo.forEach(source => {
        if (source.dataset.label.replace('p', '') === item.dataset.value) {
          currentTimeQuality = video.currentTime;
          video.insertBefore(source, video.children[0]);
          snapshot.innerHTML = `<source src="${source.src}"/>`;
          snapshot.load();
          video.load();
          checkVideoReady(video, source,
            () => {
              video.currentTime =currentTimeQuality;
              video.playbackRate = speedPervious;
              changeQuality = true;
              played = false;
              PlayToggle();
              changeQuality = false;
              
            },
            (errMsg) => {
              showError(errMsg);
            }
          );
        }
      });
    });
  });
}


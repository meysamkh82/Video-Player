const panelQuality = document.querySelector('.panel-quality');
const selectedQuality = document.querySelector('.selected-quality');
let currentTimeQuality;
let sourcesVideo = video?.querySelectorAll('source') || [];

if (setupQualityMenu()) {
  setupQualitySelector();
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

  sourcesVideo.forEach(source => {
    if (!source.src) return;

    hasValidSource = true;

    panelQuality.firstElementChild.innerHTML += `
      <li class="quality-item menu2-item ${source.dataset.default === 'true' ? 'item-slected-quality item-slected-all' : ''}"
          data-value="${source.dataset.label.replace('p', '')}">
        ${source.dataset.label}
      </li>
    `;
    if (source.dataset.default === 'true') {
      video.insertBefore(source, video.children[0]);
      snapshot.innerHTML = `<source src="${source.src}"/>`;
      snapshot.load()
      checkVideoReady(video,
        () => {
          console.log('Initial video loaded successfully.');
        },
        (msg) => {
          showError(msg);
        }
      );
      // video.load();
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

  if (qualityItems.length <= 1) return;

  selectedQuality.innerHTML = document.querySelector('.item-slected-quality').textContent;

  qualityItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('item-slected-quality')) return;
      document.querySelectorAll('.quality-item').forEach(i => {
        i.classList.remove('item-slected-quality', 'item-slected-all');
      });

      item.classList.add('item-slected-quality', 'item-slected-all');
      selectedQuality.innerHTML = item.innerHTML;

      sourcesVideo.forEach(source => {
        if (source.dataset.label.replace('p', '') === item.dataset.value) {
          currentTimeQuality = video.currentTime;
          video.insertBefore(source, video.children[0]);
          snapshot.innerHTML = `<source src="${source.src}"/>`;
          snapshot.load();
          // video.load();
          checkVideoReady(video, 
            () => {
              video.currentTime = currentTimeQuality;
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


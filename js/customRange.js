
const customRange = document.querySelector('.custom-slider');
const loadProgress = document.querySelector('.load-progress');
const track = document.querySelector('.track');
const thumb = document.querySelector('.thumb');


function updateSlider(percent) {
    track.style.width = `${percent}%`;
    thumb.style.left = `${percent}%`;
}

function updateLoadProgress(percent) {
    loadProgress.style.width = `${percent}%`;
}

function getPercentFromMouseEvent(e) {
    const rect = customRange.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    return {Darsad:(offsetX / rect.width) * 100,offsetX,customRangeWidth:rect.width};
}


function onMouseMove(e) {
    console.log('mouse move ',video.duration)
    e.preventDefault();
    const percent = getPercentFromMouseEvent(e).Darsad;
    updateSlider(percent);
    video.currentTime = (percent / 100) * video.duration;
}

function onMouseUp() {
    document.removeEventListener('pointermove', onMouseMove);
    document.removeEventListener('pointerup', onMouseUp);
}


function updateLoadProgress() {
    if (video.buffered.length > 0) {
    const bufferedEnd = video.buffered.end(video.buffered.length - 1); // آخرین قسمت بافر شده
    const percent = (bufferedEnd / video.duration) * 100;
    loadProgress.style.width = `${percent}%`;
}
}




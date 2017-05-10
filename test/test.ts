import ImageViewer = require('../ImageViewer');
let imageViewer = new ImageViewer();
imageViewer.movable = false;
document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    imageViewer.open(<HTMLImageElement>event.target);
});

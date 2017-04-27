import ImageViewer = require('../ImageViewer');
let imageViewer = new ImageViewer();
document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    imageViewer.open(<HTMLImageElement>event.target);
});

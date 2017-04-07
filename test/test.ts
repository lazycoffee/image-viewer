import ImageViewer = require('../ImageViewer');

document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    let imageViewer = new ImageViewer();
    imageViewer.open(<HTMLImageElement>event.target);
});


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageViewer = require("../ImageViewer");
document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    var imageViewer = new ImageViewer();
    imageViewer.open(event.target);
});

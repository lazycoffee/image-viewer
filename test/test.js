"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ImageViewer = require("../ImageViewer");
var imageViewer = new ImageViewer();
imageViewer.movable = false;
document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    imageViewer.open(event.target);
});

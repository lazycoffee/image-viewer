"use strict";
var TWEEN = require("tween.js");
var ImageViewer = (function () {
    function ImageViewer(args) {
        this._gestureScaleRatio = 2;
        this._minScaleRation = 0.5;
        this._maxScaleRation = 2;
        this._imageX = 0;
        this._imageY = 0;
        this._startX = 0;
        this._startY = 0;
        this._touchCount = 0;
        this._hasTouchStart = false;
        this._touchStartTime = 0;
        args = args || {};
        this._id = args.id || '';
        this._baseIndex = args.baseIndex === undefined ? 100 : args.baseIndex;
        this._animationDuration = args.animationDuration === undefined ? 300 : args.animationDuration;
        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;
        //wrapper
        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('image-viewer');
        this._id && this._wrapper.setAttribute('id', this._id);
        this._wrapper.style.position = 'fixed';
        this._wrapper.style.top = '0';
        this._wrapper.style.right = '0';
        this._wrapper.style.bottom = '0';
        this._wrapper.style.left = '0';
        this._wrapper.style.zIndex = this._baseIndex + '';
        this._wrapper.style.overflow = 'hidden';
        //backdrop
        this._backdrop = document.createElement('div');
        this._backdrop.classList.add('backdrop');
        this._backdrop.style.position = 'absolute';
        this._backdrop.style.zIndex = this._baseIndex + 1 + '';
        this._backdrop.style.top = '0';
        this._backdrop.style.right = '0';
        this._backdrop.style.bottom = '0';
        this._backdrop.style.left = '0';
        this._backdrop.style.transitionDuration = this._animationDuration + 'ms';
        this._backdrop.style.transitionProperty = 'opacity';
        this._backdrop.style.opacity = '0';
        this._backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
        this._wrapper.appendChild(this._backdrop);
        this._image = document.createElement('img');
        this._image.style.zIndex = this._baseIndex + 2 + '';
        this._image.style.position = 'absolute';
        this._image.style.top = '0';
        this._image.style.left = '0';
        this._image.style.opacity = '0';
        this._image.style.transitionProperty = 'opacity';
        this._image.style.transitionDuration = this._animationDuration + 'ms';
        this._image.style.transform = 'translate3d(' + this._imageX + 'px, ' + this._imageY + 'px, 0)';
        this._wrapper.appendChild(this._image);
        //touch layer
        this._touchLayer = document.createElement('div');
        this._touchLayer.classList.add('touch-layer');
        this._touchLayer.style.position = 'absolute';
        this._touchLayer.style.zIndex = this._baseIndex + 3 + '';
        this._touchLayer.style.top = '0';
        this._touchLayer.style.right = '0';
        this._touchLayer.style.left = '0';
        this._touchLayer.style.bottom = '0';
        this._wrapper.appendChild(this._touchLayer);
        //animate
        requestAnimationFrame(animate);
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
    }
    ImageViewer.prototype.tweenXY = function (x, y) {
        var self = this;
        var tween = new TWEEN.Tween({ x: this._imageX, y: this._imageY })
            .to({ x: x, y: y }, 0)
            .onUpdate(function () {
            self._image.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0)';
        });
        tween.start();
    };
    ImageViewer.prototype.tweenWH = function (w, h) {
        var self = this;
        var tween = new TWEEN.Tween({ w: this._imageW, h: this._imageH })
            .to({ w: w, h: h }, 0)
            .onUpdate(function () {
            self._image.style.height = this.h + 'px';
            self._image.style.width = this.w + 'px';
        });
        tween.start();
    };
    ImageViewer.prototype.tweenXYWH = function (x, y, w, h, duration) {
        var self = this;
        var tween = new TWEEN.Tween({ x: this._imageX, y: this._imageY, w: this._imageW, h: this._imageH })
            .to({ x: x, y: y, w: w, h: h }, duration)
            .onUpdate(function () {
            console.log(this);
            self._image.style.height = this.h + 'px';
            self._image.style.width = this.w + 'px';
            self._image.style.transform = 'translate3d(' + this.x + 'px, ' + this.y + 'px, 0)';
        });
        tween.start();
        self._imageX = x;
        self._imageY = y;
        self._imageW = w;
        self._imageH = h;
    };
    ImageViewer.prototype.setImageXY = function (x, y) {
        this._image.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
    };
    ImageViewer.prototype.setImageWH = function (w, h) {
        this._image.style.height = h + 'px';
        this._image.style.width = w + 'px';
    };
    ImageViewer.prototype.setDefaultTouchIndicator = function () {
        this._touchCount = 0;
        this._hasTouchStart = false;
        this._touchStartTime = 0;
    };
    ImageViewer.prototype.animateXY = function (x, y) {
        var self = this;
        setTimeout(function () {
            self._image.style.transitionProperty = 'transform';
            self._image.style.transitionDuration = self._animationDuration + 'ms';
            self._image.offsetWidth;
            self.setImageXY(x, y);
            self._isAnimating = true;
            self.setDefaultTouchIndicator();
            setTimeout(function () {
                self._image.style.transitionDuration = '';
                self._image.style.transitionProperty = '';
                self._isAnimating = false;
                self._imageX = x;
                self._imageY = y;
            }, self._animationDuration);
        }, 100);
    };
    ImageViewer.prototype.animateXYWH = function (x, y, w, h) {
        var self = this;
        setTimeout(function () {
            self._image.style.transitionProperty = 'transform, width, height';
            self._image.style.transitionDuration = self._animationDuration + 'ms';
            self._image.style.transitionTimingFunction = 'ease';
            self._image.offsetWidth;
            self.setImageWH(w, h);
            self.setImageXY(x, y);
            self._isAnimating = true;
            self.setDefaultTouchIndicator();
            setTimeout(function () {
                self._image.style.transitionDuration = '';
                self._image.style.transitionProperty = '';
                self._image.style.transitionTimingFunction = '';
                self._isAnimating = false;
                self._imageX = x;
                self._imageY = y;
                self._imageW = w;
                self._imageH = h;
            }, self._animationDuration);
        }, 100);
    };
    ImageViewer.prototype.animateDefault = function () {
        this._isEnlarge = false;
        this.animateXYWH(this._defaultX, this._defaultY, this._defaultW, this._defaultH);
    };
    ImageViewer.prototype.animateMax = function () {
        this._isEnlarge = true;
        this._scaleW = this._defaultW * this._maxScaleRation;
        this._scaleH = this._defaultH * this._maxScaleRation;
        this.animateXYWH(-((this._scaleW) - this._windowWidth) / 2, this._windowHeight / 2 - (this._scaleH) / 2, this._scaleW, this._scaleH);
    };
    ImageViewer.prototype.open = function (img) {
        var self = this;
        document.body.appendChild(this._wrapper);
        this._image.addEventListener('load', function () {
            //set default position
            self._defaultX = 0;
            self._defaultY = self._windowHeight / 2 - img.height / 2;
            self._defaultH = img.height;
            self._defaultW = img.width;
            //get image ratio
            self._imageRatio = img.height / img.width;
            //get dimensions
            self._imageW = self._windowWidth;
            self._imageH = self._imageRatio * self._windowWidth;
            self._scaleW = self._imageW;
            self._scaleH = self._imageH;
            //set size
            self.setImageWH(self._scaleW, self._scaleH);
            //show
            self._backdrop.style.opacity = '1';
            self._image.style.opacity = '1';
            //set default position
            self._imageX = self._defaultX;
            self._imageY = self._defaultY;
            self.setImageXY(self._imageX, self._imageY);
            self._isDefault = true;
            self._isEnlarge = false;
            //add event
            self._touchLayer.addEventListener('touchstart', self.touchMove.bind(self));
            self._touchLayer.addEventListener('touchmove', self.touchMove.bind(self));
            self._touchLayer.addEventListener('touchend', self.touchMove.bind(self));
        });
        self._image.setAttribute('src', img.src);
    };
    ImageViewer.prototype.doubleTouch = function () {
        if (this._isEnlarge) {
            this.animateDefault();
        }
        else {
            this.animateMax();
        }
    };
    ImageViewer.prototype.touchMove = function (event) {
        var self = this;
        if (self._isAnimating) {
            return;
        }
        if (event.targetTouches.length === 1) {
            var touch = event.targetTouches[0];
            if (event.type === 'touchmove') {
                if (self._touchCount === 2 || self._hasTouchStart === false) {
                    return;
                }
                self._touchCount = 1;
                self._moveX = self._imageX + touch.clientX - self._startX;
                self._moveY = self._imageY + touch.clientY - self._startY;
                self.tweenXY(self._moveX, self._moveY);
            }
            else if (event.type === 'touchstart') {
                self._startX = touch.clientX;
                self._startY = touch.clientY;
                self._hasTouchStart = true;
                if (self._touchStartTime === 0) {
                    //first touch, set touch time
                    self._touchStartTime = Date.now();
                }
                else {
                    //second time
                    if (Date.now() - self._touchStartTime < 800) {
                        self._hasTouchStart = false;
                        self.doubleTouch();
                    }
                    else {
                        self._touchStartTime = Date.now();
                    }
                }
            }
        }
        else if (event.targetTouches.length === 2) {
            var touch1 = void 0, touch2 = void 0;
            if (event.targetTouches[0].clientY < event.targetTouches[1].clientY) {
                touch1 = event.targetTouches[0];
                touch2 = event.targetTouches[1];
            }
            else {
                touch2 = event.targetTouches[0];
                touch1 = event.targetTouches[1];
            }
            if (event.type === 'touchmove') {
                if (self._touchCount === 1 || self._hasTouchStart === false) {
                    return;
                }
                self._touchCount = 2;
                var ew = ((touch1.clientX - touch2.clientX) - (self._startT1.x - self._startT2.x)) * self._gestureScaleRatio;
                self._scaleW = self._imageW + ew;
                self._scaleH = self._scaleW * self._imageRatio;
                self._moveX = self._imageX - ew / 2;
                self._moveY = self._imageY - (self._scaleH - self._imageH) / 2;
                self.tweenWH(self._scaleW, self._scaleH);
                self.tweenXY(self._moveX, self._moveY);
                if (self._scaleW < self._windowWidth * self._minScaleRation) {
                    self._hasTouchStart = false;
                    self.animateDefault();
                }
            }
            else if (event.type === 'touchstart') {
                self._origin = {
                    x: touch1.clientX + (touch2.clientX - touch1.clientX) / 2,
                    y: touch2.clientY + (touch1.clientY - touch2.clientY) / 2
                };
                self._startT1 = { x: touch1.clientX, y: touch1.clientY };
                self._startT2 = { x: touch2.clientX, y: touch2.clientY };
                self._hasTouchStart = true;
            }
        }
        else if (event.touches.length === 0) {
            if (self._hasTouchStart === false) {
                return;
            }
            if (self._touchCount === 1) {
                self._imageX = self._moveX;
                self._imageY = self._moveY;
                //single touch move
            }
            else if (self._touchCount === 2) {
                self._imageX = self._moveX;
                self._imageY = self._moveY;
                self._imageW = self._scaleW;
                self._imageH = self._scaleH;
                if (self._scaleW < self._windowWidth) {
                    self.animateDefault();
                    return;
                }
                else if (self._scaleW > self._defaultW * self._maxScaleRation) {
                    self.animateMax();
                    return;
                }
            }
            var backX = self._imageX;
            var backY = self._imageY;
            if (self._imageX > 0) {
                backX = 0;
            }
            else if (self._imageX + self._imageW < self._windowWidth) {
                backX = -(self._imageW - self._windowWidth);
            }
            if (self._imageY < 0) {
                backY = 0;
            }
            else if (self._windowHeight - self._imageH < self._imageY) {
                backY = self._windowHeight - self._imageH;
            }
            self._isEnlarge = self._imageW > self._windowWidth;
            self.animateXY(backX, backY);
            self._hasTouchStart = false;
            self._touchCount = 0;
        }
    };
    return ImageViewer;
}());
module.exports = ImageViewer;

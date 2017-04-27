"use strict";
var TWEEN = require("tween.js");
var ImageViewer = (function () {
    function ImageViewer(args) {
        this._gestureScaleRatio = 2;
        this._minScaleRation = 0.5;
        this._maxScaleRation = 2;
        this._imageX = 0;
        this._imageY = 0;
        this._openMode = 'newPage';
        this._startX = 0;
        this._startY = 0;
        this._touchMoveCount = 0;
        this._touchCount = 0;
        this._moveX = 0;
        this._moveY = 0;
        this._hasTouchStart = false;
        this._touchStartTime = 0;
        this._downloadFn = function () {
            console.log('download button fired');
        };
        this._longTouch = function () {
            console.log('long touch fired');
        };
        this._longTouchDuration = 1000;
        this._longTouchStart = false;
        args = args || {};
        this._id = args.id || '';
        this._baseIndex = args.baseIndex === undefined ? 100 : args.baseIndex;
        this._animationDuration = args.animationDuration === undefined ? 300 : args.animationDuration;
        this._actionBarTitle = args.actionBarTitle === undefined ? '' : args.actionBarTitle;
        this._downloadIconText = args.downloadIconText === undefined ? '保存' : args.downloadIconText;
        this._windowWidth = window.innerWidth;
        this._windowHeight = window.innerHeight;
        this._widthRatio = this._windowWidth / 360;
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
        this._wrapper.style.display = 'none';
        //backdrop
        this._backdrop = document.createElement('div');
        this._backdrop.classList.add('backdrop');
        this._backdrop.style.position = 'absolute';
        this._backdrop.style.zIndex = this._baseIndex + 1 + '';
        this._backdrop.style.top = '0';
        this._backdrop.style.right = '0';
        this._backdrop.style.bottom = '0';
        this._backdrop.style.left = '0';
        this._wrapper.appendChild(this._backdrop);
        this._image = document.createElement('img');
        this._image.style.zIndex = this._baseIndex + 2 + '';
        this._image.style.position = 'absolute';
        this._image.style.top = '0';
        this._image.style.left = '0';
        this._image.style.width = this._windowWidth + 'px';
        this._image.style.transform = 'translate3d(' + this._imageX + 'px, ' + this._imageY + 'px, 0)';
        this._wrapper.appendChild(this._image);
        //insert to body
        document.body.appendChild(this._wrapper);
        //add event
        this._wrapper.addEventListener('touchstart', this.touchMove.bind(this));
        this._wrapper.addEventListener('touchmove', this.touchMove.bind(this));
        this._wrapper.addEventListener('touchend', this.touchMove.bind(this));
        this._wrapper.addEventListener('touchcancel', this.touchMove.bind(this));
        if (this._openMode === 'newPage') {
            this._backdrop.style.opacity = '1';
            this._backdrop.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            this._image.style.opacity = '1';
            //create action bar
            this._$actionBar = document.createElement('div');
            this._$actionBar.classList.add('action-bar');
            this._$actionBar.style.height = 66 * this._widthRatio + 'px';
            this._$actionBar.style.position = 'absolute';
            this._$actionBar.style.top = '0';
            this._$actionBar.style.left = '0';
            this._$actionBar.style.right = '0';
            this._$actionBar.style.zIndex = this._baseIndex + 3 + '';
            this._$actionBar.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
            //back arrow
            this._$backArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._$backArrow.setAttributeNS(null, 'viewBox', '0 0 ' + 24 * this._widthRatio + ' ' + 24 * this._widthRatio + '');
            this._$backArrow.style.position = 'absolute';
            this._$backArrow.style.left = 23.7 * this._widthRatio + 'px';
            this._$backArrow.style.top = 35.7 * this._widthRatio + 'px';
            this._$backArrow.style.height = 24 * this._widthRatio + 'px';
            this._$backArrow.style.width = 24 * this._widthRatio + 'px';
            this._$backArrow.style.fill = 'rgba(0,0,0,0.6)';
            var arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrowPath.setAttributeNS(null, 'd', 'M92,175c-1.094,1.093-1.718,1.281-3,0L62.592,149.47a1.365,1.365,0,0,1-.643-1.47c0-1.206.217-1.076,0.643-1.469L89,121c1.335-1.336,2-1.03,3,0l1,1c1.325,1.325,1.189,1.842,0,3L71,147c-1.02,1.021-1.021.979,0,2l22,22c0.931,0.931,1.553,1.447,0,3Z');
            arrowPath.setAttributeNS(null, 'transform', 'translate(-' + 41.938 / (3 * this._widthRatio) + ' -' + 112 / (3 * this._widthRatio) + '), scale(' + 1 / (3 * this._widthRatio) + ')');
            this._$backArrow.appendChild(arrowPath);
            this._$actionBar.appendChild(this._$backArrow);
            //action bar title
            this._$actionBarTitle = document.createElement('div');
            this._$actionBarTitle.style.position = 'absolute';
            this._$actionBarTitle.style.left = 56.7 * this._widthRatio + 'px';
            this._$actionBarTitle.style.top = 38 * this._widthRatio + 'px';
            this._$actionBarTitle.style.fontSize = 16 * this._widthRatio + 'px';
            this._$actionBarTitle.style.lineHeight = '1';
            this._$actionBarTitle.style.color = 'rgba(0,0,0,0.6)';
            this._$actionBarTitle.style.fontWeight = '500';
            this._$actionBarTitle.innerText = this._actionBarTitle;
            this._$actionBar.appendChild(this._$actionBarTitle);
            //append action bar
            this._wrapper.appendChild(this._$actionBar);
            //download bar
            this._$downloadBar = document.createElement('div');
            this._$downloadBar.classList.add('download-bar');
            this._$downloadBar.style.position = 'absolute';
            this._$downloadBar.style.bottom = '0';
            this._$downloadBar.style.left = '0';
            this._$downloadBar.style.right = '0';
            this._$downloadBar.style.height = 54 * this._widthRatio + 'px';
            this._$downloadBar.style.zIndex = this._baseIndex + 3 + '';
            this._$downloadBar.style.borderTop = '1px solid rgba(0,0,0,0.08)';
            this._$downloadIcon = document.createElement('div');
            this._$downloadIcon.classList.add('download-icon');
            this._$downloadIcon.innerText = this._downloadIconText;
            this._$downloadIcon.style.fontWeight = '500';
            this._$downloadIcon.style.whiteSpace = 'nowrap';
            this._$downloadIcon.style.fontSize = 10 * this._widthRatio + 'px';
            this._$downloadIcon.style.width = 40 * this._widthRatio + 'px';
            this._$downloadIcon.style.marginTop = 8 * this._widthRatio + 'px';
            this._$downloadIcon.style.paddingTop = 27 * this._widthRatio + 'px';
            this._$downloadIcon.style.verticalAlign = 'middle';
            this._$downloadIcon.style.textAlign = 'center';
            this._$downloadIcon.style.backgroundSize = 22 * this._widthRatio + 'px auto';
            this._$downloadIcon.style.backgroundImage = "url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QMxaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA1QzIxNTdEMUREMzExRTc4RDU2RDM3ODZEQzIwNjBDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA1QzIxNTdFMUREMzExRTc4RDU2RDM3ODZEQzIwNjBDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDVDMjE1N0IxREQzMTFFNzhENTZEMzc4NkRDMjA2MEMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDVDMjE1N0MxREQzMTFFNzhENTZEMzc4NkRDMjA2MEMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEB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')";
            this._$downloadIcon.style.backgroundRepeat = 'no-repeat';
            this._$downloadIcon.style.backgroundPositionX = 'center';
            this._$downloadIcon.style.marginLeft = 'auto';
            this._$downloadIcon.style.marginRight = 'auto';
            this._$downloadBar.appendChild(this._$downloadIcon);
            this._wrapper.appendChild(this._$downloadBar);
        }
        else if (this._openMode === 'overlay') {
            this._backdrop.style.opacity = '0';
            this._backdrop.offsetWidth;
            this._backdrop.style.transition = 'opacity';
            this._backdrop.style.transitionDuration = this._animationDuration + 'ms';
            this._backdrop.style.backgroundColor = 'rgba(0,0,0,0.8)';
            this._backdrop.style.opacity = '1';
        }
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
        this._touchMoveCount = 0;
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
    Object.defineProperty(ImageViewer.prototype, "imageSrc", {
        get: function () {
            return this._imageSrc;
        },
        set: function (src) {
            this._imageSrc = src;
        },
        enumerable: true,
        configurable: true
    });
    ImageViewer.prototype.show = function () {
        var self = this;
        this._wrapper.style.display = 'block';
        if (this._openMode === 'newPage') {
            //slide in
            this._wrapper.style.transform = 'translate3d(100%, 0, 0)';
            this._wrapper.style.boxShadow = '-' + 2 * this._widthRatio + ' 0 ' + 2 * this._widthRatio + 'px 0 rgba(0,0,0,0.3)';
            this._wrapper.offsetWidth;
            this._wrapper.style.transitionProperty = 'transform';
            this._wrapper.style.transitionDuration = this._animationDuration + 'ms';
            this._wrapper.style.transitionTimingFunction = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
            this._wrapper.style.transform = 'translate3d(0, 0, 0)';
        }
        else if (this._openMode === 'overlay') {
            this._image.style.opacity = '0';
            this._image.offsetWidth;
            this._image.style.transition = 'opacity';
            this._image.style.transitionDuration = this._animationDuration + 'ms';
            this._image.style.opacity = '1';
        }
    };
    ImageViewer.prototype.open = function (img) {
        var self = this;
        this._image.addEventListener('load', function () {
            //get image ratio
            self._imageRatio = img.height / img.width;
            //set default position
            self._defaultX = 0;
            self._defaultY = self._windowHeight / 2 - img.height / 2;
            self._defaultW = self._windowWidth;
            self._defaultH = self._defaultW * self._imageRatio;
            //get dimensions
            self._imageW = self._windowWidth;
            self._imageH = self._imageRatio * self._windowWidth;
            self._scaleW = self._imageW;
            self._scaleH = self._imageH;
            //set size
            self.setImageWH(self._scaleW, self._scaleH);
            //set default position
            self._imageX = self._defaultX;
            self._imageY = self._defaultY;
            self.setImageXY(self._imageX, self._imageY);
            self._isDefault = true;
            self._isEnlarge = false;
            //show
            self.show();
        });
        self.imageSrc = img.src;
        self._image.setAttribute('src', img.src);
    };
    ImageViewer.prototype.close = function () {
        var self = this;
        if (self._openMode === 'overlay') {
            this._backdrop.style.opacity = '0';
            this._image.style.opacity = '0';
        }
        else if (self._openMode === 'newPage') {
            this._wrapper.style.transform = 'translate3d(100%, 0, 0)';
        }
        setTimeout(function () {
            self._wrapper.style.display = 'none';
        }, this._animationDuration);
    };
    Object.defineProperty(ImageViewer.prototype, "downloadIconText", {
        set: function (text) {
            this._downloadIconText = text;
            this._$downloadIcon.innerText = text;
        },
        enumerable: true,
        configurable: true
    });
    ImageViewer.prototype.doubleTouch = function () {
        if (this._isEnlarge) {
            this.animateDefault();
        }
        else {
            this.animateMax();
        }
    };
    Object.defineProperty(ImageViewer.prototype, "downloadFn", {
        set: function (fn) {
            this._downloadFn = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewer.prototype, "singleTouch", {
        set: function (fn) {
            this._singleTouch = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageViewer.prototype, "longTouch", {
        set: function (fn) {
            this._longTouch = fn;
        },
        enumerable: true,
        configurable: true
    });
    ImageViewer.getDiagonalLength = function (xl, yl) {
        return Math.sqrt(Math.pow(Math.abs(xl), 2) + Math.pow(Math.abs(yl), 2));
    };
    ImageViewer.prototype.resetLongTouch = function () {
        //long touch
        this._longTouchStart = false;
        clearTimeout(this._longTouchTimer);
        this._longTouchTimer = 0;
    };
    ImageViewer.prototype.touchMove = function (event) {
        var self = this;
        event.preventDefault();
        if (self._isAnimating) {
            return;
        }
        if (event.touches.length === 1) {
            var touch = event.touches[0];
            self._$touchStartTarget = touch.target;
            self._longTouchTrackX = event.touches[0].clientX;
            self._longTouchTrackY = event.touches[0].clientY;
            if (event.type === 'touchmove') {
                if (self._touchMoveCount === 2 || self._hasTouchStart === false) {
                    return;
                }
                self._touchMoveCount = 1;
                if (event.target == self._image) {
                    self._moveX = self._imageX + touch.clientX - self._startX;
                    self._moveY = self._imageY + touch.clientY - self._startY;
                    self.tweenXY(self._moveX, self._moveY);
                }
            }
            else if (event.type === 'touchstart') {
                self._touchCount = 1;
                self._hasTouchStart = true;
                if (event.target == self._$backArrow) {
                    self.close();
                    return;
                }
                else if (event.target == self._image) {
                    //long touch detect
                    self._longTouchTimer = setTimeout(function () {
                        if (self._longTouchStart === false) {
                            return;
                        }
                        if (self._touchCount !== 1) {
                            return;
                        }
                        if (self._startX.toFixed() !== self._longTouchTrackX.toFixed() && self._startY.toFixed() !== self._longTouchTrackY.toFixed()) {
                            return;
                        }
                        self._longTouch();
                    }, self._longTouchDuration);
                    //double touch
                    self._startX = touch.clientX;
                    self._startY = touch.clientY;
                    self._longTouchStart = true;
                    if (self._touchStartTime === 0) {
                        //first touch, set touch time
                        self._touchStartTime = Date.now();
                    }
                    else {
                        //second time
                        if (Date.now() - self._touchStartTime < 500) {
                            self._hasTouchStart = false;
                            self.resetLongTouch();
                            self.doubleTouch();
                        }
                        else {
                            self._touchStartTime = Date.now();
                        }
                    }
                }
            }
        }
        else if (event.touches.length === 2) {
            var touch1 = event.touches[0];
            var touch2 = event.touches[1];
            if (event.type === 'touchmove') {
                if (self._touchMoveCount === 1 || self._hasTouchStart === false) {
                    return;
                }
                self._touchMoveCount = 2;
                var ew = ImageViewer.getDiagonalLength(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY) - self._startDiagonalLength;
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
                self._touchCount = 2;
                self._origin = {
                    x: touch1.clientX + (touch2.clientX - touch1.clientX) / 2,
                    y: touch2.clientY + (touch1.clientY - touch2.clientY) / 2
                };
                self._startT1 = { x: touch1.clientX, y: touch1.clientY };
                self._startT2 = { x: touch2.clientX, y: touch2.clientY };
                self._startDiagonalLength = ImageViewer.getDiagonalLength(self._startT1.x - self._startT2.x, self._startT1.y - self._startT2.y);
                self._hasTouchStart = true;
            }
        }
        else if (event.touches.length === 0) {
            if (self._hasTouchStart === false) {
                return;
            }
            self.resetLongTouch();
            //single touch
            if (self._touchCount === 1) {
                if (event.target == self._$touchStartTarget) {
                    if (event.target == self._backdrop) {
                        if (self._openMode === 'overlay') {
                            self.close();
                            return;
                        }
                    }
                    else if (event.target == self._$downloadIcon || event.target == self._$downloadBar) {
                        if (self._openMode === 'newPage') {
                            self._downloadFn();
                        }
                    }
                }
            }
            //touch move
            if (self._touchMoveCount === 1) {
                if (event.target == self._image) {
                    self._imageX = self._moveX;
                    self._imageY = self._moveY;
                    self.backToProperPlace();
                }
            }
            else if (self._touchMoveCount === 2) {
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
                self.backToProperPlace();
            }
        }
    };
    ImageViewer.prototype.backToProperPlace = function () {
        var self = this;
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
        self._touchMoveCount = 0;
    };
    return ImageViewer;
}());
module.exports = ImageViewer;

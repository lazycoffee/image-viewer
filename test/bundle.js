/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TWEEN = __webpack_require__(2);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */

var TWEEN = TWEEN || (function () {

	var _tweens = [];

	return {

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function (tween) {

			_tweens.push(tween);

		},

		remove: function (tween) {

			var i = _tweens.indexOf(tween);

			if (i !== -1) {
				_tweens.splice(i, 1);
			}

		},

		update: function (time, preserve) {

			if (_tweens.length === 0) {
				return false;
			}

			var i = 0;

			time = time !== undefined ? time : TWEEN.now();

			while (i < _tweens.length) {

				if (_tweens[i].update(time) || preserve) {
					i++;
				} else {
					_tweens.splice(i, 1);
				}

			}

			return true;

		}
	};

})();


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _valuesStartRepeat = {};
	var _duration = 1000;
	var _repeat = 0;
	var _repeatDelayTime;
	var _yoyo = false;
	var _isPlaying = false;
	var _reversed = false;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTweens = [];
	var _onStartCallback = null;
	var _onStartCallbackFired = false;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;
	var _onStopCallback = null;

	this.to = function (properties, duration) {

		_valuesEnd = properties;

		if (duration !== undefined) {
			_duration = duration;
		}

		return this;

	};

	this.start = function (time) {

		TWEEN.add(this);

		_isPlaying = true;

		_onStartCallbackFired = false;

		_startTime = time !== undefined ? time : TWEEN.now();
		_startTime += _delayTime;

		for (var property in _valuesEnd) {

			// Check if an Array was provided as property value
			if (_valuesEnd[property] instanceof Array) {

				if (_valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				_valuesEnd[property] = [_object[property]].concat(_valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (_object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			_valuesStart[property] = _object[property];

			if ((_valuesStart[property] instanceof Array) === false) {
				_valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			_valuesStartRepeat[property] = _valuesStart[property] || 0;

		}

		return this;

	};

	this.stop = function () {

		if (!_isPlaying) {
			return this;
		}

		TWEEN.remove(this);
		_isPlaying = false;

		if (_onStopCallback !== null) {
			_onStopCallback.call(_object, _object);
		}

		this.stopChainedTweens();
		return this;

	};

	this.end = function () {

		this.update(_startTime + _duration);
		return this;

	};

	this.stopChainedTweens = function () {

		for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
			_chainedTweens[i].stop();
		}

	};

	this.delay = function (amount) {

		_delayTime = amount;
		return this;

	};

	this.repeat = function (times) {

		_repeat = times;
		return this;

	};

	this.repeatDelay = function (amount) {

		_repeatDelayTime = amount;
		return this;

	};

	this.yoyo = function (yoyo) {

		_yoyo = yoyo;
		return this;

	};


	this.easing = function (easing) {

		_easingFunction = easing;
		return this;

	};

	this.interpolation = function (interpolation) {

		_interpolationFunction = interpolation;
		return this;

	};

	this.chain = function () {

		_chainedTweens = arguments;
		return this;

	};

	this.onStart = function (callback) {

		_onStartCallback = callback;
		return this;

	};

	this.onUpdate = function (callback) {

		_onUpdateCallback = callback;
		return this;

	};

	this.onComplete = function (callback) {

		_onCompleteCallback = callback;
		return this;

	};

	this.onStop = function (callback) {

		_onStopCallback = callback;
		return this;

	};

	this.update = function (time) {

		var property;
		var elapsed;
		var value;

		if (time < _startTime) {
			return true;
		}

		if (_onStartCallbackFired === false) {

			if (_onStartCallback !== null) {
				_onStartCallback.call(_object, _object);
			}

			_onStartCallbackFired = true;
		}

		elapsed = (time - _startTime) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		value = _easingFunction(elapsed);

		for (property in _valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (_valuesStart[property] === undefined) {
				continue;
			}

			var start = _valuesStart[property] || 0;
			var end = _valuesEnd[property];

			if (end instanceof Array) {

				_object[property] = _interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					_object[property] = start + (end - start) * value;
				}

			}

		}

		if (_onUpdateCallback !== null) {
			_onUpdateCallback.call(_object, value);
		}

		if (elapsed === 1) {

			if (_repeat > 0) {

				if (isFinite(_repeat)) {
					_repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in _valuesStartRepeat) {

					if (typeof (_valuesEnd[property]) === 'string') {
						_valuesStartRepeat[property] = _valuesStartRepeat[property] + parseFloat(_valuesEnd[property]);
					}

					if (_yoyo) {
						var tmp = _valuesStartRepeat[property];

						_valuesStartRepeat[property] = _valuesEnd[property];
						_valuesEnd[property] = tmp;
					}

					_valuesStart[property] = _valuesStartRepeat[property];

				}

				if (_yoyo) {
					_reversed = !_reversed;
				}

				if (_repeatDelayTime !== undefined) {
					_startTime = time + _repeatDelayTime;
				} else {
					_startTime = time + _delayTime;
				}

				return true;

			} else {

				if (_onCompleteCallback !== null) {

					_onCompleteCallback.call(_object, _object);
				}

				for (var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					_chainedTweens[i].start(_startTime + _duration);
				}

				return false;

			}

		}

		return true;

	};

};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return TWEEN;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else if (typeof module !== 'undefined' && typeof exports === 'object') {

		// Node.js
		module.exports = TWEEN;

	} else if (root !== undefined) {

		// Global variable
		root.TWEEN = TWEEN;

	}

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ImageViewer = __webpack_require__(0);
document.getElementsByClassName('image')[0].addEventListener('click', function (event) {
    var imageViewer = new ImageViewer();
    imageViewer.open(event.target);
});


/***/ })
/******/ ]);
import ARGUMENTS from './interface/ARGUMENTS';
declare class ImageViewer {
    constructor(args?: ARGUMENTS);
    private _wrapper;
    private _backdrop;
    private _image;
    private _animationDuration;
    private _baseIndex;
    private _id;
    private _windowWidth;
    private _windowHeight;
    private _imageX;
    private _imageY;
    private _imageH;
    private _imageW;
    private _defaultY;
    private _defaultX;
    private moveImage(x, y);
    private animateBack();
    open(img: HTMLImageElement): void;
    private _startX;
    private _startY;
    private _origin;
    singleMove(event: TouchEvent): void;
}
export = ImageViewer;

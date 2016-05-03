
export class Board{
    constructor(canvasElement){
        this._canvasElement = canvasElement;
        this._context = this._canvasElement[0].getContext('2d');
    }

    init(){
        this._canvasElement.on('mousedown', this._onMouseDown.bind(this));
        this._canvasElement.on('mouseup', this._onMouseUp.bind(this));
        this._canvasElement.on('mousemove', this._onMove.bind(this));
    }
    
    registerCallback(onStartDrawing, onDrawTo, onStopDrawing){ //temporary stub. todo: do that properly
        this._onStartDrawing = onStartDrawing;
        this._onDrawTo = onDrawTo;
        this._onStopDrawing = onStopDrawing;
    }

    _onMouseDown(e) {
        const coords = {
            x: e.offsetX,
            y: e.offsetY
        };
        
        if (this._onStartDrawing)
            this._onStartDrawing(coords);

        this.startDrawing(coords);
    }

    _onMouseUp() {
        if (this._onStopDrawing)
            this._onStopDrawing();
        this.stopDrawing();
    }

    _onMove(e) {
        if (!this._drawing)
            return;
            
        const coords = {
            x: e.offsetX,
            y: e.offsetY
        };
        
        if (this._onDrawTo)
            this._onDrawTo(coords);
            
        this.drawTo(coords);
    }

    startDrawing(coords){
        this._drawing = true;
        this._context.beginPath();
        this._context.moveTo(coords.x, coords.y);        
    }

    drawTo(coords){
        this._context.lineTo(coords.x, coords.y);
        this._context.stroke();        
    }

    stopDrawing(){
        this._drawing = false;        
    }
}

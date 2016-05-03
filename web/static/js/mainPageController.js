import { Board } from './board';
import { Socket } from "phoenix";

class MainPageController {
    static init(){
        this._socket = new Socket("/socket", {params: {token: window.userToken}});
        var canvas = $('#canvas');
        var board = new Board(canvas);
        board.init();

        this._socket.connect();
        this._channel = this._socket.channel("rooms:lobby", {});
        this._channel.join()
            .receive("ok", resp => { console.log("Joined successfully", resp); })
            .receive("error", resp => { console.log("Unable to join", resp); });

        board.registerCallback(this.onStartDrawing.bind(this), this.onDrawTo.bind(this), this.onStopDrawing.bind(this));
        this._channel.on("starDrawing", board.startDrawing.bind(board));
        this._channel.on("drawTo", board.drawTo.bind(board));
        this._channel.on("stopDrawing", board.stopDrawing.bind(board));
    }

    static onStartDrawing(coords){
        this._channel.push("starDrawing", coords);
    }

    static onDrawTo(coords){
        this._channel.push("drawTo", coords);
    }

    static onStopDrawing(){
        this._channel.push("stopDrawing", {});
    }
}

MainPageController.init();

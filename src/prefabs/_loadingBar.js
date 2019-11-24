import * as PIXI from 'pixi.js';
import {APP} from 'config';

class LoadingBar {
    constructor() {
        this.loader = new PIXI.Container();
        let loader = this.loader;
        this.a = 1;

        // box
        this.box = new PIXI.Graphics();
        let box = this.box;
        box.lineStyle(3, 0x000000);
        box.drawRect(10,
                    APP.pixi.height / 2,
                    APP.pixi.width - 20,
                    25);
        
        // bar
        this.bar = new PIXI.Graphics();
        let bar = this.bar;
        bar.beginFill(0x2e8b57);
        bar.drawRect(14,
                    APP.pixi.height / 2 + 4,
                    1,
                    25 - 8);
        bar.endFill();

        // msg
        this.msg = new PIXI.Text("Loading 0%", new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 22
        }));
        let msg = this.msg;

        msg.position.set(APP.pixi.width / 2 - 60, 
                        APP.pixi.height / 2);


        loader.addChild(box);
        loader.addChild(bar);
        loader.addChild(msg);
    }

    loadingHandler(handler) {
        this.msg.text = `Loading ${handler.progress}%`;

        let width = (handler.progress / 100) * (APP.pixi.width - 20 - 8);
        this.bar.beginFill(0x2e8b57);
        this.bar.drawRect(14,
                    APP.pixi.height / 2 + 4,
                    width,
                    25 - 8);
        this.bar.endFill();
    }
}

export const loadingBar = new LoadingBar();
import * as PIXI from 'pixi.js';

import {loadingBar} from 'prefabs/index'
import {keyboard, mouse} from 'scripts/index';

import {APP, GAME} from 'config/index';


class App {
    constructor() {
        this.pixi = new PIXI.Application(APP.pixi);
        this.pixi.renderer.backgroundColor = GAME.backgroundColor;

        document.getElementById("snake-game").appendChild(this.pixi.view);

        //devices
        this.keyboard = keyboard;
        this.mouse = mouse;

        // sprites to load
        this.sprites = [];
    }

    load(sprites) {
        this.sprites = sprites;
    }

    start(setup) {
        const app = this.pixi;
        const sprites = this.sprites;

        app.stage.addChild(loadingBar.loader);

        app.loader
        .add(sprites)
        .on("progress",(handler) => {loadingBar.loadingHandler(handler)})
        .load(() => {
          app.stage.removeChild(loadingBar.loader);
          setup();
        });
    }
}

export default new App();
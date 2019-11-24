import * as PIXI from 'pixi.js';

class Menu {
    constructor() {
        this.scene = new PIXI.Container();
    }

    createScene() {
        this.play = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/play.png']);
        this.play.scale.set(0.8,0.8);
        this.play.position.set(220,150);

        this.score = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/score.png']);
        this.score.scale.set(0.8,0.8);
        this.score.position.set(220,300);

        this.scene.addChild(this.play);
        this.scene.addChild(this.score);

        return this.scene;
    }

    gameLoop(delta) {
        // the gameloop
    }

    KBController(key) {
        // keyboard controller
    }

    MSController(x,y) {
        // mouse events
    }
}

export const menu = new Menu();
import * as PIXI from 'pixi.js';
import {spriteHelper} from 'scripts/_sprite_helper';

class Food {
    constructor() {
        this.apple = null;
        this.ax = 0;
        this.ay = 0; 
    }

    createApple(x,y) {
        this.ax = x;
        this.ay = y;
        let apple = this.apple;
        if(apple == null) {
            this.apple = spriteHelper.createSprite("sprites/food.png",x,y);
        } else {
            let pos = spriteHelper.getAbsPosition(x,y);
            apple.position.set(pos.x,pos.y);
        }
        return this.apple;
    }
}

export const food = new Food();
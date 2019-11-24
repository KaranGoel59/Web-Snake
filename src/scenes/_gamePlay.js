import * as PIXI from 'pixi.js';
import {snake,food} from 'prefabs/index'
import {spriteHelper} from 'scripts/_sprite_helper';

class Gamplay {
    constructor() {
        this.scene = new PIXI.Container();
        this.snake = snake;
        this.food = food;
        this.score = 0;
        this.time = 60;
        this.loop = true;

        this.gameOver = new PIXI.Text("GAME OVER", new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50
        }))

        this.gameOver.position.set(240,200)
    }

    createScene() {

        let pos = spriteHelper.getRandomTile();
        while(snake.checkCollison(pos.x,pos.y)) {
            pos = spriteHelper.getRandomTile();
        }

        this.scene.addChild(food.createApple(pos.x,pos.y));
        this.scene.addChild(snake.createBody());
        return this.scene;
    }

    resetGame() {
        snake.resetSnake();
        this.scene.removeChild(this.gameOver);

        let pos = spriteHelper.getRandomTile();
        while(snake.checkCollison(pos.x,pos.y)) {
            pos = spriteHelper.getRandomTile();
        }

        food.createApple(pos.x,pos.y)
    }

    gameLoop(delta) {
        if(this.loop == true) {
            this.time -= delta*snake.speed;
            if(this.time <= 0) {
                if(food.ax == snake.x && food.ay == snake.y) {
                    snake.eat();
                    this.score++;
    
                    let pos = spriteHelper.getRandomTile();
                    while(snake.checkCollison(pos.x,pos.y)) {
                        pos = spriteHelper.getRandomTile();
                    }
    
                    food.createApple(pos.x,pos.y);
                }
    
                if(!snake.die()) {
                    snake.move();
                } else {
                    this.scene.addChild(this.gameOver);
                }
                this.time = 60;
            }
        }
    }

    KBController(key) {
        switch (key) {
            case 38:
                snake.setDir("UP");
                break;
            case 37:
                snake.setDir("LEFT");
                break;
            case 40:
                snake.setDir("DOWN");
                break;
            case 39:
                snake.setDir("RIGHT");
                break;
            case 80:
                if(this.loop == true) {
                    this.loop = false;
                } else {
                    this.loop = true;
                }

        }
    }

    MSController(x,y) {
        // mouse events
    }
}

export const gamePlay = new Gamplay();
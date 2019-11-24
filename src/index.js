import app from './app';
import './styles/main.scss';

import {gamePlay,menu} from 'scenes/index';
import {spriteHelper} from 'scripts/index';

(async () => {
    app.load(['sprites/food.png',
              'sprites/bush.png',
              'sprites/snake.json',
              'sprites/play.png',
              'sprites/score.png']);

    app.start(() => {

        gamePlay.createScene();
        menu.createScene();

        // set scene
        gamePlay.scene.visible = false;
        app.pixi.stage.addChild(menu.scene);
        app.pixi.stage.addChild(gamePlay.scene);


        let scene = menu;

        app.mouse.addMouseDown((x,y) => {
            if(menu.scene.visible == true) {
                if(spriteHelper.checkInbound(x,y,menu.play)) {
                    menu.scene.visible = false;
                    gamePlay.resetGame();
                    gamePlay.scene.visible = true;
                    scene = gamePlay;
                }

                if(spriteHelper.checkInbound(x,y,menu.score)) {
                    alert(gamePlay.score);
                }
            } 
        });

        app.keyboard.addKeyDown((key) => {
            if(gamePlay.scene.visible == true) {
                if(key == 27) {
                    gamePlay.scene.visible = false;
                    menu.scene.visible = true;
                }
                gamePlay.KBController(key);
            }
        })

        // set gameLoop
        app.pixi.ticker.add((delta) => {
            scene.gameLoop(delta);
        });
    });
})();
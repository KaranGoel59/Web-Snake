import {GAME} from './_game.config';

export const APP = {
    pixi: {
        width: GAME.tile * GAME.board.width,
        height: GAME.tile * GAME.board.height,
        antialias: true
    }
}
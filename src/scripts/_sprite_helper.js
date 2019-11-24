import * as PIXI from 'pixi.js';
import {GAME} from 'config/index';

function createSprite(texture,x,y) {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache[texture]);
    let tile = GAME.tile;
    let scaleX = tile / sprite.width;
    let scaleY = tile / sprite.height;
    sprite.scale.set(scaleX,scaleY);
    sprite.position.set(x*tile,y*tile);
    return sprite;
}

function getAbsPosition(x,y) {
    return {
        x: x * GAME.tile,
        y: y * GAME.tile
    }
}

function getRelPosition(x,y) {
    return {
        x: x / GAME.tile,
        y: y / GAME.tile
    }
}

function getRandomTile() {
    let x = Math.floor(Math.random()*GAME.board.width);
    let y = Math.floor(Math.random()*GAME.board.height);

    return {
        x: x,
        y: y
    }
}

function checkInbound(x,y,sprite) {
    let rect = document.getElementsByTagName('canvas')[0].getBoundingClientRect();

    x = x - rect.left;
    y = y - rect.top;

    let width = sprite.x + sprite.width;
    let height = sprite.y + sprite.height;

    if(sprite.x <= x && width > x && sprite.y <=y && height > y) {
        return true;
    } else {
        return false;
    }
}

export const spriteHelper = {
    createSprite,
    getAbsPosition,
    getRelPosition,
    getRandomTile,
    checkInbound
}

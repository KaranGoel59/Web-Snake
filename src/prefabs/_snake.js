import * as PIXI from 'pixi.js';
import {spriteHelper} from 'scripts/index';
import {GAME} from 'config/index';

class Snake {
    constructor() {
        this.body = new PIXI.Container();
        this.length = 3;
        this.dir = "RIGHT";
        this.x = 3;
        this.y = 3;
        this.speed = 10;  //tile/sec

        this.prevDir = "RIGHT";
        this.lock = false;
    }

    createBody() {
        // create snake body
        let x = this.x;
        let y = this.y;
        let length = this.length;
        let body = this.body;

        let head = spriteHelper.createSprite("head_right.png", x, y);
        body.addChild(head);

        x -= 1;

        for (let i = 1; i < (length - 1); i++) {
            let part = spriteHelper.createSprite("body_horizontal.png", x, y);
            body.addChild(part);
            x -= 1;
        }

        let tail = spriteHelper.createSprite("tail_right.png", x, y);
        body.addChild(tail);

        return body;
    }

    resetSnake() {
        this.body.removeChildren();
        this.length = 3
        this.x = 3;
        this.y = 3;

        this.createBody();
    }

    setDir(dir) {
        if(this.lock == false) {
            this.prevDir = this.dir;
            if (dir == "RIGHT" && this.dir != "LEFT") {
                this.dir = dir;
                this.lock = true;
            } else if (dir == "LEFT" && this.dir != "RIGHT") {
                this.dir = dir;
                this.lock = true;
            } else if (dir == "UP" && this.dir != "DOWN") {
                this.dir = dir;
                this.lock = true;
            } else if (dir == "DOWN" && this.dir != "UP") {
                this.dir = dir;
                this.lock = true;
            }
        }
    }

    shiftBody() {
        let parts = this.body.children,
            tail = parts[this.length - 1];

        if (this.length > 2) {
            let prevHead = parts[1];

            let cru = PIXI.utils.TextureCache['curve_right_up.png'],
                crd = PIXI.utils.TextureCache['curve_right_down.png'],
                clu = PIXI.utils.TextureCache['curve_left_up.png'],
                cld = PIXI.utils.TextureCache['curve_left_down.png'],
                bh = PIXI.utils.TextureCache['body_horizontal.png'],
                bv = PIXI.utils.TextureCache['body_vertical.png'];

            let dir = this.dir;
            let prevDir = this.prevDir;

           if(dir == "RIGHT") {
                if(prevDir == "RIGHT") {
                     prevHead.texture = bh;
                } else if(prevDir == "UP") {
                    prevHead.texture = cld;
                } else if(prevDir == "DOWN") {
                    prevHead.texture = cru;
                }
           } else if(dir == "LEFT") {
                if(prevDir == "LEFT") {
                     prevHead.texture = bh;
                } else if(prevDir == "UP") {
                    prevHead.texture = crd;
                } else if(prevDir == "DOWN") {
                    prevHead.texture = clu;
                }
           } else if(dir == "UP") {
                if(prevDir == "UP") {
                     prevHead.texture = bv;
                } else if(prevDir == "RIGHT") {
                    prevHead.texture = clu;
                } else if(prevDir == "LEFT") {
                    prevHead.texture = cru;
                }
           } else if(dir == "DOWN") {
                if(prevDir == "DOWN") {
                     prevHead.texture = bv;
                } else if(prevDir == "RIGHT") {
                    prevHead.texture = crd;
                } else if(prevDir == "LEFT") {
                    prevHead.texture = cld;
                }
           }
        }

        let prevTail = this.body.removeChildAt(this.length),
            nextTail = parts[this.length - 2],

            tailup = PIXI.utils.TextureCache['tail_up.png'],
            taildown = PIXI.utils.TextureCache['tail_down.png'],
            tailleft = PIXI.utils.TextureCache['tail_left.png'],
            tailright = PIXI.utils.TextureCache['tail_right.png'];

        if ((prevTail.x == tail.x && prevTail.x == nextTail.x) || (prevTail.y == tail.y && prevTail.y == nextTail.y)) {
            tail.texture = prevTail.texture;
        } else {
            if (tail.x == nextTail.x) {
                if (tail.y > nextTail.y) {
                    if((tail.y - nextTail.y) > GAME.tile) {
                        tail.texture = taildown;
                    } else {
                        tail.texture = tailup;
                    }
                }
                else {
                    if((nextTail.x - tail.x) > GAME.tile) {
                        tail.texture = tailup;
                    } else {
                        tail.texture = taildown;
                    }
                }
            } else {
                if (tail.x > nextTail.x)
                    if((tail.x - nextTail.x) > GAME.tile) {
                        tail.texture = tailright;
                    } else {
                        tail.texture = tailleft;
                    }
                else {
                    if((nextTail.x - tail.x) > GAME.tile) {
                        tail.texture = tailleft;
                    } else {
                        tail.texture = tailright;
                    }
                }
            }
        }
    }

    move() {
        let x = this.x;
        let y = this.y;
        let body = this.body;
        let dir = this.dir;

        if(x == GAME.board.width - 1 && dir == "RIGHT") {
            x = -1;
        }

        if(x == 0 && dir == "LEFT") {
            x = GAME.board.width;
        }
        
        if(y == GAME.board.height - 1 && dir == "DOWN") {
            y = -1;
        }

        if(y == 0 && dir == "UP") {
            y = GAME.board.height;
        }

        if (dir == "RIGHT") {
            x += 1;
            let head = spriteHelper.createSprite("head_right.png",x,y);
            body.addChildAt(head, 0);
        } else if (dir == "LEFT") {
            x -= 1;
            let head = spriteHelper.createSprite("head_left.png",x,y);
            body.addChildAt(head, 0);
        } else if (dir == "UP") {
            y -= 1;
            let head = spriteHelper.createSprite("head_up.png",x,y);
            body.addChildAt(head, 0);
        } else if (dir == "DOWN") {
            y += 1;
            let head = spriteHelper.createSprite("head_down.png",x,y);
            body.addChildAt(head, 0);
        }

        this.x = x;
        this.y = y;
        this.shiftBody();
        this.prevDir = this.dir;
        this.lock = false;
    }

    eat() {
        this.length++;
        this.body.addChild(new PIXI.Sprite())
    }

    die() {
        let pos = spriteHelper.getAbsPosition(this.x,this.y);
        let parts = this.body.children;
        for(let i=1;i<parts.length;i++) {
            if(parts[i].x == pos.x && parts[i].y == pos.y) {
                return true;
            }
        }

        return false;
    }

    checkCollison(x,y) {
        let pos = spriteHelper.getAbsPosition(x,y);
        let parts = this.body.children;
        for(let i=0;i<parts.length;i++) {
            if(parts[i].x == pos.x && parts[i].y == pos.y) {
                return true;
            }
        }

        return false;
    }
}

export const snake = new Snake();
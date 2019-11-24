class Mouse {
    constructor() {
        this.mousedown = [];

        document.addEventListener('mousedown', (event) => {
            this.exMouseDown(event.clientX, event.clientY);
        });
    }

    addMouseDown(event) {
        this.mousedown.push(event);
    }

    exMouseDown(x,y) {
        this.mousedown.forEach((event) => {
            event(x,y);
        })
    }
}

export const mouse = new Mouse();
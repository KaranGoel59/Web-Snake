class KeyBoard {
    constructor() {
        this.keydown = [];

        document.addEventListener('keydown', (event) => {
            this.exKeyDown(event.keyCode);
        });
    }

    addKeyDown(event) {
        this.keydown.push(event);
    }

    exKeyDown(key) {
        this.keydown.forEach((event) => {
            event(key);
        })
    }
}

export const keyboard = new KeyBoard();
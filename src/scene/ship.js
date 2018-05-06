import { Sprite } from "../core/sprite";

export class Ship extends Sprite {

    constructor(key, x, y, width, height) {
        super(key, x, y, width, height);
        this.yTrans = 1;
        this.direction = 1;
    }
    update() {
        if (this.yTrans < 0 || this.yTrans > 3) {
            this.direction = this.direction * -1;
        }
        this.translate(0.3, 0.5 * this.direction);
        this.yTrans = this.yTrans + (0.05 * this.direction);

        if(this.x > window.innerWidth)
            this.translate(-window.innerWidth-this.width, 0);
    }
}
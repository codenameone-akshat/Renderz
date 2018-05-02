import { Sprite } from "../core/sprite";

export class Sun extends Sprite {

    constructor(key, x, y, width, height) {
        super(key, x, y, width, height);

        this.lowLimit = -0.2;
        this.highLimit = 0.2;
        this.currentAcc = 0.0;

    }
    update() {
        if (Math.random() > 0.5) this.currentAcc += Math.random() * this.lowLimit;
        else this.currentAcc += Math.random() * this.highLimit;
        this.currentAcc = Math.min(this.currentAcc, this.highLimit);
        this.currentAcc = Math.max(this.currentAcc, this.lowLimit);
        this.translate(0, this.currentAcc);
    }
}
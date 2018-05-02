import { Sprite } from "../core/sprite";

export class Mountain extends Sprite {

    constructor(key, x, y, width, height) {
        super(key, x, y, width, height);
        this.xOffset = 0;
    }

    update(){
        this.repeatX += this.xOffset;
    }

}
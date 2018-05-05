import { Shader } from "./shader/shader"
import { Renderer } from "./core/renderer"

export class World {
    constructor() {
        this.sprites = [];
    }
    addSprite(sprite){
        this.sprites.push(sprite);
    }
    setBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }
}
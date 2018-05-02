
import { Shader } from "./shader/shader"
import { Renderer } from "./core/renderer"
import { World } from "./world.js"
import fetch from 'node-fetch';

export class Engine {

    constructor() {
        this.shader = new Shader();
        this.shaderType = "texture";
        this.renderer = new Renderer();
        this.world = new World("texture");
        this.renderer.world = this.world;
    }

    async start() {
        console.log("woo!");
        await this.preload();
        console.log("done with preloader.");
        this.renderer.init(this.shaderType, this.shader);

        window.requestAnimationFrame(this.step.bind(this));
        //this.renderer.renderScene();
    }

    async preload() {
        /*let response = await fetch("https://i.imgur.com/mw5Uh2F.jpg");
        //let response = await fetch("./data/road.png");
        let blob = await response.blob();
        let imageData = await createImageBitmap(blob);
   
       
       let canvas = document.getElementById("canvas");
       canvas.width = imageData.width;
       canvas.height = imageData.height;
       const ctx = canvas.getContext("2d");
       ctx.drawImage(imageData, 0, 0);
       */
        for (let i = 0; i < this.world.sprites.length; ++i) {
            const sprite = this.world.sprites[i];
            console.log("fetching sprite.key, " + sprite.key);
            let response = await fetch(sprite.key);
            let blob = await response.blob();
            sprite.imageData = await createImageBitmap(blob);
        }

    }

    update(){
        for (let i = 0; i < this.world.sprites.length; ++i) {
            const sprite = this.world.sprites[i];
            sprite.update();
        }
    }

    step(timestamp) {
        this.renderer.render();
        this.update();
        window.requestAnimationFrame(this.step.bind(this));
    }

}

export var engine = new Engine();
//exports.engine = engine;

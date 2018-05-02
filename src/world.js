import { Shader } from "./shader/shader"
import { Renderer } from "./core/renderer"
//import { ObjectManager } from "../geometry/objectmanager.js"

export class World {
    constructor() {
        //this.shader = new Shader();
        //this.renderer = new Renderer();
        //this.objMgr = new ObjectManager();
        /*this.shaderType = undefined;
        this.imageSrc = undefined;
        */
        this.sprites = [];
    }

    addSprite(sprite){
        this.sprites.push(sprite);

    }

    setBackgroundColor(color) {
        document.body.style.backgroundColor = color;
    }

    setFragmentShaderType(type) {
        this.shaderType = type;
    }

    setImageSource(src) {
        this.imageSrc = src;
    }

    getObjectManager() {
        return this.objMgr;
    }

    // updateBuffers() {
    //     if (this.shaderType == "texture") {
    //         this.objMgr.updateTextureArrays();
    //         this.renderer.renderScene();
    //     }
    //     else {
    //         this.renderer.renderScene();
    //         this.objMgr.updateColorArrays();
    //     }
    // }

    /*renderWorld() {
        this.renderer.init(this.shaderType, this.shader);

        if (this.shaderType == "texture") {
            if (this.imageSrc == undefined)
                alert("Image source not provided! Use setImageSource() to give a path for the image.");

            else {
                this.renderer.loadImage(this.imageSrc, this.renderer, this.objMgr, this.shaderType);
            }
        }
        else if (this.shaderType == "color") {
            this.renderer.renderScene(this.objMgr, this.shaderType);
        }
        window.requestAnimationFrame(this.step.bind(this));
    }
    */
}
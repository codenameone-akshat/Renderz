import { Shader } from "../shader/shader.js"
import { Renderz } from "../core/renderz.js"
import { ObjectManager } from "../geometry/objectmanager.js"

export class RenderSpace {
    constructor() {
        this.shader = new Shader();
        this.renderer = new Renderz();
        this.objMgr = new ObjectManager();
        this.shaderType = undefined;
        this.imageSrc = undefined;
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

    updateBuffers() {
        if (this.shaderType == "texture") {
            this.objMgr.updateTextureArrays();
            this.renderer.renderScene();
        }
        else {
            this.renderer.renderScene();
            this.objMgr.updateColorArrays();
        }
    }

    renderWorld() {
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
    }
}

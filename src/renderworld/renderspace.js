import { Shader } from "../shader/shader.js";
import { Renderz } from "../core/renderz.js"
import { GeomertyManager } from "../core/geometrymanager.js"

export class RenderSpace {
    constructor() {
        this.shader = new Shader();
        this.renderer = new Renderz();
        this.geometryMgr = new GeomertyManager();
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

    getGeomertyManager() {
        return this.geometryMgr;
    }

    renderWorld() {
        this.renderer.init(this.shaderType, this.shader);

        if (this.shaderType == "texture") {
            if (this.imageSrc == undefined)
                alert("Image source not provided! Use setImageSource() to give a path for the image.");

            else {
                this.renderer.loadImage(this.imageSrc, this.renderer, this.geometryMgr, this.shaderType);
            }
        }
        else if (this.shaderType == "color") {
            this.renderer.renderShapes(this.geometryMgr, this.shaderType);
        }
    }
}

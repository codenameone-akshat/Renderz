import { Shader } from "../shader/shader.js";
import { Utils } from "../shader/utils.js";

export class Renderz {
  init() {
    var shader = new Shader();
    let utils = new Utils();

    this.canvas = document.getElementById("canvas");
    this.gl = canvas.getContext("webgl2");
    this.canvas.height = window.innerHeight - (window.innerHeight*0.05);
    this.canvas.width = window.innerWidth - (window.innerWidth*0.05);
    
    if (!this.gl) {
      alert("Webgl2 not initialized"); // eslint-disable-line
    }

    let vertexShaderSrc = shader.GetVertexShader();
    let fragmentShaderSrc = shader.GetFragmentShader();
    // create shaders
    let vertexShader = shader.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSrc);
    let fragmentShader = shader.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSrc);

    // create program and link shaders to the program
    this.program = utils.createProgram(this.gl, vertexShader, fragmentShader);

    // get attribute location
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_pos");
    this.colorAttributeLocation = this.gl.getAttribLocation(this.program, "a_color");
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, "u_resolution");

    // create vertex array object and bind it to be the current one
    let vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
  }
}
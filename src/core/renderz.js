import {Shader} from "../shader/shader.js";
import {Utils} from "../shader/utils.js";

export class Renderz{
  init(){
    var shader = new Shader();
    let utils = new Utils();

    let canvas = document.getElementById("canvas");
    this.gl = canvas.getContext("webgl2");
    
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
  
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, "u_resolution");

    this.colorUniformLocation = this.gl.getUniformLocation(this.program,"u_color");
  
    let positionBuffer = this.gl.createBuffer();
  
    // bind buffer for vertex positions
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
  }
}
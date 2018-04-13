export class Shader {
    constructor() {
    this.vertexShaderSrc = `#version 300 es

    in vec2 a_pos;
    
    uniform vec2 u_resolution;
    
    void main(){
      
      vec2 zeroToOne = a_pos / u_resolution;
    
      vec2 zeroToTwo = zeroToOne * 2.0;
    
      vec2 clipSpace = zeroToTwo - 1.0;
    
    gl_Position = vec4(clipSpace, 0, 1); //fliping the clipspace y to make top left 0,0
    }`;

    this.fragmentShaderSrc = `#version 300 es

    precision mediump float;

    uniform vec4 u_color;
    
    out vec4 outColor;
    
    void main(){
    
    outColor = u_color;
    }`;
  }
  
  GetVertexShader(){
    return this.vertexShaderSrc;
  }

  GetFragmentShader(){
    return this.fragmentShaderSrc;
  }

  createShader(gl, type, src) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    let status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (status) {
      return shader; // if success return
    }
    // else show the error and delete shader
    console.log(gl.getShaderInfoLog(shader));// eslint-disable-line
    gl.deleteShader(shader);
    return undefined;
  }
}
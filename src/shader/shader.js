export class Shader {
  constructor() {
    this.vertexShaderSrc = `#version 300 es

    in vec2 a_pos;
    in vec4 a_color;
    out vec4 v_color;
    uniform vec2 u_resolution;
    
    void main(){
      
      vec2 zeroToOne = a_pos.xy / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

      v_color = a_color;
    }`;

    this.fragmentShaderSrc = `#version 300 es

    precision mediump float;

    out vec4 outColor;
    in vec4 v_color;  
      
    void main(){

    outColor = v_color; //vec4(1.0,0.5,0.2,1.0);  
    }`;
  }

  GetVertexShader() {
    return this.vertexShaderSrc;
  }

  GetFragmentShader() {
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
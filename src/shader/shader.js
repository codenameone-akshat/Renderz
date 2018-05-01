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

    this.textureVertexShaderSrc = `#version 300 es

    in vec2 a_pos;
    in vec2 a_texCoord;
    out vec2 v_texCoord;
    uniform vec2 u_resolution;
    
    void main(){
      
      vec2 zeroToOne = a_pos.xy / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

      v_texCoord = a_texCoord;
    }`;

    this.textureFragmentShaderSrc = `#version 300 es

    precision mediump float;

    uniform sampler2D u_image;

    in vec2 v_texCoord;  
    out vec4 outColor;
      
    void main(){

    outColor = texture(u_image, v_texCoord);
  }`;
}

    getVertexShader(type) {
      if (type == "color")
        return this.vertexShaderSrc;

      else if (type == "texture")
        return this.textureVertexShaderSrc;

      return undefined;
    }

    getFragmentShader(type) {
      if (type == "color")
        return this.fragmentShaderSrc;

      else if (type == "texture")
        return this.textureFragmentShaderSrc;

      return undefined;
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
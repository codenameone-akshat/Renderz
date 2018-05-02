export class Renderz {
  init(fillType, shader) {
    if (fillType == undefined) {
      alert("Shader Type not set. Set the shader as 'color' or 'texture' using setShaderType()");
      return;
    }

    this.canvas = document.getElementById("canvas");
    this.gl = this.canvas.getContext("webgl2");
    this.canvas.height = window.innerHeight - (window.innerHeight * 0.05);
    this.canvas.width = window.innerWidth - (window.innerWidth * 0.05);
    this.fragmentShaderType = fillType;
    this.image = undefined;

    if (!this.gl) {
      alert("Webgl2 not initialized"); // eslint-disable-line
      return;
    }

    // get the shaders
    let vertexShaderSrc = shader.getVertexShader(this.fragmentShaderType);
    let fragmentShaderSrc = shader.getFragmentShader(this.fragmentShaderType);

    // create shaders
    let vertexShader = shader.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSrc);
    let fragmentShader = shader.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSrc);

    // create program and link shaders to the program
    this.program = this.createProgram(this.gl, vertexShader, fragmentShader);

    // get attribute location
    this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_pos");

    if (this.fragmentShaderType == "color")
      this.colorAttributeLocation = this.gl.getAttribLocation(this.program, "a_color");

    else if (this.fragmentShaderType == "texture")
      this.texCoordAttributeLocation = this.gl.getAttribLocation(this.program, "a_texCoord");

    // get uniform location
    this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, "u_resolution");

    // get image location if fragment shader of type texture
    if (this.fragmentShaderType == "texture")
      this.imageUniformLocation = this.gl.getUniformLocation(this.program, "u_image");

    // create vertex array object and bind it to be the current one
    let vao = this.gl.createVertexArray();
    this.gl.bindVertexArray(vao);
  }

  arrayToBuffer(array, attributeLocation, dataType, shouldNormalize, size) {
    let buffer = this.gl.createBuffer();
    // bind buffer for vertex positions
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    //for different types of arrays
    if (dataType == this.gl.FLOAT)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(array), this.gl.STATIC_DRAW);
    else if (dataType == this.gl.UNSIGNED_BYTE)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Uint8Array(array), this.gl.STATIC_DRAW);

    // generic vertex array to list of attribute arrays
    this.gl.enableVertexAttribArray(attributeLocation);
    //number of positional given
    let type = dataType;
    let normalize = shouldNormalize;
    let stride = 0;
    let offset = 0;
    this.gl.vertexAttribPointer(attributeLocation, size, type, normalize, stride, offset);
  }

  renderScene(objectManager, shaderType) {
    const posSize = 2; //coordinates
    const colSize = 4; //color coordinate RGBA
    const texSize = 2;
    this.arrayToBuffer(objectManager.positions, this.positionAttributeLocation, this.gl.FLOAT, false, posSize);

    if (shaderType == "color")
      this.arrayToBuffer(objectManager.colors, this.colorAttributeLocation, this.gl.UNSIGNED_BYTE, true, colSize);

    if (shaderType == "texture"){
      this.arrayToBuffer(objectManager.texCoord, this.texCoordAttributeLocation, this.gl.FLOAT, false, texSize);
    }

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    if (shaderType == "texture") {
      var texture = this.gl.createTexture();
      // make unit 0 the active texture uint
      this.gl.activeTexture(this.gl.TEXTURE0 + 0);

      // Bind it to texture unit 0' 2D bind point
      this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

      // Set the parameters so we don't need mips and so we're not filtering
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

      // Upload the image into the texture.
      var mipLevel = 0;               // the largest mip
      var internalFormat = this.gl.RGBA;   // format we want in the texture
      var srcFormat = this.gl.RGBA;        // format of data we are supplying
      var srcType = this.gl.UNSIGNED_BYTE  // type of data we are supplying
      this.gl.texImage2D(this.gl.TEXTURE_2D,
        mipLevel,
        internalFormat,
        srcFormat,
        srcType,
        this.image);
    }

    // using the program
    this.gl.useProgram(this.program);

    this.gl.uniform2f(this.resolutionUniformLocation, this.gl.canvas.width, this.gl.canvas.height);

    if (shaderType == "texture") {
      this.gl.uniform1i(this.imageUniformLocation, 0);
    }

    //number of vertices in the position buffer
    var count = objectManager.positions.length / posSize;
    let offset = 0;
    // draw the triangles
    let primitiveType = this.gl.TRIANGLES;
    this.gl.drawArrays(primitiveType, offset, count);
  }

  createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    let status = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (status) {
      return program;
    }
    console.log(gl.getProgramInfoLog(program)); // eslint-disable-line
    gl.deleteProgram(program);
    return undefined;
  }

  loadImage(src, renderer, geometryMgr, shaderType) {
    if (shaderType != "texture") {
      alert("shaderType not 'texture'! Use 'color' as type if solid color is needed.");
    }
    this.image = new Image();
    this.image.src = src;
    this.image.onload = function () {
      renderer.renderScene(geometryMgr, shaderType);
    };
  }
}
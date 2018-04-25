import { Renderz } from "./renderz"

export class Shape {
    constructor() {
        this.renderz = new Renderz();
        this.renderz.init();
        this.positions = [];
        this.colors = [];
    }

    initTriangle(x1, y1, x2, y2, x3, y3, r, g, b) {

        this.positions.push(x1);
        this.positions.push(y1);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x2);
        this.positions.push(y2);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x3);
        this.positions.push(y3);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
    }

    initQuad(x1, y1, x2, y2, x3, y3, x4, y4, r, g, b) {

        this.positions.push(x1);
        this.positions.push(y1);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x2);
        this.positions.push(y2);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x3);
        this.positions.push(y3);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x3);
        this.positions.push(y3);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x4);
        this.positions.push(y4);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
        this.positions.push(x2);
        this.positions.push(y2);
        this.colors.push(r / 255);
        this.colors.push(g / 255);
        this.colors.push(b / 255);
        this.colors.push(1.0);
    }


    arrayToBuffer(array, attributeLocation, size) {
        let buffer = this.renderz.gl.createBuffer();
        // bind buffer for vertex positions
        this.renderz.gl.bindBuffer(this.renderz.gl.ARRAY_BUFFER, buffer);
        this.renderz.gl.bufferData(this.renderz.gl.ARRAY_BUFFER, new Float32Array(array), this.renderz.gl.STATIC_DRAW);
        // generic vertex array to list of attribute arrays
        this.renderz.gl.enableVertexAttribArray(attributeLocation);
        //number of positional given
        let type = this.renderz.gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;
        this.renderz.gl.vertexAttribPointer(attributeLocation, size, type, normalize, stride, offset);
    }

    renderShapes() {

        const posSize = 2; //coordinates
        const colSize = 4; //color coordinate RGBA
        this.arrayToBuffer(this.positions, this.renderz.positionAttributeLocation, posSize);
        this.arrayToBuffer(this.colors, this.renderz.colorAttributeLocation, colSize);

        this.renderz.gl.viewport(0, 0, this.renderz.gl.canvas.width, this.renderz.gl.canvas.height);

        this.renderz.gl.clearColor(0, 0, 0, 0);
        this.renderz.gl.clear(this.renderz.gl.COLOR_BUFFER_BIT);

        // using the program
        this.renderz.gl.useProgram(this.renderz.program);
        this.renderz.gl.uniform2f(this.renderz.resolutionUniformLocation, this.renderz.gl.canvas.width, this.renderz.gl.canvas.height);

        //number of vertices in the position buffer
        var count = this.positions.length / posSize;
        let offset = 0;
        // draw the triangles
        let primitiveType = this.renderz.gl.TRIANGLES;
        this.renderz.gl.drawArrays(primitiveType, offset, count);
    }
}
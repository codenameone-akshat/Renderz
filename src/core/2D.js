import { Renderz } from "./renderz"

export class Shape {
    constructor() {
        this.renderz = new Renderz();
        this.renderz.init();
        this.positions = [];
    }

    initLeftTriangle(minX, minY, maxX, maxY) {
        if(!this.checkValidity(minX, minY, maxX, maxY)){
            return;
        }

        this.positions.push(minX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(minY);
        this.positions.push(minX);
        this.positions.push(maxY);
    }

    initRightTriangle(minX, minY, maxX, maxY) {
        if(!this.checkValidity(minX, minY, maxX, maxY)){
            return;
        }

        this.positions.push(minX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(maxY);
    }
    
    initEqTriangle(minX,minY,maxX,maxY){
        if(!this.checkValidity(minX, minY, maxX, maxY)){
            return;
        }
        
        this.positions.push(minX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(minY);
        this.positions.push((maxX+minX)/2);
        this.positions.push(maxY);
    }

    initQuad(minX,minY,maxX,maxY){
        if(!this.checkValidity(minX, minY, maxX, maxY)){
            return;
        }
        
        this.positions.push(minX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(maxY);
        this.positions.push(minX);
        this.positions.push(minY);
        this.positions.push(maxX);
        this.positions.push(maxY);
        this.positions.push(minX);
        this.positions.push(maxY);
    }

    checkValidity(minX, minY, maxX, maxY){
        if((minX>maxX)||(minY>maxY)){
            alert("Minimum value can not be greater than the Maximum value");
            return false;
        }
        return true;
    }
    renderShapes() {
        //number of positional pairs given
        var count = this.positions.length / 2;
       
        // give buffer the positions
        this.renderz.gl.bufferData(this.renderz.gl.ARRAY_BUFFER, new Float32Array(this.positions), this.renderz.gl.STATIC_DRAW);

        // create vertex array object and bind it to be the current one
        let vao = this.renderz.gl.createVertexArray();

        this.renderz.gl.bindVertexArray(vao);

        // generic vertex array to list of attribute arrays
        this.renderz.gl.enableVertexAttribArray(this.renderz.positionAttributeLocation);

        let size = 2; // 2d coordinates
        let type = this.renderz.gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;

        this.renderz.gl.vertexAttribPointer(this.renderz.positionAttributeLocation, size, type, normalize, stride, offset);

        this.renderz.gl.viewport(0, 0, this.renderz.gl.canvas.width, this.renderz.gl.canvas.height);

        this.renderz.gl.clearColor(0, 0, 0, 0);
        this.renderz.gl.clear(this.renderz.gl.COLOR_BUFFER_BIT);

        // using the program
        this.renderz.gl.useProgram(this.renderz.program);

        this.renderz.gl.bindVertexArray(vao);

        this.renderz.gl.uniform2f(this.renderz.resolutionUniformLocation, this.renderz.gl.canvas.width, this.renderz.gl.canvas.height);
        this.renderz.gl.uniform4f(this.renderz.colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

        // draw the triangles
        let primitiveType = this.renderz.gl.TRIANGLES;
        this.renderz.gl.drawArrays(primitiveType, offset, count);
    }
}
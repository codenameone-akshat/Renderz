export class GeomertyManager {
    constructor() {
        this.positions = [];
        this.colors = [];
        this.texCoord = [];
    }

    setTrisVertices(x1, y1, x2, y2, x3, y3) {
        this.positions.push(x1);
        this.positions.push(y1);
        this.positions.push(x2);
        this.positions.push(y2);
        this.positions.push(x3);
        this.positions.push(y3);
    }

    setQuadVertices(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.positions.push(x1);
        this.positions.push(y1);
        this.positions.push(x2);
        this.positions.push(y2);
        this.positions.push(x3);
        this.positions.push(y3);
        this.positions.push(x3);
        this.positions.push(y3);
        this.positions.push(x4);
        this.positions.push(y4);
        this.positions.push(x2);
        this.positions.push(y2);
    }

    setColor(r, g, b, a) {
        let i = 0;
        let colorLen = this.colors.length;
        let posLen = this.positions.length/2;
        for (i = 0; i < (posLen - colorLen); ++i) {
            this.colors.push(r);
            this.colors.push(g);
            this.colors.push(b);
            this.colors.push(a);
        }
    }

    initTexture() {
        this.texCoord = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ];
    }
}
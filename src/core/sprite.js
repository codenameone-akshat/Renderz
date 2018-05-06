export class Sprite {
    constructor(key,
        x, y,
        width, height
    ) {
        this.id = undefined;
        this.positions = [];
        this.texCoord = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.repeatX = 0;
        this.repeatY = 0;

        this.key = key;
        this.imageData = undefined;
        this.textureUnit = 0;

        this.wrapMode = 0;      //0 = clamp, 1 = wrap;
        this.setPositionBuffer();
    }
    setPositionBuffer() {
        this.positions.push(this.x);
        this.positions.push(this.y);
        this.positions.push(this.x + this.width);
        this.positions.push(this.y);
        this.positions.push(this.x);
        this.positions.push(this.y + this.height);
        this.positions.push(this.x);
        this.positions.push(this.y + this.height);
        this.positions.push(this.x + this.width);
        this.positions.push(this.y);
        this.positions.push(this.x + this.width);
        this.positions.push(this.y + this.height);
    }

    update() { }

    translate(x, y) {
        for (var i = 0; i < this.positions.length; i = i + 2) {
            this.positions[i] = this.positions[i] + x;
            this.positions[i + 1] = this.positions[i + 1] + y;
        }
        this.y = this.y + y;
        this.x = this.x + x;
    }
}
export class SpriteContainer {
    constructor() {
        this.id = undefined;
        this.positions = [];
        this.width = undefined;
        this.height = undefined;
    }

    setSpriteTransformData(x, y, width, height) {
        this.positions.push(x);
        this.positions.push(y);
        this.positions.push(x + width);
        this.positions.push(y);
        this.positions.push(x);
        this.positions.push(y + height);
        this.positions.push(x);
        this.positions.push(y + height);
        this.positions.push(x + width);
        this.positions.push(y);
        this.positions.push(x + width);
        this.positions.push(y + height);
    }
getVertexCount(){
    return this.positions.length;
}
    setTextureTransform() {
        this.texCoord = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            1.0, 1.0
        ];
    }

    translateSpriteByOffset(x, y) {
        for(var i=0; i< this.positions.length;i = i + 2){
            this.positions[i] = this.positions[i] + x;
            this.positions[i+1] = this.positions[i+1] + y;
        }
    }
}
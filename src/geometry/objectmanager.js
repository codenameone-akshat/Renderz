import { SpriteContainer } from "../geometry/spriteContainer.js"

export class ObjectManager {
    constructor() {
        this.positions = [];
        this.colors = [];
        this.texCoord = [];
        this.sprites = [];
    }

    setTrisTransform(x1, y1, x2, y2, x3, y3) {
        this.positions.push(x1);
        this.positions.push(y1);
        this.positions.push(x2);
        this.positions.push(y2);
        this.positions.push(x3);
        this.positions.push(y3);
    }

    setQuadTransform(x1, y1, x2, y2, x3, y3, x4, y4) {
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

    getSpriteById(id) {
        let i = 0;
        let sprite = undefined;
        let spriteLen = this.sprites.length;

        for (i = 0; i < spriteLen; ++i) {
            if (this.sprites[i].id == id)
                sprite = this.sprites[i];
        }
        if (sprite != undefined) {
            return sprite;
        }
        alert("Sprite not found");
        return undefined;
    }

    getNewSpriteContainer() {
        var spriteContainer = new SpriteContainer();
        
        if (this.sprites.length == 0)
            spriteContainer.id = 0;
        else
            spriteContainer.id = this.sprites.length;

        this.sprites.push(spriteContainer);

        return spriteContainer;
    }

    bindSpriteToGeometry(spriteContainer) {
        spriteContainer.positions.forEach(element => {
            this.positions.push(element);
        });
    }

    updateSpriteTransformData(id) {
        let sprite = this.getSpriteById(id);
        let i = 0;
        for (i = id * 12; i < sprite.positions.length; ++i) {
            this.positions[i] = sprite.positions[i];
        }
    }

    bindSpriteTextureData(spriteContainer) {
        spriteContainer.texCoord.forEach(element => {
            this.texCoord.push(element);
        });
    }

    translateSprite(id, x, y) {
        let sprite = this.getSpriteById(id);

        sprite.translateSpriteByOffset(x, y);
        this.updateSpriteTransformData(id);
    }
    
    // updateTextureArrays(){

    // }

    // updateColorArrays(){

    // }
    
    setColor(r, g, b, a) {
        let i = 0;
        let colorLen = this.colors.length / 4;
        let posLen = this.positions.length / 2;
        for (i = 0; i < (posLen - colorLen); ++i) {
            this.colors.push(r);
            this.colors.push(g);
            this.colors.push(b);
            this.colors.push(a);
        }
    }
}
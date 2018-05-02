import "../css/style.css";
import { RenderSpace } from "./renderworld/renderspace.js"

//function using the api
function exec() {
    let world = new RenderSpace("texture");
    let manager = world.getObjectManager();
    let sprite = manager.getNewSpriteContainer(0);
    
    sprite.setSpriteTransformData(0,0,300,300);
    sprite.setTextureTransform();

    manager.bindSpriteToGeometry(sprite);
    manager.bindSpriteTextureData(sprite);
    manager.translateSprite(sprite.id, 120,10);

    world.setImageSource("../data/road.png");
    world.setFragmentShaderType("texture");
    world.renderWorld();
}

exec();
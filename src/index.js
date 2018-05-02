import "../css/style.css";
import { engine } from "./engine";
//import { World } from "./renderworld/renderspace.js"
import { SpriteContainer } from "./geometry/spriteContainer";

//function using the api
function exec() {
    /*let world = new World("texture");
    let manager = world.getObjectManager();
    */

    let sprite = new SpriteContainer('https://i.imgur.com/mw5Uh2F.jpg'); //manager.getNewSpriteContainer(0);
    sprite.setSpriteTransformData(0,0,300,300);
    //sprite.setTextureTransform();

    let sprite2 = new SpriteContainer('./data/road.png'); //manager.getNewSpriteContainer(0);
    sprite2.setSpriteTransformData(400,0,300,300);
    //sprite2.setTextureTransform();

    engine.world.addSprite(sprite);
    engine.world.addSprite(sprite2);

    engine.start();

    /*manager.bindSpriteToGeometry(sprite);
    manager.bindSpriteTextureData(sprite);
    manager.translateSprite(sprite.id, 120,10);
    */
    /*world.setImageSource("../data/road.png");
    world.setFragmentShaderType("texture");
    world.renderWorld();
    */
}

exec();
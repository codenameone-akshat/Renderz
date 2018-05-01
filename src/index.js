import "../css/style.css";
import { RenderSpace } from "./renderworld/renderspace.js"

//function using the api
function exec() {
    let world = new RenderSpace("texture");
    let geometryMgr = world.getGeomertyManager();

    geometryMgr.setTrisVertices(
        80, 70,
        150, 70,
        150, 10,
     );
    geometryMgr.setColor(31, 211, 150, 255);
        
    geometryMgr.setQuadVertices(
        10, 10,
        10, 70,
        70, 10,
        70, 70,
    );
    geometryMgr.setColor(222, 100, 40, 255);
    
    world.setFragmentShaderType("color");

    //world.setImageSource("data/road.png");
    world.renderWorld();
}

exec();
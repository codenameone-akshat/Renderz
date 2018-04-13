import "../css/style.css";
import {Renderz} from "./core/renderz";
import {Shape} from "./core/2D"

//function using the api
function exec(){
    let renderer = new Renderz();
    let shape = new Shape();
    
    renderer.init();

    shape.initQuad(10,10,120,70);
    shape.initEqTriangle(10,70,70,110);
    shape.initQuad(150,10,160,40);
    shape.initEqTriangle(130,40,180,100);
    
    shape.renderShapes();
}
exec();
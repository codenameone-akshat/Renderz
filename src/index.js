import "../css/style.css";
import {Renderz} from "./core/renderz";
import {Shape} from "./core/2D"

//function using the api
function exec(){
    let renderer = new Renderz();
    let shape = new Shape();
    
    renderer.init();
    shape.initTriangle(10,70,70,110,50,50,0,211,150);
    //shape.initQuad(10,70,70,110,50,50,10,10,200,211,150);
    shape.renderShapes();
}

exec();
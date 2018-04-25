import "../css/style.css";
import { Renderz } from "./core/renderz";
import { Shape } from "./core/2D"

//function using the api
function exec() {
    let renderer = new Renderz();
    let shape = new Shape();

    renderer.init();
    shape.initTriangle(80, 70,
        150, 70,
        150, 10,
        0,
        211,
        150);
    shape.initQuad(10, 10,
        10, 70,
        70, 10,
        70, 70,
        200,
        211,
        150);
    shape.renderShapes();
}

exec();
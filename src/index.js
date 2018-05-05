import "../css/style.css";
import { engine } from "./engine";
import { Sprite } from "./core/sprite";
import { Sun } from "./scene/sun";
import { Rock } from "./scene/rock";
import { Mountain } from "./scene/mountain";

//function using the api
function scene() {

    let sun = new Sun(
        './data/Ring.png',
        window.innerWidth * 0.7, window.innerHeight * 0.06, 300, 300
    );
    engine.world.addSprite(sun);

    let mountain = new Mountain(
        './data/mountains-back.png',
        0, window.innerHeight - 640, window.innerWidth, 512
    );

    mountain.wrapMode = 1;
    mountain.xOffset = 3 / 10000;
    engine.world.addSprite(mountain);

    let mountainMid = new Mountain(
        './data/mountains-mid1.png',
        0, window.innerHeight - 570, window.innerWidth, 512
    );
    mountainMid.wrapMode = 1;
    mountainMid.xOffset = 5 / 10000;
    engine.world.addSprite(mountainMid);

    let mountainMid2 = new Mountain(
        './data/mountains-mid2.png',
        0, window.innerHeight - 512, window.innerWidth, 512
    );
    mountainMid2.wrapMode = 1;
    mountainMid2.xOffset = 15 / 10000;
    engine.world.addSprite(mountainMid2);

    let rockDimension = 300;
    let rock0 = new Rock(
        './data/rock.png',
        -window.innerWidth * 0.01, window.innerHeight - rockDimension * 0.7,
        rockDimension, rockDimension);
    engine.world.addSprite(rock0);

    let rock1 = new Rock(
        './data/rock.png',
        window.innerWidth * 0.09, window.innerHeight - rockDimension * 0.5,
        rockDimension, rockDimension);
    engine.world.addSprite(rock1);

    engine.start();
}

scene();
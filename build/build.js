var canvas;
var myShader;
var randSeed;
function preload() {
    myShader = loadShader("shader/myShader.vert", "shader/myShader.frag");
}
function setup() {
    canvas = createCanvas(desiredCanvasWidth(), desiredCanvasHeight(), WEBGL);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
    randSeed = random(1.);
}
function draw() {
    shader(myShader);
    myShader.setUniform("uAspectRatio", width / height);
    myShader.setUniform("uTime", frameCount / 60.);
    myShader.setUniform("uRandSeed", randSeed);
    rect(0, 0, 0, 0);
}
function keyPressed() {
    if (key == 's') {
        resizeCanvas(1000, 1000);
        shader(myShader);
        rect(0, 0, 0, 0);
        save();
        windowResized();
    }
}
function desiredCanvasWidth() {
    var margin = 25;
    return min(windowWidth, windowHeight) - margin * 2;
}
function desiredCanvasHeight() {
    return desiredCanvasWidth();
}
function windowResized() {
    resizeCanvas(desiredCanvasWidth(), desiredCanvasHeight());
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
//# sourceMappingURL=../sketch/sketch/build.js.map
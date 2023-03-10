import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, ArcFollowCamera } from "@babylonjs/core";

class App {
  constructor() {
    // create the canvas html element and attach it to the webpage
    var canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.id = "gameCanvas";
    document.body.appendChild(canvas);

    // initialize babylon scene and engine
    var engine = new Engine(canvas, true);
    var scene = new Scene(engine);

    var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
    sphere.position.y = 0.5;

    var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 3, 5, sphere.position, scene);
    camera.attachControl(canvas, true);
    var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);

    var ground: Mesh = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);

    camera.setTarget(sphere.position);
    camera.wheelPrecision = 10;
    camera.minZ = 0.3;
    camera.collisionRadius = new Vector3(0.5, 0.5, 0.5);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 20;
    // camera.lowerBetaLimit = 1.4;
    camera.upperBetaLimit = 1.67;
    console.log("lower beta", camera.lowerBetaLimit);
    console.log("upper beta", camera.upperBetaLimit);
    camera.panningSensibility = 0; // disable panning
    camera.useBouncingBehavior = true; // bounce when reaching camera scrolling limits
    camera.useAutoRotationBehavior = true; // auto rotate after timeout
    camera.autoRotationBehavior.idleRotationSpeed = 0.05; // radians per second
    camera.autoRotationBehavior.idleRotationWaitTime = 60000; // milliseconds
    camera.autoRotationBehavior.idleRotationSpinupTime = 4000; // milliseconds
    camera.autoRotationBehavior.zoomStopsAnimation = true;
    // camera.useFramingBehavior = true; // frame in on the bounds of the object
    // camera.framingBehavior.radiusScale = 10; // zoom out a bit - works with camera radius
    // camera.framingBehavior.framingTime = 1000; // milliseconds

    window.addEventListener("resize", () => {
      engine.resize();
    });

    window.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I to show/hide the Inspector
      // keyCode 73 = I, need to use this because ev.key === "I" doesn't work on a Mac
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }

      // Ctrl-Shift-F to toggle fullscreen
      if (ev.shiftKey && ev.ctrlKey && ev.keyCode === 70) {
        engine.switchFullscreen(false);
      }
    });

    // run the main render loop
    engine.runRenderLoop(() => {
      scene.render();
    });
  }
}
new App();

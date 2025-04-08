// Desenhando objetos gráficos 2D

import * as THREE from "three";

import { GUI } from "/Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js";

const gui = new GUI();
const rendSize = new THREE.Vector2();

var controls, scene, camera, renderer, animeID;

var interpolMax = 5;
var interpolMin = 0.3;
var interpolRate = 0.02;

var interpolPos = interpolMax;
var interpolNeg = interpolMin;
// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function sgn(w) {
  if (w < 0) {
    return -1;
  } else if (w == 0) {
    return 0;
  } else {
    return 1;
  }
}

function main() {
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  rendSize.x = rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

  renderer.setSize(rendSize.x, rendSize.y);

  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  scene = new THREE.Scene();

  initGUI();

  camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);

  changeInterpol(5);

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {
  controls = { interpolation: 5, animate: false, animation_interpolMax: 5, animation_interpolMin: 0.3, animation_interpolRate: 0.02 };

  gui.add(controls, "interpolation").onChange(changeInterpol);
  gui.add(controls, "animate").onChange(animeShapes);
  gui.add(controls, "animation_interpolMax").onChange((value) => {
    interpolMax = value;
  });
  gui.add(controls, "animation_interpolMin").onChange((value) => {
    interpolMin = value;
  });
  gui.add(controls, "animation_interpolRate").onChange((value) => {
    interpolRate = value;
  });
  gui.open();
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function changeInterpol(value) {
  scene.clear();

  const curve = new THREE.EllipseCurve(0, 0, 0.7, 0.7, 0, 2 * Math.PI, false, 0);

  curve.getPoint = function (t, optionalTarget = new THREE.Vector2()) {
    const point = optionalTarget;

    const twoPi = Math.PI * 2;
    let deltaAngle = this.aEndAngle - this.aStartAngle;

    // ensures that deltaAngle is 0 .. 2 PI
    while (deltaAngle < 0) deltaAngle += twoPi;
    while (deltaAngle > twoPi) deltaAngle -= twoPi;

    const angle = t * deltaAngle;
    let x = this.xRadius * sgn(Math.cos(angle)) * Math.pow(Math.abs(Math.cos(angle)), 2 / value);
    let y = this.yRadius * sgn(Math.sin(angle)) * Math.pow(Math.abs(Math.sin(angle)), 2 / value);

    return point.set(x, y);
  };

  const vertices = curve.getPoints(70);

  var geometry = new THREE.BufferGeometry().setFromPoints(vertices);

  var elipse = new THREE.Line(geometry);
  elipse.name = "Elipse";
  scene.add(elipse);

  renderer.clear();
  renderer.render(scene, camera);
}

function animeShapes(value) {
  if (value) animeID = requestAnimationFrame(anime);
  else {
    cancelAnimationFrame(animeID);

    renderer.clear();
    renderer.render(scene, camera);
  }
}

function anime() {
  if (interpolPos < interpolMin) {
    if (interpolNeg > interpolMax) {
      interpolPos = interpolMax;
      interpolNeg = interpolMin;
    } else {
      interpolNeg += interpolRate;
      changeInterpol(interpolNeg);
    }
  } else {
    interpolPos -= interpolRate;
    changeInterpol(interpolPos);
  }

  animeID = requestAnimationFrame(anime);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {
  let minDim = Math.min(window.innerWidth, window.innerHeight);

  renderer.setSize(minDim * 0.8, minDim * 0.8);

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //
main();

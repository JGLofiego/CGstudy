// Desenhando objetos gráficos 2D

import * as THREE from "three";

import { GUI } from "/Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js";

const gui = new GUI();
const rendSize = new THREE.Vector2();
var basic = new THREE.LineBasicMaterial();
var dashed = new THREE.LineDashedMaterial({ dashSize: 0.2, gapSize: 0.02 });
var color = new THREE.Color();

var scene, camera, renderer, curLine;
var line1, line2, line3;
var controlsLine, controlsMaterial, controlColor;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
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

  const vertices = [];

  vertices.push(new THREE.Vector3(-0.5, -0.5, 0.0));
  vertices.push(new THREE.Vector3(0.5, -0.5, 0.0));
  vertices.push(new THREE.Vector3(0.5, 0.5, 0.0));
  vertices.push(new THREE.Vector3(-0.5, 0.5, 0.0));

  var geometry1 = new THREE.BufferGeometry().setFromPoints(vertices);
  var geometry2 = new THREE.BufferGeometry().setFromPoints(vertices);

  var lineStrip = new THREE.Line(geometry1);
  lineStrip.name = "LineStrip";
  lineStrip.visible = true;
  scene.add(lineStrip);

  var lineLoop = new THREE.LineLoop(geometry1);
  lineLoop.name = "LineLoop";
  lineLoop.visible = false;
  scene.add(lineLoop);

  var LineSegments = new THREE.LineSegments(geometry2);
  LineSegments.name = "LineSegments";
  LineSegments.visible = false;
  scene.add(LineSegments);

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {
  controlsLine = { Forma2d: "LineStrip" };
  controlsMaterial = { dashed: false };
  controlColor = { randomColor: false };

  gui.add(controlsLine, "Forma2d", ["LineStrip", "LineLoop", "LineSegments"]).onChange(changeLine);
  gui.add(controlsMaterial, "dashed").onChange(changeMaterial);
  gui.add(controlColor, "randomColor").onChange(changeColor);
  gui.open();
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function changeLine(value) {
  switch (value) {
    case "LineStrip":
      curLine = scene.getObjectByName("LineStrip");
      curLine.visible = true;
      scene.getObjectByName("LineLoop").visible = false;
      scene.getObjectByName("LineSegments").visible = false;
      break;
    case "LineLoop":
      curLine = scene.getObjectByName("LineLoop");
      curLine.visible = true;
      scene.getObjectByName("LineStrip").visible = false;
      scene.getObjectByName("LineSegments").visible = false;
      break;
    case "LineSegments":
      curLine = scene.getObjectByName("LineSegments");
      curLine.visible = true;
      scene.getObjectByName("LineStrip").visible = false;
      scene.getObjectByName("LineLoop").visible = false;
      break;
  }

  renderer.clear();
  renderer.render(scene, camera);
}

function changeMaterial(value) {
  line1 = scene.getObjectByName("LineStrip");
  line2 = scene.getObjectByName("LineLoop");
  line3 = scene.getObjectByName("LineSegments");
  dashed.color = color;
  basic.color = color;

  if (value) {
    line1.material = dashed;
    line2.material = dashed;
    line3.material = dashed;
    line1.computeLineDistances();
    line2.computeLineDistances();
    line3.computeLineDistances();
  } else {
    line1.material = basic;
    line2.material = basic;
    line3.material = basic;
  }

  renderer.clear();
  renderer.render(scene, camera);
}

function changeColor(value) {
  line1 = scene.getObjectByName("LineStrip");
  line2 = scene.getObjectByName("LineLoop");
  line3 = scene.getObjectByName("LineSegments");

  if (value) {
    color.r = Math.random();
    color.g = Math.random();
    color.b = Math.random();
  } else {
    color.r = 1.0;
    color.g = 1.0;
    color.b = 1.0;
  }

  line1.material.color = color;
  line2.material.color = color;
  line3.material.color = color;

  renderer.clear();
  renderer.render(scene, camera);
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

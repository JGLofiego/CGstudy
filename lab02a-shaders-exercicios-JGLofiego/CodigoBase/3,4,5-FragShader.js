// Criando uma imagem com Fragment Shader

import * as THREE from "three";

import { GUI } from "gui";

const rendSize = new THREE.Vector2();

const w = window.innerWidth;
const h = window.innerHeight;
const gui = new GUI();

let controls, scene, camera, renderer, uniforms;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
async function main() {
  const vsh = await fetch("./vertShader.glsl");
  const fsh = await fetch("./fragShader.glsl");

  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  let minDim = Math.min(window.innerWidth, window.innerHeight);

  renderer.setSize(minDim * 0.8, minDim * 0.8);

  document.body.appendChild(renderer.domElement);

  initGUI();

  scene = new THREE.Scene();

  let dimPlano = new THREE.Vector2(1.0, 1.0);

  camera = new THREE.OrthographicCamera(-dimPlano.x / 2.0, dimPlano.x / 2.0, dimPlano.y / 2.0, -dimPlano.y / 2.0, -1.0, 1.0);
  camera.position.set(0, 0, 1);

  uniforms = {
    uTime: { type: "f", value: 0.0 },
    uDim: { type: "vec2", value: new THREE.Vector2(dimPlano.x, dimPlano.y) },
    equation: { type: "bvec3", value: new THREE.Vector3(true, false, false) },
  };

  const shaderMat = new THREE.ShaderMaterial({ uniforms, vertexShader: await vsh.text(), fragmentShader: await fsh.text(), wireframe: false });

  var plane = new THREE.Mesh(new THREE.PlaneGeometry(dimPlano.x, dimPlano.y, 10, 10), shaderMat);
  plane.name = "imagem";

  scene.add(plane);

  animate();
}

function initGUI() {
  controls = { type: "Euclidean" };

  gui.add(controls, "type", ["Euclidean", "Manhattan", "Chebyshev"]).onChange(changeEquation);
}

function changeEquation(value) {
  if (value === "Euclidean") {
    uniforms.equation.value = new THREE.Vector3(true, false, false);
  } else if (value === "Manhattan") {
    uniforms.equation.value = new THREE.Vector3(false, true, false);
  } else {
    uniforms.equation.value = new THREE.Vector3(false, false, true);
  }
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function animate(t) {
  t *= 0.001;
  requestAnimationFrame(animate);
  uniforms.uTime.value = t;
  renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

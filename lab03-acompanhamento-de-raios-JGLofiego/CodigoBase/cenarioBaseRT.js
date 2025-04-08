// Monta o cenário para o uso do algoritmo de Ray Casting gerado no Frag Shader

import * as THREE from "three";

import { GUI } from "/Assets/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js";

const rendSize = new THREE.Vector2();

let scene, camera, renderer, shaderMat;

const gui = new GUI();

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  let maxDim = Math.min(window.innerWidth, window.innerHeight);

  rendSize.x = rendSize.y = maxDim * 0.8;

  renderer.setSize(rendSize.x, rendSize.y);

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(-10.0, 10.0, 10.0, -10.0, -10.0, 10.0);

  geraImagem();

  initGUI();

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraImagem() {
  shaderMat = new THREE.ShaderMaterial({
    uniforms: {
      uCamPos: { type: "vec3", value: new THREE.Vector3(0.0, 0.0, 10.0) },
      sphereColor: { type: "vec4", value: new THREE.Vector4(1.0, 0.0, 0.0, 0.0) },
      enable_refraction: { type: "b", value: false },
      refraction_index: { type: "f", value: 1.0 },
      form: { type: "f", value: 1.0 },
    },
    vertexShader: document.getElementById("RayTracing_VS").textContent,
    fragmentShader: document.getElementById("RayTracing_FS").textContent,
    wireframe: false,
  });

  let plane = new THREE.Mesh(new THREE.PlaneGeometry(20.0, 20.0, 1, 1), shaderMat);
  plane.name = "imagem";
  plane.position.z = 5.0;
  plane.updateMatrix();
  scene.add(plane);
}

function initGUI() {
  var form = { form: "Sphere" };
  var color = { r: 1.0, g: 0.0, b: 0.0, alpha: 0.0 };
  var refraction = { enable: false, refraction_index: 1.0 };

  gui.add(color, "r", 0.0, 1.0, 0.001).onChange(changeR);
  gui.add(color, "g", 0.0, 1.0, 0.001).onChange(changeG);
  gui.add(color, "b", 0.0, 1.0, 0.001).onChange(changeB);
  gui.add(color, "alpha", 0.0, 1.0, 0.001).onChange(changeAlpha);
  gui.add(refraction, "enable").onChange(enableRefraction);
  gui.add(refraction, "refraction_index").onChange(changeRefraction);
  gui.add(form, "form", ["Sphere", "Cylinder", "Cone"]).onChange(changeForm);
}

function changeR(value) {
  shaderMat.uniforms.color.value.x = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function changeG(value) {
  shaderMat.uniforms.sphereColor.value.y = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function changeB(value) {
  shaderMat.uniforms.sphereColor.value.z = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function changeAlpha(value) {
  shaderMat.uniforms.sphereColor.value.w = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function changeRefraction(value) {
  shaderMat.uniforms.refraction_index.value = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function enableRefraction(value) {
  shaderMat.uniforms.enable_refraction.value = value;

  renderer.clear();
  renderer.render(scene, camera);
}

function changeForm(value) {
  switch (value) {
    case "Sphere":
      shaderMat.uniforms.form.value = 1.0;
      break;
    case "Cylinder":
      shaderMat.uniforms.form.value = 2.0;
      break;
    case "Cone":
      shaderMat.uniforms.form.value = 3.0;
  }

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

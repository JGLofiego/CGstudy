// Calculando o gradiente da imagem via pós-processamento

import * as THREE from "three";

import { GUI } from "gui";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { LaplacianShader } from "./shaders/LaplacianShader.js";
import { LuminosityShader } from "three/addons/shaders/LuminosityShader.js";

const gui = new GUI();

let controls, scene, camera, renderer, composer, grayscale, laplacian;

const params = { enable: true, grayscale: false, R: true, G: true, B: true, apply: false, strength: 0.0 };

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
  scene.add(camera);

  var textureLoader = new THREE.TextureLoader().load("/Assets/Images/lena.png", onLoadTexture);

  document.getElementById("threejs-canvas").appendChild(renderer.domElement);

  // Global Axis
  var globalAxis = new THREE.AxesHelper(1.0);
  scene.add(globalAxis);

  gui.add(params, "enable").onChange(onChangeGUI);
  gui.add(params, "grayscale").onChange(changeGrayscale);
  gui.add(params, "R").onChange(changeR);
  gui.add(params, "G").onChange(changeG);
  gui.add(params, "B").onChange(changeB);

  const folder = gui.addFolder("Aplicar na imagem Original");
  folder.add(params, "apply").name("Aplicar na imagem").onChange(changeApply);
  folder.add(params, "strength", -2, 1).name("Intensidade").onChange(changeStrength);
  gui.open();
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function onLoadTexture(tex) {
  if (!tex.image) console.log("ERROR: loading texture");
  else {
    // Plane
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.0, 20, 20), new THREE.MeshBasicMaterial({ map: tex }));
    plane.position.set(0.0, 0.0, -0.5);
    plane.name = "Imagem";
    scene.add(plane);

    renderer.setSize(tex.image.width, tex.image.height);

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    grayscale = new ShaderPass(LuminosityShader);

    laplacian = new ShaderPass(LaplacianShader);
    laplacian.uniforms.resolution.value.x = window.innerWidth * window.devicePixelRatio;
    laplacian.uniforms.resolution.value.y = window.innerHeight * window.devicePixelRatio;
    composer.addPass(laplacian);

    composer.render();
  }
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function onChangeGUI() {
  if (params.enable == true) composer.render();
  else renderer.render(scene, camera);
}

function changeGrayscale(val) {
  if (val) {
    composer.addPass(grayscale);
  } else {
    composer.removePass(grayscale);
  }
  laplacian.uniforms.gray.value = val;

  if (params.enable == true) composer.render();
}

function changeR(val) {
  laplacian.uniforms.color.value.x = val;

  if (params.enable == true) composer.render();
}

function changeG(val) {
  laplacian.uniforms.color.value.y = val;

  if (params.enable == true) composer.render();
}

function changeB(val) {
  laplacian.uniforms.color.value.z = val;

  if (params.enable == true) composer.render();
}

function changeApply(val) {
  laplacian.uniforms.apply.value = val;

  if (params.enable == true) composer.render();
}

function changeStrength(val) {
  laplacian.uniforms.strength.value = val;

  if (params.enable == true) composer.render();
}

main();

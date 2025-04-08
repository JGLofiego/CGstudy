// Convertendo a cor dos pixels de uma imagem via pós-processamento

import * as THREE from "three";

import { GUI } from "gui";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { LuminosityShader } from "./shaders/LuminosityShader.js";
import { LuminosityShader as GrayShader } from "three/addons/shaders/LuminosityShader.js";

const gui = new GUI();

let controls, scene, camera, renderer, composer, grayscale, luminosity;

const params = {
  enable: true,
  grayscale: false,
  gamma: 1,
  gammaRed: 1,
  gammaGreen: 1,
  gammaBlue: 1,
};

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
  gui.add(params, "gamma", 0.1, 10).onChange(changeStrength);
  gui.add(params, "gammaRed", 0.1, 10).onChange(changeR);
  gui.add(params, "gammaGreen", 0.1, 10).onChange(changeG);
  gui.add(params, "gammaBlue", 0.1, 10).onChange(changeB);
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

    // postprocessing

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // color to grayscale conversion

    grayscale = new ShaderPass(GrayShader);

    luminosity = new ShaderPass(LuminosityShader);
    composer.addPass(luminosity);

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

function changeStrength(value) {
  luminosity.uniforms.gamma.value.x = value;
  luminosity.uniforms.gamma.value.y = value;
  luminosity.uniforms.gamma.value.z = value;
  if (params.enable == true) {
    composer.render();
  }
}

function changeGrayscale(val) {
  if (val) {
    composer.addPass(grayscale);
  } else {
    composer.removePass(grayscale);
  }
  luminosity.uniforms.gray.value = val;

  if (params.enable == true) composer.render();
}

function changeR(value) {
  luminosity.uniforms.gamma.value.x = value;
  if (params.enable == true) {
    composer.render();
  }
}

function changeG(value) {
  luminosity.uniforms.gamma.value.y = value;
  if (params.enable == true) {
    composer.render();
  }
}

function changeB(value) {
  luminosity.uniforms.gamma.value.z = value;
  if (params.enable == true) {
    composer.render();
  }
}

main();

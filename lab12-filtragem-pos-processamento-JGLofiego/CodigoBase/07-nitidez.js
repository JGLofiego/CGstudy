// Convertendo a cor dos pixels de uma imagem via pós-processamento

import * as THREE from "three";

import { GUI } from "gui";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { LuminosityShader } from "three/addons/shaders/LuminosityShader.js";
import { SharpnessShader } from "./shaders/SharpnessShader.js";

const gui = new GUI();

let controls, scene, camera, renderer, composer, sharpness, grayscale;

const params = { enable: true, sharpness: 1.0, grayscale: false, sharpnessR: 1.0, sharpnessG: 1.0, sharpnessB: 1.0 };

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
  gui.add(params, "sharpness", -5, 10).onChange(changeSharpness);
  gui.add(params, "grayscale").onChange(changeGrayscale);
  gui.add(params, "sharpnessR", -5, 10).onChange(changeSharpnessR);
  gui.add(params, "sharpnessG", -5, 10).onChange(changeSharpnessG);
  gui.add(params, "sharpnessB", -5, 10).onChange(changeSharpnessB);
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

    grayscale = new ShaderPass(LuminosityShader);

    sharpness = new ShaderPass(SharpnessShader);
    sharpness.uniforms.resolution.value.x = window.innerWidth * window.devicePixelRatio;
    sharpness.uniforms.resolution.value.y = window.innerHeight * window.devicePixelRatio;
    composer.addPass(sharpness);

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

function changeSharpness(val) {
  console.log(sharpness.uniforms.nitidez);
  sharpness.uniforms.nitidez.value.x = val;
  sharpness.uniforms.nitidez.value.y = val;
  sharpness.uniforms.nitidez.value.z = val;
  if (params.enable == true) {
    composer.render();
  }
}

function changeSharpnessR(val) {
  sharpness.uniforms.nitidez.value.x = val;
  if (params.enable == true) {
    composer.render();
  }
}

function changeSharpnessG(val) {
  sharpness.uniforms.nitidez.value.y = val;
  if (params.enable == true) {
    composer.render();
  }
}

function changeSharpnessB(val) {
  sharpness.uniforms.nitidez.value.z = val;
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
  sharpness.uniforms.gray.value = val;

  if (params.enable == true) composer.render();
}

main();

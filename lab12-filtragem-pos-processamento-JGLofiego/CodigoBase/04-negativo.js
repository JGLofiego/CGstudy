// Convertendo a cor dos pixels de uma imagem via pós-processamento

import * as THREE from "three";

import { GUI } from "gui";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { NegativeShader } from "./shaders/NegativeShader.js";

const gui = new GUI();

let controls, scene, camera, renderer, composer;

const params = { enable: true };

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

    const negative = new ShaderPass(NegativeShader);
    composer.addPass(negative);

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

main();

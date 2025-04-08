// Ainda testando a instalação do Three.JS

import * as THREE from "three";
import { GLTFLoader } from "glTF-loaders";
import { FirstPersonControls } from "FPSControls";

const clock = new THREE.Clock();

let scene, renderer, camera, controls, cube;

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {
  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  const rendSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);

  renderer.setSize(rendSize, rendSize);

  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  // camera = new THREE.PerspectiveCamera( 75.0, rendSize.x/rendSize.y, 0.01, 1000.0);
  camera = new THREE.PerspectiveCamera(50.0, 1.0, 0.1, 2000.0);
  camera.position.x = 0;
  camera.position.z = -16;

  controls = new FirstPersonControls(camera, renderer.domElement);

  controls.movementSpeed = 1.5;
  controls.lookSpeed = 0.15;
  controls.activeLook = true;
  scene.add(camera);

  // Load Mesh
  const gltfLoader = new GLTFLoader();

  gltfLoader.load("../Models/art_gallery/scene.gltf", loadMesh);
  gltfLoader.load("../Models/sculpture1/scene.gltf", loadVenus);
  gltfLoader.load("../Models/cat/scene.gltf", loadCat);
  gltfLoader.load("../Models/cat_bronze/scene.gltf", loadBronze);
  gltfLoader.load("../Models/cat_frame/scene.gltf", loadCatFrame);
  gltfLoader.load("../Models/art_frame2/scene.gltf", loadFrame1);
  gltfLoader.load("../Models/art_frame1/scene.gltf", loadFrame2);

  //Adiciona uma fonte de luz ambiente
  var ambLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambLight);

  anime();
}

function setupShadow(child) {
  child.receiveShadow = true;
  child.castShadow = true;

  if (child.children.length !== 0) {
    child.children.forEach(setupShadow);
  }
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
  const root = loadedMesh.scene;
  root.name = "galeria";
  root.position.y = -2;
  root.position.z = -20;
  root.receiveShadow = true;

  root.children.forEach(setupShadow);
  scene.add(root);
}

function loadCat(loadedMesh) {
  const root = loadedMesh.scene;
  root.name = "cat";
  root.position.x = 1;
  root.position.y = -2;
  root.position.z = -20;
  root.translateZ(-4.2);
  root.scale.set(0.2, 0.2, 0.2);
  root.translateY(1.27);
  root.children.forEach(setupShadow);

  let spotLight = new THREE.SpotLight();
  spotLight.castShadow = true;
  spotLight.name = "spotLight1";
  spotLight.target = root;
  spotLight.position.x = root.position.x;
  spotLight.position.y = root.position.y;
  spotLight.position.z = root.position.z;
  spotLight.translateY(4);
  spotLight.translateZ(0.5);
  spotLight.intensity = 4;
  spotLight.decay = 0.5;
  spotLight.angle = 0.1;
  let spotLightHelper = new THREE.SpotLightHelper(spotLight);

  const geometry = new THREE.BoxGeometry(0.5, 1.3, 0.5);
  const material = new THREE.MeshStandardMaterial({ clipShadows: true });
  cube = new THREE.Mesh(geometry, material);
  cube.name = "cat plinth";
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.position.x = 1;
  cube.position.y = -1.35;
  cube.position.z = -24.2;

  scene.add(cube);
  scene.add(spotLight);
  // scene.add(spotLightHelper);
  scene.add(root);
}

async function loadVenus(loadedMesh) {
  const root = loadedMesh.scene;
  root.name = "roza";
  root.position.y = -2;
  root.position.z = -20;
  root.translateX(4.9);
  root.translateY(0.12);
  root.translateZ(-5.9);
  root.rotateY(2);
  root.children.forEach(setupShadow);
  root.scale.set(0.005, 0.005, 0.005);

  let spotLight = new THREE.SpotLight();
  spotLight.castShadow = true;
  spotLight.name = "spotLight1";
  spotLight.target = root;
  spotLight.position.x = root.position.x;
  spotLight.position.y = root.position.y;
  spotLight.position.z = root.position.z;
  spotLight.translateX(-2);
  spotLight.translateY(3.6);
  spotLight.translateZ(2);
  spotLight.intensity = 4;
  spotLight.decay = 0.2;
  spotLight.angle = 0.3;
  let spotLightHelper = new THREE.SpotLightHelper(spotLight);

  scene.add(spotLight);
  // scene.add(spotLightHelper);
  scene.add(root);
}

function loadBronze(loadedMesh) {
  const root = loadedMesh.scene;

  root.name = "cat_bronze";
  root.position.y = -2;
  root.position.z = -20;
  root.translateX(-2);
  root.translateY(0.7);
  root.translateZ(-3.8);
  root.rotateY(0.5);

  let spotLight = new THREE.SpotLight();
  spotLight.castShadow = true;
  spotLight.name = "spotLight";
  spotLight.target = root;
  spotLight.position.x = root.position.x;
  spotLight.position.y = root.position.y;
  spotLight.position.z = root.position.z;
  spotLight.translateY(4);
  spotLight.translateZ(0.5);
  spotLight.intensity = 5;
  spotLight.decay = 0.3;
  spotLight.angle = 0.15;
  let spotLightHelper = new THREE.SpotLightHelper(spotLight);

  const geometry = new THREE.BoxGeometry(0.6, 1.25, 0.6);
  const material = new THREE.MeshStandardMaterial({ clipShadows: true });
  cube = new THREE.Mesh(geometry, material);
  cube.name = "cat_bronze plinth";
  cube.receiveShadow = true;
  cube.castShadow = true;
  cube.position.x = root.position.x;
  cube.position.y = 0;
  cube.position.z = root.position.z;
  cube.translateY(-1.646);
  cube.scale.set(1, 0.56, 1);
  cube.rotateY(0.5);

  root.children.forEach(setupShadow);
  root.scale.set(0.05, 0.05, 0.05);
  scene.add(root);
  scene.add(spotLight);
  // scene.add(spotLightHelper);
  scene.add(cube);
}

function loadCatFrame(loadedMesh) {
  const root = loadedMesh.scene;
  root.position.y = 0;
  root.position.z = -24.5;
  root.scale.set(0.6, 0.6, 0.6);
  root.translateX(-0.48);
  root.translateY(-0.45);
  root.translateZ(-0.2);
  root.rotateX(0.27);
  root.rotateY(0.1);
  root.rotateZ(-0.03);
  scene.add(root);
}

function loadFrame1(loadedMesh) {
  const root = loadedMesh.scene;
  root.position.y = 0;
  root.position.y = 0;
  root.position.z = -20;
  root.scale.set(1.2, 1.2, 1.2);
  root.translateX(4.8);
  root.translateY(0.8);
  root.translateZ(1.6);
  root.rotateY(-Math.PI / 2 + 0.1);

  scene.add(root);
}

function loadFrame2(loadedMesh) {
  const root = loadedMesh.scene;
  console.log(root);
  root.position.x = 0;
  root.position.y = 0;
  root.position.z = -21.5;
  root.scale.set(0.03, 0.03, 0.03);
  root.translateX(-4.25);
  root.translateY(-1.95);
  root.translateZ(5.8);
  root.rotateY(Math.PI / 2 + 0.1);

  scene.add(root);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************
function anime() {
  let delta = clock.getDelta();

  // let obj = scene.getObjectByName("roza");

  if (controls) {
    controls.update(0.01);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(anime);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();

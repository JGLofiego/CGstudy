// Desenhando objetos gráficos 3D do Three.JS

import * as THREE from "three";

import { GUI } from "gui";

const gui = new GUI();
const rendSize = new THREE.Vector2();

var objMesh;

var controls,
  scene,
  camera,
  renderer,
  curObj = null;

var colors = {
  yellow: 0xffff00,
  green: 0x00ff00,
  blue: 0x0000ff,
  pink: 0xd000ff,
  red: 0xf0000f,
  cyan: 0x40ffff,
};

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

  objMesh = new THREE.Mesh(new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial({ color: colors.yellow, wireframe: true }));
  objMesh.name = "tetraedro";
  objMesh.visible = true;
  objMesh.rotateY((60.0 * Math.PI) / 180.0);
  objMesh.updateMatrix();
  scene.add(objMesh);

  curObj = objMesh;

  objMesh = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.3, 30, 30), new THREE.MeshBasicMaterial({ color: colors.green, wireframe: true }));
  objMesh.name = "toro";
  objMesh.visible = false;
  objMesh.rotateY((30.0 * Math.PI) / 180.0);
  objMesh.updateMatrix();
  scene.add(objMesh);

  objMesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.2), new THREE.MeshBasicMaterial({ color: colors.blue, wireframe: true }));
  objMesh.name = "TorusKnot";
  objMesh.visible = false;
  objMesh.rotateX((60.0 * Math.PI) / 180.0);
  objMesh.rotateY((30.0 * Math.PI) / 180.0);
  objMesh.updateMatrix();
  scene.add(objMesh);

  objMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), new THREE.MeshBasicMaterial({ color: colors.pink, wireframe: true }));
  objMesh.name = "Sphere";
  objMesh.visible = false;
  scene.add(objMesh);

  objMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.5), new THREE.MeshBasicMaterial({ color: colors.red, wireframe: true }));
  objMesh.name = "Box";
  objMesh.visible = false;
  objMesh.rotateX((60.0 * Math.PI) / 180.0);
  objMesh.rotateY((30.0 * Math.PI) / 180.0);
  objMesh.updateMatrix();
  scene.add(objMesh);

  objMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.3, 0.7), new THREE.MeshBasicMaterial({ color: colors.cyan, wireframe: true }));
  objMesh.name = "Cylinder";
  objMesh.visible = false;
  scene.add(objMesh);

  renderer.clear();
  renderer.render(scene, camera);
  anime();
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function initGUI() {
  var controls = { Forma3D: "Tetraedro", wireframe: true, material: "Basic" };

  gui.add(controls, "Forma3D", ["Tetraedro", "Toro", "TorusKnot", "Sphere", "Box", "Cylinder"]).onChange(changeObj);
  gui.add(controls, "wireframe").onChange(changeMesh);
  gui.add(controls, "material", ["Basic", "Depth"]).onChange(changeMaterial);
  gui.open();
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function changeObj(val) {
  switch (val) {
    case "Tetraedro":
      curObj = scene.getObjectByName("tetraedro");
      curObj.visible = true;
      scene.getObjectByName("toro").visible = false;
      scene.getObjectByName("TorusKnot").visible = false;
      scene.getObjectByName("Sphere").visible = false;
      scene.getObjectByName("Box").visible = false;
      scene.getObjectByName("Cylinder").visible = false;
      break;
    case "Toro":
      curObj = scene.getObjectByName("toro");
      curObj.visible = true;
      scene.getObjectByName("tetraedro").visible = false;
      scene.getObjectByName("TorusKnot").visible = false;
      scene.getObjectByName("Sphere").visible = false;
      scene.getObjectByName("Box").visible = false;
      scene.getObjectByName("Cylinder").visible = false;
      break;
    case "TorusKnot":
      curObj = scene.getObjectByName("TorusKnot");
      curObj.visible = true;
      scene.getObjectByName("tetraedro").visible = false;
      scene.getObjectByName("toro").visible = false;
      scene.getObjectByName("Sphere").visible = false;
      scene.getObjectByName("Box").visible = false;
      scene.getObjectByName("Cylinder").visible = false;
      break;
    case "Sphere":
      curObj = scene.getObjectByName("Sphere");
      curObj.visible = true;
      scene.getObjectByName("tetraedro").visible = false;
      scene.getObjectByName("toro").visible = false;
      scene.getObjectByName("TorusKnot").visible = false;
      scene.getObjectByName("Box").visible = false;
      scene.getObjectByName("Cylinder").visible = false;
      break;
    case "Box":
      curObj = scene.getObjectByName("Box");
      curObj.visible = true;
      scene.getObjectByName("tetraedro").visible = false;
      scene.getObjectByName("toro").visible = false;
      scene.getObjectByName("TorusKnot").visible = false;
      scene.getObjectByName("Sphere").visible = false;
      scene.getObjectByName("Cylinder").visible = false;
      break;
    case "Cylinder":
      curObj = scene.getObjectByName("Cylinder");
      curObj.visible = true;
      scene.getObjectByName("tetraedro").visible = false;
      scene.getObjectByName("toro").visible = false;
      scene.getObjectByName("TorusKnot").visible = false;
      scene.getObjectByName("Sphere").visible = false;
      scene.getObjectByName("Box").visible = false;
      break;
  }

  renderer.clear();
  renderer.render(scene, camera);
}

function changeMesh(value) {
  scene.getObjectByName("tetraedro").material.wireframe = value;
  scene.getObjectByName("toro").material.wireframe = value;
  scene.getObjectByName("TorusKnot").material.wireframe = value;
  scene.getObjectByName("Sphere").material.wireframe = value;
  scene.getObjectByName("Box").material.wireframe = value;
  scene.getObjectByName("Cylinder").material.wireframe = value;
}

function changeMaterial(value) {
  const tetraedro = scene.getObjectByName("tetraedro");
  const toro = scene.getObjectByName("toro");
  const torusknot = scene.getObjectByName("TorusKnot");
  const sphere = scene.getObjectByName("Sphere");
  const box = scene.getObjectByName("Box");
  const cylinder = scene.getObjectByName("Cylinder");

  switch (value) {
    case "Basic":
      tetraedro.material = new THREE.MeshBasicMaterial({ color: colors.yellow, wireframe: tetraedro.material.wireframe });
      toro.material = new THREE.MeshBasicMaterial({ color: colors.green, wireframe: toro.material.wireframe });
      torusknot.material = new THREE.MeshBasicMaterial({ color: colors.blue, wireframe: torusknot.material.wireframe });
      sphere.material = new THREE.MeshBasicMaterial({ color: colors.pink, wireframe: sphere.material.wireframe });
      box.material = new THREE.MeshBasicMaterial({ color: colors.red, wireframe: box.material.wireframe });
      cylinder.material = new THREE.MeshBasicMaterial({ color: colors.cyan, wireframe: cylinder.material.wireframe });
      break;
    case "Depth":
      tetraedro.material = new THREE.MeshDepthMaterial({ wireframe: tetraedro.material.wireframe });
      toro.material = new THREE.MeshDepthMaterial({ wireframe: toro.material.wireframe });
      torusknot.material = new THREE.MeshDepthMaterial({ wireframe: torusknot.material.wireframe });
      sphere.material = new THREE.MeshDepthMaterial({ wireframe: sphere.material.wireframe });
      box.material = new THREE.MeshDepthMaterial({ wireframe: box.material.wireframe });
      cylinder.material = new THREE.MeshDepthMaterial({ wireframe: cylinder.material.wireframe });
      break;
  }

  renderer.clear();
  renderer.render(scene, camera);
}

// **********************************************d********************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {
  let minDim = Math.min(window.innerWidth, window.innerHeight);

  renderer.setSize(minDim * 0.8, minDim * 0.8);

  renderer.clear();
  renderer.render(scene, camera);
}

function anime() {
  requestAnimationFrame(anime);
  curObj.rotation.x += 0.01;

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

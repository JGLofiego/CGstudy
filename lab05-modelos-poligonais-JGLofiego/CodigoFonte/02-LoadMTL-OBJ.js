// Controle de camera com GUI.

import * as THREE 			from 'three';
import { MTLLoader } 		from 'mtl-loaders';
import { OBJLoader } 		from 'obj-loaders';

let 	scene,
		renderer,
		camera,
		camControl;

const 	clock 			= new THREE.Clock();

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	const rendSize = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8);

	renderer.setSize(rendSize, rendSize);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	//camera = new THREE.PerspectiveCamera( 75.0, 1.0, 0.01, 1000.0);
	camera = new THREE.OrthographicCamera(-2.0, 2.0, 2.0, -2.0, -2.0, 2.0);

	// Load MTL
	const MTL_loader = new MTLLoader();
	MTL_loader.load('/Assets/Models/OBJ/AtlasModels/bunny.mtl', loadMTL);

	//Adiciona uma fonte de luz ambiente
	var ambLight = new THREE.AmbientLight( 0xffffff ); 
	scene.add(ambLight);

	anime();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMTL(materials) {

	materials.preload();

	// Load Mesh
	const OBJ_loader = new OBJLoader();
	OBJ_loader.setMaterials( materials );
	OBJ_loader.load('/Assets/Models/OBJ/AtlasModels/bunny.obj', loadMesh);

}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {

	loadedMesh.name = "malha";
	scene.add(loadedMesh);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function anime() {
	let delta = clock.getDelta();

	let obj = scene.getObjectByName("malha");

	if (obj)
		obj.rotateY(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(anime);
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();

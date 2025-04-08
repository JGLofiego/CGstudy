// Controle de camera com GUI.

import * as THREE 			from 'three';
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

	// camera = new THREE.PerspectiveCamera( 75.0, 1.0, 0.01, 1000.0);
	camera = new THREE.OrthographicCamera(-2.0, 2.0, 2.0, -2.0, -2.0, 2.0);

	// Load Mesh
	const loader = new OBJLoader();
	loader.load('/Assets/Models/OBJ/Classicals/cube.obj', loadMesh);

	scene.add(new THREE.AxesHelper(2.0));

	anime();
};

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {

	loadedMesh.children.forEach(function (child) {
		child.material = new THREE.MeshBasicMaterial(	{	color  		: new THREE.Color(Math.random(), Math.random(), Math.random()), 
															wireframe  	: true
														} );
		});

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

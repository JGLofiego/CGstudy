// Ainda testando a instalação do Three.JS

import * as THREE 			from 'three';
import { GLTFLoader } 		from 'glTF-loaders';

const 	clock 			= new THREE.Clock();

let 	scene,
		renderer, 
		camera;

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

	// camera = new THREE.PerspectiveCamera( 75.0, rendSize.x/rendSize.y, 0.01, 1000.0);
	camera = new THREE.OrthographicCamera(-2.0, 2.0, 2.0, -2.0, -2.0, 2.0);
	
	scene.add( camera );
	
	// Load Mesh
	const gltfLoader = new GLTFLoader();
	gltfLoader.load('/Assets/Models/glTF/stanford_bunny_pbr/scene.gltf', loadMesh);

	//Adiciona uma fonte de luz ambiente
	var ambLight = new THREE.AmbientLight( 0xffffff ); 
	scene.add(ambLight);

	anime();
};
		
/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function loadMesh(loadedMesh) {
		
	const root 	= loadedMesh.scene;
	root.name 	= "malha";
	scene.add(root);
};

/// ***************************************************************
/// **                                                           **
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

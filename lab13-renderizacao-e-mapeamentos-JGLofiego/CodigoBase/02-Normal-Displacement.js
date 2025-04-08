// Normal & Displacement Mapping 

import * as THREE 		from 'three';
import { OrbitControls } 	from 'orb-cam-ctrl';
import { OBJLoader } 		from 'OBJ-loaders';
import { GUI }			from 'gui';

const   rendSize    = new THREE.Vector2();

let     renderer,
        scene,
        camera,
        cameraControl,
        dispTexMap,
        normalTexMap;

const 	gui 	= new GUI();

const 	params 	= { material 	: 'none',
					wireframe 	: false 
};

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.9;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 		= new THREE.Scene();
	camera 		= new THREE.PerspectiveCamera(45, rendSize.x / rendSize.y, 0.1, 1000.0);
	cameraControl 	= new OrbitControls(camera, renderer.domElement);

	dispTexMap		= new THREE.TextureLoader().load("/Assets/Models/OBJ/ninja/displacement.jpg");
	normalTexMap	= new THREE.TextureLoader().load("/Assets/Models/OBJ/ninja/normal.png");
				
	let objectLoader = new OBJLoader().load("/Assets/Models/OBJ/ninja/ninjaHead_Low.obj", loadMesh);

	gui.add( params, 'material', [ 'displacement', 'normal', 'displacement+normal', 'none'] ).onChange(onChangeGUI);
	gui.add( params, 'wireframe' ).onChange(onChangeGUI);
	gui.open();

	render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(loadedMesh) {

	const mat = new THREE.MeshPhongMaterial( 	{ 	displacementMap		: null,
													displacementScale	: 4.436143,
													displacementBias	: -0.428408,
													normalMap			: null,
													normalMapType		: THREE.TangentSpaceNormalMap,
													wireframe			: params.wireframe
												} );	

	loadedMesh.children.forEach(function (child) {
		child.material = mat;
		});

	loadedMesh.name 			= "ninja";

	loadedMesh.castShadow 		= true;
	loadedMesh.receiveShadow	= true;

	scene.add(loadedMesh);

	const box = new THREE.Box3().setFromObject(loadedMesh);

	loadedMesh.position.x = -(box.max.x + box.min.x)/2.0;
	loadedMesh.position.y = -(box.max.y + box.min.y)/2.0;
	loadedMesh.position.z = -(box.max.z + box.min.z)/2.0;

	console.log(box)

	camera.position.x = 0.0;
	camera.position.y = (box.max.y - box.min.y) / 2.0;
	camera.position.z = box.max.z * 3.0;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	
	const farPlane = Math.max(	(box.max.x - box.min.x),
					(box.max.y - box.min.y),
					(box.max.z - box.min.z) );
	camera.near = 0.01;
	camera.far = farPlane*10.0;
	camera.updateProjectionMatrix();

	// Global Axis
	let globalAxis = new THREE.AxesHelper(farPlane);
	scene.add( globalAxis );

	cameraControl.update();

	const dLight 		= new THREE.DirectionalLight( 0xffffff );
	dLight.position.set( 0.0, 15.0, 0.0 );
	dLight.castShadow 	= true;
	dLight.name		= "dLight";
	scene.add( dLight );

	let pLight = new THREE.PointLight( 0xff0000, 1.5, 0, 0 );
	pLight.position.set( -10.0, -15.0, 15.0 );
	pLight.castShadow 	= true;
	pLight.name		= "pLightR";
	scene.add( pLight );

	pLight = new THREE.PointLight( 0x0000ff, 1.5, 0, 0 );
	pLight.position.set( 10.0, 15.0, 15.0 );
	pLight.castShadow 	= true;
	pLight.name		= "pLightB";
	scene.add( pLight );
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function onChangeGUI() {

	let obj = scene.getObjectByName("ninja");

	obj.children.forEach(function (child) {

		switch (params.material) { 
			case 'displacement' 		: 	child.material.displacementMap 	= dispTexMap;
											child.material.normalMap 		= null;
											child.material.wireframe		= params.wireframe;
											break; 
			case 'normal'  				: 	child.material.displacementMap 	= null;
											child.material.normalMap 		= normalTexMap;
											child.material.wireframe		= params.wireframe;
											break; 
			case 'displacement+normal' 	: 	child.material.displacementMap 	= dispTexMap;
											child.material.normalMap 		= normalTexMap;
											child.material.wireframe		= params.wireframe;
											break; 
			case 'none' 				: 	child.material.displacementMap 	= null;
											child.material.normalMap 		= null;
											child.material.wireframe		= params.wireframe;
											break; 
			} 
		child.material.needsUpdate = true;
		});

}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function render() {

	cameraControl.update();

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();

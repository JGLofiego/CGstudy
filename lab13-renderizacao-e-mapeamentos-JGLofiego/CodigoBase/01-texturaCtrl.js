// Cenário com materiais espelhados e múltiplas reflexões.

import * as THREE 			from 'three';
import { OrbitControls } 	from 'orb-cam-ctrl';
import { GUI }				from 'gui';
			
const 	rendSize 	= new THREE.Vector2();

const 	clock 		= new THREE.Clock();

let 	scene,
		renderer,
		camera,
		camControl;

const 	gui 	= new GUI();

const 	params 	= { wrap 		: 'RepeatWrapping',
					magFilter 	: 'NearestFilter',
					minFilter 	: 'NearestFilter'	};

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);
	renderer.shadowMap.enabled 	= true;
	renderer.shadowMap.type 	= THREE.PCFShadowMap; 

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();
	scene.background = new THREE.Color( 0xf0f0f0 );


	camera = new THREE.PerspectiveCamera( 75.0, rendSize.x / rendSize.y, 0.01, 1000.0);
	camera.position.set(0.0, 1.5, 3.3);
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	scene.add( camera );

	camControl 				= new OrbitControls(camera, renderer.domElement);
	camControl.autoRotate 	= true;
	camControl.rotateSpeed 	= 2.0;
	camControl.enablePan 	= false;
	camControl.enableZoom 	= true;

	const checkerTxt		= new THREE.TextureLoader().load("./checker.jpg", buildScene);

	gui.add( params, 'wrap', 	[ 'RepeatWrapping', 'ClampToEdgeWrapping', 'MirroredRepeatWrapping'] ).onChange(onChangeWrap);
	gui.add( params, 'magFilter', [ 'NearestFilter', 'LinearFilter'] ).onChange(onChangeMagFilter);
	gui.add( params, 'minFilter', [ 'NearestFilter', 'NearestMipmapNearestFilter', 'NearestMipmapLinearFilter', 
									'LinearFilter', 'LinearMipmapNearestFilter', 'LinearMipmapLinearFilter'] ).onChange(onChangeMinFilter);
	gui.open();

};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene(texture) {

	texture.wrapS 		= 
	texture.wrapT 		= THREE.RepeatWrapping; 
	texture.magFilter 	= THREE.NearestFilter; 
	texture.minFilter 	= THREE.NearestFilter;
	texture.repeat.set( 64, 64 );

	// Plano
	const chao 	= new THREE.Mesh( 	new THREE.PlaneGeometry( 500.0, 500.0, 20, 20 ), 
									new THREE.MeshPhongMaterial( 	{ 	color 	: 0xffffff,
																		map 	: texture 
																	} ) 
								);
	chao.position.y = -0.3;
	chao.rotateX( - Math.PI / 2 );
	chao.name = "chao";
	scene.add( chao );

	scene.add( new THREE.AmbientLight( 0xffffff) );

	anime();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************
function anime() {

	camControl.update( clock.getDelta() );

	renderer.render(scene, camera);
	
	requestAnimationFrame( anime );
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************
function onChangeWrap(value) {

	let obj = scene.getObjectByName("chao");

	console.log(obj.material.map.wrapS)

	switch (params.wrap) { 
		case 'RepeatWrapping' 			: 	obj.material.map.wrapS = THREE.RepeatWrapping;
											obj.material.map.wrapT = THREE.RepeatWrapping;
											break; 
		case 'ClampToEdgeWrapping' 		: 	obj.material.map.wrapS = THREE.ClampToEdgeWrapping;
											obj.material.map.wrapT = THREE.ClampToEdgeWrapping;
											break; 
		case 'MirroredRepeatWrapping' 	: 	obj.material.map.wrapS = THREE.MirroredRepeatWrapping;
											obj.material.map.wrapT = THREE.MirroredRepeatWrapping;
											break; 
		} 
	obj.material.map.needsUpdate=true;
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************
function onChangeMagFilter(value) {

	let obj = scene.getObjectByName("chao");

	switch (params.magFilter) { 
		case 'NearestFilter' 	: 	obj.material.map.magFilter = THREE.NearestFilter;
									break; 
		case 'LinearFilter' 	: 	obj.material.map.magFilter = THREE.LinearFilter;
									break; 
		} 
	obj.material.map.needsUpdate=true;
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************
function onChangeMinFilter(value) {

	let obj = scene.getObjectByName("chao");

	switch (params.minFilter) { 
		case 'NearestFilter' 				: 	obj.material.map.minFilter = THREE.NearestFilter;
												break; 
		case 'NearestMipmapNearestFilter' 	: 	obj.material.map.minFilter = THREE.NearestMipmapNearestFilter;
												break; 
		case 'NearestMipmapLinearFilter' 	: 	obj.material.map.minFilter = THREE.NearestMipmapLinearFilter;
												break; 
		case 'LinearFilter' 				: 	obj.material.map.minFilter = THREE.LinearFilter;
												break; 
		case 'LinearMipmapNearestFilter' 	: 	obj.material.map.minFilter = THREE.LinearMipmapNearestFilter;
												break; 
		case 'LinearMipmapLinearFilter' 	: 	obj.material.map.minFilter = THREE.LinearMipmapLinearFilter;
												break; 
		} 

	obj.material.map.needsUpdate=true;
}

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();

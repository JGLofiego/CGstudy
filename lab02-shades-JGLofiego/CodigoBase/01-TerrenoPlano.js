// Gerando um terreno plano baseado no objeto PlaneGeometru do Three.JS

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

let 	controls, 
		scene,
		camera,
		renderer, 
		delta = 0.01,
		amp = 0.0;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = window.innerWidth * 0.8;
	rendSize.y = window.innerHeight * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70.0, rendSize.x / rendSize.y, 0.01, 1000.0 );
	camera.position.y = 2.0;
	camera.position.z = 13.0;
	camera.updateProjectionMatrix();

	geraTerreno();

	requestAnimationFrame(anime);

}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function anime(time) {

	let obj = scene.getObjectByName("terreno");

	// const points = obj.geometry.getAttribute( 'position' );

	// for (let i = 0; i < points.count ; i++) {

	// 	let p = new THREE.Vector3().fromBufferAttribute(points, i);								
	// 	let z =  amp * Math.sin(p.x*0.2) * Math.cos(p.y*0.5);
	
	// 	points.setXYZ(i, p.x, p.y, z ) ;
	// 	}

	// points.needsUpdate = true; 

	amp +=  delta;
	if ((amp > 2.0) || (amp < -2.0))
		delta *= -1.0;
	
	obj.rotateZ(0.001);
	obj.updateMatrix();

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(anime);		
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraTerreno() {

	let shaderMat = new THREE.ShaderMaterial( 	{	vertexShader 	: document.getElementById('minVertShader').textContent,
													fragmentShader 	: document.getElementById('minFragShader').textContent,
													wireframe  		: true,
													side 			: THREE.DoubleSide
												} 
											);
									
	let meshMat = new THREE.MeshBasicMaterial	(	{	color:0xFF00FF,
														wireframe:true
													}
												);


    const terreno	= new THREE.Mesh 	(	new THREE.PlaneGeometry( 100, 100, 70, 70 ), 
											meshMat
										); 

	terreno.rotateX(-90.0 * Math.PI / 180.0);
    terreno.name 	= "terreno";
	scene.add( terreno );

	var axis = new THREE.AxesHelper(8.0);
    axis.name = "eixos";
	axis.position.y = 0.5;
	axis.updateMatrix();
    terreno.add(axis);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

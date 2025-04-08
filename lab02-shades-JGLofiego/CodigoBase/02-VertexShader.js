// Modificando a geometria do terreno utilizando Vertex Shader

import * as THREE from 'three';

const 	rendSize 	= new THREE.Vector2();

let 	controls, 
		scene,
		camera,
		renderer,
		shaderMat,
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

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraTerreno() {

	shaderMat = new THREE.ShaderMaterial( 	
					{ 	uniforms  		: 	{	uAmp  	: { type 	: "f" , 
															value  	: 2.0 } 
											},
						vertexShader 	: document.getElementById('minVertShader').textContent,
						fragmentShader 	: document.getElementById('minFragShader').textContent,
						wireframe  		: true,
						side 			: THREE.DoubleSide
					} );


    const terreno	= new THREE.Mesh 	(	new THREE.PlaneGeometry( 100, 100, 70, 70 ), 
    										shaderMat
										); 
	terreno.rotateX(-90.0 * Math.PI / 180.0);
    terreno.name 	= "terreno";
	scene.add( terreno );

	let axis = new THREE.AxesHelper(8.0);
    axis.name = "eixos";
	axis.position.y = 0.2;
	axis.updateMatrix();
    terreno.add(axis);

	requestAnimationFrame(anime);

}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function anime(time) {

	let obj = scene.getObjectByName("terreno");

	obj.rotateZ(0.001);
	obj.updateMatrix();

	obj.material.uniforms.uAmp.value = amp;

	amp += delta;
	if (amp > 2.0 || amp < -2.0)
		delta *= -1.0;
	
	obj.material.uniformsNeedUpdate = true;

	renderer.clear();
	renderer.render(scene, camera);

	requestAnimationFrame(anime);		
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

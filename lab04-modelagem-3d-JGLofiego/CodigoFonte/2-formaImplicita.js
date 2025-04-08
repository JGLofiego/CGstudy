// Criando uma forma Implicita (Blobs)

import * as THREE 	from 'three';
import * as GUI 	from 'gui';

let 	scene,
		camera,
		renderer,
		shaderMat;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	let mimDim = Math.min(window.innerWidth, window.innerHeight)

	renderer.setSize(mimDim*0.8, mimDim*0.8);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.OrthographicCamera( -5.0, 5.0, 5.0, -5.0, -1.0, 1.0 );

    geraImagem();

	renderer.clear();
	renderer.render(scene, camera);    
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraImagem() {

	shaderMat = new THREE.ShaderMaterial( 	
					{ 	uniforms  		: 	{	uBlob  		: { value 	: new THREE.Vector2(0.0, 0.0) },
											},
						vertexShader 	: document.getElementById('vertShader').textContent,
						fragmentShader 	: document.getElementById('fragShader').textContent,
						wireframe  		: false,
					} );

	var plane 			= new THREE.Mesh( 	new THREE.PlaneGeometry(20.0, 20.0, 10, 10),
											shaderMat );
	plane.name = "blobs";
	scene.add( plane );	
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

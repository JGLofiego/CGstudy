// Desenhando curvas parametricas (Bezier)

import * as THREE 	from 'three';
import * as GUI 	from 'gui';

let 	scene,
		camera,
		renderer;

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

	camera = new THREE.OrthographicCamera( -1.5, 1.5, 1.5, -1.5, -1.0, 1.0 );

    geraCurva();

   	renderer.clear();
	renderer.render(scene, camera);

//    requestAnimationFrame(anime);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function geraCurva() {

	const ptosControle = 	[ 	new THREE.Vector3( -1.0, Math.sin(0) / 2.0, 0.0 ),
								new THREE.Vector3( -0.5, Math.sin(Math.PI/2.0) / 2.0, 0.0 ),
								new THREE.Vector3(  0.5, Math.sin(3.0*Math.PI/2.0) / 2.0, 0.0 ),
								new THREE.Vector3(  1.0, Math.sin(Math.PI) / 2.0, 0.0 )
							];

	let poligonalCtrl = [];

	for (let i=0 ; i < ptosControle.length ; i++) 
		poligonalCtrl.push(ptosControle[i]);

	const objPolCtrl 		= new THREE.Line (	new THREE.BufferGeometry().setFromPoints(poligonalCtrl),
												new THREE.LineBasicMaterial( {color: 0xFFFFFF})
											);
	objPolCtrl.name 		= "poligonalControle";
	scene.add(objPolCtrl);

	const bCurveCtrlPtos = new THREE.CubicBezierCurve3( ptosControle[0],  ptosControle[1], ptosControle[2], ptosControle[3] );

	const samples = bCurveCtrlPtos.getPoints( 150 );

	const bezierCurve = new THREE.Line( new THREE.BufferGeometry().setFromPoints( samples ), 
										new THREE.LineBasicMaterial( { color: 0xff00ff } ) );

	bezierCurve.name = "Bezier";

	scene.add(bezierCurve);
}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************
function anime(time) {

// Coloque aqui a sua função de animação da curva. 

}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //

main();

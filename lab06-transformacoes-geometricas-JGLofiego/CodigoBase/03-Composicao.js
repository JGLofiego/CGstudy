// Commposição de Transformações Geométricas.

import * as THREE from 'three';
import { GUI } 		from 'gui'

const 	rendSize 	= new THREE.Vector2();
var 	pos 		= 0.0;

var 	scene,
		renderer,
		camera,
		controls;

var gui = new GUI();

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function main() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	rendSize.x = 
	rendSize.y = Math.min(window.innerWidth, window.innerHeight) * 0.8;

	renderer.setSize(rendSize.x, rendSize.y);

	document.body.appendChild(renderer.domElement);

	scene 	= new THREE.Scene();

	camera = new THREE.OrthographicCamera( -5.0, 5.0, 5.0, -5.0, -1.0, 1.0 );
	scene.add( camera );

	initGUI();

	buildScene();

	renderer.render(scene, camera);
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function initGUI() {

	controls = 	{	UseMatrix : false,
					};

	gui.add( controls, 'UseMatrix').onChange(mudaMatrizes);
	gui.open();
};

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function mudaMatrizes(val) {

	if (val) {
		scene.getObjectByName("TransObjProp").visible 	= false;
		scene.getObjectByName("TransObjMatrix").visible = true;
		}
	else {
		scene.getObjectByName("TransObjProp").visible 	= true;
		scene.getObjectByName("TransObjMatrix").visible = false;
		}

	renderer.render(scene, camera);
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function buildScene() {

	var axis = new THREE.AxesHelper(5.0);
	scene.add(axis);

	// ***************************************************************
	// Grupo de objetos com transformações controladas pelos atributos 

	var grpObjTransf = new THREE.Object3D();
	grpObjTransf.name = "TransObjProp";

	var quad0 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.0, 1.0 ), 
										new THREE.MeshBasicMaterial( {color:0xFFFFFF} ), 
									);
	quad0.name = "QuadBranco";
	quad0.scale.copy( new THREE.Vector3(2.0, 2.0, 1.0)); 
	quad0.rotateZ(Math.PI / 4.0);
	quad0.position.x = 0.0;
	quad0.position.y = 2.0;
	grpObjTransf.add(quad0);

	var quad1 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.0, 1.0 ), 
										new THREE.MeshBasicMaterial( {color:0xFF0000} ), 
									);
	quad1.name = "QuadVerm";
	quad1.position.x = 0.0;
	quad1.position.y = 2.0;
	quad1.rotateZ(Math.PI / 4.0);
	quad1.scale.copy( new THREE.Vector3(1.5, 1.5, 1.0)); 
	grpObjTransf.add(quad1);

	var quad2 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.0, 1.0 ), 
										new THREE.MeshBasicMaterial( {color:0x0000FF} ), 
									);
	quad2.name = "QuadAzul";
	quad2.position.x = 0.0;
	quad2.position.y = 2.0;
	quad2.scale.copy( new THREE.Vector3(1.0, 1.0, 1.0)); 
	quad2.rotateZ(Math.PI / 4.0);
	grpObjTransf.add(quad2);

	scene.add(grpObjTransf);

	// ***************************************************************
	// Grupo de objetos com transformações controladas por matrizes 

	var grpMatrixTransf = new THREE.Object3D();
	grpMatrixTransf.name = "TransObjMatrix";
	grpMatrixTransf.visible = false;

	var trans 		= new THREE.Matrix4().makeTranslation(2.0, 0.0, 0.0);
	var rot 		= new THREE.Matrix4().makeRotationZ(Math.PI / 3.0);

	var compMat	= new THREE.Matrix4();

	compMat.multiply(rot);
	compMat.multiply(trans);

	var quad3 	= new THREE.Mesh 	( 	new THREE.PlaneGeometry( 1.0, 1.0 ), 
										new THREE.MeshBasicMaterial( {color:0xFFFFFF} ), 
									);
	quad3.name = "QuadBrancoM";
	quad3.matrix.copy(compMat);
	quad3.matrixAutoUpdate = false;
	grpMatrixTransf.add(quad3);

	scene.add(grpMatrixTransf);
};

/// ***************************************************************
/// ***************************************************************
/// ***************************************************************

main();

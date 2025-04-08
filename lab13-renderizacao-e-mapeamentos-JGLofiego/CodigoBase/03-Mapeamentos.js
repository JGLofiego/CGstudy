// Normal & Displacement Mapping 

import * as THREE 			from 'three';
import { OrbitControls } 	from 'orb-cam-ctrl';
import { GLTFLoader } 		from 'GLTF-loaders';
import { GUI }				from 'gui';

const   rendSize    = new THREE.Vector2();

let     renderer,
        scene,
        camera,
        cameraControl,
		dispTexMap,
		normalTexMap,
		colorMap,
		specMap;

const 	gui 	= new GUI();

const 	params 	= { normalMap 	: true,
					specularMap	: false,
					dispMap 	: false,
					colorMap 	: false,
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

	dispTexMap		= new THREE.TextureLoader().load("/Assets/Models/glTF/LeePerrySmith/Infinite-Level_02_Disp_NoSmoothUV-4096.jpg");
	normalTexMap	= new THREE.TextureLoader().load("/Assets/Models/glTF/LeePerrySmith/Infinite-Level_02_Tangent_SmoothUV.jpg");
	colorMap 		= new THREE.TextureLoader().load("/Assets/Models/glTF/LeePerrySmith/Map-COL.jpg");
	specMap 		= new THREE.TextureLoader().load("/Assets/Models/glTF/LeePerrySmith/Map-SPEC.jpg");
					
	let objectLoader = new GLTFLoader().load("/Assets/Models/glTF/LeePerrySmith/LeePerrySmith.glb", loadMesh);

	gui.add( params, 'wireframe').onChange(onChangeGUI);
	gui.add( params, 'normalMap').onChange(onChangeGUI);
	gui.add( params, 'specularMap').onChange(onChangeGUI);
	gui.add( params, 'dispMap').onChange(onChangeGUI);
	gui.add( params, 'colorMap').onChange(onChangeGUI);
	gui.open();

	render();
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function updateMaterial(obj, isLast = true) {
	const lastNdx = obj.children.length - 1;

	if (obj.type == 'Mesh') {

		obj.material.wireframe = params.wireframe;
		obj.material.displacementScale = 0.05;
		console.log(obj.material)
		if(params.dispMap) {
			obj.material.displacementMap = dispTexMap
		}
		else {
			obj.material.displacementMap	= null;
		} 
		if(params.normalMap) {
			obj.material.normalMap = normalTexMap
		}
		else {
			obj.material.normalMap	= null;
		}

		if(params.colorMap){
			obj.material.map = colorMap
		} else {
			if(params.specularMap){
				obj.material.map = specMap
			} else{
				obj.material.map = null
			}
		}
		
		obj.material.wireframe			= params.wireframe;

		obj.material.needsUpdate = true;

		}
	obj.children.forEach((child, ndx) => 	{	const isLast = ndx === lastNdx;
									    		updateMaterial(child, isLast);
										  	} );
}

/// ***************************************************************
/// **                                                           **
/// ***************************************************************

function loadMesh(gltfModel) {

	let mesh = gltfModel.scene;

	updateMaterial(mesh);

	mesh.name = "face";

	scene.add(mesh);

	const box = new THREE.Box3().setFromObject(mesh);

	mesh.position.x = -(box.max.x + box.min.x)/2.0;
	mesh.position.y = -(box.max.y + box.min.y)/2.0;
	mesh.position.z = -(box.max.z + box.min.z)/2.0;

	camera.position.x = 0.0;
	camera.position.y = (box.max.y - box.min.y) / 2.0;
	camera.position.z = box.max.z * 5.0;
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

	const dLight 		= new THREE.DirectionalLight( 0xffffff, 2.0 );
	dLight.position.set( 0.0, 15.0, 20.0 );
	dLight.castShadow 	= true;
	dLight.name		= "dLight";
	scene.add( dLight );

}

/// ***************************************************************
/// ***                                                          **
/// ***************************************************************

function onChangeGUI() {

	let obj = scene.getObjectByName("face");

	updateMaterial(obj);

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

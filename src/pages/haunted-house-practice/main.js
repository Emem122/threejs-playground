import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * light
 */
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.4);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.4);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

/**
 * Mesh
 */

//cube
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshStandardMaterial());

cube.position.y = 2 / 2;
scene.add(cube);

//floor
const plane = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshStandardMaterial({ color: 0xffffff })
);

plane.rotation.x = -Math.PI * 0.5;
scene.add(plane);

//sphere
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);

const sphere1 = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ color: 0xff00ff }));
sphere1.position.y = 0.5;
sphere1.position.x = Math.sin(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);
sphere1.position.z = Math.cos(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);

const sphere2 = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ color: 0xff0000 }));
sphere2.position.y = 0.5;
sphere2.position.x = Math.sin(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);
sphere2.position.z = Math.cos(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);

const sphere3 = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({ color: 0xffff00 }));
sphere3.position.y = 0.5;
sphere3.position.x = Math.sin(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);
sphere3.position.z = Math.cos(Math.random() * Math.PI * 2) * (5 + Math.random() * 6);

scene.add(sphere1, sphere2, sphere3);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	//sphere
	sphere1.position.x = Math.sin(elapsedTime) * 8;
	sphere1.position.z = Math.cos(elapsedTime) * 8;
	sphere1.position.y = Math.sin(elapsedTime * 5) * 2;

	sphere2.position.x = Math.cos(elapsedTime) * 6;
	sphere2.position.z = Math.sin(elapsedTime) * 6;
	sphere2.position.y = Math.abs(Math.sin(elapsedTime * 3) * 2) + 0.5;

	sphere3.position.x = Math.cos(elapsedTime) * 4;
	sphere3.position.z = Math.sin(elapsedTime) * 8;
	sphere3.position.y = Math.abs(Math.sin(elapsedTime * 2) * 2) + 0.5;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();

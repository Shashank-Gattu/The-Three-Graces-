import * as THREE from 'three';
import gsap from 'gsap';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

gsap.set('.nav-div',{
  opacity:0,
});
gsap.to('.nav-div',{
  opacity:1,
  delay: 2,
  duration:2
});

let cursor = document.querySelector('#cursor');
document.addEventListener('mousemove', function(dets){
  gsap.to('#cursor',{
    x:dets.x,
    y: dets.y
  })
});

gsap.set('#text',{
  opacity:0,
});

gsap.to('#text',{
  opacity:1,
  delay:1,
  duration:1
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,-4,-1);

gsap.to(camera.position,{
  z:5,
  y:0,
  ease:'power2.out',
  duration:3
})

const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#canvas')});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize',()=>{
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
});

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({color:0x00ff00});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

const ambientLight = new THREE.AmbientLight(0x000000 , 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff,3,100,1.4);
scene.add(pointLight);
document.addEventListener('mousemove', (dets) => {
  let x = (dets.clientX / window.innerWidth) * 2 - 1;
  let y = -(dets.clientY / window.innerHeight) * 2 + 1;
  
  // Convert screen coordinates to world space
  pointLight.position.x = x * 10; // Scale for visibility
  pointLight.position.y = y * 10;
  pointLight.position.z = 3; // Keep a slight distance from camera
});

let model;
const modelLoader = new GLTFLoader();
modelLoader.load('/3d_printable_the_three_graces/scene.gltf', function(gltf){
  model = gltf.scene;
  scene.add(model);
  scene.remove(mesh);

  model.scale.set(0.2,0.2,0.2);
  model.position.set(-7,-20,-2)
});



function animate () {
  window.requestAnimationFrame(animate);
  renderer.render(scene , camera);
}
animate();

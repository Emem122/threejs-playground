import * as THREE from "three";

// ページの読み込みを待つ
window.addEventListener('load', init);
// canvasのサイズを指定
const width = window.innerWidth; //ウインドウの横の長さ
const height = 400; //エリアの縦の長さ

const loader = new THREE.TextureLoader();
const texture = loader.load('./image/image_12.jpg');

function init() {
// シーンを作る
const scene = new THREE.Scene();

// カメラを作る
const camera = new THREE.PerspectiveCamera(45, width / height);
camera.position.set(0, 0, 1000); // x,y,z座標でカメラの場所を指定

// レンダラーを作る
const canvasElement = document.querySelector('#canvas') //HTMLのcanvasのid
const renderer = new THREE.WebGLRenderer({
  canvas: canvasElement,
  alpha: true,
  antialias: true,
});


// ライトを作る
const light = new THREE.AmbientLight(0xFFFFFF, 1); //環境光源（色、光の強さ）
scene.add(light);

// 3Dオブジェクトを作る
const geometry = new THREE.DodecahedronGeometry(300, 0); // DodecahedronGeometry 正十二面体（半径、詳細）
const material = new THREE.MeshPhongMaterial({
  map: texture,
});

const line = new THREE.LineSegments(
  new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({
      color: 0x000000, // 線の色（今回は黒）
    }),
  );
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.add(line);
  scene.add(mesh);
  
  // マウス
  let mouseX = 0, mouseY = 0; // マウス座標

  let windowHalfX = window.innerWidth / 2;
  let windowHalfY = 200;

  function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
  }
  document.addEventListener('mousemove', onDocumentMouseMove);

  function tick() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;
    
    // 原点方向を見つめる
    camera.lookAt(scene.position);

    mesh.rotation.y += 0.005;
    mesh.rotation.x += 0.005;
    
    // レンダリング
    renderer.render(scene, camera);
  
    requestAnimationFrame(tick);
  }
  tick();

  // ウインドウのリサイズ対応
  onWindowResize();
  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
  // ウインドウ幅を取得
  const width = window.innerWidth;
  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, 400);

  windowHalfX = window.innerWidth / 2;
  windowHalfY = 200;

  // カメラのアスペクト比を正す
  camera.aspect = width / 400;
  camera.updateProjectionMatrix();
  }
}


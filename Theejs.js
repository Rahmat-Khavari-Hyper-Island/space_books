// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 1;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load star texture
const loader = new THREE.TextureLoader();
const starTexture = loader.load(
  "https://threejs.org/examples/textures/sprites/disc.png"
);

// Starfield creation
const stars = [];
const starCount = 10000;
for (let i = 0; i < starCount; i++) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: starTexture,
    color: 0xffffff,
  });
  const star = new THREE.Sprite(spriteMaterial);
  star.position.set(
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000
  );

  // Set the initial scale of the star
  const scale = Math.random() * 2 + 1; // Random scale between 1 and 6
  star.scale.set(scale, scale, 1);

  scene.add(star);
  stars.push(star);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Move the stars towards the camera and adjust scale dynamically if needed
  stars.forEach((star) => {
    star.position.z += 0.1; // Move stars closer to the camera
    if (star.position.z > 1000) {
      // Reset star position when it passes the camera
      star.position.z = -1000;
      star.position.x = (Math.random() - 0.5) * 2000;
      star.position.y = (Math.random() - 0.5) * 2000;

      // Optionally reset the scale when resetting position
      const newScale = Math.random() * 5 + 1; // Random scale between 1 and 6
      star.scale.set(newScale, newScale, 1);
    }
  });

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

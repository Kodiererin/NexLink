// NightThemedThreeJSBackground.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const NightThemedThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a night sky gradient
    const skyTexture = new THREE.TextureLoader().load('https://your-image-url.com/sky-texture.jpg'); // Optional: Use a gradient texture
    const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture });
    const skyGeometry = new THREE.SphereGeometry(100, 32, 32);
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    sky.material.side = THREE.BackSide;
    scene.add(sky);

    // Adding stars
    const starCount = 500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      // White color for stars
      starColors[i * 3] = 1; // Red
      starColors[i * 3 + 1] = 1; // Green
      starColors[i * 3 + 2] = 1; // Blue
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.001; // Rotate stars for a gentle effect
      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default NightThemedThreeJSBackground;

// ThreeJSBackground.js
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeJSBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scenesss
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

    // Creating  smooth, flowing particles
    const particleCount = 600;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Particle positions with respect to the screen.
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Particle colors (pastel tones)
      colors[i * 3] = Math.random() * 0.7 + 0.3;
      colors[i * 3 + 1] = Math.random() * 0.7 + 0.3;
      colors[i * 3 + 2] = Math.random() * 0.7 + 0.3;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particleSystem.rotation.x += 0.001;
      particleSystem.rotation.y += 0.002;
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

export default ThreeJSBackground;

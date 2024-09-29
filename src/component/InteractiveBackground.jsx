// InteractiveBackground.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

const InteractiveBackground = ({ backgroundType }) => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Based on the backgroundType, switch between different backgrounds
    let geometry, material, backgroundMesh;
    switch (backgroundType) {
      case 1:
        geometry = new THREE.BoxGeometry(5, 5, 5);
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        backgroundMesh = new THREE.Mesh(geometry, material);
        scene.add(backgroundMesh);
        break;

      case 2:
        geometry = new THREE.SphereGeometry(5, 32, 32);
        material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        backgroundMesh = new THREE.Mesh(geometry, material);
        scene.add(backgroundMesh);
        break;

      // Add more cases for additional backgrounds
      default:
        geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        backgroundMesh = new THREE.Mesh(geometry, material);
        scene.add(backgroundMesh);
        break;
    }

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);

      if (backgroundMesh) {
        backgroundMesh.rotation.x += 0.01;
        backgroundMesh.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement); // Cleanup on unmount
    };
  }, [backgroundType]);

  return null;
};

export default InteractiveBackground;

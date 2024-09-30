import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const EnhancedThreeJSGalaxyBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Galaxy parameters
    const galaxyParams = {
      count: 7000, // Total stars
      size: 0.03,  // Size of stars
      radius: 10,  // Radius of the galaxy
      branches: 5, // Number of spiral arms
      spin: 1.5,   // Spin factor for galaxy rotation
      randomness: 0.8, // Randomness of the star positions
      randomnessPower: 3, // Exponential randomness
      insideColor: "#ffae34", // Core color
      outsideColor: "#1b3984", // Outer star color
    };

    // Geometry and material for stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(galaxyParams.count * 3);
    const colors = new Float32Array(galaxyParams.count * 3);
    const colorInside = new THREE.Color(galaxyParams.insideColor);
    const colorOutside = new THREE.Color(galaxyParams.outsideColor);

    for (let i = 0; i < galaxyParams.count; i++) {
      const i3 = i * 3;

      // Star positions based on polar coordinates
      const radius = Math.random() * galaxyParams.radius;
      const branchAngle = ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2;
      const spinAngle = radius * galaxyParams.spin;

      const randomX = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius;
      const randomY = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius;
      const randomZ = Math.pow(Math.random(), galaxyParams.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * galaxyParams.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / galaxyParams.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: galaxyParams.size,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8, // Make stars slightly transparent
    });

    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);

    // Galaxy core glow (simple glow effect)
    const coreGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: "#ff602e",
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const galaxyCore = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(galaxyCore);

    // Twinkling effect for stars
    let twinkleStep = 0;
    const twinkleStars = () => {
      twinkleStep += 0.01;
      material.opacity = 0.7 + Math.sin(twinkleStep) * 0.1; // Twinkle effect on opacity
    };

    // Shooting star effect
    const createShootingStar = () => {
      const shootingStarGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const shootingStarMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });
      const shootingStar = new THREE.Mesh(shootingStarGeometry, shootingStarMaterial);

      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 10;
      const endX = (Math.random() - 0.5) * 20;
      const endY = (Math.random() - 0.5) * 10;

      let progress = 0;

      const shoot = () => {
        if (progress < 1) {
          progress += 0.02;
          shootingStar.position.x = THREE.MathUtils.lerp(startX, endX, progress);
          shootingStar.position.y = THREE.MathUtils.lerp(startY, endY, progress);
          shootingStar.position.z = -progress * 10;
        } else {
          scene.remove(shootingStar);
          return;
        }
        requestAnimationFrame(shoot);
      };

      scene.add(shootingStar);
      shoot();
    };

    // Animation loop for galaxy spinning and effects
    const animate = () => {
      requestAnimationFrame(animate);

      galaxy.rotation.y += 0.001;
      galaxy.rotation.x += 0.0005;

      twinkleStars();

      // Randomly trigger a shooting star
      if (Math.random() < 0.002) createShootingStar();

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Dispose of the renderer
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default EnhancedThreeJSGalaxyBackground;

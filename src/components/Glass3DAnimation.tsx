"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Glass3DAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const isMobile = window.innerWidth < 768;

    // Create renderer with alpha transparency and antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xff758f, 1.2); // Pink accent light
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x4a1525, 0.8); // Dark contrast light
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // Group to hold all 3D objects for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Glass Dodecahedron
    const glassGeometry = new THREE.DodecahedronGeometry(1.6, 0);
    
    // Create glassy/physical material (fallback to MeshStandardMaterial on mobile)
    const glassMaterial = isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0xffe3e8,
          transparent: true,
          opacity: 0.7,
          roughness: 0.2,
          metalness: 0.1,
          flatShading: true,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0xffe3e8,
          transparent: true,
          opacity: 0.65,
          roughness: 0.1,
          metalness: 0.1,
          transmission: 0.9, // High transparency
          ior: 1.5,          // Index of refraction for glass
          thickness: 1.2,    // Glass volume thickness
          specularIntensity: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
          flatShading: true,
        });

    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    mainGroup.add(glassMesh);

    // 2. Wireframe overlay for the glass dodecahedron
    const wireframeGeometry = new THREE.DodecahedronGeometry(1.61, 0);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff758f,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    mainGroup.add(wireframeMesh);

    // 3. Connected Outer Node Network (representing HR networks/talent pool)
    const nodesCount = 28;
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b2643,
      roughness: 0.2,
      metalness: 0.8,
    });

    const nodesGroup = new THREE.Group();
    mainGroup.add(nodesGroup);

    const nodesArray: THREE.Mesh[] = [];
    const positions: THREE.Vector3[] = [];

    // Place nodes in a spherical shell around the central crystal
    const radius = 2.8;
    for (let i = 0; i < nodesCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.set(x, y, z);
      
      // Store initial coordinates for minor floating animation
      nodeMesh.userData = {
        initialPos: new THREE.Vector3(x, y, z),
        speed: 0.5 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      };

      nodesGroup.add(nodeMesh);
      nodesArray.push(nodeMesh);
      positions.push(nodeMesh.position);
    }

    // Connect close nodes with a single preallocated line segments geometry (0 garbage collection in loop!)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff758f,
      transparent: true,
      opacity: 0.15,
    });

    const maxLines = 150;
    const linePositions = new Float32Array(maxLines * 2 * 3); // 2 points * 3 components
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    nodesGroup.add(lineSegments);

    const updateConnections = () => {
      let vertexIndex = 0;
      const maxVertices = maxLines * 2;
      for (let i = 0; i < nodesCount; i++) {
        for (let j = i + 1; j < nodesCount; j++) {
          const dist = positions[i].distanceTo(positions[j]);
          if (dist < 1.8 && vertexIndex < maxVertices) {
            const posI = positions[i];
            const posJ = positions[j];

            // Start point
            linePositions[vertexIndex * 3] = posI.x;
            linePositions[vertexIndex * 3 + 1] = posI.y;
            linePositions[vertexIndex * 3 + 2] = posI.z;

            // End point
            linePositions[(vertexIndex + 1) * 3] = posJ.x;
            linePositions[(vertexIndex + 1) * 3 + 1] = posJ.y;
            linePositions[(vertexIndex + 1) * 3 + 2] = posJ.z;

            vertexIndex += 2;
          }
        }
      }
      lineGeometry.setDrawRange(0, vertexIndex);
      lineGeometry.attributes.position.needsUpdate = true;
    };

    updateConnections();

    // Mouse positions
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      
      // Map to screen center (-0.5 to 0.5)
      targetX = (x - 0.5) * 1.5;
      targetY = (y - 0.5) * 1.5;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = (event.touches[0].clientX - rect.left) / rect.width;
        const y = (event.touches[0].clientY - rect.top) / rect.height;
        targetX = (x - 0.5) * 1.5;
        targetY = (y - 0.5) * 1.5;
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !canvas) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow rotation of central crystal
      glassMesh.rotation.y = elapsedTime * 0.15;
      glassMesh.rotation.x = elapsedTime * 0.08;
      wireframeMesh.rotation.y = elapsedTime * 0.15;
      wireframeMesh.rotation.x = elapsedTime * 0.08;

      // Rotate the entire outer node system in the opposite direction
      nodesGroup.rotation.y = -elapsedTime * 0.08;
      nodesGroup.rotation.x = -elapsedTime * 0.04;

      // Add gentle pulsing/floating behavior to nodes
      nodesArray.forEach((node) => {
        const initial = node.userData.initialPos as THREE.Vector3;
        const speed = node.userData.speed as number;
        const offset = node.userData.offset as number;
        
        node.position.x = initial.x + Math.sin(elapsedTime * speed + offset) * 0.15;
        node.position.y = initial.y + Math.cos(elapsedTime * speed * 0.8 + offset) * 0.15;
        node.position.z = initial.z + Math.sin(elapsedTime * speed * 1.2 + offset) * 0.15;
      });

      // Update positions vector array and redraw lines
      for (let i = 0; i < nodesCount; i++) {
        positions[i].copy(nodesArray[i].position);
      }
      updateConnections();

      // Smooth interaction/parallax rotation based on mouse coordinates
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      resizeObserver.disconnect();
      renderer.dispose();
      glassGeometry.dispose();
      glassMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      lineGeometry.dispose();
    };
  }, [isMounted]);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square max-w-[420px] mx-auto relative rounded-3xl overflow-hidden border border-white/40 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(255,117,143,0.1)] flex items-center justify-center"
      style={{ touchAction: "none" }}
    >
      {/* Visual Glossy Specular Highlights */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />
      
      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Glass3DAnimation;

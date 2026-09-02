// ==============================================================================
// 3D MECHANICAL SPECIMEN: MACHINED EPICYCLIC GEAR ASSEMBLY
// Three.js Studio-Rendered Mechanical Artifact with Exploded View Inspection
// ==============================================================================

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';
import { Layers, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

export const MechanicalArtifact: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const partsRef = useRef<{
    sunGear: THREE.Group;
    planetsGroup: THREE.Group;
    planetMeshes: THREE.Group[];
    ringGear: THREE.Mesh;
    shaft: THREE.Group;
    carrier: THREE.Group;
  } | null>(null);

  const isExplodedRef = useRef<boolean>(false);
  const explodedOffsetRef = useRef<number>(0);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotVelocity = useRef<{ x: number; y: number }>({ x: 0.002, y: 0.003 });
  const zoomLevelRef = useRef<number>(14);

  const toggleExploded = useCallback(() => {
    setIsExploded((prev) => {
      const next = !prev;
      isExplodedRef.current = next;
      return next;
    });
  }, []);

  const handleResetView = () => {
    if (sceneRef.current) {
      sceneRef.current.rotation.x = 0.4;
      sceneRef.current.rotation.y = -0.5;
      zoomLevelRef.current = 14;
    }
  };

  const handleZoom = (delta: number) => {
    zoomLevelRef.current = Math.max(8, Math.min(zoomLevelRef.current + delta, 24));
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.rotation.x = 0.4;
    scene.rotation.y = -0.5;

    // 2. Camera Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, zoomLevelRef.current);

    // 3. Renderer Setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('Three.js renderer initialization failed:', e);
      setHasWebGL(false);
      return;
    }

    // 4. Studio Lighting (Warm Brass + Cool Tool Steel + Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.2); // Warm brass tone
    keyLight.position.set(6, 8, 8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8cb8ff, 1.2); // Cool precision steel
    fillLight.position.set(-8, -4, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(0, -8, 6);
    scene.add(rimLight);

    // 5. Materials
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a4048,
      metalness: 0.88,
      roughness: 0.28,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.82,
      roughness: 0.22,
    });

    const polishedAlloyMaterial = new THREE.MeshStandardMaterial({
      color: 0x7c8592,
      metalness: 0.92,
      roughness: 0.15,
    });

    // Helper: Create a gear-like tooth disk
    const createGearMesh = (
      outerRadius: number,
      innerRadius: number,
      thickness: number,
      teethCount: number,
      material: THREE.Material
    ) => {
      const group = new THREE.Group();

      // Main core cylinder
      const coreGeo = new THREE.CylinderGeometry(outerRadius * 0.92, outerRadius * 0.92, thickness, 32);
      const coreMesh = new THREE.Mesh(coreGeo, material);
      coreMesh.rotation.x = Math.PI / 2;
      group.add(coreMesh);

      // Add teeth
      const toothWidth = (Math.PI * 2 * outerRadius) / (teethCount * 2.2);
      const toothGeo = new THREE.BoxGeometry(toothWidth, outerRadius * 0.18, thickness);

      for (let i = 0; i < teethCount; i++) {
        const angle = (i / teethCount) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, material);
        tooth.position.x = Math.cos(angle) * outerRadius;
        tooth.position.y = Math.sin(angle) * outerRadius;
        tooth.rotation.z = angle + Math.PI / 2;
        group.add(tooth);
      }

      // Center bore cutout indicator
      const boreGeo = new THREE.CylinderGeometry(innerRadius, innerRadius, thickness + 0.02, 24);
      const boreMaterial = new THREE.MeshBasicMaterial({ color: 0x111315 });
      const boreMesh = new THREE.Mesh(boreGeo, boreMaterial);
      boreMesh.rotation.x = Math.PI / 2;
      group.add(boreMesh);

      return group;
    };

    // 6. Assemble Planetary Gearbox

    // A. Sun Gear (Center)
    const sunGear = createGearMesh(1.3, 0.45, 0.7, 14, steelMaterial);
    scene.add(sunGear);

    // B. Planet Gears (3 Planets on Carrier)
    const planetsGroup = new THREE.Group();
    const planetMeshes: THREE.Group[] = [];
    const orbitRadius = 2.65;

    for (let i = 0; i < 3; i++) {
      const planet = createGearMesh(1.0, 0.3, 0.65, 12, brassMaterial);
      const angle = (i / 3) * Math.PI * 2;
      planet.position.x = Math.cos(angle) * orbitRadius;
      planet.position.y = Math.sin(angle) * orbitRadius;
      planetsGroup.add(planet);
      planetMeshes.push(planet);
    }
    scene.add(planetsGroup);

    // C. Planet Carrier (Triangular Machined Hub)
    const carrier = new THREE.Group();
    const carrierPlateGeo = new THREE.CylinderGeometry(3.1, 3.1, 0.18, 6);
    const carrierPlate = new THREE.Mesh(carrierPlateGeo, polishedAlloyMaterial);
    carrierPlate.rotation.x = Math.PI / 2;
    carrierPlate.position.z = -0.55;
    carrier.add(carrierPlate);

    // Carrier Pins
    for (let i = 0; i < 3; i++) {
      const pinGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.2, 16);
      const pin = new THREE.Mesh(pinGeo, steelMaterial);
      pin.rotation.x = Math.PI / 2;
      const angle = (i / 3) * Math.PI * 2;
      pin.position.x = Math.cos(angle) * orbitRadius;
      pin.position.y = Math.sin(angle) * orbitRadius;
      pin.position.z = 0;
      carrier.add(pin);
    }
    scene.add(carrier);

    // D. Outer Ring Gear (Machined Internal Ring)
    const ringGeo = new THREE.TorusGeometry(3.9, 0.45, 16, 48);
    const ringGear = new THREE.Mesh(ringGeo, steelMaterial);
    scene.add(ringGear);

    // E. Central Stepped Drive Shaft
    const shaft = new THREE.Group();
    const mainShaftGeo = new THREE.CylinderGeometry(0.42, 0.42, 3.8, 24);
    const mainShaft = new THREE.Mesh(mainShaftGeo, polishedAlloyMaterial);
    mainShaft.rotation.x = Math.PI / 2;
    shaft.add(mainShaft);

    // Keyway collar
    const collarGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.4, 24);
    const collar = new THREE.Mesh(collarGeo, brassMaterial);
    collar.rotation.x = Math.PI / 2;
    collar.position.z = 1.4;
    shaft.add(collar);
    scene.add(shaft);

    partsRef.current = {
      sunGear,
      planetsGroup,
      planetMeshes,
      ringGear,
      shaft,
      carrier,
    };

    // 7. Mouse / Touch Drag Handlers
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !sceneRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMousePos.current.x;
      const deltaY = clientY - prevMousePos.current.y;

      sceneRef.current.rotation.y += deltaX * 0.007;
      sceneRef.current.rotation.x += deltaY * 0.007;

      rotVelocity.current = {
        x: deltaY * 0.001,
        y: deltaX * 0.001,
      };

      prevMousePos.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 8. Animation & Kinematics Loop
    let lastTime = performance.now();
    let sunAngle = 0;

    const animate = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Kinematic gear ratio rotations
      sunAngle += dt * 1.5;
      if (partsRef.current) {
        // Sun rotates at speed ω
        partsRef.current.sunGear.rotation.z = -sunAngle;

        // Carrier orbits at ω_c = ω / (1 + R/S)
        const carrierAngle = sunAngle * 0.28;
        partsRef.current.planetsGroup.rotation.z = carrierAngle;
        partsRef.current.carrier.rotation.z = carrierAngle;

        // Individual planet gear spins on its axis
        partsRef.current.planetMeshes.forEach((pm) => {
          pm.rotation.z = sunAngle * 0.72;
        });

        // Exploded view transition interpolation
        const targetOffset = isExplodedRef.current ? 1.8 : 0;
        explodedOffsetRef.current += (targetOffset - explodedOffsetRef.current) * 0.08;

        partsRef.current.sunGear.position.z = explodedOffsetRef.current * 0.8;
        partsRef.current.planetsGroup.position.z = explodedOffsetRef.current * 0.3;
        partsRef.current.carrier.position.z = -explodedOffsetRef.current * 1.2;
        partsRef.current.shaft.position.z = explodedOffsetRef.current * 1.6;
        partsRef.current.ringGear.position.z = -explodedOffsetRef.current * 0.5;
      }

      // Damped Scene Inertia when not dragging
      if (!isDraggingRef.current && sceneRef.current) {
        sceneRef.current.rotation.y += rotVelocity.current.y;
        sceneRef.current.rotation.x += rotVelocity.current.x;

        // Gentle restorative baseline drift
        rotVelocity.current.y = rotVelocity.current.y * 0.95 + 0.0015 * 0.05;
        rotVelocity.current.x = rotVelocity.current.x * 0.95;
      }

      // Smooth camera zoom
      camera.position.z += (zoomLevelRef.current - camera.position.z) * 0.1;

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(dom)) container.removeChild(dom);
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '440px',
        background: 'var(--bg-dark-specimen)',
        border: '1px solid var(--hairline-dark-strong)',
        overflow: 'hidden',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: '440px' }} />

      {/* Top Specimen Registration Bar */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.2rem',
          right: '1.2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--text-inverse-muted)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '0.4rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--accent-brass-light)' }}>SPECIMEN NO. 04</span>
          <span>// EPICYCLIC REDUCTION STAGE</span>
        </div>
        <span style={{ color: 'var(--text-inverse-muted)' }}>ISO-6336 STANDARDS</span>
      </div>

      {/* Bottom Floating Control Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(22, 24, 28, 0.88)',
          backdropFilter: 'blur(8px)',
          padding: '0.35rem 0.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 10,
        }}
      >
        <button
          onClick={toggleExploded}
          className="btn btn-sm btn-outline-dark"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.6rem',
            fontSize: '0.7rem',
            background: isExploded ? 'rgba(184, 134, 11, 0.3)' : 'transparent',
            borderColor: isExploded ? 'var(--accent-brass-light)' : 'rgba(255, 255, 255, 0.2)',
          }}
          title="Toggle Exploded Assembly View"
        >
          <Layers size={13} color={isExploded ? '#D4AF37' : '#FFFFFF'} />
          {isExploded ? 'ASSEMBLED VIEW' : 'EXPLODED VIEW'}
        </button>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255, 255, 255, 0.15)' }} />

        <button
          onClick={() => handleZoom(-2)}
          className="video-icon-btn"
          title="Zoom In"
        >
          <ZoomIn size={15} />
        </button>

        <button
          onClick={() => handleZoom(2)}
          className="video-icon-btn"
          title="Zoom Out"
        >
          <ZoomOut size={15} />
        </button>

        <button
          onClick={handleResetView}
          className="video-icon-btn"
          title="Reset Orientation"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Bottom Hint */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '3.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-inverse-muted)',
            pointerEvents: 'none',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          [ DRAG TO ROTATE // ZOOM TO INSPECT ]
        </div>
      )}
    </div>
  );
};

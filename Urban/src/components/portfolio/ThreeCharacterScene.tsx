import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Code2, Cpu, Sliders, RefreshCw, Eye } from 'lucide-react';

interface ThreeCharacterSceneProps {
  onInteraction?: () => void;
}

export const ThreeCharacterScene: React.FC<ThreeCharacterSceneProps> = ({ onInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.4, 3.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Ambient & Directional Lighting matching reference image (purple rim light + warm key light)
    const ambientLight = new THREE.AmbientLight(0x2a1b4e, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const purpleRimLight = new THREE.DirectionalLight(0xa855f7, 3.8);
    purpleRimLight.position.set(-3, 2, -2);
    scene.add(purpleRimLight);

    const bottomGlowLight = new THREE.PointLight(0x7c3aed, 2.5, 6);
    bottomGlowLight.position.set(0, -1.2, 1);
    scene.add(bottomGlowLight);

    // Root character group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    // --- Procedural 3D Stylized Developer Avatar (Head, Glasses, Hoodie, Shoulders) ---
    // Materials
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8b896,
      roughness: 0.5,
      metalness: 0.05
    });

    const hoodieMaterial = new THREE.MeshStandardMaterial({
      color: 0x16131d,
      roughness: 0.85,
      metalness: 0.1
    });

    const hairMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1722,
      roughness: 0.6,
      metalness: 0.2
    });

    const glassesFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.8
    });

    const glassesLensMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      reflectivity: 0.8
    });

    // Torso & Hoodie
    const torsoGeo = new THREE.CylinderGeometry(0.7, 0.85, 1.1, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, hoodieMaterial);
    torsoMesh.position.set(0, -0.65, 0);
    characterGroup.add(torsoMesh);

    // Hoodie collar / cowl
    const cowlGeo = new THREE.TorusGeometry(0.38, 0.14, 16, 32);
    const cowlMesh = new THREE.Mesh(cowlGeo, hoodieMaterial);
    cowlMesh.rotation.x = Math.PI / 2;
    cowlMesh.position.set(0, -0.1, 0);
    characterGroup.add(cowlMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.35, 24);
    const neckMesh = new THREE.Mesh(neckGeo, skinMaterial);
    neckMesh.position.set(0, 0.05, 0);
    characterGroup.add(neckMesh);

    // Head Group (rotates with cursor tracking)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.35, 0);
    characterGroup.add(headGroup);

    // Head base
    const headGeo = new THREE.SphereGeometry(0.42, 32, 32);
    headGeo.scale(0.95, 1.15, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headGroup.add(headMesh);

    // Stylized Hair tufts
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const hairMainGeo = new THREE.SphereGeometry(0.44, 24, 24);
    hairMainGeo.scale(1.02, 1.12, 1.05);
    const hairMainMesh = new THREE.Mesh(hairMainGeo, hairMaterial);
    hairMainMesh.position.set(0, 0.08, -0.04);
    hairGroup.add(hairMainMesh);

    // Volumetric hair curls/spikes
    const curlGeo = new THREE.ConeGeometry(0.14, 0.32, 8);
    for (let i = 0; i < 7; i++) {
      const curl = new THREE.Mesh(curlGeo, hairMaterial);
      const angle = (i / 7) * Math.PI * 0.9 - Math.PI * 0.45;
      curl.position.set(Math.sin(angle) * 0.38, 0.45 + Math.cos(angle) * 0.1, Math.cos(angle) * 0.22);
      curl.rotation.z = -angle * 0.7;
      curl.rotation.x = -0.3;
      hairGroup.add(curl);
    }

    // Glasses
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.02, 0.4);
    headGroup.add(glassesGroup);

    const eyeLeftFrame = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.016, 16, 32), glassesFrameMaterial);
    eyeLeftFrame.position.set(-0.16, 0, 0);
    glassesGroup.add(eyeLeftFrame);

    const eyeRightFrame = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.016, 16, 32), glassesFrameMaterial);
    eyeRightFrame.position.set(0.16, 0, 0);
    glassesGroup.add(eyeRightFrame);

    const bridgeFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.1, 8), glassesFrameMaterial);
    bridgeFrame.rotation.z = Math.PI / 2;
    bridgeFrame.position.set(0, 0.04, 0);
    glassesGroup.add(bridgeFrame);

    const leftLens = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), glassesLensMaterial);
    leftLens.position.set(-0.16, 0, 0.005);
    glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(new THREE.CircleGeometry(0.11, 24), glassesLensMaterial);
    rightLens.position.set(0.16, 0, 0.005);
    glassesGroup.add(rightLens);

    // Floating Stardust/Cyber Particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 4;
      particlePos[i + 1] = (Math.random() - 0.5) * 4;
      particlePos[i + 2] = (Math.random() - 0.5) * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.03,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse movement listener for smooth 3D tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Head tracking
      headGroup.rotation.y = mouseRef.current.x * 0.45;
      headGroup.rotation.x = -mouseRef.current.y * 0.3;

      // Subtle breathing motion
      characterGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.03;
      torsoMesh.scale.x = 1 + Math.sin(elapsedTime * 1.5) * 0.015;
      torsoMesh.scale.z = 1 + Math.sin(elapsedTime * 1.5) * 0.015;

      // Particles rotation
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[380px] md:min-h-[460px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onInteraction}
    >
      {/* Ambient Circular Depth Portal & Glow Backdrop */}
      <div className="absolute inset-4 md:inset-8 rounded-full bg-gradient-to-tr from-purple-950/60 via-slate-900/80 to-purple-900/40 border border-purple-500/20 shadow-[0_0_80px_rgba(168,85,247,0.15)] flex items-center justify-center overflow-hidden">
        <div className="absolute w-[85%] h-[85%] rounded-full bg-radial from-purple-600/15 via-transparent to-transparent blur-xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(168,85,247,0.12),transparent_70%)]" />
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* ═══ Floating 3D Neomorphic Tech Badges (Matching Reference Image) ═══ */}
      {/* Top-Right: </> Code Widget */}
      <div 
        className={`absolute top-8 right-6 md:top-12 md:right-10 z-20 transition-all duration-500 transform ${
          isHovered ? 'scale-105 -translate-y-1' : ''
        }`}
      >
        <div 
          onClick={() => setActiveBadge('code')}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95"
        >
          <span className="font-mono text-lg md:text-xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:text-purple-300">
            &lt;/&gt;
          </span>
          <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none">
            Full-Stack DSP
          </div>
        </div>
      </div>

      {/* Middle-Right: JS JavaScript Badge */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 right-2 md:right-6 z-20 transition-all duration-500 delay-75 transform ${
          isHovered ? 'scale-105 translate-x-1' : ''
        }`}
      >
        <div 
          onClick={() => setActiveBadge('js')}
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95"
        >
          <span className="font-sans text-base md:text-lg font-extrabold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:text-purple-300">
            JS
          </span>
          <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none">
            TypeScript / React
          </div>
        </div>
      </div>

      {/* Bottom-Right: Sliders / Settings Control Widget */}
      <div 
        className={`absolute bottom-8 right-6 md:bottom-12 md:right-10 z-20 transition-all duration-500 delay-150 transform ${
          isHovered ? 'scale-105 translate-y-1' : ''
        }`}
      >
        <div 
          onClick={() => setActiveBadge('dsp')}
          className="group relative flex flex-col items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-b from-[#21192e] to-[#120d1c] border border-purple-500/30 shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] cursor-pointer hover:border-purple-400/60 transition-all active:scale-95 gap-1.5"
        >
          <div className="w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative">
            <div className="w-4 h-full bg-purple-400 rounded-full drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]" />
          </div>
          <div className="w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative">
            <div className="w-5 h-full bg-purple-400 rounded-full ml-auto drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]" />
          </div>
          <div className="w-7 h-1.5 rounded-full bg-purple-500/30 overflow-hidden relative">
            <div className="w-3 h-full bg-purple-400 rounded-full drop-shadow-[0_0_4px_rgba(168,85,247,0.8)]" />
          </div>
          <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-purple-300 bg-slate-900/90 px-2 py-0.5 rounded border border-purple-500/20 whitespace-nowrap pointer-events-none">
            RF & DSP Controls
          </div>
        </div>
      </div>

      {/* Floating Status Pill */}
      <div className="absolute bottom-4 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-purple-500/20 backdrop-blur-md text-[11px] text-purple-300 font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
        <span>3D Engine Active</span>
      </div>
    </div>
  );
};

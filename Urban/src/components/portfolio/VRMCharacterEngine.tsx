import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface VRMCharacterEngineProps {
  currentAvatarFile?: string;
  onAvatarLoaded?: () => void;
  isTalking?: boolean;
}

export function getAvatarUrl(file: string): string {
  if (file.startsWith('http')) return file;
  let filename = file.substring(file.lastIndexOf('/') + 1);
  if (filename === 'changli(fixed).vrm') {
    filename = 'changli.fixed.vrm';
  } else if (filename === 'Kid changli.vrm') {
    filename = 'Kid.changli.vrm';
  }
  // Primary CDN source: GitHub Releases vrm-models-v1
  return `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${filename}`;
}

export const VRMCharacterEngine: React.FC<VRMCharacterEngineProps> = ({
  currentAvatarFile = './Wuwa/changli(fixed).vrm',
  onAvatarLoaded,
  isTalking = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vrmRef = useRef<VRM | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const waveActionRef = useRef<boolean>(true); // starts true for initial wave

  // Load VRM Model
  useEffect(() => {
    if (!canvasRef.current) return;

    setLoading(true);
    const canvas = canvasRef.current;
    const width = 340;
    const height = 420;

    // Renderer with 100% transparent alpha channel
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // 100% transparent
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.25, 1.6);
    camera.lookAt(0.0, 1.15, 0.0);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff416c, 2.4);
    dirLight.position.set(1.0, 2.0, 1.0);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-1.0, 1.5, -1.0);
    scene.add(rimLight);

    // GLTF / VRM Loader
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const primaryUrl = getAvatarUrl(currentAvatarFile);
    let isDisposed = false;

    const loadModel = (url: string) => {
      loader.load(
        url,
        (gltf) => {
          if (isDisposed) return;
          const vrm = gltf.userData.vrm as VRM;
          if (!vrm) return;

          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          VRMUtils.rotateVRM0(vrm);

          // Center & Face Camera
          vrm.scene.position.set(0, 0, 0);
          vrm.scene.rotation.y = Math.PI;

          // Frustum culling fix & bounding sphere expansion
          vrm.scene.traverse((obj: any) => {
            obj.frustumCulled = false;
            if (obj.geometry) {
              if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
              if (obj.geometry.boundingSphere) {
                obj.geometry.boundingSphere.radius = 5;
              }
            }
          });

          scene.add(vrm.scene);
          vrmRef.current = vrm;
          setLoading(false);
          onAvatarLoaded?.();

          // Initial wave greeting
          triggerWave();
        },
        undefined,
        (error) => {
          console.warn('Primary VRM CDN load failed, trying local fallback:', error);
          if (url !== currentAvatarFile) {
            loadModel(currentAvatarFile);
          } else {
            setLoading(false);
          }
        }
      );
    };

    loadModel(primaryUrl);

    // Expose global wave trigger
    (window as any).playWaveAnimation = () => {
      triggerWave();
    };

    const triggerWave = () => {
      waveActionRef.current = true;
      setTimeout(() => {
        waveActionRef.current = false;
      }, 4000);
    };

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      if (vrmRef.current) {
        vrmRef.current.update(delta);

        // Procedural Idle Breathing & Natural Posture
        const humanoid = vrmRef.current.humanoid;
        if (humanoid) {
          const spine = humanoid.getNormalizedBoneNode('spine');
          const chest = humanoid.getNormalizedBoneNode('chest');
          const head = humanoid.getNormalizedBoneNode('head');
          const rightArm = humanoid.getNormalizedBoneNode('rightUpperArm');
          const rightForeArm = humanoid.getNormalizedBoneNode('rightLowerArm');

          if (spine) {
            spine.rotation.x = Math.sin(time * 1.5) * 0.02;
          }
          if (chest) {
            chest.rotation.y = Math.sin(time * 0.8) * 0.03;
          }
          if (head) {
            head.rotation.y = Math.sin(time * 0.5) * 0.06;
            head.rotation.x = Math.sin(time * 1.2) * 0.02;
          }

          // Waving Animation Motion
          if (waveActionRef.current && rightArm && rightForeArm) {
            rightArm.rotation.z = -1.25 + Math.sin(time * 8.0) * 0.22;
            rightArm.rotation.x = -0.45;
            rightForeArm.rotation.y = -0.85 + Math.sin(time * 8.0) * 0.32;
          }
        }

        // Procedural Blinking
        const expressionManager = vrmRef.current.expressionManager;
        if (expressionManager) {
          const blinkValue = Math.max(0, Math.sin(time * 0.8) > 0.96 ? 1 : 0);
          expressionManager.setValue('blink', blinkValue);

          // Lipsync when talking
          if (isTalking || (window as any).chatbotTalking) {
            const mouthOpen = Math.abs(Math.sin(time * 9.0)) * 0.75;
            expressionManager.setValue('aa', mouthOpen);
            expressionManager.setValue('ih', Math.abs(Math.cos(time * 9.0)) * 0.35);
          } else {
            expressionManager.setValue('aa', 0);
            expressionManager.setValue('ih', 0);
          }

          expressionManager.update();
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [currentAvatarFile, onAvatarLoaded]);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-28 right-6 z-[2147483647] p-2.5 rounded-full bg-[#180f2c]/90 border border-purple-500/40 text-purple-300 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        title="Restore 3D Avatar"
      >
        <Maximize2 size={16} />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 sm:bottom-28 right-2 sm:right-6 z-[2147483647] pointer-events-none transition-all duration-300 select-none w-[280px] sm:w-[340px] h-[340px] sm:h-[420px] flex items-end justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
      style={{ zIndex: 2147483647 }}
    >
      {/* 100% Transparent 3D Character Canvas */}
      <div className="relative w-full h-full bg-transparent flex items-end justify-center">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-purple-300 pointer-events-none">
            <RefreshCw size={20} className="animate-spin text-[#ff416c]" />
            <span className="text-[10px] font-mono bg-black/75 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Loading VRM Model...
            </span>
          </div>
        )}

        {/* 3D Canvas (Always on Top) */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-auto cursor-grab active:cursor-grabbing bg-transparent"
        />

        {/* Floating Controls */}
        <div className="absolute top-2 right-2 flex items-center gap-1 pointer-events-auto">
          <button
            onClick={() => (window as any).playWaveAnimation?.()}
            className="p-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/25 text-xs shadow-md transition-all active:scale-95"
            title="Wave Greeting"
          >
            👋
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/25 shadow-md transition-all active:scale-95"
            title="Minimize Avatar"
          >
            <Minimize2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

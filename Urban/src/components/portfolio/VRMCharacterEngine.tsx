import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import { Sparkles, RefreshCw, Eye, Maximize2, Minimize2 } from 'lucide-react';

interface VRMCharacterEngineProps {
  currentAvatarFile?: string;
  onAvatarLoaded?: () => void;
  isTalking?: boolean;
}

export const VRMCharacterEngine: React.FC<VRMCharacterEngineProps> = ({
  currentAvatarFile = './Wuwa/changli(fixed).vrm',
  onAvatarLoaded,
  isTalking = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vrmRef = useRef<VRM | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const waveActionRef = useRef<boolean>(false);

  // Load VRM Model
  useEffect(() => {
    if (!canvasRef.current) return;

    setLoading(true);
    const canvas = canvasRef.current;
    const width = 240;
    const height = 300;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.25, 1.6);
    camera.lookAt(0.0, 1.15, 0.0);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    dirLight.position.set(1.0, 2.0, 1.0);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-1.0, 1.5, -1.0);
    scene.add(rimLight);

    // GLTF / VRM Loader
    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const modelPath = currentAvatarFile.startsWith('http') || currentAvatarFile.startsWith('/') || currentAvatarFile.startsWith('./')
      ? currentAvatarFile
      : `./${currentAvatarFile}`;

    let isDisposed = false;

    loader.load(
      modelPath,
      (gltf) => {
        if (isDisposed) return;
        const vrm = gltf.userData.vrm as VRM;
        if (!vrm) return;

        VRMUtils.removeUnnecessaryVertices(gltf.scene);
        VRMUtils.removeUnnecessaryJoints(gltf.scene);
        VRMUtils.rotateVRM0(vrm);

        // Adjust position & rotation
        vrm.scene.position.set(0, 0, 0);
        vrm.scene.rotation.y = Math.PI; // Face camera

        // Make all meshes visible & disable frustum culling
        vrm.scene.traverse((obj) => {
          obj.frustumCulled = false;
        });

        scene.add(vrm.scene);
        vrmRef.current = vrm;
        setLoading(false);
        onAvatarLoaded?.();

        // Trigger welcome wave pose
        triggerWave();
      },
      undefined,
      (error) => {
        console.warn('VRM load fallback:', error);
        setLoading(false);
      }
    );

    // Expose global wave trigger
    (window as any).playWaveAnimation = () => {
      triggerWave();
    };

    const triggerWave = () => {
      waveActionRef.current = true;
      setTimeout(() => {
        waveActionRef.current = false;
      }, 3500);
    };

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      if (vrmRef.current) {
        vrmRef.current.update(delta);

        // Procedural Idle Breathing
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
            rightArm.rotation.z = -1.2 + Math.sin(time * 8.0) * 0.2;
            rightArm.rotation.x = -0.4;
            rightForeArm.rotation.y = -0.8 + Math.sin(time * 8.0) * 0.3;
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

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-24 right-6 z-30 transition-all duration-300 select-none ${
        isMinimized ? 'w-12 h-12 rounded-full overflow-hidden' : 'w-[220px] sm:w-[240px] h-[280px] sm:h-[300px]'
      }`}
    >
      {/* 3D Canvas Container */}
      <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#180f2c]/85 via-[#120a22]/90 to-[#0c0617]/95 border border-purple-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.25)] backdrop-blur-xl overflow-hidden flex items-center justify-center">
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0c0617]/90 z-10 text-purple-300">
            <RefreshCw size={20} className="animate-spin text-purple-400" />
            <span className="text-[10px] font-mono">Calibrating VRM...</span>
          </div>
        )}

        {/* 3D Canvas */}
        <canvas ref={canvasRef} className="w-full h-full object-contain cursor-grab active:cursor-grabbing" />

        {/* Top Floating Controls */}
        <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
          <button
            onClick={() => (window as any).playWaveAnimation?.()}
            className="p-1 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/20 text-[10px]"
            title="Trigger Wave Greeting"
          >
            👋
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded-lg bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/20"
            title={isMinimized ? 'Expand Avatar' : 'Minimize Avatar'}
          >
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
        </div>

        {/* Live Status Pill */}
        <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#150a26]/90 border border-purple-500/25 text-[10px] text-purple-300 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D Resonator</span>
        </div>
      </div>
    </div>
  );
};

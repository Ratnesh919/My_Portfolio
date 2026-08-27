import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import { RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface VRMCharacterEngineProps {
  currentAvatarFile?: string;
  onAvatarLoaded?: () => void;
  isTalking?: boolean;
}

// Maps local VRM paths to the GitHub Releases CDN filenames
function getAvatarUrl(localPath: string): string {
  if (localPath.startsWith('http')) return localPath;
  const RELEASE_BASE = 'https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/';
  const FILE_MAP: Record<string, string> = {
    'changli(fixed).vrm': 'changli.fixed.vrm',
    'Kid changli.vrm': 'Kid.changli.vrm',
    'camellya.vrm': 'camellya.vrm',
    'carlotta.vrm': 'carlotta.vrm',
    'chixia.vrm': 'chixia.vrm',
    'jinshi.vrm': 'jinshi.vrm',
    'pinkshi.vrm': 'pinkshi.vrm',
    'roccia.vrm': 'roccia.vrm',
    'rover.vrm': 'rover.vrm',
    'sanhua.vrm': 'sanhua.vrm',
    'shorekeeper.vrm': 'shorekeeper.vrm',
    'verina.vrm': 'verina.vrm',
    'yangyang.vrm': 'yangyang.vrm',
    'yinlin.vrm': 'yinlin.vrm',
  };
  let filename = localPath.substring(localPath.lastIndexOf('/') + 1);
  const mapped = FILE_MAP[filename] || filename;
  return RELEASE_BASE + mapped;
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
  const waveActionRef = useRef<boolean>(true);

  // Drag state
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 460 });
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, startPosX: 0, startPosY: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const drag = dragRef.current;
    drag.isDragging = true;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.startPosX = position.x;
    drag.startPosY = position.y;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.isDragging) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 300, drag.startPosX + dx)),
      y: Math.max(0, Math.min(window.innerHeight - 100, drag.startPosY + dy)),
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current.isDragging = false;
  }, []);

  // Load VRM Model
  useEffect(() => {
    if (!canvasRef.current) return;
    setLoading(true);
    const canvas = canvasRef.current;
    const width = 320;
    const height = 400;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.25, 1.6);
    camera.lookAt(0.0, 1.15, 0.0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xff416c, 2.4);
    dirLight.position.set(1.0, 2.0, 1.0);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimLight.position.set(-1.0, 1.5, -1.0);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const primaryUrl = getAvatarUrl(currentAvatarFile);
    let isDisposed = false;

    const loadModel = (url: string, isFallback = false) => {
      console.log(`[VRM] Loading from: ${url}`);
      loader.load(
        url,
        (gltf) => {
          if (isDisposed) return;
          const vrm = gltf.userData.vrm as VRM;
          if (!vrm) { setLoading(false); return; }

          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          VRMUtils.rotateVRM0(vrm);

          vrm.scene.position.set(0, 0, 0);
          vrm.scene.rotation.y = Math.PI;
          vrm.scene.traverse((obj: any) => {
            obj.frustumCulled = false;
            if (obj.geometry) {
              if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
              if (obj.geometry.boundingSphere) obj.geometry.boundingSphere.radius = 5;
            }
          });

          scene.add(vrm.scene);
          vrmRef.current = vrm;
          setLoading(false);
          onAvatarLoaded?.();
          triggerWave();
          console.log('[VRM] Model loaded successfully!');
        },
        (progress) => {
          if (progress.total > 0) {
            console.log(`[VRM] Loading: ${Math.round((progress.loaded / progress.total) * 100)}%`);
          }
        },
        (error) => {
          console.warn(`[VRM] Failed to load from ${url}:`, error);
          if (!isFallback) {
            console.log('[VRM] Trying local fallback path...');
            loadModel(currentAvatarFile, true);
          } else {
            console.error('[VRM] All load attempts failed.');
            setLoading(false);
          }
        }
      );
    };

    loadModel(primaryUrl);

    (window as any).playWaveAnimation = () => triggerWave();

    const triggerWave = () => {
      waveActionRef.current = true;
      setTimeout(() => { waveActionRef.current = false; }, 4000);
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      if (vrmRef.current) {
        vrmRef.current.update(delta);
        const humanoid = vrmRef.current.humanoid;
        if (humanoid) {
          const spine = humanoid.getNormalizedBoneNode('spine');
          const chest = humanoid.getNormalizedBoneNode('chest');
          const head = humanoid.getNormalizedBoneNode('head');
          const rightArm = humanoid.getNormalizedBoneNode('rightUpperArm');
          const rightForeArm = humanoid.getNormalizedBoneNode('rightLowerArm');

          if (spine) spine.rotation.x = Math.sin(time * 1.5) * 0.02;
          if (chest) chest.rotation.y = Math.sin(time * 0.8) * 0.03;
          if (head) {
            head.rotation.y = Math.sin(time * 0.5) * 0.06;
            head.rotation.x = Math.sin(time * 1.2) * 0.02;
          }
          if (waveActionRef.current && rightArm && rightForeArm) {
            rightArm.rotation.z = -1.25 + Math.sin(time * 8.0) * 0.22;
            rightArm.rotation.x = -0.45;
            rightForeArm.rotation.y = -0.85 + Math.sin(time * 8.0) * 0.32;
          }
        }

        const expressionManager = vrmRef.current.expressionManager;
        if (expressionManager) {
          expressionManager.setValue('blink', Math.sin(time * 0.8) > 0.96 ? 1 : 0);
          if (isTalking || (window as any).chatbotTalking) {
            expressionManager.setValue('aa', Math.abs(Math.sin(time * 9.0)) * 0.75);
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

    return () => { isDisposed = true; cancelAnimationFrame(animationFrameId); renderer.dispose(); };
  }, [currentAvatarFile, onAvatarLoaded]);

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-28 left-6 p-2.5 rounded-full bg-[#180f2c]/90 border border-purple-500/40 text-purple-300 hover:text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        style={{ zIndex: 2147483647 }}
        title="Restore 3D Avatar"
      >
        <Maximize2 size={16} />
      </button>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed pointer-events-auto select-none w-[280px] sm:w-[320px] h-[340px] sm:h-[400px] flex items-end justify-center drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing transition-none"
      style={{ left: position.x, top: position.y, zIndex: 2147483647 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="relative w-full h-full bg-transparent flex items-end justify-center">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-purple-300 pointer-events-none">
            <RefreshCw size={20} className="animate-spin text-[#ff416c]" />
            <span className="text-[10px] font-mono bg-black/75 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Loading VRM Model...
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain bg-transparent"
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 pointer-events-auto">
          <button
            onClick={(e) => { e.stopPropagation(); (window as any).playWaveAnimation?.(); }}
            className="p-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/25 text-xs shadow-md transition-all active:scale-95"
            title="Wave Greeting"
          >
            👋
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
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

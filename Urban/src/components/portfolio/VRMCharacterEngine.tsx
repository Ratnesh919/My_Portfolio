import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { VRMLoaderPlugin, VRM, VRMUtils } from '@pixiv/three-vrm';
import { RefreshCw } from 'lucide-react';

interface VRMCharacterEngineProps {
  currentAvatarFile?: string;
  onAvatarLoaded?: () => void;
  isTalking?: boolean;
}

// Mixamo rig to VRM humanoid bone mapping
const mixamoVRMRigMap: Record<string, string> = {
  mixamorigHips: 'hips',
  mixamorigSpine: 'spine',
  mixamorigSpine1: 'chest',
  mixamorigSpine2: 'upperChest',
  mixamorigNeck: 'neck',
  mixamorigHead: 'head',
  mixamorigLeftShoulder: 'leftShoulder',
  mixamorigLeftArm: 'leftUpperArm',
  mixamorigLeftForeArm: 'leftLowerArm',
  mixamorigLeftHand: 'leftHand',
  mixamorigRightShoulder: 'rightShoulder',
  mixamorigRightArm: 'rightUpperArm',
  mixamorigRightForeArm: 'rightLowerArm',
  mixamorigRightHand: 'rightHand',
  mixamorigLeftUpLeg: 'leftUpperLeg',
  mixamorigLeftLeg: 'leftLowerLeg',
  mixamorigLeftFoot: 'leftFoot',
  mixamorigLeftToeBase: 'leftToes',
  mixamorigRightUpLeg: 'rightUpperLeg',
  mixamorigRightLeg: 'rightLowerLeg',
  mixamorigRightFoot: 'rightFoot',
  mixamorigRightToeBase: 'rightToes',
};

// Retarget Mixamo FBX animation clip to VRM
function retargetMixamoToVRM(asset: THREE.Group, vrm: VRM, fileUrl: string = ''): THREE.AnimationClip | null {
  const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com') || asset.animations[0];
  if (!clip) return null;

  const tracks: THREE.KeyframeTrack[] = [];
  const rRI = new THREE.Quaternion();
  const pRWR = new THREE.Quaternion();
  const _qA = new THREE.Quaternion();

  const hipsNode = asset.getObjectByName('mixamorigHips') || asset.getObjectByName('Hips') || asset.getObjectByName('hips');
  const hMotion = hipsNode ? hipsNode.position.y : 100;
  const hVRM = (vrm.humanoid as any)?.normalizedRestPose?.hips?.position?.[1] || 1.0;
  const hScale = hVRM / (hMotion || 100);

  clip.tracks.forEach((track) => {
    const parts = track.name.split('.');
    let boneName = parts[0];
    if (boneName.includes(':')) boneName = boneName.split(':').pop()!;
    if (boneName.includes('|')) boneName = boneName.split('|')[0]!;
    let rigName = boneName;
    if (!mixamoVRMRigMap[rigName] && !rigName.startsWith('mixamorig')) {
      rigName = 'mixamorig' + rigName.charAt(0).toUpperCase() + rigName.slice(1);
    }

    const vrmBone = mixamoVRMRigMap[rigName];
    const vrmNode = vrm.humanoid?.getNormalizedBoneNode(vrmBone as any)?.name;
    const rigNode = asset.getObjectByName(boneName) || asset.getObjectByName(parts[0]);

    if (vrmNode != null && rigNode != null && rigNode.parent != null) {
      const prop = parts[1];
      rigNode.getWorldQuaternion(rRI).invert();
      rigNode.parent.getWorldQuaternion(pRWR);

      if (track instanceof THREE.QuaternionKeyframeTrack) {
        const values = track.values.slice();
        for (let i = 0; i < values.length; i += 4) {
          const fq = values.slice(i, i + 4);
          _qA.fromArray(fq).premultiply(pRWR).multiply(rRI);
          _qA.toArray(fq);
          for (let j = 0; j < 4; j++) {
            values[i + j] = fq[j];
          }
        }
        tracks.push(
          new THREE.QuaternionKeyframeTrack(
            `${vrmNode}.${prop}`,
            track.times,
            values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v))
          )
        );
      } else if (track instanceof THREE.VectorKeyframeTrack) {
        tracks.push(
          new THREE.VectorKeyframeTrack(
            `${vrmNode}.${prop}`,
            track.times,
            track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hScale)
          )
        );
      }
    }
  });

  if (tracks.length === 0) return null;
  return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// Fallback natural arm pose when animation is loading
function poseRestingArms(vrm: VRM) {
  const humanoid = vrm.humanoid;
  if (!humanoid) return;
  const leftUpperArm = humanoid.getNormalizedBoneNode('leftUpperArm');
  const rightUpperArm = humanoid.getNormalizedBoneNode('rightUpperArm');
  const leftLowerArm = humanoid.getNormalizedBoneNode('leftLowerArm');
  const rightLowerArm = humanoid.getNormalizedBoneNode('rightLowerArm');
  if (leftUpperArm) leftUpperArm.rotation.set(0.05, 0, 1.25);
  if (rightUpperArm) rightUpperArm.rotation.set(0.05, 0, -1.25);
  if (leftLowerArm) leftLowerArm.rotation.set(0, 0, 0.2);
  if (rightLowerArm) rightLowerArm.rotation.set(0, 0, -0.2);
}

// Maps local VRM paths to candidate fetch URLs
function getAvatarCandidateUrls(localPath: string): string[] {
  if (localPath.startsWith('http')) return [localPath];
  const RELEASE_BASE = 'https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/';
  const FILE_MAP: Record<string, string> = {
    'changli(fixed).vrm': 'changli.fixed.vrm',
    'Kid changli.vrm': 'Kid.changli.vrm',
    'CamellyaV1.vrm': 'CamellyaV1.vrm',
    'camellya.vrm': 'CamellyaV1.vrm',
    'CarlottaV1.vrm': 'CarlottaV1.vrm',
    'carlotta.vrm': 'CarlottaV1.vrm',
    'chixia.vrm': 'chixia.vrm',
    'jinshi.vrm': 'jinshi.vrm',
    'PinkshiV1.vrm': 'PinkshiV1.vrm',
    'pinkshi.vrm': 'PinkshiV1.vrm',
    'RocciaV3.vrm': 'RocciaV3.vrm',
    'roccia.vrm': 'RocciaV3.vrm',
    'rover.vrm': 'rover.vrm',
    'SanhuaV2.vrm': 'SanhuaV2.vrm',
    'sanhua.vrm': 'SanhuaV2.vrm',
    'ShorekeeperV3.vrm': 'ShorekeeperV3.vrm',
    'shorekeeper.vrm': 'ShorekeeperV3.vrm',
    'verina.vrm': 'verina.vrm',
    'yangyang.vrm': 'yangyang.vrm',
    'yinlin.vrm': 'yinlin.vrm',
  };
  const filename = localPath.substring(localPath.lastIndexOf('/') + 1);
  const mapped = FILE_MAP[filename] || filename;

  return [
    `/api/avatar-proxy?file=${encodeURIComponent(filename)}`,
    `${RELEASE_BASE}${mapped}`,
    localPath.startsWith('.') || localPath.startsWith('/') ? localPath : `./Wuwa/${filename}`
  ];
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
  const idleActionRef = useRef<THREE.AnimationAction | null>(null);
  const waveActionRef = useRef<THREE.AnimationAction | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const [loading, setLoading] = useState(true);
  const mouseNorm = useRef({ x: 0, y: 0 });

  // Drag state
  const [position, setPosition] = useState({ x: 20, y: window.innerHeight - 440 });
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

  // Track cursor position for head tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseNorm.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Load VRM Model & FBX Animations
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 20.0);
    camera.position.set(0.0, 1.25, 2.2);
    camera.lookAt(0.0, 1.05, 0.0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xfff0f8, 2.2);
    dirLight.position.set(1.0, 2.0, 1.5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-1.5, 1.5, -1.0);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0xa855f7, 1.2);
    fillLight.position.set(0, -1.0, 2.0);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));

    const fbxLoader = new FBXLoader();
    const candidateUrls = getAvatarCandidateUrls(currentAvatarFile);
    let isDisposed = false;

    const triggerWave = () => {
      if (waveActionRef.current && idleActionRef.current) {
        waveActionRef.current.reset();
        idleActionRef.current.crossFadeTo(waveActionRef.current, 0.35, false);
        waveActionRef.current.play();

        const duration = (waveActionRef.current.getClip().duration || 3.5) * 1000;
        setTimeout(() => {
          if (idleActionRef.current && waveActionRef.current) {
            waveActionRef.current.crossFadeTo(idleActionRef.current, 0.35, false);
            idleActionRef.current.play();
          }
        }, Math.max(2500, duration - 400));
      }
    };

    (window as any).playWaveAnimation = triggerWave;

    const loadAnimations = (vrm: VRM) => {
      const mixer = new THREE.AnimationMixer(vrm.scene);
      mixerRef.current = mixer;

      // Apply initial resting pose so she never stays in T-pose
      poseRestingArms(vrm);

      const animBase = '/Model Animation/';

      // Load Idle animation
      fbxLoader.load(
        `${animBase}Idle.fbx`,
        (fbx) => {
          if (isDisposed) return;
          const idleClip = retargetMixamoToVRM(fbx, vrm, 'Idle.fbx');
          if (idleClip) {
            const idleAction = mixer.clipAction(idleClip);
            idleAction.play();
            idleActionRef.current = idleAction;
            console.log('[VRM Animation] Loaded Idle.fbx successfully');
          }
        },
        undefined,
        (err) => {
          console.warn('[VRM Animation] Idle.fbx load failed, using procedural resting pose:', err);
          poseRestingArms(vrm);
        }
      );

      // Load Waving animation
      fbxLoader.load(
        `${animBase}Waving1.fbx`,
        (fbx) => {
          if (isDisposed) return;
          const waveClip = retargetMixamoToVRM(fbx, vrm, 'Waving1.fbx');
          if (waveClip) {
            const waveAction = mixer.clipAction(waveClip);
            waveAction.loop = THREE.LoopOnce;
            waveAction.clampWhenFinished = true;
            waveActionRef.current = waveAction;
            console.log('[VRM Animation] Loaded Waving1.fbx successfully');
            triggerWave();
          }
        },
        undefined,
        (err) => console.warn('[VRM Animation] Waving1.fbx load failed:', err)
      );
    };

    const tryLoadCandidate = (index: number) => {
      if (index >= candidateUrls.length) {
        console.error('[VRM] All candidate URLs failed to load avatar.');
        setLoading(false);
        return;
      }
      const url = candidateUrls[index];
      console.log(`[VRM] Trying candidate [${index + 1}/${candidateUrls.length}]: ${url}`);

      loader.load(
        url,
        (gltf) => {
          if (isDisposed) return;
          const vrm = gltf.userData.vrm as VRM;
          if (!vrm) {
            tryLoadCandidate(index + 1);
            return;
          }

          VRMUtils.removeUnnecessaryVertices(gltf.scene);
          VRMUtils.removeUnnecessaryJoints(gltf.scene);
          if (VRMUtils.rotateVRM0) {
            VRMUtils.rotateVRM0(vrm);
          }

          vrm.scene.position.set(0, -0.35, 0);
          vrm.scene.scale.setScalar(1.0);
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

          // Load and bind FBX animations
          loadAnimations(vrm);

          console.log(`[VRM] Model loaded successfully from candidate ${index + 1}!`);
        },
        (progress) => {
          if (progress.total > 0) {
            console.log(`[VRM] Loading: ${Math.round((progress.loaded / progress.total) * 100)}%`);
          }
        },
        (error) => {
          console.warn(`[VRM] Candidate ${index + 1} (${url}) failed:`, error);
          tryLoadCandidate(index + 1);
        }
      );
    };

    tryLoadCandidate(0);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      // Update animation mixer for real FBX motions
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (vrmRef.current) {
        vrmRef.current.update(delta);
        const humanoid = vrmRef.current.humanoid;
        if (humanoid) {
          // Smooth cursor head-tracking
          const head = humanoid.getNormalizedBoneNode('head');
          const neck = humanoid.getNormalizedBoneNode('neck');
          if (head) {
            head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouseNorm.current.x * 0.3, 0.05);
            head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouseNorm.current.y * 0.2, 0.05);
          }
          if (neck) {
            neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, mouseNorm.current.x * 0.15, 0.05);
          }

          // Gentle breathing spine oscillation if no idle clip
          if (!idleActionRef.current) {
            const spine = humanoid.getNormalizedBoneNode('spine');
            if (spine) spine.rotation.x = Math.sin(time * 1.5) * 0.02;
          }
        }

        // Facial Expressions: Blinking & Lip Sync
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

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [currentAvatarFile, onAvatarLoaded]);

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
              Loading 3D Model...
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain bg-transparent"
        />
      </div>
    </div>
  );
};

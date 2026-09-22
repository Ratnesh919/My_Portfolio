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
  const vrmRef = useRef<VRM | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const idleActionRef = useRef<THREE.AnimationAction | null>(null);
  const waveActionRef = useRef<THREE.AnimationAction | null>(null);
  const clockRef = useRef(new THREE.Clock());
  const mouseNorm = useRef({ x: 0, y: 0 });

  // Full-body setup matching old multi-theme portfolio (js/vrm-character.js)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.1, 60.0);
    camera.position.set(0, 0.9, 7.5);

    // Multi-Point Studio Lighting (from js/vrm-character.js)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLights = [
      [2, 4, 3, 0xfff0f8, 1.2],
      [-3, 2, -2, 0x8899ff, 0.6],
      [0, -1, 4, 0xffddcc, 0.3],
      [5, 2, 0, 0xffffff, 0.5],
      [-5, 2, 0, 0xffffff, 0.5],
    ];
    dirLights.forEach(([x, y, z, color, intensity]) => {
      const light = new THREE.DirectionalLight(color as number, intensity as number);
      light.position.set(x as number, y as number, z as number);
      scene.add(light);
    });

    const getVisibleWidth = () => {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
      return height * camera.aspect;
    };

    const updateCharPos = () => {
      if (!vrmRef.current) return;
      const width = getVisibleWidth();
      let xTarget = -(width / 2) + 0.85;
      if (window.innerWidth <= 768) {
        xTarget = 0; // Center on mobile screens
      }
      vrmRef.current.scene.position.x = xTarget;
      vrmRef.current.scene.position.y = -0.97;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateCharPos();
    };
    window.addEventListener('resize', handleResize);

    const loader = new GLTFLoader();
    loader.register((parser) => new VRMLoaderPlugin(parser));
    const fbxLoader = new FBXLoader();
    let pendingWave = false;

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
        pendingWave = false;
      } else {
        // Queue wave so it executes the exact moment Waving1.fbx finishes loading
        pendingWave = true;
      }
    };

    (window as any).playWaveAnimation = triggerWave;

    const loadAnimations = (vrm: VRM) => {
      const mixer = new THREE.AnimationMixer(vrm.scene);
      mixerRef.current = mixer;

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
            if (pendingWave || (window as any)._pendingIntroWave) {
              (window as any)._pendingIntroWave = false;
              triggerWave();
            }
          }
        },
        undefined,
        (err) => console.warn('[VRM Animation] Waving1.fbx load failed:', err)
      );
    };

    const tryLoadCandidate = (index: number) => {
      if (index >= candidateUrls.length) {
        console.error('[VRM] All candidate URLs failed to load avatar.');
        return;
      }
      const url = candidateUrls[index];
      console.log(`[VRM] Preloading avatar in background [${index + 1}/${candidateUrls.length}]: ${url}`);

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

          // Enhance textures to ultra crisp 16x anisotropy and linear filtering
          vrm.scene.traverse((obj: any) => {
            obj.frustumCulled = false;
            if (obj.geometry) {
              if (!obj.geometry.boundingSphere) obj.geometry.computeBoundingSphere();
              if (obj.geometry.boundingSphere) obj.geometry.boundingSphere.radius = 5;
            }
            if (obj.isMesh && obj.material) {
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((mat: any) => {
                mat.depthWrite = true;
                if (mat.map) {
                  mat.map.anisotropy = 16;
                  mat.map.generateMipmaps = true;
                  mat.map.minFilter = THREE.LinearMipmapLinearFilter;
                  mat.map.magFilter = THREE.LinearFilter;
                  mat.map.needsUpdate = true;
                }
              });
            }
          });

          vrmRef.current = vrm;
          updateCharPos();
          scene.add(vrm.scene);
          onAvatarLoaded?.();

          loadAnimations(vrm);
          console.log(`[VRM] Full-body high-fidelity avatar preloaded successfully!`);
        },
        (progress) => {
          if (progress.total > 0) {
            console.log(`[VRM] Preloading background: ${Math.round((progress.loaded / progress.total) * 100)}%`);
          }
        },
        (error) => {
          console.warn(`[VRM] Candidate ${index + 1} (${url}) failed:`, error);
          tryLoadCandidate(index + 1);
        }
      );
    };

    tryLoadCandidate(0);

    // Track Cursor & Interactive Pointer Dragging in 3D
    const raycaster = new THREE.Raycaster();
    const mouse2d = new THREE.Vector2();
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectionPoint = new THREE.Vector3();
    const dragOffset = new THREE.Vector3();
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      if (!vrmRef.current) return;
      mouse2d.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse2d, camera);

      const intersects = raycaster.intersectObject(vrmRef.current.scene, true);
      if (intersects.length > 0) {
        isDragging = true;
        dragPlane.set(new THREE.Vector3(0, 0, 1), -vrmRef.current.scene.position.z);
        if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
          dragOffset.copy(intersectionPoint).sub(vrmRef.current.scene.position);
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseNorm.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseNorm.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;

      if (isDragging && vrmRef.current) {
        mouse2d.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse2d, camera);
        if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
          vrmRef.current.scene.position.copy(intersectionPoint.sub(dragOffset));
        }
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      const time = clockRef.current.getElapsedTime();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      if (vrmRef.current) {
        vrmRef.current.update(delta);

        // Update spring bone physics for hair, ribbons, and dress
        if (vrmRef.current.springBoneManager) {
          vrmRef.current.springBoneManager.update(delta);
        }

        const humanoid = vrmRef.current.humanoid;
        if (humanoid) {
          const head = humanoid.getNormalizedBoneNode('head');
          const neck = humanoid.getNormalizedBoneNode('neck');
          if (head) {
            head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, mouseNorm.current.x * 0.35, 0.05);
            head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, -mouseNorm.current.y * 0.25, 0.05);
          }
          if (neck) {
            neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, mouseNorm.current.x * 0.15, 0.05);
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

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
    };
  }, [currentAvatarFile, onAvatarLoaded]);

  return (
    <canvas
      ref={canvasRef}
      id="vrm-canvas"
      className="fixed inset-0 pointer-events-auto w-screen h-screen z-[2147483645]"
      style={{ touchAction: 'none' }}
    />
  );
};

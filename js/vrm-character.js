/**
 * VRM Character Controller — Left Side, Auto-Cycle + Click to Change
 * ─────────────────────────────────────────────────────────────────────────────
 * Flow:
 *   1. Load → Idle plays immediately
 *   2. After 1s → Wave1 (hello)
 *   3. After Wave1 → random animations auto-cycle every 5–15s
 *   4. Click character → immediately play next random animation
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader }  from 'three/addons/loaders/FBXLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';

// ─── DEVICE DETECTION ────────────────────────────────────────────────────────
const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

// ─── BONE MAP ────────────────────────────────────────────────────────────────
const mixamoVRMRigMap = {
    // Core spine chain
    mixamorigHips:'hips',         mixamorigSpine:'spine',         mixamorigSpine1:'chest',
    mixamorigSpine2:'upperChest', mixamorigNeck:'neck',           mixamorigHead:'head',
    // Shoulders & arms
    mixamorigLeftShoulder:'leftShoulder',    mixamorigLeftArm:'leftUpperArm',
    mixamorigLeftForeArm:'leftLowerArm',     mixamorigLeftHand:'leftHand',
    mixamorigRightShoulder:'rightShoulder',  mixamorigRightArm:'rightUpperArm',
    mixamorigRightForeArm:'rightLowerArm',   mixamorigRightHand:'rightHand',
    // Legs & feet
    mixamorigLeftUpLeg:'leftUpperLeg',       mixamorigLeftLeg:'leftLowerLeg',
    mixamorigLeftFoot:'leftFoot',            mixamorigLeftToeBase:'leftToes',
    mixamorigRightUpLeg:'rightUpperLeg',     mixamorigRightLeg:'rightLowerLeg',
    mixamorigRightFoot:'rightFoot',          mixamorigRightToeBase:'rightToes',
    // Left hand fingers
    // (Removed finger mappings to force full control over fingers via custom FINGER_POSES)
    // Right hand fingers
    // (Removed finger mappings to force full control over fingers via custom FINGER_POSES)
    // Face / jaw (VRM 1.0 uses these names)
    mixamorigJaw:'jaw',
    mixamorigLeftEye:'leftEye',
    mixamorigRightEye:'rightEye',
};

// ─── ANIMATION PATHS ──────────────────────────────────────────────────────────
const PFX = './Model%20Animation/';
const ANIM = {
    idle:      PFX + 'Idle.fbx',
    happyIdle: PFX + 'Happy%20Idle.fbx',
    wave1:     PFX + 'Waving1.fbx',
    wave2:     PFX + 'Waving2.fbx',
    happy:     PFX + 'Happy.fbx',
    excited:   PFX + 'Excited.fbx',
    yawn:      PFX + 'Yawn.fbx',
    angry:     PFX + 'Angry.fbx',
    walk:      PFX + 'Walking.fbx',
    sad1:      PFX + 'Sad%20Idle1.fbx',
    sad2:      PFX + 'Sad%20Idle2.fbx',
    sitTalk:   PFX + 'Sitting%20Talking.fbx',
    sit1:      PFX + 'Sitting1.fbx',
    sit2:      PFX + 'Sitting2.fbx',
    sitRub:    PFX + 'Sitting%20Rubbing%20Arm.fbx',
    no:        PFX + 'No.fbx',
    reaching:  PFX + 'ImageToStl.com_changli(fixed).vrm@Reaching%20Out.fbx'
};

// Walk is loaded separately so it doesn't block main animation loading
const ALL_ANIM_FILES = Object.values(ANIM).filter(f => f !== ANIM.walk);

// Split animations: ONLY load idle and wave1 initially to keep startup instant and eliminate lag!
const ESSENTIAL_ANIMS = [ANIM.idle, ANIM.wave1];

// ─── AUTO-CYCLE POOLS ────────────────────────────────────────────────────────
// maxDuration: null = play full clip, number = max seconds before returning to idle
const ANIM_POOL = [
    { key: 'happy',       loop: false, maxDuration: null, fingerPose: 'happy',       expr: 'happy',     exprVal: 0.85 },
    { key: 'excited',     loop: false, maxDuration: null, fingerPose: 'excited',     expr: 'surprised', exprVal: 0.90 },
    { key: 'yawn',        loop: false, maxDuration: null, fingerPose: 'yawn',        expr: 'yawn',      exprVal: 0.85 },
    { key: 'angry',       loop: false, maxDuration: null, fingerPose: 'angry',       expr: 'angry',     exprVal: 0.90 },
    { key: 'sad1',        loop: true,  maxDuration: 8,    fingerPose: 'sad',         expr: 'sad',       exprVal: 0.85 },
    { key: 'sad2',        loop: true,  maxDuration: 8,    fingerPose: 'sad',         expr: 'sad',       exprVal: 0.85 }
];

const SITTING_POOL = [
    { key: 'sit1',     loop: true,  maxDuration: 10, fingerPose: 'happyIdle', expr: 'happy',   exprVal: 0.60 },
    { key: 'sit2',     loop: true,  maxDuration: 10, fingerPose: 'happyIdle', expr: 'relaxed', exprVal: 0.55 },
];

// (No extra breathing set needed — sitRub already has its own body motion)
const SITTING_BREATHE_KEYS = new Set();

// ─── FINGER POSES (per animation) ─────────────────────────────────────────────
const FINGER_POSES = {
    idle:        { proximal:0.38, intermediate:0.48, distal:0.28, spread:0.04,  thumbCurl:0.28, thumbSpread:0.18, indexMult: 1.0 },
    happyIdle:   { proximal:0.28, intermediate:0.36, distal:0.20, spread:0.06,  thumbCurl:0.22, thumbSpread:0.20, indexMult: 1.0 },
    wave:        { proximal:0.10, intermediate:0.14, distal:0.08, spread:-0.02, thumbCurl:0.10, thumbSpread:0.12, indexMult: 1.0 },
    happy:       { proximal:0.22, intermediate:0.28, distal:0.15, spread:0.08,  thumbCurl:0.18, thumbSpread:0.22, indexMult: 1.0 },
    excited:     { proximal:0.12, intermediate:0.16, distal:0.08, spread:0.12,  thumbCurl:0.08, thumbSpread:0.28, indexMult: 1.0 },
    angry:       { proximal:0.52, intermediate:0.62, distal:0.42, spread:-0.06, thumbCurl:0.38, thumbSpread:0.08, indexMult: 1.0 },
    yawn:        { proximal:0.42, intermediate:0.52, distal:0.36, spread:0.02,  thumbCurl:0.30, thumbSpread:0.14, indexMult: 1.0 },
    sad:         { proximal:0.50, intermediate:0.60, distal:0.40, spread:0.02,  thumbCurl:0.35, thumbSpread:0.05, indexMult: 1.0 },
    pointing:    { proximal:0.88, intermediate:1.02, distal:0.85, spread:-0.06, thumbCurl:0.85, thumbSpread:-0.10, indexMult: 0.04,
                   leftPose: 'idle' },          // right index fully extended, thumb & all others tightly closed
    no:          { proximal:0.95, intermediate:1.10, distal:0.95, spread:-0.06, thumbCurl:1.05, thumbSpread:0.35, indexMult: 0.05,
                   leftPose: 'idle' },          // thumb curled inwards to touch middle finger tip
};

// Finger bone chains (left) — mirrored for right inside applyFingerPose()
const FINGER_CHAINS_L = [
    ['leftIndexProximal',  'leftIndexIntermediate',  'leftIndexDistal' ],
    ['leftMiddleProximal', 'leftMiddleIntermediate', 'leftMiddleDistal'],
    ['leftRingProximal',   'leftRingIntermediate',   'leftRingDistal'  ],
    ['leftLittleProximal', 'leftLittleIntermediate', 'leftLittleDistal'],
];
const THUMB_L         = ['leftThumbMetacarpal', 'leftThumbProximal', 'leftThumbDistal'];
const FINGER_CHAINS_R = FINGER_CHAINS_L.map(c => c.map(n => n.replace('left','right')));
const THUMB_R         = THUMB_L.map(n => n.replace('left','right'));
const FINGER_PHASES   = [0.0, 0.55, 1.1, 1.65];
const BREATHE_AMP     = 0.045;   // slightly more curl movement per breathe cycle
const BREATHE_FREQ    = 0.85;
const RIPPLE_AMP      = 0.018;   // micro-ripple across finger chain joints
const RIPPLE_FREQ     = 1.60;   // faster secondary ripple for lively feel

// ─── CHARACTER POSITION (LEFT side, feet at page bottom) ──────────────────────
// Camera at (0, 0.9, 7.5), FOV=28°
// Visible world height at z=0: 2 * tan(14°) * 7.5 ≈ 3.74 → bottom edge at y = 0.9 - 1.87 ≈ -0.97
// Avatar is ~1.65 world units tall at scale 0.95, so feet at root → place root at -0.97
// Use -0.97 to plant feet exactly at bottom edge, scale 0.95
const CHAR_POS = new THREE.Vector3(-3.2, -0.97, 0);
// Removed CHAR_ROT, we dynamically look at camera now

// ─── AVATAR FILE SIZES IN BYTES FOR ACCURATE PROGRESS ──────────────────────────
const AVATAR_SIZES = {
    './Wuwa/changli(fixed).vrm': 31422968,
    './Wuwa/CamellyaV1.vrm': 39573340,
    './Wuwa/CarlottaV1.vrm': 40383072,
    './Wuwa/chixia.vrm': 23768488,
    './Wuwa/jinshi.vrm': 19281344,
    './Wuwa/Kid changli.vrm': 11833580,
    './Wuwa/PinkshiV1.vrm': 44240136,
    './Wuwa/RocciaV3.vrm': 94406600,
    './Wuwa/rover.vrm': 32315592,
    './Wuwa/SanhuaV2.vrm': 30099208,
    './Wuwa/ShorekeeperV3.vrm': 128085348,
    './Wuwa/verina.vrm': 21222868,
    './Wuwa/yangyang.vrm': 28400012,
    './Wuwa/yinlin.vrm': 41901060
};

// ─── THREE.JS SETUP ───────────────────────────────────────────────────────────
const canvas   = document.getElementById('vrm-canvas');
// isMobile is defined at the top

const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: true,  // enabled always (2x antialiasing requested on mobile, and desktop)
    powerPreference: 'high-performance' 
});
// Set pixel ratio: cap at 1.25 for crisp graphics with zero laptop lag / thermal throttling
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(28, window.innerWidth/window.innerHeight, 0.1, 60);
camera.position.set(0, 0.9, 7.5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
ambientLight.userData.baseIntensity = 0.8;
scene.add(ambientLight);

const dirLights = [];
[[2,4,3,0xfff0f8,1.2],[-3,2,-2,0x8899ff,0.6],[0,-1,4,0xffddcc,0.3],[5,2,0,0xffffff,0.5],[-5,2,0,0xffffff,0.5]]
    .forEach(([x,y,z,c,i]) => { 
        const l = new THREE.DirectionalLight(c,i); 
        l.position.set(x,y,z); 
        l.userData.baseIntensity = i;
        scene.add(l); 
        dirLights.push(l);
    });

function getVisibleWidth() {
    const vFOV = THREE.MathUtils.degToRad(camera.fov);
    const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
    return height * camera.aspect;
}

function updateCharPos() {
    if (hasDragged || !vrm) return;
    const width = getVisibleWidth();
    // Position cleanly on the left side of the portfolio
    if (window.innerWidth >= 1024) {
        let xTarget = -(width / 2) + 0.95;
        vrm.scene.position.x = xTarget;
    } else {
        let xTarget = 0;
        vrm.scene.position.x = xTarget;
    }
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCharPos();
});

const cursor = { nx:0, ny:0 };
window.addEventListener('mousemove', e => {
    cursor.nx =  (e.clientX/window.innerWidth  - 0.5)*2;
    cursor.ny = -(e.clientY/window.innerHeight - 0.5)*2;
});

// Forward pointer events from iframe
window.addEventListener('message', e => {
    if (!e.data || typeof e.data.type !== 'string') return;
    if (e.data.type.startsWith('vrm-pointer')) {
        const evt = new PointerEvent(e.data.type.replace('vrm-', ''), {
            clientX: e.data.clientX,
            clientY: e.data.clientY,
            button: e.data.button !== undefined ? e.data.button : 0,
            bubbles: true,
            cancelable: true,
            view: window
        });
        // pointermove/down are on document, pointerup is on window
        if (e.data.type === 'vrm-pointerup') {
            window.dispatchEvent(evt);
        } else {
            document.dispatchEvent(evt);
        }
    }
});

// ─── STATE ────────────────────────────────────────────────────────────────────
let vrm           = null;
let mixer         = null;
const clips       = {};
const actions     = {};
let currentAction = null;
let currentKey    = '';
let renderFramesAfterSwitch = -1;

// Expression
let expr       = 'happy';
let exprTarget = 0.6;
let exprSmooth = 0;

// Smile-squint micro-expression (only fires on idle & sit2/sitRub)
let smileIntensity     = 0;   // actual current value (smoothed)
let smileTarget        = 0;   // what we're animating toward
let smileSquintSmooth  = 0;   // eye squint amount
let smileTimerId       = null;

// Finger pose blend
let fingerPoseCurrent = { ...FINGER_POSES.idle };
let fingerPoseTarget  = { ...FINGER_POSES.idle };

// Auto-cycle timer (seconds)
let autoCooldown    = 0;          // counts down to 0, then triggers next anim
let autoTimerId     = null;       // clearTimeout handle for looping-anim max-duration
let lastPoolIndex   = -1;         // avoid same animation twice in a row
let introComplete   = false;      // wave intro done?

// Head tracking / Drag
let sHX=0, sHY=0, sNX=0, sNY=0;
let hoverBlend = 0; // State for head following cursor
let dragBlend = 0;  // State for dangling physics

// Drag interactions
const dragPlane         = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const intersectionPoint = new THREE.Vector3();
const dragOffset        = new THREE.Vector3();
const downPos           = { x: 0, y: 0 };
let isTryingToDrag = false;
let isDragging     = false;
let clickMoved     = false;
let hasDragged     = false;
let isClickedOnAvatar = false;
let blocksNextClick   = false;

const clock = new THREE.Clock();

// ─── RETARGETER ───────────────────────────────────────────────────────────────
function retargetMixamoToVRM(asset, vrm, fileUrl = '') {
    const clip = THREE.AnimationClip.findByName(asset.animations, 'mixamo.com') || asset.animations[0];
    if (!clip) return null;
    const tracks=[], rRI=new THREE.Quaternion(), pRWR=new THREE.Quaternion(), _qA=new THREE.Quaternion();
    let hipsNode = asset.getObjectByName('mixamorigHips') || asset.getObjectByName('Hips') || asset.getObjectByName('hips');
    const hMotion = hipsNode ? hipsNode.position.y : 100;
    const hVRM    = vrm.humanoid.normalizedRestPose.hips.position[1];
    const hScale  = hVRM / hMotion;
    let firstTrackLogged = false;
    clip.tracks.forEach(track => {
        const parts = track.name.split('.');
        let boneName = parts[0]; // raw bone name from track, e.g. 'mixamorigHips' or 'Armature:mixamorigHips'
        // Fix: strip any 'Prefix:' — use only the part AFTER the colon
        if (boneName.includes(':')) boneName = boneName.split(':').pop();
        // Fix: handle pipe separator used in some FBX exports
        if (boneName.includes('|')) boneName = boneName.split('|')[0];
        let rigName = boneName;
        if (!mixamoVRMRigMap[rigName] && !rigName.startsWith('mixamorig'))
            rigName = 'mixamorig' + rigName.charAt(0).toUpperCase() + rigName.slice(1);
        if (!firstTrackLogged) {
            console.log('[VRM] First track:', track.name, '→ boneName:', boneName, '→ rigName:', rigName, '→ inMap:', !!mixamoVRMRigMap[rigName]);
            firstTrackLogged = true;
        }
        const vrmBone = mixamoVRMRigMap[rigName];
        const vrmNode = vrm.humanoid?.getNormalizedBoneNode(vrmBone)?.name;
        // Try cleaned boneName first, fallback to original parts[0] for scene lookup
        const rigNode = asset.getObjectByName(boneName) || asset.getObjectByName(parts[0]);
        if (vrmNode != null && rigNode != null) {
            const prop = parts[1];
            rigNode.getWorldQuaternion(rRI).invert();
            rigNode.parent.getWorldQuaternion(pRWR);
            if (track instanceof THREE.QuaternionKeyframeTrack) {
                const values = track.values.slice();
                for (let i=0;i<values.length;i+=4){
                    const fq=values.slice(i,i+4);
                    _qA.fromArray(fq).premultiply(pRWR).multiply(rRI); _qA.toArray(fq);
                    for (let j=0; j<4; j++) {
                        values[i+j] = fq[j];
                    }
                }
                tracks.push(new THREE.QuaternionKeyframeTrack(`${vrmNode}.${prop}`,track.times,
                    values.map((v,i)=>(vrm.meta?.metaVersion==='0'&&i%2===0?-v:v))));
            } else if (track instanceof THREE.VectorKeyframeTrack) {
                const isCatwalk = fileUrl.toLowerCase().includes('catwalk');
                const isSitting = fileUrl.toLowerCase().includes('sitting');
                tracks.push(new THREE.VectorKeyframeTrack(`${vrmNode}.${prop}`,track.times,
                    track.values.map((v,i)=>{
                        // Lock lateral (X-axis) translation for catwalk so it walks on one axis only
                        if (isCatwalk && prop === 'position' && i%3 === 0) return 0;
                        // SITTING: zero out hips Y so sit1/sit2 share the same base height
                        // The avatar's scene Y position controls where it sits instead.
                        if (isSitting && prop === 'position' && rigName === 'mixamorigHips' && i%3 === 1) return 0;
                        return (vrm.meta?.metaVersion==='0'&&i%3!==1?-v:v)*hScale;
                    })));
            }
        }
    });
    if (tracks.length === 0) {
        console.error('[VRM] retarget: 0 tracks matched VRM rig for:', fileUrl, '— FBX rig names may not match mixamorigXxx pattern');
        return null;
    }
    return new THREE.AnimationClip(clip.name, clip.duration, tracks);
}

// ─── LOADERS ──────────────────────────────────────────────────────────────────
const vrmLoader = new GLTFLoader();
vrmLoader.register(p => new VRMLoaderPlugin(p));

function configureVRMPhysics(vrmModel, modelPath) {
    try {
        if (isMobile) {
            vrmModel.springBoneManager = null;
            return;
        }
        if (!vrmModel.springBoneManager) return;
        const joints = vrmModel.springBoneManager.joints || vrmModel.springBoneManager.springBoneGroupList || [];
        
        const lowerPath = (modelPath || '').toLowerCase();
        const isChangli = lowerPath.includes('changli');
        const isReduced = lowerPath.includes('yinlin') || lowerPath.includes('pinkshi') || lowerPath.includes('jinshi');

        const iterableJoints = joints.forEach ? joints : Object.values(joints);

        iterableJoints.forEach(joint => {
            const bone = joint.bone || joint.node;
            const name = bone?.name?.toLowerCase() || '';
            const settings = joint.settings || joint;
            if (!settings) return;
            
            if (name.includes('bust') || name.includes('breast') || name.includes('mune') || name.includes('chest')) {
                let targetStiffness = 10;
                let targetDrag = 0.1;
                
                // Overlay custom values from vrm-config.js
                if (window.VRM_MODEL_CONFIGS) {
                    const conf = window.VRM_MODEL_CONFIGS[modelPath] || window.VRM_MODEL_CONFIGS['default'];
                    if (conf) {
                        if (conf.chestStiffness !== undefined) targetStiffness = conf.chestStiffness;
                        if (conf.chestDrag !== undefined) targetDrag = conf.chestDrag;
                    }
                } else {
                    // Fallbacks if no config found
                    if (isChangli) {
                        targetStiffness = 3;
                        targetDrag = 0.05;
                    } else if (isReduced) {
                        targetStiffness = 30;
                        targetDrag = 0.6;
                    }
                }

                if (settings.stiffness !== undefined) settings.stiffness = Math.min(settings.stiffness, targetStiffness);
                if (settings.dragForce !== undefined) settings.dragForce = Math.min(settings.dragForce, targetDrag);
            } else {
                // Stiffen outfits and hair
                if (settings.stiffness !== undefined) settings.stiffness *= 3.0;
                if (settings.dragForce !== undefined) settings.dragForce *= 1.5;
            }
        });
    } catch(err) {
        console.warn('Physics config failed:', err);
    }
}

function applyModelVisuals(vrm, modelPath) {
    if (!window.VRM_MODEL_CONFIGS) return;
    const conf = window.VRM_MODEL_CONFIGS[modelPath] || window.VRM_MODEL_CONFIGS['default'];
    if (!conf) return;

    // 1. Adjust brightness (scene lighting)
    const bMultiplier = conf.brightness !== undefined ? conf.brightness : 1.0;
    ambientLight.intensity = ambientLight.userData.baseIntensity * bMultiplier;
    dirLights.forEach(l => {
        l.intensity = l.userData.baseIntensity * bMultiplier;
    });

    // 2. Adjust material glow (emission) and specific part brightness
    const gMultiplier = conf.glow !== undefined ? conf.glow : 1.0;
    const hMultiplier = conf.hairBrightness !== undefined ? conf.hairBrightness : 1.0;
    const sMultiplier = conf.skinBrightness !== undefined ? conf.skinBrightness : 1.0;

    vrm.scene.traverse((node) => {
        if (node.isMesh && node.material) {
            const materials = Array.isArray(node.material) ? node.material : [node.material];
            materials.forEach(mat => {
                if (mat.emissive) {
                    if (!mat.userData.baseEmissive) mat.userData.baseEmissive = mat.emissive.clone();
                    mat.emissive.copy(mat.userData.baseEmissive).multiplyScalar(gMultiplier);
                }
                if (mat.color) {
                    if (!mat.userData.baseColor) mat.userData.baseColor = mat.color.clone();
                    const matName = (mat.name || '').toLowerCase();
                    if (matName.includes('hair')) {
                        mat.color.copy(mat.userData.baseColor).multiplyScalar(hMultiplier);
                    } else if (matName.includes('face') || matName.includes('skin') || matName.includes('body')) {
                        mat.color.copy(mat.userData.baseColor).multiplyScalar(sMultiplier);
                    } else {
                        mat.color.copy(mat.userData.baseColor);
                    }
                }
            });
        }
    });
}

// ─── FIX SKINNED MESH HITBOX ──────────────────────────────────────────────────
// SkinnedMeshes have bounding volumes based on rest pose. When the character is
// animated (sitting, waving, etc.) the visible mesh can leave the original bounds
// which causes raycaster misses. We force a large sphere so clicks always land.
function fixVRMHitbox(vrmObj) {
    vrmObj.scene.traverse((node) => {
        if (node.isSkinnedMesh || node.isMesh) {
            node.frustumCulled = false;          // never cull — always rendered
            node.raycast = node.raycast;          // keep default raycast fn
            if (node.geometry) {
                if (!node.geometry.boundingSphere) node.geometry.computeBoundingSphere();
                if (node.geometry.boundingSphere) {
                    node.geometry.boundingSphere.radius = 5; // big enough for any pose
                }
            }
        }
    });
}

const initialFile = window.initialAvatarFile || './Wuwa/changli(fixed).vrm';
vrmLoader.load(
    window.getAvatarUrl ? window.getAvatarUrl(initialFile) : initialFile,
    async gltf => {
        if (typeof window.onVRMLoadProgress === 'function') {
            window.onVRMLoadProgress(92, 'Initializing bone physics & facial blendshapes...');
        }
        vrm = gltf.userData.vrm;
        if (VRMUtils?.rotateVRM0) VRMUtils.rotateVRM0(vrm);

        configureVRMPhysics(vrm, initialFile);
        applyModelVisuals(vrm, initialFile);
        fixVRMHitbox(vrm);   // always expand skinned-mesh hitboxes for reliable drag

        window._vrmIsReady = true;
        if (typeof window.onVRMLoadProgress === 'function') {
            window.onVRMLoadProgress(100, 'Ready! Tap to enter...');
        }
        if (typeof window.onVRMReady === 'function') {
            window.onVRMReady();
        }

        window.currentVRMScale = window.currentVRMScale || (isMobile ? 0.65 : 0.95);

    window.setVRMScale = (scale) => {
        if (!isFinite(scale) || scale <= 0) return;
        const clamped = Math.max(0.3, Math.min(2.5, scale));
        window.currentVRMScale = clamped;
        if (vrm && vrm.scene) {
            vrm.scene.scale.set(clamped, clamped, clamped);
        }
    };
    window.setVRMVisibility = (visible) => {
        window.vrmEnabled = !!visible;
        localStorage.setItem('avatarEnabled', visible ? 'true' : 'false');
        if (vrm && vrm.scene) vrm.scene.visible = !!visible;
        const canvas = document.getElementById('vrm-canvas');
        if (canvas) {
            canvas.style.display = visible ? 'block' : 'none';
        }
    };
    // Always make avatar visible by default on load
    window.setVRMVisibility(true);


    // Live brightness controls exposed to UI sliders
    window.setVRMBrightness = (val) => {
        if (!isFinite(val) || val <= 0) return;
        ambientLight.intensity = (ambientLight.userData.baseIntensity || 1.7) * val;
        dirLights.forEach(l => { l.intensity = (l.userData.baseIntensity || 1.0) * val; });
    };

    window.setVRMHairBrightness = (val) => {
        if (!vrm) return;
        vrm.scene.traverse((node) => {
            if (node.isMesh && node.material) {
                const mats = Array.isArray(node.material) ? node.material : [node.material];
                mats.forEach(mat => {
                    if (mat.color && (mat.name || '').toLowerCase().includes('hair')) {
                        if (!mat.userData.baseColor) mat.userData.baseColor = mat.color.clone();
                        mat.color.copy(mat.userData.baseColor).multiplyScalar(val);
                    }
                });
            }
        });
    };

    window.setVRMSkinBrightness = (val) => {
        if (!vrm) return;
        vrm.scene.traverse((node) => {
            if (node.isMesh && node.material) {
                const mats = Array.isArray(node.material) ? node.material : [node.material];
                mats.forEach(mat => {
                    const n = (mat.name || '').toLowerCase();
                    if (mat.color && (n.includes('face') || n.includes('skin') || n.includes('body'))) {
                        if (!mat.userData.baseColor) mat.userData.baseColor = mat.color.clone();
                        mat.color.copy(mat.userData.baseColor).multiplyScalar(val);
                    }
                });
            }
        });
    };

    function poseRestingArms(vrmInstance) {
        if (!vrmInstance?.humanoid) return;
        const lArm = vrmInstance.humanoid.getNormalizedBoneNode('leftUpperArm');
        const rArm = vrmInstance.humanoid.getNormalizedBoneNode('rightUpperArm');
        if (lArm) { lArm.rotation.z = 1.25; lArm.rotation.x = 0.1; }
        if (rArm) { rArm.rotation.z = -1.25; rArm.rotation.x = 0.1; }
    }

    vrm.scene.scale.setScalar(window.currentVRMScale);
    
    // Plant feet exactly at the bottom edge of the visible screen
    vrm.scene.position.set(0, -0.97, 0);
    updateCharPos();
    vrm.scene.rotation.y = Math.PI; // default face-camera; animate() will smooth-track from here

    mixer = new THREE.AnimationMixer(vrm.scene);

    // When a one-shot (LoopOnce) animation finishes naturally
    mixer.addEventListener('finished', () => {
        clearAutoTimer();
        returnToIdle();
    });

    const siteLoaderEl = document.getElementById('site-loader');
    if (siteLoaderEl) {
        const textEl = document.getElementById('site-loader-text');
        if (textEl) textEl.textContent = 'Getting ready...';
    }

    poseRestingArms(vrm);
    vrm.scene.updateMatrixWorld(true);
    vrm.update(0);
    scene.add(vrm.scene);

    if (typeof window.onVRMLoadProgress === 'function') {
        window.onVRMLoadProgress(80, 'Setting up graphics & shaders...');
    }

    loadEssentialAnimations(vrm).then(() => {
        // Step 1: Start idle immediately
        applyState('idle', 'happy', 0.6);
        playAnim(ANIM.idle, true, 0.3);
        if (mixer) mixer.update(0);

        if (typeof window.onVRMLoadProgress === 'function') {
            window.onVRMLoadProgress(100, 'Ready! Tap to enter...');
        }

        // Notify IntroLoader that VRM is fully loaded and ready
        window._vrmIsReady = true;
        if (typeof window.onVRMReady === 'function') {
            window.onVRMReady();
        }

        // If user already popped the bubble or intro was queued, play wave1 and speak simultaneously
        if (window._pendingIntroOnVRMLoad || window._pendingIntroWave || (sessionStorage.getItem('raya_bubble_done') && !window._hasIntroducedOnce)) {
            window._hasIntroducedOnce = true;
            window._pendingIntroOnVRMLoad = false;
            window._pendingIntroWave = false;
            setTimeout(() => {
                window.playWaveAnimation();
                if (window.chatBot && typeof window.chatBot.introduceHerself === 'function') {
                    window.chatBot.introduceHerself();
                }
            }, 250);
        }
    }, (progress) => {
        if (progress && progress.lengthComputable && progress.total > 0) {
            const pct = Math.min(90, Math.round((progress.loaded / progress.total) * 90));
            if (typeof window.onVRMLoadProgress === 'function') {
                window.onVRMLoadProgress(pct, `Downloading 3D avatar (${pct}%)...`);
            }
        } else if (progress && progress.loaded > 0) {
            const approxTotal = 15 * 1024 * 1024;
            const pct = Math.min(88, Math.round((progress.loaded / approxTotal) * 88));
            if (typeof window.onVRMLoadProgress === 'function') {
                window.onVRMLoadProgress(pct, `Downloading 3D avatar (${pct}%)...`);
            }
        }
    }, (err) => {
        console.warn('[VRM Initial Load Error]', err);
        window._vrmIsReady = true;
        if (typeof window.onVRMReady === 'function') {
            window.onVRMReady();
        }
    });

    if (siteLoaderEl) { 
        siteLoaderEl.classList.add('hidden');
        setTimeout(() => siteLoaderEl?.remove(), 800); 
    }

    // Step 2: Gently pre-warm remaining animations in the background.
    // Starts 5s after load, loads ONE animation every 2.5s with no main-thread blocking.
    const animsToPrewarm = [ANIM.happy, ANIM.excited, ANIM.yawn, ANIM.angry, ANIM.sad1, ANIM.no];
    let prewarmIndex = 0;
    const prewarmNext = () => {
        if (prewarmIndex >= animsToPrewarm.length || !vrm) return;
        const file = animsToPrewarm[prewarmIndex++];
        if (!actions[file]) {
            loadSingleAnimation(file, vrm).catch(() => {});
        }
        setTimeout(prewarmNext, 2500); // 2.5s gap — never causes lag spikes
    };
    setTimeout(prewarmNext, 5000); // wait 5s before starting prewarm

    // Global helper to play custom animations from Avatar Studio
    window.playVRMAnimation = (animId) => {
        if (!vrm) return;
        const animMap = {
            'idle': ANIM.idle,
            'wave': ANIM.wave1,
            'happy': ANIM.happy,
            'excited': ANIM.excited,
            'sitting': ANIM.sit1,
            'yawn': ANIM.yawn,
            'angry': ANIM.angry,
            'sad': ANIM.sad1
        };
        const targetAnim = animMap[animId] || ANIM.idle;
        if (actions[targetAnim]) {
            applyState(animId === 'wave' ? 'wave' : 'happy', 'happy', 0.8);
            playAnim(targetAnim, animId === 'idle' || animId === 'sitting', 0.35);
        } else {
            console.log('[VRM] Animation loading or not found:', animId);
        }
    };

    // Global helper so chatbot can trigger the intro wave.
    window.playWaveAnimation = async () => {
        if (!vrm) {
            window._pendingIntroWave = true;
            return;
        }
        const wave1Key = ANIM.wave1;
        clearAutoTimer();
        applyState('wave', 'happy', 0.85);

        try {
            let action = actions[wave1Key];
            if (!action && vrm) {
                action = await loadSingleAnimation(wave1Key, vrm);
            }
            if (action) {
                await playAnim(wave1Key, false, 0.35);
            } else if (actions[ANIM.wave2]) {
                await playAnim(ANIM.wave2, false, 0.35);
            }
        } catch (e) {
            console.warn('[VRM] Wave anim fallback:', e);
            if (actions[ANIM.wave2]) playAnim(ANIM.wave2, false, 0.35);
        }
    };

    // Trigger intro: wait for bubble pop if master intro overlay or bubble screen is active
    window.onBubblePopped = () => {
        if (hasDragged || isDragging) return;
        window._bubbleHasPopped = true;
        // ── Reveal the VRM canvas now that bubble has been popped ──
        const cvs = document.getElementById('vrm-canvas');
        if (cvs) cvs.classList.add('raya-visible');
        if (vrm && window._vrmIsReady) {
            window.playWaveAnimation();
            if (window.chatBot && typeof window.chatBot.introduceHerself === 'function') {
                window.chatBot.introduceHerself();
            }
        } else {
            // Queue intro until VRM is ready
            window._pendingIntroOnVRMLoad = true;
        }
    };

    const hasIntroOverlay = document.getElementById('master-intro-overlay') || document.getElementById('bubble-screen');
    if (!hasIntroOverlay && sessionStorage.getItem('raya_bubble_done') && !window._hasIntroducedOnce) {
        // Returning visitor — show canvas immediately (no bubble screen)
        const cvs = document.getElementById('vrm-canvas');
        if (cvs) cvs.classList.add('raya-visible');
        setTimeout(async () => {
            if (hasDragged || isDragging) return;
            window.playWaveAnimation();
            if (window.chatBot && typeof window.chatBot.introduceHerself === 'function') {
                window.chatBot.introduceHerself();
            }
        }, 800);
    }


}, xhr => {
    const totalSize = (xhr.total && xhr.total > 0) ? xhr.total : (AVATAR_SIZES[initialFile] || 31422968);
    const rawPct = Math.min(100, Math.round((xhr.loaded / totalSize) * 100));
    const scaledPct = Math.round(rawPct * 0.75); // 0 - 75% for VRM bytes stream

    if (typeof window.onVRMLoadProgress === 'function') {
        window.onVRMLoadProgress(scaledPct, `Loading 3D Character (${rawPct}%)...`);
    }

    const siteLoaderEl = document.getElementById('site-loader');
    if (siteLoaderEl) {
        const pctEl = document.getElementById('site-loader-pct');
        const barEl = document.getElementById('site-loader-bar');
        const textEl = document.getElementById('site-loader-text');
        
        if (pctEl) pctEl.textContent = `${scaledPct}%`;
        if (barEl) barEl.style.width = `${scaledPct}%`;
        if (textEl) textEl.textContent = `Loading 3D Character (${rawPct}%)...`;
    }
}, err => {
    console.error(err);
    if (typeof window.onVRMReady === 'function') {
        window.onVRMReady();
    }
    const siteLoaderEl = document.getElementById('site-loader');
    if (siteLoaderEl) {
        const textEl = document.getElementById('site-loader-text');
        if (textEl) textEl.textContent = 'Failed to load system.';
    }
});

const fbxLoader = new FBXLoader();
const activeAnimPromises = new Map();

async function loadSingleAnimation(file, vrmInstance) {
    if (!file || !vrmInstance) return null;
    if (actions[file]) return actions[file];
    if (activeAnimPromises.has(file)) return activeAnimPromises.get(file);

    const loadPromise = (async () => {
        try {
            const fbx = await new Promise((res, rej) => fbxLoader.load(file, res, undefined, rej));
            if (vrm !== vrmInstance || !mixer) return null;
            const clip = retargetMixamoToVRM(fbx, vrmInstance, file);
            if (clip && clip.duration >= 0.1) {
                clips[file] = clip;
                actions[file] = mixer.clipAction(clip);
                console.log('[VRM] ✓ Lazy loaded animation:', file);
                return actions[file];
            }
        } catch (e) {
            console.warn('[VRM] Lazy FBX load failed:', file, e.message || e);
        } finally {
            activeAnimPromises.delete(file);
        }
        return null;
    })();

    activeAnimPromises.set(file, loadPromise);
    return loadPromise;
}

async function loadEssentialAnimations(vrmInstance, extraAnims = []) {
    console.log('[VRM] Loading initial essential animations (idle & wave)...');
    const animsToLoad = [...ESSENTIAL_ANIMS, ...extraAnims];
    const uniqueAnims = Array.from(new Set(animsToLoad));
    let loadedCount = 0;
    await Promise.all(uniqueAnims.map(async (file) => {
        try {
            const fbx = await new Promise((res, rej) => fbxLoader.load(file, res, undefined, rej));
            if (vrm !== vrmInstance) return;
            const clip = retargetMixamoToVRM(fbx, vrmInstance, file);
            if (clip && clip.duration >= 0.1 && mixer) {
                clips[file] = clip;
                actions[file] = mixer.clipAction(clip);
                console.log('[VRM] ✓ Loaded Essential:', file);
            }
            loadedCount++;
            const animPct = 80 + Math.round((loadedCount / uniqueAnims.length) * 18); // 80% -> 98%
            if (typeof window.onVRMLoadProgress === 'function') {
                window.onVRMLoadProgress(animPct, `Setting up animations (${loadedCount}/${uniqueAnims.length})...`);
            }
        } catch (e) {
            console.error('[VRM] ✗ Essential FBX load error:', file, e.message || e);
        }
    }));
    if (typeof window.onVRMLoadProgress === 'function') {
        window.onVRMLoadProgress(100, 'Ready! Tap to enter...');
    }
    console.log('[VRM] Essential animations ready. Remaining animations will stream on-demand.');
}

// Background bulk loading is disabled to prevent laptop hanging/lagging
function loadBackgroundAnimations() {
    // No-op: animations stream on-demand when requested
}

// ─── PLAY ANIMATION (WITH INSTANT LAZY ON-DEMAND STREAMING) ────────────────────
async function playAnim(key, loop=true, crossFade=0.35) {
    if (!key || currentKey === key) return;
    let action = actions[key];
    if (!action && vrm) {
        action = await loadSingleAnimation(key, vrm);
    }
    if (!action) return;
    action.loop              = loop ? THREE.LoopRepeat : THREE.LoopOnce;
    action.clampWhenFinished = !loop;
    action.setEffectiveTimeScale(1.0);
    
    action.reset().play();
    if (currentAction && currentAction !== action) {
        currentAction.crossFadeTo(action, crossFade, false);
    }
    currentAction = action;
    currentKey    = key;
}

// ─── STATE HELPERS ────────────────────────────────────────────────────────────
let isSittingOnChatbox = false;
let clickCount = 0;
let clickTimer = null;

function applyState(poseName, exprName, eVal) {
    fingerPoseTarget = { ...(FINGER_POSES[poseName] ?? FINGER_POSES.idle) };
    expr       = exprName;
    exprTarget = eVal;
}

function clearAutoTimer() {
    if (autoTimerId !== null) { clearTimeout(autoTimerId); autoTimerId = null; }
}

// After any animation ends → go to idle/sit, then schedule next auto-anim (30s gap)
function returnToIdle() {
    if (isSittingOnChatbox) {
        // Sitting cycle base: sit2 is the resting pose
        applyState('happyIdle', 'relaxed', 0.55);
        playAnim(ANIM.sit2, true, 0.5);
        lastAnimKey = 'sit2';
        // 30s cycle while sitting before next sit expression
        const sitDelay = 30000; // 30s between sitting expressions
        autoTimerId = setTimeout(playRandomAnim, sitDelay);
        if (!smileTimerId) scheduleNextSmile();
    } else {
        applyState('idle', 'happy', 0.6);
        playAnim(ANIM.idle, true, 0.5);
        introComplete = true;
        // Block auto-cycle scheduling if chatbot is currently speaking
        if (!window.chatbotTalking) {
            const delay = 30000; // 30s between random animations
            autoTimerId = setTimeout(playRandomAnim, delay);
        }
        if (!smileTimerId) scheduleNextSmile();
    }
}

// ─── SMILE MICRO-EXPRESSION SCHEDULER ────────────────────────────────────────
// Fires only while in idle or sitting2/sitRub. Smoothly blends in a smile +
// eye squint for a natural 'content' moment, then fades back out.
const SMILE_IDLE_KEYS  = new Set([ANIM.idle]);
const SMILE_SIT_KEYS   = new Set([ANIM.sit2, ANIM.sitRub]);

function scheduleNextSmile() {
    if (smileTimerId) clearTimeout(smileTimerId);
    // Random 15–40s between smile moments
    const delay = 15000 + Math.random() * 25000;
    smileTimerId = setTimeout(tryPlaySmile, delay);
}

function tryPlaySmile() {
    // Only fire if avatar is in idle or sitting2/sitRub — not while talking, thinking, etc.
    const inSmileState = SMILE_IDLE_KEYS.has(currentKey) || SMILE_SIT_KEYS.has(currentKey);
    if (!inSmileState || window.chatbotTalking) {
        // Not the right moment — try again later
        scheduleNextSmile();
        return;
    }
    // Blend in the smile + squint
    smileTarget = 0.85 + Math.random() * 0.12;  // 0.85–0.97 intensity
    // Hold for 2–4s, then fade out
    const holdMs = 2000 + Math.random() * 2000;
    smileTimerId = setTimeout(() => {
        smileTarget = 0;  // fade back out
        scheduleNextSmile();
    }, holdMs);
}

// ─── RANDOM ANIMATION PICKER ──────────────────────────────────────────────────
let lastAnimKey = null;

function pickRandom() {
    const pool = isSittingOnChatbox ? SITTING_POOL : ANIM_POOL;
    let pick;
    let attempts = 0;
    do { 
        pick = pool[Math.floor(Math.random() * pool.length)];
        attempts++;
    } while (pick.key === lastAnimKey && attempts < 20);
    
    lastAnimKey = pick.key;
    return pick;
}

function playRandomAnim() {
    if (!vrm) return;
    clearAutoTimer();  // cancel any pending timer (important when called from click too)

    // Safety block: prevent random standing animations while Raya is speaking
    if (window.chatbotTalking && !isSittingOnChatbox) {
        returnToIdle();
        return;
    }

    const pick = pickRandom();
    const clipKey = ANIM[pick.key];

    applyState(pick.fingerPose, pick.expr, pick.exprVal);

    // Lazy-load if needed, then play — no more skipping to idle just because clip isn't cached yet
    (async () => {
        let action = actions[clipKey];
        if (!action && vrm) {
            action = await loadSingleAnimation(clipKey, vrm);
        }
        if (!action) {
            // Genuine failure — just idle and try again later
            returnToIdle();
            return;
        }

        // Make sure VRM is still loaded and we're not talking
        if (!vrm || (window.chatbotTalking && !isSittingOnChatbox)) {
            returnToIdle();
            return;
        }

        playAnim(clipKey, pick.loop, 0.4);

        if (pick.loop) {
            // Looping animation: cap at maxDuration, then return to idle
            const cap = (pick.maxDuration ?? 7) * 1000;
            autoTimerId = setTimeout(() => {
                returnToIdle();
            }, cap);
        }
        // One-shot: 'finished' event on mixer will call returnToIdle() naturally
    })();
}

// ─── CLICK / DRAG ─────────────────────────────────────────────────────────────
// Shared helper: blocks selectstart events during drag to prevent text highlight
function _preventSelect(e) { e.preventDefault(); }

const raycaster         = new THREE.Raycaster();
const mouse2d           = new THREE.Vector2();

document.addEventListener('pointerdown', e => {
    if (isMobile) return;
    if (!vrm || !introComplete) return;
    // Ignore right/middle buttons
    if (e.button !== 0) return;

    mouse2d.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse2d, camera);

    if (raycaster.intersectObject(vrm.scene, true).length > 0) {
        // Stop the click reaching cards beneath the avatar
        e.stopPropagation();
        e.preventDefault();

        downPos.x = e.clientX;
        downPos.y = e.clientY;
        clickMoved      = false;
        isClickedOnAvatar = true;
        blocksNextClick   = true;

        if (!isMobile) {
            isTryingToDrag  = true;

            // Fix drag plane to avatar's Z so raycaster math is stable
            dragPlane.set(new THREE.Vector3(0, 0, 1), -vrm.scene.position.z);

            // Pre-compute offset in world space from avatar centre to cursor
            mouse2d.x = (e.clientX / window.innerWidth)  * 2 - 1;
            mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse2d, camera);
            if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
                dragOffset.copy(intersectionPoint).sub(vrm.scene.position);
            }
        }
    }
}, { capture: true });

document.addEventListener('pointermove', e => {
    if (isMobile || !isTryingToDrag) return;

    const dx = e.clientX - downPos.x;
    const dy = e.clientY - downPos.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        if (!isDragging) {
            // Drag just started — lock out ALL selection on page
            document.documentElement.style.userSelect    = 'none';
            document.documentElement.style.webkitUserSelect = 'none';
            document.body.style.userSelect    = 'none';
            document.body.style.webkitUserSelect = 'none';
            // Kill any active selection
            window.getSelection()?.removeAllRanges();
            // Prevent selectstart from firing during drag
            document.addEventListener('selectstart', _preventSelect);
        }
        isDragging  = true;
        clickMoved  = true;
        hasDragged  = true;
    }

    if (isDragging) {
        // Block card hover/selection while dragging avatar
        e.preventDefault();
        e.stopPropagation();
        mouse2d.x = (e.clientX / window.innerWidth)  * 2 - 1;
        mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse2d, camera);
        if (raycaster.ray.intersectPlane(dragPlane, intersectionPoint)) {
            vrm.scene.position.copy(intersectionPoint).sub(dragOffset);
        }
    }
}, { capture: true });

window.addEventListener('pointerup', e => {
    if (isMobile) return;
    const wasDragging = isDragging;
    isTryingToDrag  = false;
    isDragging      = false;

    // Restore text selection
    document.documentElement.style.userSelect    = '';
    document.documentElement.style.webkitUserSelect = '';
    document.body.style.userSelect       = '';
    document.body.style.webkitUserSelect = '';
    document.removeEventListener('selectstart', _preventSelect);
    
    const clickedAvatar = isClickedOnAvatar;
    isClickedOnAvatar = false;

    if (clickedAvatar && !wasDragging && !isSittingOnChatbox && e.target && e.target.nodeName === 'CANVAS') {
        clearAutoTimer();
        applyState('no', 'sad', 0.50);
        playAnim(ANIM.no, false, 0.2);
        // Return to idle cycle after the 'No' animation completes
        autoTimerId = setTimeout(() => {
            applyState('idle', 'happy', 0.6);
            returnToIdle();
        }, 3000);
    }

    if (wasDragging) {
        // Check if dropped onto or near the chatbot panel
        const chatEl = document.getElementById('chatbot-panel') ||
                       document.getElementById('chatbot-input-row');
        if (chatEl) {
            const rect = chatEl.getBoundingClientRect();
            const MARGIN = 60;
            // Only trigger sitting if chatbox is visible (width > 0)
            if (rect.width > 0 && rect.height > 0 &&
                e.clientX >= rect.left  - MARGIN && e.clientX <= rect.right  + MARGIN &&
                e.clientY >= rect.top   - MARGIN && e.clientY <= rect.bottom + MARGIN) {
                isSittingOnChatbox = true;
                clearAutoTimer();

                // ── Snap Y to chatbox level only (X stays at drop position) ────
                if (vrm) {
                    const halfH  = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
                    const topNDC = 1 - 2 * (rect.top / window.innerHeight);
                    const worldY = camera.position.y + topNDC * halfH;
                    // +0.1 seats hips just above the panel top edge
                    vrm.scene.position.y = Math.min(worldY + 0.1, 0.5);
                    // X is intentionally NOT changed — she sits wherever dropped
                }
                // ─────────────────────────────────────────────────────────────────

                applyState('happyIdle', 'relaxed', 0.55);  // sit2 expression
                playAnim(ANIM.sit2, true, 0.5);            // sit2 FIRST
                lastAnimKey = 'sit2';                      // so pickRandom picks sit1 next
                // Cycle to sit1 after exactly 30s, then sit2 again, etc.
                autoTimerId = setTimeout(() => playRandomAnim(), 30000);
                return;
            }
        }
        // Dropped somewhere else — just play idle at current position (no snap back)
        isSittingOnChatbox = false;
        applyState('idle', 'happy', 0.6);
        returnToIdle();
    }
});

window.addEventListener('pointercancel', e => {
    if (isMobile) return;
    isTryingToDrag = false;
    isClickedOnAvatar = false;
    
    // Always restore text selection on cancel
    document.documentElement.style.userSelect    = '';
    document.documentElement.style.webkitUserSelect = '';
    document.body.style.userSelect       = '';
    document.body.style.webkitUserSelect = '';
    document.removeEventListener('selectstart', _preventSelect);

    if (isDragging) {
        isDragging = false;
        isSittingOnChatbox = false;
        applyState('idle', 'happy', 0.6);
        returnToIdle();
    }
});

// Intercept click to prevent clicking cards when clicking avatar
window.addEventListener('click', e => {
    if (blocksNextClick) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        // Reset immediately 
        blocksNextClick = false;
    }
}, { capture: true });

// Fallback: forcefully reset blocksNextClick after pointerup in case click never fires
document.addEventListener('pointerup', () => { setTimeout(() => { blocksNextClick = false; }, 100); });
document.addEventListener('pointercancel', () => { blocksNextClick = false; });

// ─── FINGER BONE DRIVER ───────────────────────────────────────────────────────
function applyFingerPose(t, dt) {
    if (!vrm) return;
    const s = Math.min(1, dt * 6); // lerp speed
    for (const k of Object.keys(fingerPoseTarget))
        fingerPoseCurrent[k] = lerp(fingerPoseCurrent[k], fingerPoseTarget[k], s);
    const p = fingerPoseCurrent;

    // Resolve optional separate left-hand pose (used for asymmetric gestures)
    const leftPoseKey = fingerPoseTarget.leftPose || null;
    const leftP       = leftPoseKey ? FINGER_POSES[leftPoseKey] : p;

    // Left hand
    FINGER_CHAINS_L.forEach((chain, fi) => {
        const phase = FINGER_PHASES[fi];
        const b     = Math.sin(t * BREATHE_FREQ + phase) * BREATHE_AMP;
        // Micro-ripple: each joint in the chain curls with a slight phase offset
        const r0 = Math.sin(t * RIPPLE_FREQ + phase)           * RIPPLE_AMP;
        const r1 = Math.sin(t * RIPPLE_FREQ + phase + 0.5)     * RIPPLE_AMP;
        const r2 = Math.sin(t * RIPPLE_FREQ + phase + 1.0)     * RIPPLE_AMP;
        const [b0,b1,b2] = chain.map(n => vrm.humanoid?.getNormalizedBoneNode(n));
        
        let pProx = leftP.proximal;
        let pInt  = leftP.intermediate;
        let pDist = leftP.distal;
        
        if (fi === 0 && leftP.indexMult !== undefined) {
            pProx *= leftP.indexMult;
            pInt  *= leftP.indexMult;
            pDist *= leftP.indexMult;
        }

        if (b0) { b0.rotation.z = pProx + b + r0;       b0.rotation.y = leftP.spread; }
        if (b1)   b1.rotation.z = pInt  + b * 0.6 + r1;
        if (b2)   b2.rotation.z = pDist + b * 0.3 + r2;
    });
    const [tL0,tL1,tL2] = THUMB_L.map(n => vrm.humanoid?.getNormalizedBoneNode(n));
    const tRipple = Math.sin(t * RIPPLE_FREQ * 0.7) * RIPPLE_AMP;
    if (tL0) { tL0.rotation.x = leftP.thumbCurl + tRipple; tL0.rotation.y = -leftP.thumbSpread; }
    if (tL1)   tL1.rotation.x = leftP.thumbCurl * 0.65 + tRipple * 0.6;
    if (tL2)   tL2.rotation.x = leftP.thumbCurl * 0.35 + tRipple * 0.3;

    // Right hand (z-axis mirrored, always uses the main right-hand pose p)
    FINGER_CHAINS_R.forEach((chain, fi) => {
        const phase = FINGER_PHASES[fi] + 0.28;
        const b     = Math.sin(t * BREATHE_FREQ + phase) * BREATHE_AMP;
        const r0 = Math.sin(t * RIPPLE_FREQ + phase)           * RIPPLE_AMP;
        const r1 = Math.sin(t * RIPPLE_FREQ + phase + 0.5)     * RIPPLE_AMP;
        const r2 = Math.sin(t * RIPPLE_FREQ + phase + 1.0)     * RIPPLE_AMP;
        const [b0,b1,b2] = chain.map(n => vrm.humanoid?.getNormalizedBoneNode(n));
        
        let pProx = p.proximal;
        let pInt  = p.intermediate;
        let pDist = p.distal;
        
        if (fi === 0 && p.indexMult !== undefined) {
            pProx *= p.indexMult;
            pInt  *= p.indexMult;
            pDist *= p.indexMult;
        }

        if (b0) { b0.rotation.z = -(pProx + b + r0);    b0.rotation.y = -p.spread; }
        if (b1)   b1.rotation.z = -(pInt  + b * 0.6 + r1);
        if (b2)   b2.rotation.z = -(pDist + b * 0.3 + r2);
    });
    const [tR0,tR1,tR2] = THUMB_R.map(n => vrm.humanoid?.getNormalizedBoneNode(n));
    const tRippleR = Math.sin(t * RIPPLE_FREQ * 0.7 + 0.4) * RIPPLE_AMP;
    if (tR0) { tR0.rotation.x = p.thumbCurl + tRippleR; tR0.rotation.y =  p.thumbSpread; }
    if (tR1)   tR1.rotation.x = p.thumbCurl * 0.65 + tRippleR * 0.6;
    if (tR2)   tR2.rotation.x = p.thumbCurl * 0.35 + tRippleR * 0.3;
}

let wasTalking  = false;
let wasThinking = false;

// ─── VISIBILITY AND RENDERING PAUSE ──────────────────────────────────────────
let loopPaused = false;
function handleVisibilityChange() {
    if (document.hidden) {
        loopPaused = true;
        console.log('[VRM] Page hidden, rendering paused.');
    } else {
        loopPaused = false;
        clock.getDelta(); // Reset timer delta so the animation doesn't jump
        console.log('[VRM] Page visible, rendering resumed.');
        animate();
    }
}
document.addEventListener('visibilitychange', handleVisibilityChange);

// ─── OPTIMIZED EXPRESSION HELPER ──────────────────────────────────────────────
let activeExpressions = {};
function setVRMExpression(name, value) {
    if (!vrm) return;
    const manager = vrm.expressionManager || vrm.blendShapeProxy;
    if (!manager) return;
    try {
        manager.setValue(name, value);
        if (value > 0) {
            activeExpressions[name] = true;
        }
    } catch (_) {}
}

// ─── MAIN LOOP ────────────────────────────────────────────────────────────────
function animate() {
    if (loopPaused) return;
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t  = clock.elapsedTime;
    
    if (renderFramesAfterSwitch >= 0) {
        renderFramesAfterSwitch++;
        if (renderFramesAfterSwitch >= 10) {
            renderFramesAfterSwitch = -1; // stop counting
            const loadingEl = document.getElementById('vrm-loading');
            if (loadingEl) {
                loadingEl.style.opacity = '0';
                setTimeout(() => { 
                    if (loadingEl.parentNode && loadingEl.style.opacity === '0') {
                        loadingEl.style.display = 'none'; 
                    }
                }, 700);
            }
        }
    }

    if (!vrm) return;

    // Reset humanoid bones to a clean slate before updating the mixer
    // to prevent rotation drift, NaN mathematical overhead, and memory crashes.
    if (vrm.humanoid) {
        if (typeof vrm.humanoid.resetNormalizedPose === 'function') {
            vrm.humanoid.resetNormalizedPose();
        } else if (typeof vrm.humanoid.reset === 'function') {
            vrm.humanoid.reset();
        }
    }

    if (mixer) mixer.update(dt);
    applyFingerPose(t, dt);


    // ── Talking state (chatbot speaking response) ──────────────────────────────
    if (window.chatbotTalking !== wasTalking) {
        wasTalking = window.chatbotTalking;
        if (wasTalking) {
            if (isSittingOnChatbox) {
                // Sitting: keep sitting animation rules completely untouched
                if (currentKey !== ANIM.sit2) {
                    clearAutoTimer();
                    applyState('happyIdle', 'happy', 0.85);
                    playAnim(ANIM.sit2, true, 0.5);
                }
            } else {
                // Standing mode speaking:
                // ONE exception — waving animations (wave1 or wave2) during the intro.
                // Allow wave to play to completion alongside intro speech — do nothing.
                if (currentKey === ANIM.wave1 || currentKey === ANIM.wave2) {
                    // Do nothing — let wave play to completion
                } else {
                    clearAutoTimer();
                    applyState('idle', 'happy', 0.75);
                    if (currentKey !== ANIM.idle) {
                        playAnim(ANIM.idle, true, 0.5);
                    }
                }
            }
        } else {
            // Re-schedules the standing 25s auto-cycle naturally when speaking ends
            returnToIdle();
        }
    }

    // Idle look-around animation
    if (vrm.lookAt) {
        if (!window.lookAtTargetObj) {
            window.lookAtTargetObj = new THREE.Object3D();
            scene.add(window.lookAtTargetObj);
            vrm.lookAt.target = window.lookAtTargetObj;
        }
        
        // Randomly look around the viewport when idle
        if (currentKey && currentKey.includes('Idle') && !window.chatbotTalking) {
            // Use combination of sine waves for pseudo-random smooth wandering
            const lookX = Math.sin(t * 0.6) * 3.0 + Math.sin(t * 1.3) * 1.5;
            const lookY = Math.sin(t * 0.4) * 2.0 + Math.cos(t * 1.1) * 1.0 + 1.2;
            window.lookAtTargetObj.position.set(lookX, lookY, 15);
        } else {
            // Look straight ahead when doing other animations
            window.lookAtTargetObj.position.set(0, 1.2, 15);
        }
    }

    // ── Subtle body breathing sway (always-on, adds life to all animations) ──
    {
        const breathe   = Math.sin(t * 0.9) * 0.006;
        const sway      = Math.sin(t * 0.35 + 0.8) * 0.004;
        const shoulderW = Math.sin(t * 0.55 + 1.2) * 0.005;
        const spine  = vrm.humanoid?.getNormalizedBoneNode('spine');
        const chest  = vrm.humanoid?.getNormalizedBoneNode('chest');
        const upper  = vrm.humanoid?.getNormalizedBoneNode('upperChest');
        const lShldr = vrm.humanoid?.getNormalizedBoneNode('leftShoulder');
        const rShldr = vrm.humanoid?.getNormalizedBoneNode('rightShoulder');
        if (spine)  { spine.rotation.x  += breathe;        spine.rotation.z += sway; }
        if (chest)  { chest.rotation.x  += breathe * 0.7; }
        if (upper)  { upper.rotation.x  += breathe * 0.4; }
        if (lShldr) { lShldr.rotation.z +=  shoulderW; }
        if (rShldr) { rShldr.rotation.z -=  shoulderW; }
    }

    // Expressions — smooth blend with VRM 0.0 & 1.0 cross-compatibility
    exprSmooth = lerp(exprSmooth, exprTarget, dt * 3.5);

    // Smile micro-expression: smooth in/out independently
    // Fast fade-in (dt*4), slightly slower fade-out (dt*2.5) for natural feel
    const smileSpeed = smileTarget > smileIntensity ? dt * 4.0 : dt * 2.5;
    smileIntensity    = lerp(smileIntensity,   smileTarget, smileSpeed);
    smileSquintSmooth = lerp(smileSquintSmooth, smileIntensity * 0.6, smileSpeed * 0.8);

    const EXPR_MAP = {
        'happy':     ['happy', 'joy', 'Joy'],
        'angry':     ['angry', 'Angry'],
        'surprised': ['surprised', 'fun', 'Fun'],
        'relaxed':   ['relaxed'],
        'sad':       ['sad', 'sorrow', 'Sorrow'],
        'neutral':   ['neutral', 'Neutral'],
        'yawn':      ['relaxed'],   // just relaxed face; mouth + squint driven separately below
        'thinking':  ['neutral', 'Neutral'],
    };
    
    // Reset only active expressions from the previous frame to avoid 26 redundant calls/sec
    const manager = vrm.expressionManager || vrm.blendShapeProxy;
    if (manager) {
        for (const e in activeExpressions) {
            try { manager.setValue(e, 0); } catch (_) {}
        }
    }
    activeExpressions = {};

    // Set target expression
    const targetExprs = EXPR_MAP[expr] || [expr];
    targetExprs.forEach(e => {
        setVRMExpression(e, exprSmooth);
    });

    // Overlay smile on top of base expression when active
    if (smileIntensity > 0.01) {
        // Blend happy/joy additively — clamp to 1
        const currentHappy = exprSmooth * (expr === 'happy' ? 1 : 0.3);
        const blendedSmile = Math.min(1, currentHappy + smileIntensity * 0.7);
        setVRMExpression('happy', blendedSmile);
        setVRMExpression('joy', blendedSmile);
        setVRMExpression('Joy', blendedSmile);
    }

    // Auto-blink: blink during all animations except when yawning
    if (expr !== 'yawn') {
        // Reduce blink when smile-squint is active (squinted eyes look closed)
        const blinkBase = Math.max(0, 1 - Math.abs(Math.sin(t * 0.37) * 20));
        // Smile squint: eyes naturally narrow. We add blink_l/blink_r offset.
        const squintAmt = smileSquintSmooth;
        const blinkFinal = Math.min(1, blinkBase + squintAmt);
        setVRMExpression('blink',      blinkFinal);
        setVRMExpression('Blink',      blinkFinal);
        setVRMExpression('blink_l',    blinkFinal);
        setVRMExpression('blink_r',    blinkFinal);
        setVRMExpression('blinkLeft',  blinkFinal);
        setVRMExpression('blinkRight', blinkFinal);
    } else {
        // Yawn: rising open-mouth (aa) + progressive squint (blink)
        // exprSmooth drives the yawn progress (0 → 1 as animation starts)
        const yawnMouth  = exprSmooth * 0.90;          // wide open
        const yawnSquint = exprSmooth * 0.65;          // half-closed eyes
        setVRMExpression('aa',         yawnMouth);
        setVRMExpression('a',          yawnMouth);
        setVRMExpression('A',          yawnMouth);
        setVRMExpression('blink',      yawnSquint);
        setVRMExpression('Blink',      yawnSquint);
        setVRMExpression('blink_l',    yawnSquint);
        setVRMExpression('blink_r',    yawnSquint);
        setVRMExpression('blinkLeft',  yawnSquint);
        setVRMExpression('blinkRight', yawnSquint);
    }

    // Chatbot Lipsync — mouth moves only when the chatbot is actually speaking
    if (window.chatbotTalking) {
        // ~6 syllable cycles per second — natural speech rhythm
        const talkMouth = Math.abs(Math.sin(t * 6.0)) * 0.65;
        const talkIh    = Math.abs(Math.sin(t * 6.0 + 1.8)) * 0.28;
        setVRMExpression('aa', talkMouth);
        setVRMExpression('a',  talkMouth);
        setVRMExpression('A',  talkMouth);
        setVRMExpression('ih', talkIh);
        setVRMExpression('i',  talkIh);
    } else {
        // Always hard-close the mouth when not talking — prevents avatar mutter
        setVRMExpression('aa', 0);
        setVRMExpression('a',  0);
        setVRMExpression('A',  0);
        setVRMExpression('ih', 0);
        setVRMExpression('i',  0);
    }

    // Dist from cursor to the character on screen
    const vrmScreenPos = vrm.scene.position.clone();
    vrmScreenPos.y += 1.0; // approximate center of character (chest)
    vrmScreenPos.project(camera);
    const dx = cursor.nx - vrmScreenPos.x;
    const dy = cursor.ny - vrmScreenPos.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    const isHovering = (dist < 0.8 && !isDragging) || window.chatbotTalking;
    hoverBlend = lerp(hoverBlend, isHovering ? 1 : 0, dt * 6);

    // Combined head/neck tracking and wander looking around
    // Wander sways (pseudo-random looking around when idle and not talking)
    let wanderX = 0;
    let wanderY = 0;
    if (currentKey && currentKey.includes('Idle') && !window.chatbotTalking) {
        wanderX = Math.sin(t * 0.6) * 0.15 + Math.sin(t * 1.3) * 0.05;
        wanderY = Math.sin(t * 0.4) * 0.10 + Math.cos(t * 1.1) * 0.05;
    }

    const headRotOffset = 0;
    const targetHY = lerp(wanderX, cursor.nx * 0.18, hoverBlend);
    const targetHX = lerp(-wanderY, cursor.ny * 0.12, hoverBlend);
    const targetNY = lerp(wanderX * 0.6, cursor.nx * 0.08, hoverBlend);
    const targetNX = lerp(-wanderY * 0.6, cursor.ny * 0.08, hoverBlend);

    sHY = lerp(sHY, targetHY, dt * 4);
    sHX = lerp(sHX, targetHX, dt * 4);
    sNY = lerp(sNY, targetNY, dt * 3.5);
    sNX = lerp(sNX, targetNX, dt * 3.5);

    // Override head/neck rotation for "No" animation to look straight at user
    if (currentKey === ANIM.no) {
        sHX = 0;
        sHY = 0;
        sNX = 0;
        sNY = 0;
    }

    addNorm(vrm, 'head', sHX, sHY, 0);
    addNorm(vrm, 'neck', sNX, sNY, 0);
    
    // Drag "dangling" physics override
    dragBlend = lerp(dragBlend, isDragging ? 1 : 0, dt * 8);
    if (dragBlend > 0.01) {
        const override = (boneName, rx, ry, rz) => {
            const b = vrm.humanoid?.getNormalizedBoneNode(boneName);
            if (!b) return;
            const targetQ = new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz));
            b.quaternion.slerp(targetQ, dragBlend);
        };
        override('spine', 0.2, 0, 0);
        override('leftUpperArm', 0, 0, 1.2);
        override('rightUpperArm', 0, 0, -1.2);
        override('leftLowerArm', 0.1, 0, 0);
        override('rightLowerArm', 0.1, 0, 0);
        override('leftUpperLeg', 0.1, 0, 0.05); 
        override('rightUpperLeg', 0.1, 0, -0.05);
        override('leftLowerLeg', 0.1, 0, 0);
        override('rightLowerLeg', 0.1, 0, 0);
    }

    // Wrist angle tweak during wave1 — rotate right wrist/forearm for natural wave
    if (currentKey === ANIM.wave1) {
        const rHand = vrm.humanoid?.getNormalizedBoneNode('rightHand');
        if (rHand) {
            rHand.rotation.z = lerp(rHand.rotation.z ?? 0, -0.45, dt * 3); // Bend hand
            rHand.rotation.x = lerp(rHand.rotation.x ?? 0, -1.0, dt * 3);  // Twist wrist to face palm front
            rHand.rotation.y = lerp(rHand.rotation.y ?? 0, 0.5, dt * 3);   // Adjust angle slightly
        }
        const rLower = vrm.humanoid?.getNormalizedBoneNode('rightLowerArm');
        if (rLower) rLower.rotation.z = lerp(rLower.rotation.z ?? 0, 0.3, dt * 3);
    }

    if (!isDragging) {
        // Always smoothly rotate to face the user's camera view regardless of drop position
        const targetFaceRot = Math.PI + Math.atan2(camera.position.x - vrm.scene.position.x, camera.position.z - vrm.scene.position.z);
        vrm.scene.rotation.y = lerp(vrm.scene.rotation.y, targetFaceRot, dt * 5);
    }

    // Update VRM SpringBones — dt * 0.18 for stiffer, less floppy cloth
    vrm.update(dt * 0.18);
    renderer.render(scene, camera);
}
animate();

// ─── UTILS ──────────────────────────────────────────────────────────────────── 

function addNorm(vrm, name, dx, dy, dz) {
    const b = vrm.humanoid?.getNormalizedBoneNode(name);
    if (!b) return;
    b.rotation.x += dx; b.rotation.y += dy; b.rotation.z += dz;
}
function lerp(a, b, t) { return a + (b-a) * Math.min(1,t); }

// ─── AVATAR SWITCHER ──────────────────────────────────────────────────────────
let activeSwitchReqId = 0;
window.switchVRM = function(modelPath) {
    if (!modelPath) return;
    const thisReqId = ++activeSwitchReqId;
    const loadingEl = document.getElementById('vrm-loading');
    if (loadingEl) {
        loadingEl.classList.add('active');
        loadingEl.style.display = 'flex';
        void loadingEl.offsetWidth; // force reflow
        loadingEl.style.opacity = '1';
        const pctEl = document.getElementById('vrm-loading-pct');
        const barEl = document.getElementById('vrm-loading-bar');
        const textEl = loadingEl.querySelector('.loading-text');
        if (textEl) textEl.textContent = 'SWITCHING AVATAR...';
        if (pctEl) pctEl.textContent = '0%';
        if (barEl) barEl.style.width = '0%';
    }

    let savedPosition = null;
    let savedSitting = false;
    let savedHasDragged = false;

    // 1. Instantly tear down current model and remove from scene
    if (vrm && vrm.scene) {
        savedPosition = vrm.scene.position.clone();
        savedSitting = isSittingOnChatbox;
        savedHasDragged = hasDragged;
        
        clearAutoTimer();
        if (mixer) { mixer.stopAllAction(); mixer.uncacheRoot(vrm.scene); }
        scene.remove(vrm.scene);
        VRMUtils.deepDispose(vrm.scene);
        vrm = null; 
        mixer = null;
    }

    // Double-check: ensure NO other VRM models linger in the scene
    const existingModels = scene.children.filter(c => c.userData?.vrm || c.isVRM || (c.type === 'Group' && c !== window.lookAtTargetObj));
    existingModels.forEach(m => {
        scene.remove(m);
        try { VRMUtils.deepDispose(m); } catch(e){}
    });

    // Reset animation and state
    Object.keys(clips).forEach(k => delete clips[k]);
    Object.keys(actions).forEach(k => delete actions[k]);
    currentAction = null; currentKey = '';
    introComplete = false;
    exprSmooth = 0; dragBlend = 0; hoverBlend = 0;
    fingerPoseCurrent = { ...FINGER_POSES.idle };
    fingerPoseTarget  = { ...FINGER_POSES.idle };

    // 2. Load new model
    const newLoader = new GLTFLoader();
    newLoader.register(p => new VRMLoaderPlugin(p));
    newLoader.load(window.getAvatarUrl ? window.getAvatarUrl(modelPath) : modelPath, async gltf => {
        if (thisReqId !== activeSwitchReqId) {
            // A newer switch request was triggered; discard this model
            try { VRMUtils.deepDispose(gltf.scene); } catch(e){}
            return;
        }

        vrm = gltf.userData.vrm;
        if (VRMUtils?.rotateVRM0) VRMUtils.rotateVRM0(vrm);
        
        configureVRMPhysics(vrm, modelPath);
        applyModelVisuals(vrm, modelPath);
        fixVRMHitbox(vrm);

        const currentScale = window.currentVRMScale || (isMobile ? 0.65 : 0.95);
        vrm.scene.scale.set(currentScale, currentScale, currentScale);
        
        if (savedPosition) {
            vrm.scene.position.copy(savedPosition);
            isSittingOnChatbox = isMobile ? false : savedSitting;
            hasDragged = savedHasDragged;
        } else {
            vrm.scene.position.set(0, -0.97, 0);
            updateCharPos();
            hasDragged = false;
        }
        
        vrm.scene.rotation.y = Math.PI;

        mixer = new THREE.AnimationMixer(vrm.scene);
        mixer.addEventListener('finished', () => { clearAutoTimer(); returnToIdle(); });

        const extraToLoad = [];
        if (savedSitting && !isMobile) {
            extraToLoad.push(ANIM.sit2);
        }
        await loadEssentialAnimations(vrm, extraToLoad);

        if (savedSitting && !isMobile) {
            applyState('happyIdle', 'relaxed', 0.55);
            playAnim(ANIM.sit2, true, 0);
            isSittingOnChatbox = true;
        } else {
            applyState('idle', 'happy', 0.6);
            playAnim(ANIM.idle, true, 0);
        }

        mixer.update(0);
        vrm.scene.updateMatrixWorld(true);
        vrm.update(0);

        // Add the new model to the scene
        scene.add(vrm.scene);

        renderFramesAfterSwitch = 0;
        introComplete = true;

        if (loadingEl) {
            loadingEl.style.opacity = '0';
            setTimeout(() => {
                loadingEl.classList.remove('active');
                loadingEl.style.display = 'none';
            }, 300);
        }

        loadBackgroundAnimations(vrm);
    }, xhr => {
        if (loadingEl && thisReqId === activeSwitchReqId) {
            loadingEl.classList.add('active');
            loadingEl.style.display = 'flex';
            loadingEl.style.opacity = '1';
            const totalSize = AVATAR_SIZES[modelPath] || 31422968;
            const pct = xhr.total ? Math.round((xhr.loaded / xhr.total) * 100) : Math.min(100, Math.round((xhr.loaded / totalSize) * 100));
            const pctEl = document.getElementById('vrm-loading-pct');
            const barEl = document.getElementById('vrm-loading-bar');
            if (pctEl) pctEl.textContent = `${pct}%`;
            if (barEl) barEl.style.width = `${pct}%`;
        }
    }, err => {
        console.error('switchVRM failed:', err);
        if (loadingEl && thisReqId === activeSwitchReqId) {
            const textEl = loadingEl.querySelector('.loading-text');
            if (textEl) textEl.textContent = 'Failed to load model.';
            setTimeout(() => {
                loadingEl.classList.remove('active');
                loadingEl.style.opacity = '0';
                setTimeout(() => { loadingEl.style.display = 'none'; }, 300);
            }, 2000);
        }
    });
};


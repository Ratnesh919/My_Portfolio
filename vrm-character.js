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

// Split animations into Essential (for instant rendering/welcome) and Background pools
const ESSENTIAL_ANIMS = [ANIM.idle, ANIM.wave1, ANIM.wave2, ANIM.no];
const BACKGROUND_ANIMS = isMobile ? [] : ALL_ANIM_FILES.filter(f => !ESSENTIAL_ANIMS.includes(f));

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
// Set pixel ratio: on mobile use 60% of devicePixelRatio (min 1.0, max 2.0); on desktop cap at 2.0
renderer.setPixelRatio(isMobile ? Math.min(Math.max(1.0, window.devicePixelRatio * 0.6), 2.0) : Math.min(window.devicePixelRatio, 2));
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
    // Position on far left side (where the avatar button used to be)
    let xTarget = -(width / 2) + 0.7;
    if (xTarget > 0) xTarget = 0; // safe fallback
    vrm.scene.position.x = xTarget;
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
vrmLoader.load(window.getAvatarUrl ? window.getAvatarUrl(initialFile) : initialFile, async gltf => {
    vrm = gltf.userData.vrm;
    if (VRMUtils?.rotateVRM0) VRMUtils.rotateVRM0(vrm);

    configureVRMPhysics(vrm, initialFile);
    applyModelVisuals(vrm, initialFile);
    fixVRMHitbox(vrm);   // always expand skinned-mesh hitboxes for reliable drag

    window.currentVRMScale = window.currentVRMScale || (isMobile ? 0.7 : 0.95);
    window.setVRMScale = (scale) => {
        window.currentVRMScale = scale;
        if (vrm) vrm.scene.scale.setScalar(scale);
    };
    // Relative scale: multiplier e.g. 1.2 = +20%, 0.8 = -20%
    window.adjustVRMScale = (multiplier) => {
        const next = Math.min(1.8, Math.max(0.3, (window.currentVRMScale || (isMobile ? 0.7 : 0.95)) * multiplier));
        window.setVRMScale(next);
        return next; // Return so UI can sync slider
    };


    // Live brightness controls exposed to UI sliders
    window.setVRMBrightness = (val) => {
        ambientLight.intensity = ambientLight.userData.baseIntensity * val;
        dirLights.forEach(l => { l.intensity = l.userData.baseIntensity * val; });
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
        if (textEl) textEl.textContent = 'Decrypting Animations...';
    }

    await loadEssentialAnimations(vrm);

    // Step 1: Start idle immediately
    applyState('idle', 'happy', 0.6);
    playAnim(ANIM.idle, true, 0);

    // Force an update with 0 delta to pose bones immediately
    mixer.update(0);
    vrm.scene.updateMatrixWorld(true);
    vrm.update(0);

    // Add to scene only after mixer has posed the character
    scene.add(vrm.scene);
    
    if (siteLoaderEl) { 
        siteLoaderEl.classList.add('hidden');
        setTimeout(() => siteLoaderEl?.remove(), 800); 
    }

    // Step 2: Load the remaining animations in the background
    loadBackgroundAnimations(vrm);

    // Global helper so chatbot can trigger wave if needed
    window.playWaveAnimation = () => {
        const wave1Key = ANIM.wave1;
        
        // Prevent restarting the wave if it's already playing, avoiding Three.js crossFade issues
        if (currentKey === wave1Key || currentKey === ANIM.wave2) return; 
        
        // Clear any stale auto-timer to prevent ghost playRandomAnim calls
        clearAutoTimer();

        let wave1Action = actions[wave1Key];
        currentKey = null;
        applyState('wave', 'happy', 0.85);

        if (wave1Action) {
            playAnim(wave1Key, false, 0.35);
        } else if (actions[ANIM.wave2]) {
            playAnim(ANIM.wave2, false, 0.35);
        }
    };

    // Bubble Intro Logic (Forces user interaction for audio autoplay)
    const bubbleScreen = document.getElementById('bubble-screen');
    const bubbleContainer = document.getElementById('bubble-container');
    
    if (bubbleScreen && bubbleContainer) {
        const bubbleInterval = isMobile ? 1800 : 800;
        let spawnInterval = setInterval(() => {
            const b = document.createElement('div');
            b.className = 'bubble-item';
            const size = 30 + Math.random() * 70;
            b.style.width = size + 'px';
            b.style.height = size + 'px';
            b.style.left = (5 + Math.random() * 85) + 'vw';
            
            const minDur = isMobile ? 8 : 4;
            const extraDur = isMobile ? 6 : 4;
            b.style.animationDuration = (minDur + Math.random() * extraDur) + 's';
            
            b.addEventListener('pointerdown', (e) => {
                clearInterval(spawnInterval);
                document.querySelectorAll('.bubble-item').forEach(bbl => bbl.style.opacity = '0');

                const cx = e.clientX;
                const cy = e.clientY;
                const r  = b.getBoundingClientRect().width * 0.5;

                // 4 crack-lines radiating outward
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI;
                    const len   = r * (1.1 + Math.random() * 0.4);
                    const line  = document.createElement('div');
                    line.className = 'bubble-crack-line';
                    line.style.cssText = `left:${cx}px;top:${cy}px;width:${len*2}px;height:${1+Math.random()}px;margin-left:${-len}px;margin-top:-0.5px;background:linear-gradient(90deg,transparent 0%,rgba(200,235,255,0.9) 30%,rgba(255,255,255,1) 50%,rgba(200,235,255,0.9) 70%,transparent 100%);transform:rotate(${angle}rad) scaleX(0);animation-delay:${i*0.03}s;`;
                    document.body.appendChild(line);
                    setTimeout(() => line.remove(), 500);
                }

                // 6 tiny mist droplets
                for (let i = 0; i < 6; i++) {
                    const angle = (i / 6) * 2 * Math.PI + Math.random() * 0.4;
                    const dist  = r * (0.5 + Math.random() * 0.8);
                    const tx    = Math.cos(angle) * dist;
                    const ty    = Math.sin(angle) * dist;
                    const sz    = 2 + Math.random() * 3;
                    const mist  = document.createElement('div');
                    mist.className = 'bubble-mist-dot';
                    mist.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;margin-left:${-sz/2}px;margin-top:${-sz/2}px;`;
                    document.body.appendChild(mist);
                    requestAnimationFrame(() => { mist.style.transform = `translate(${tx}px,${ty}px) scale(0)`; });
                    setTimeout(() => mist.remove(), 550);
                }

                setTimeout(() => {
                    bubbleScreen.classList.add('hidden');
                    setTimeout(() => {
                        bubbleScreen.remove();
                        window.playWaveAnimation();
                        if (window.chatBot && typeof window.chatBot.introduceHerself === 'function') {
                            window.chatBot.introduceHerself();
                        }
                    }, 400);
                }, 280);
            });
            bubbleContainer.appendChild(b);
            // Remove bubbles that float off screen to prevent DOM buildup
            const removeDelay = isMobile ? 16000 : 9000;
            setTimeout(() => { if (b.parentNode) b.remove(); }, removeDelay);
        }, bubbleInterval);
    } else {
        // Fallback if no bubble screen exists
        setTimeout(async () => {
            if (hasDragged || isDragging) return;
            window.playWaveAnimation();
            if (window.chatBot && typeof window.chatBot.introduceHerself === 'function') {
                window.chatBot.introduceHerself();
            }
        }, 1500);
    }


}, xhr => {
    const siteLoaderEl = document.getElementById('site-loader');
    if (siteLoaderEl) {
        const totalSize = xhr.total || AVATAR_SIZES[initialFile] || 31422968;
        const pct = Math.min(100, Math.round((xhr.loaded / totalSize) * 100));
        const pctEl = document.getElementById('site-loader-pct');
        const barEl = document.getElementById('site-loader-bar');
        const textEl = document.getElementById('site-loader-text');
        
        if (pctEl) pctEl.textContent = `${pct}%`;
        if (barEl) barEl.style.width = `${pct}%`;
        if (textEl && pct === 100) textEl.textContent = 'Processing Asset...';
    }
}, err => {
    console.error(err);
    const siteLoaderEl = document.getElementById('site-loader');
    if (siteLoaderEl) {
        const textEl = document.getElementById('site-loader-text');
        if (textEl) textEl.textContent = 'Failed to load system.';
    }
});

const fbxLoader = new FBXLoader();

async function loadEssentialAnimations(vrmInstance, extraAnims = []) {
    console.log('[VRM] Loading essential animations in parallel...');
    const animsToLoad = [...ESSENTIAL_ANIMS, ...extraAnims];
    const uniqueAnims = Array.from(new Set(animsToLoad));
    await Promise.all(uniqueAnims.map(async (file) => {
        try {
            const fbx = await new Promise((res, rej) => fbxLoader.load(file, res, undefined, rej));
            if (vrm !== vrmInstance) {
                console.warn('[VRM] Model changed during essential animation load:', file);
                return;
            }
            const clip = retargetMixamoToVRM(fbx, vrmInstance, file);
            if (clip) {
                // Guard: discard clips with near-zero duration (retarget failure)
                if (clip.duration < 0.1) {
                    console.warn('[VRM] Discarding clip with near-zero duration:', file, clip.duration);
                    return;
                }
                clips[file] = clip;
                actions[file] = mixer.clipAction(clip);
                console.log('[VRM] ✓ Loaded Essential:', file, '| Duration:', clip.duration.toFixed(2) + 's');
            } else {
                console.error('[VRM] ✗ retarget returned null for:', file);
            }
        } catch (e) {
            console.error('[VRM] ✗ Essential FBX load failed:', file, e.message || e);
        }
    }));
    console.log('[VRM] Essential animations loaded.');
}

async function loadBackgroundAnimations(vrmInstance) {
    if (isMobile) {
        console.log('[VRM] Skipping background animation loading on mobile to save bandwidth and memory.');
        return;
    }
    // 1 second delay to prioritize main thread rendering
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('[VRM] Loading background animations asynchronously...');
    for (const file of BACKGROUND_ANIMS) {
        try {
            // Check if model changed before each load
            if (vrm !== vrmInstance) {
                console.warn('[VRM] Model changed, stopping background animation load:', file);
                return;
            }
            
            // Skip if already loaded (e.g. if loaded via extraAnims)
            if (clips[file]) {
                console.log('[VRM] Skipping background load for already loaded animation:', file);
                continue;
            }
            
            const fbx = await new Promise((res, rej) => fbxLoader.load(file, res, undefined, rej));
            
            // Check again after load completes
            if (vrm !== vrmInstance) {
                console.warn('[VRM] Model changed after loading file, discarding:', file);
                return;
            }
            
            const clip = retargetMixamoToVRM(fbx, vrmInstance, file);
            if (clip) {
                // Guard: discard clips with near-zero duration (retarget failure)
                if (clip.duration < 0.1) {
                    console.warn('[VRM] Discarding background clip with near-zero duration:', file, clip.duration);
                } else {
                    clips[file] = clip;
                    actions[file] = mixer.clipAction(clip);
                    console.log('[VRM] ✓ Loaded Background:', file, '| Duration:', clip.duration.toFixed(2) + 's');
                }
            } else {
                console.error('[VRM] ✗ retarget returned null for:', file);
            }
            
            // 150ms delay between loading animations to yield the main thread and keep mobile memory stable
            await new Promise(resolve => setTimeout(resolve, 150));
        } catch (e) {
            console.error('[VRM] ✗ Background FBX load failed:', file, e.message || e);
        }
    }
    console.log('[VRM] Background animations loaded. Total keys:', Object.keys(actions));
}

// ─── PLAY ANIMATION ───────────────────────────────────────────────────────────
function playAnim(key, loop=true, crossFade=0.35) {
    const action = actions[key];
    if (!action || currentKey===key) return;
    action.loop              = loop ? THREE.LoopRepeat : THREE.LoopOnce;
    action.clampWhenFinished = !loop;
    
    // Globally slow down the wave animation to make it look more natural
    if (key === ANIM.wave1) {
        action.setEffectiveTimeScale(1.0); 
    } else {
        action.setEffectiveTimeScale(1.0);
    }
    
    action.reset().play();
    if (currentAction && currentAction!==action) currentAction.crossFadeTo(action, crossFade, false);
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

// After any animation ends → go to idle/sit, then schedule next auto-anim
function returnToIdle() {
    if (isSittingOnChatbox) {
        // Sitting cycle base: sit2 is the resting pose (sit1 is the expression break)
        applyState('happyIdle', 'relaxed', 0.55);
        playAnim(ANIM.sit2, true, 0.5);
        lastAnimKey = 'sit2';  // ensures pickRandom always picks sit1 next
        // Fixed 25s cycle while sitting before next sit expression
        const sitDelay = 25000; // 25s
        autoTimerId = setTimeout(playRandomAnim, sitDelay);
        // Kick off smile scheduler for sitting mode (if not already running)
        if (!smileTimerId) scheduleNextSmile();
    } else {
        applyState('idle', 'happy', 0.6);
        playAnim(ANIM.idle, true, 0.5);
        introComplete = true;
        // Fixed 25s wait before the next random animation fires
        const delay = 25000;   // 25s
        autoTimerId = setTimeout(playRandomAnim, delay);
        // Kick off smile scheduler when entering idle (if not already running)
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

    const pick = pickRandom();

    // Safety guard: skip animations whose clip hasn't loaded or has near-zero duration
    const clipKey = ANIM[pick.key];
    const clip = clips[clipKey];
    if (!clip || clip.duration < 0.3) {
        console.warn('[VRM] Skipping animation with missing/short clip:', pick.key);
        // Just return to idle if no valid clip
        returnToIdle();
        return;
    }

    applyState(pick.fingerPose, pick.expr, pick.exprVal);
    playAnim(ANIM[pick.key], pick.loop, 0.4);

    if (pick.loop) {
        // Looping animation: cap at maxDuration, then return to idle
        const cap = (pick.maxDuration ?? 7) * 1000;
        autoTimerId = setTimeout(() => {
            returnToIdle();
        }, cap);
    }
    // One-shot: 'finished' event on mixer will call returnToIdle() naturally
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
                // Cycle to sit1 after exactly 25s, then sit2 again, etc.
                autoTimerId = setTimeout(() => playRandomAnim(), 25000);
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
    renderer.render(scene, camera);
    
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
            // EXCEPTION: if the intro wave1 is currently playing, never interrupt it.
            // wave1 + intro speech run simultaneously; wave1 finishes → idle naturally.
            if (currentKey === ANIM.wave1) {
                // do nothing — let wave1 play to completion
            } else if (isSittingOnChatbox) {
                if (currentKey !== ANIM.sit2) {
                    clearAutoTimer();
                    applyState('happyIdle', 'happy', 0.85);
                    playAnim(ANIM.sit2, true, 0.5);
                }
            } else {
                // Stay in current idle during talking — just update expression
                // (No animation change needed; lip-sync & expr are driven in the expr block)
                applyState('idle', 'happy', 0.75);
                if (currentKey !== ANIM.idle) {
                    clearAutoTimer();
                    playAnim(ANIM.idle, true, 0.5);
                }
            }
        } else {
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

    // Chatbot Lipsync (fake talking) — tuned to ~165 WPM / rate 1.10
    if (window.chatbotTalking) {
        // Primary open-vowel: ~8.5 cycles/s → matches syllable rate at 165 WPM
        const talkMouth = Math.abs(Math.sin(t * 8.5)) * 0.75;
        // Secondary vowel for realism: offset phase, lower amplitude
        const talkIh    = Math.abs(Math.sin(t * 8.5 + 1.8)) * 0.35;
        setVRMExpression('aa', talkMouth);
        setVRMExpression('a',  talkMouth);
        setVRMExpression('A',  talkMouth);
        setVRMExpression('ih', talkIh);
        setVRMExpression('i',  talkIh);
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
window.switchVRM = function(modelPath) {
    const loadingEl = document.getElementById('vrm-loading');
    if (loadingEl) {
        loadingEl.style.display = 'flex';
        void loadingEl.offsetWidth; // force reflow
        loadingEl.style.opacity = '1';
        const pctEl = document.getElementById('vrm-loading-pct');
        const barEl = document.getElementById('vrm-loading-bar');
        const textEl = loadingEl.querySelector('.loading-text');
        if (textEl && textEl.firstChild) textEl.firstChild.textContent = 'SWITCHING AVATAR... ';
        if (pctEl) pctEl.textContent = '0%';
        if (barEl) barEl.style.width = '0%';
    }

    let savedPosition = null;
    let savedSitting = false;
    let savedHasDragged = false;

    setTimeout(() => {
        // 1. Tear down current model
        if (vrm) {
            savedPosition = vrm.scene.position.clone();
            savedSitting = isSittingOnChatbox;
            savedHasDragged = hasDragged;
            
            clearAutoTimer();
            if (mixer) { mixer.stopAllAction(); mixer.uncacheRoot(vrm.scene); }
            scene.remove(vrm.scene);
            
            // Manual deep disposal of Three.js textures, materials, and geometries
            vrm.scene.traverse((ob) => {
                if (ob.isMesh) {
                    if (ob.geometry) ob.geometry.dispose();
                    if (ob.material) {
                        if (Array.isArray(ob.material)) {
                            ob.material.forEach(m => {
                                m.dispose();
                                Object.keys(m).forEach(k => {
                                    if (m[k] && typeof m[k].dispose === 'function') m[k].dispose();
                                });
                            });
                        } else {
                            ob.material.dispose();
                            Object.keys(ob.material).forEach(k => {
                                if (ob.material[k] && typeof ob.material[k].dispose === 'function') ob.material[k].dispose();
                            });
                        }
                    }
                }
            });
            
            VRMUtils.deepDispose(vrm.scene);
            vrm = null; mixer = null;
            
            // Force immediate GPU context clean and command flush to prevent mobile crashes
            if (typeof renderer !== 'undefined' && renderer) {
                try { renderer.render(scene, camera); } catch(e) {}
            }
        }

        // Reset state
        Object.keys(clips).forEach(k => delete clips[k]);
        Object.keys(actions).forEach(k => delete actions[k]);
        currentAction = null; currentKey = '';
        introComplete = false; hasDragged = false;
        exprSmooth = 0; dragBlend = 0; hoverBlend = 0;
        sHX = 0; sHY = 0; sNX = 0; sNY = 0;
        fingerPoseCurrent = { ...FINGER_POSES.idle };
        fingerPoseTarget  = { ...FINGER_POSES.idle };

        // 2. Load new model
        const newLoader = new GLTFLoader();
        newLoader.register(p => new VRMLoaderPlugin(p));
        newLoader.load(window.getAvatarUrl ? window.getAvatarUrl(modelPath) : modelPath, async gltf => {
        vrm = gltf.userData.vrm;
        if (VRMUtils?.rotateVRM0) VRMUtils.rotateVRM0(vrm);
        
        configureVRMPhysics(vrm, modelPath);
        applyModelVisuals(vrm, modelPath);
        fixVRMHitbox(vrm);  // always expand hitboxes so drag works in any pose
        vrm.scene.scale.setScalar(window.currentVRMScale || (isMobile ? 0.7 : 0.95));
        
        if (savedPosition) {
            vrm.scene.position.copy(savedPosition);
            isSittingOnChatbox = isMobile ? false : savedSitting;
            hasDragged = savedHasDragged;
        } else {
            vrm.scene.position.set(0, -0.97, 0);
            updateCharPos();
            hasDragged = false;
        }
        
        // Base rotation initialized to facing camera (Math.PI) to match initial load
        vrm.scene.rotation.y = Math.PI;

        mixer = new THREE.AnimationMixer(vrm.scene);
        mixer.addEventListener('finished', () => { clearAutoTimer(); returnToIdle(); });
        if (loadingEl) {
            loadingEl.style.display = 'flex';
            loadingEl.style.opacity = '1';
            const pctEl = document.getElementById('vrm-loading-pct');
            if (pctEl) pctEl.textContent = 'ANIMATIONS...';
        }
        const extraToLoad = [];
        if (savedSitting && !isMobile) {
            extraToLoad.push(ANIM.sit2);
        }
        await loadEssentialAnimations(vrm, extraToLoad);

        // Restore animation state after switch
        if (savedSitting && !isMobile) {
            // Restore sitting state — re-enter sit2 at the saved Y position
            applyState('happyIdle', 'relaxed', 0.55);
            playAnim(ANIM.sit2, true, 0);
            isSittingOnChatbox = true;
        } else {
            applyState('idle', 'happy', 0.6);
            playAnim(ANIM.idle, true, 0);
        }

        // Force update and matrix world calculation before adding to scene
        mixer.update(0);
        vrm.scene.updateMatrixWorld(true);
        vrm.update(0);

        // NOW add the model to the scene so it renders already in the correct pose
        scene.add(vrm.scene);

        // Trigger frame-counting delay to hide the loading overlay
        renderFramesAfterSwitch = 0;
        introComplete = true;  // unlock drag immediately — no wave on switch

        // Load background animations
        loadBackgroundAnimations(vrm);
    }, xhr => {
        if (loadingEl) {
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
        if (loadingEl) {
            const textEl = loadingEl.querySelector('.loading-text');
            if (textEl) textEl.textContent = 'Failed to load model.';
        }
    });
    }, 400); // Wait 400ms for UI blur effect to render
};


import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Sun, 
  Layers, 
  UserCheck,
  Play,
  Eye,
  EyeOff,
  Maximize2
} from 'lucide-react';

interface AvatarStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  onSelectAvatar: (avatarId: string) => void;
}

export const AVATAR_CHARACTERS = [
  { id: 'changli', name: 'Changli (Default)', file: './Wuwa/changli(fixed).vrm', accent: '#a855f7', role: 'Blazing Swordmistress' },
  { id: 'camellya', name: 'Camellya', file: './Wuwa/CamellyaV1.vrm', accent: '#ec4899', role: 'Bloom Specialist' },
  { id: 'carlotta', name: 'Carlotta', file: './Wuwa/CarlottaV1.vrm', accent: '#38bdf8', role: 'Frost Marksman' },
  { id: 'chixia', name: 'Chixia', file: './Wuwa/chixia.vrm', accent: '#ef4444', role: 'Dual Gunner' },
  { id: 'jinshi', name: 'Jinhsi', file: './Wuwa/jinshi.vrm', accent: '#fbbf24', role: 'Magistrate of Jinzhou' },
  { id: 'kid-changli', name: 'Kid Changli', file: './Wuwa/Kid changli.vrm', accent: '#c084fc', role: 'Apprentice Adept' },
  { id: 'pinkshi', name: 'Pinkshi', file: './Wuwa/PinkshiV1.vrm', accent: '#f472b6', role: 'Special Edition' },
  { id: 'roccia', name: 'Roccia', file: './Wuwa/RocciaV3.vrm', accent: '#f59e0b', role: 'Geo Heavy' },
  { id: 'rover', name: 'Rover', file: './Wuwa/rover.vrm', accent: '#818cf8', role: 'Resonator Protagonist' },
  { id: 'sanhua', name: 'Sanhua', file: './Wuwa/SanhuaV2.vrm', accent: '#22d3ee', role: 'Glacio Guard' },
  { id: 'shorekeeper', name: 'Shorekeeper', file: './Wuwa/ShorekeeperV3.vrm', accent: '#60a5fa', role: 'Black Shores Guide' },
  { id: 'verina', name: 'Verina', file: './Wuwa/verina.vrm', accent: '#4ade80', role: 'Botanist Healer' },
  { id: 'yangyang', name: 'Yangyang', file: './Wuwa/yangyang.vrm', accent: '#38bdf8', role: 'Aero Outrider' },
  { id: 'yinlin', name: 'Yinlin', file: './Wuwa/yinlin.vrm', accent: '#e879f9', role: 'Electro Puppeteer' },
];

export const AVATAR_ANIMATIONS = [
  { id: 'idle', label: 'Default Idle' },
  { id: 'wave', label: 'Wave / Greeting' },
  { id: 'happy', label: 'Happy Bounce' },
  { id: 'excited', label: 'Excited Jump' },
  { id: 'sitting', label: 'Sitting Relaxed' },
  { id: 'yawn', label: 'Yawn & Stretch' },
];

export const AvatarStudioModal: React.FC<AvatarStudioModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar
}) => {
  const [selectedChar, setSelectedChar] = useState<string>(currentAvatar || 'changli');
  const [selectedAnim, setSelectedAnim] = useState<string>('idle');
  const [avatarScale, setAvatarScale] = useState<number>(() => (window as any).currentVRMScale || 0.95);
  const [isAvatarVisible, setIsAvatarVisible] = useState<boolean>(() => (window as any).vrmEnabled !== false);
  const [brightness, setBrightness] = useState<number>(1.0);

  if (!isOpen) return null;

  const handleSelectCharacter = (charId: string) => {
    setSelectedChar(charId);
    onSelectAvatar(charId);
    const charObj = AVATAR_CHARACTERS.find(c => c.id === charId);
    if (charObj) {
      if ((window as any).switchVRM) {
        (window as any).switchVRM(charObj.file);
      }
    }
  };

  const handleTriggerAnimation = (animId: string) => {
    setSelectedAnim(animId);
    if ((window as any).playVRMAnimation) {
      (window as any).playVRMAnimation(animId);
    } else if (animId === 'wave' && (window as any).playWaveAnimation) {
      (window as any).playWaveAnimation();
    }
  };

  const handleScaleChange = (newScale: number) => {
    setAvatarScale(newScale);
    if ((window as any).setVRMScale) {
      (window as any).setVRMScale(newScale);
    }
  };

  const handleToggleVisibility = () => {
    const nextVal = !isAvatarVisible;
    setIsAvatarVisible(nextVal);
    if ((window as any).setVRMVisibility) {
      (window as any).setVRMVisibility(nextVal);
    }
  };

  const handleBrightnessChange = (val: number) => {
    setBrightness(val);
    if ((window as any).setVRMBrightness) {
      (window as any).setVRMBrightness(val);
    }
  };

  const handleApply = () => {
    onSelectAvatar(selectedChar);
    const charObj = AVATAR_CHARACTERS.find(c => c.id === selectedChar);
    if (charObj && (window as any).switchVRM) {
      (window as any).switchVRM(charObj.file);
    }
    if ((window as any).playWaveAnimation) {
      (window as any).playWaveAnimation();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#1c122e] via-[#130b20] to-[#0d0716] border border-purple-500/30 p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.25)] z-10 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white border border-purple-500/25 transition-all"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-[11px] font-mono text-purple-300 mb-2">
              <Sparkles size={13} />
              <span>3D Character Studio</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Avatar Studio
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1">
              Customize Raya's 3D VRM model, sizing, visibility, animations, and lighting.
            </p>
          </div>

          {/* Toggle Avatar On/Off Button */}
          <button
            onClick={handleToggleVisibility}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold border transition-all shrink-0 ${
              isAvatarVisible
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'bg-rose-950/70 border-rose-500/40 text-rose-300 hover:bg-rose-900/80 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
            }`}
          >
            {isAvatarVisible ? <Eye size={15} /> : <EyeOff size={15} />}
            <span>{isAvatarVisible ? 'Avatar Active' : 'Avatar Disabled'}</span>
          </button>
        </div>

        {/* Grid of 14 Wuwa VRM Characters */}
        <div className="mb-6">
          <h3 className="text-xs font-mono uppercase text-purple-400 font-bold mb-3 flex items-center gap-1.5">
            <Layers size={14} />
            <span>Select 3D Resonator Persona (14 Models Available)</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1 scrollbar-thin">
            {AVATAR_CHARACTERS.map((char) => {
              const isSelected = selectedChar === char.id;
              return (
                <button
                  key={char.id}
                  onClick={() => handleSelectCharacter(char.id)}
                  className={`p-3 rounded-2xl flex flex-col items-start gap-1 text-left transition-all duration-200 relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-b from-purple-900/80 to-purple-950/60 border-2 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'bg-[#150e24] border border-purple-500/20 hover:border-purple-500/50 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: char.accent }} />
                    {isSelected && <Check size={14} className="text-purple-300" />}
                  </div>
                  <span className="text-xs font-bold mt-1 leading-tight">{char.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono truncate w-full">{char.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animation & Scale & Lighting Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Animations Picker */}
          <div className="p-4 rounded-2xl bg-[#130c20] border border-purple-500/20">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-2.5 flex items-center gap-1.5">
              <Play size={13} /> Pose & Motion Trigger
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {AVATAR_ANIMATIONS.map((anim) => (
                <button
                  key={anim.id}
                  onClick={() => handleTriggerAnimation(anim.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedAnim === anim.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-[#1a112c] text-slate-300 hover:bg-purple-950/40 border border-purple-500/20'
                  }`}
                >
                  {anim.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Scaling & Brightness Sliders */}
          <div className="p-4 rounded-2xl bg-[#130c20] border border-purple-500/20 flex flex-col justify-between gap-3">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-1 flex items-center gap-1.5">
              <Maximize2 size={13} /> Avatar Size & Illumination
            </h4>

            <div className="space-y-3">
              {/* Avatar Scale Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Avatar Size (Scale)</span>
                  <span className="font-mono text-purple-400">{Math.round(avatarScale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="1.5"
                  step="0.05"
                  value={avatarScale}
                  onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>

              {/* Base Brightness Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span className="flex items-center gap-1"><Sun size={12} /> Illumination</span>
                  <span className="font-mono text-purple-400">{brightness.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.0"
                  step="0.1"
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer (Real-time info & Reset) */}
        <div className="pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => {
              handleSelectCharacter('changli');
              handleTriggerAnimation('idle');
              handleScaleChange(0.95);
              handleBrightnessChange(1.0);
              if (!isAvatarVisible) handleToggleVisibility();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#160c26] text-slate-400 hover:text-white border border-purple-500/20 text-xs transition-all active:scale-95"
          >
            <RotateCcw size={13} /> Reset Defaults
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2 rounded-full bg-purple-900/60 hover:bg-purple-800/80 text-white font-medium border border-purple-500/30 transition-all active:scale-95 shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

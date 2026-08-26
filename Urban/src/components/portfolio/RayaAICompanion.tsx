import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Layers,
  Mic,
  MicOff,
  Music,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'raya';
  text: string;
  timestamp: string;
  action?: any;
}

interface RayaAICompanionProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAvatarStudio?: () => void;
  externalMessage?: string | null;
  onClearExternalMessage?: () => void;
  onScrollToSection?: (sectionId: string) => void;
  onChangeAvatar?: (avatarId: string) => void;
  onUpdateSpeechText?: (text: string) => void;
}

const RAYA_VOICE_CONFIG = {
  rate: 1.10,
  pitch: 1.35,
  volume: 1.0,
  preferredVoices: [
    'Microsoft Ava Online',
    'Microsoft Jenny Online',
    'Microsoft Aria Online',
    'Microsoft Zira',
    'Google UK English Female',
    'Google US English',
    'Samantha',
    'Karen',
    'Moira',
    'Tessa',
    'Victoria'
  ]
};

const WAKE_WORD_VARIANTS = [
  'hey', 'hey raya', 'raya', 'ray', 'raayaa', 'raaya', 'rya',
  'raaayooo', 'rayya', 'raayya', 'ryaa', 'ryaaa', 'raaaya', 
  'raaaaya', 'raaayaaa', 'raaaayaaaa', 'rayaaa', 'rayo', 
  'raaayoo', 'raia', 'reya', 'rhaya', 'rāya', 'rayaa', 
  'raja', 'raaja', 'rayoo'
];

function getTimeOfDayGreeting() {
  const hr = new Date().getHours();
  if (hr >= 5 && hr < 12) return "Good morning";
  if (hr >= 12 && hr < 17) return "Good afternoon";
  return "Good evening";
}

export const RayaAICompanion: React.FC<RayaAICompanionProps> = ({ 
  isOpen, 
  onClose,
  onOpenAvatarStudio,
  externalMessage,
  onClearExternalMessage,
  onScrollToSection,
  onChangeAvatar,
  onUpdateSpeechText
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'raya',
      text: `${getTimeOfDayGreeting()}! I am Raya, Ratnesh's interactive AI companion. I know everything about his ECE background, 5 core engineering pillars, real-time Web Audio DSP (±5ms), native Android MediaCodec transcoders, and verified certifications. Ask me anything or tell me to change my avatar!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [activeMusicQuery, setActiveMusicQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize Speech Synthesis Voices
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      for (const preferred of RAYA_VOICE_CONFIG.preferredVoices) {
        const found = voices.find(v => v.name.includes(preferred));
        if (found) {
          selectedVoiceRef.current = found;
          break;
        }
      }
      if (!selectedVoiceRef.current) {
        selectedVoiceRef.current = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) || voices[0] || null;
      }
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // Expose global introduction trigger
  useEffect(() => {
    (window as any).introduceRaya = () => {
      const welcomeText = `Welcome back! It's so nice to see you. I am Raya, Ratnesh's interactive AI companion. Explore his projects in Web Audio DSP, Android MediaCodec, and AI Automation, or tell me to change my avatar anytime!`;
      onUpdateSpeechText?.(welcomeText);
      speakRaya(welcomeText);
    };
  }, [voiceEnabled, onUpdateSpeechText]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle external message triggered from bottom input bar
  useEffect(() => {
    if (externalMessage) {
      handleSend(externalMessage);
      onClearExternalMessage?.();
    }
  }, [externalMessage]);

  // Speech Recognition setup with Wake Words
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: any) => {
        const lastIdx = event.results.length - 1;
        const transcript = event.results[lastIdx][0].transcript.trim().toLowerCase();

        // Check for Wake Word only
        const isOnlyWakeWord = WAKE_WORD_VARIANTS.some(w => transcript === w);
        if (isOnlyWakeWord) {
          const acks = ["Yes? I'm listening!", "I'm here, what do you need?", "How can I help you?", "Yes, go ahead!"];
          const ack = acks[Math.floor(Math.random() * acks.length)];
          speakRaya(ack);
          return;
        }

        // Clean wake words prefix from command
        let cleanPrompt = transcript;
        for (const w of WAKE_WORD_VARIANTS) {
          if (cleanPrompt.startsWith(w + ' ')) {
            cleanPrompt = cleanPrompt.replace(w + ' ', '').trim();
            break;
          }
        }

        if (cleanPrompt) {
          handleSend(cleanPrompt);
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const detectLanguage = (text: string): string => {
    if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff]/.test(text)) return 'ja-JP';
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    if (/namaste|kaise|kya|bhai|yaar|aap/i.test(text)) return 'hi-IN';
    if (/konnichiwa|arigatou|sugoi|kawaii/i.test(text)) return 'ja-JP';
    return 'en-US';
  };

  const speakRaya = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Clean markdown and emojis for clean speech
    const cleanText = text.replace(/[*#_`~[\]]/g, '').replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (selectedVoiceRef.current) utterance.voice = selectedVoiceRef.current;
    utterance.rate = RAYA_VOICE_CONFIG.rate;
    utterance.pitch = RAYA_VOICE_CONFIG.pitch;
    utterance.volume = RAYA_VOICE_CONFIG.volume;
    utterance.lang = detectLanguage(text);

    // Lipsync oscillation flag
    utterance.onstart = () => {
      (window as any).chatbotTalking = true;
    };
    utterance.onend = () => {
      (window as any).chatbotTalking = false;
    };
    utterance.onerror = () => {
      (window as any).chatbotTalking = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  // Process structured JSON Action commands
  const processActionCommands = (response: string) => {
    try {
      const match = response.match(/\{[^}]*"action"[^}]*\}/);
      if (match) {
        const cmd = JSON.parse(match[0]);
        if (cmd.action === 'scroll' && cmd.target) {
          onScrollToSection?.(cmd.target);
        } else if (cmd.action === 'change_avatar') {
          if (cmd.target) onChangeAvatar?.(cmd.target);
          else onOpenAvatarStudio?.();
        } else if (cmd.action === 'open_link' && cmd.target) {
          setTimeout(() => {
            if (cmd.target === 'instagram') window.open((PORTFOLIO_DATA as any).instagram, '_blank');
            else if (cmd.target === 'facebook') window.open((PORTFOLIO_DATA as any).facebook, '_blank');
            else if (cmd.target === 'linkedin') window.open(PORTFOLIO_DATA.linkedin, '_blank');
            else if (cmd.target === 'github') window.open(PORTFOLIO_DATA.github, '_blank');
            else if (cmd.target === 'email') window.location.href = `mailto:${PORTFOLIO_DATA.email}`;
          }, 1500);
        } else if (cmd.action === 'play_song' && cmd.query) {
          setActiveMusicQuery(cmd.query);
        }
      }
    } catch (e) {}
  };

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('avatar') || q.includes('switch character') || q.includes('wuwa') || q.includes('change character')) {
      onOpenAvatarStudio?.();
      return `Opening Avatar Studio! You can choose from 14 3D Resonator models including Changli, Camellya, Carlotta, Jinhsi, and Yinlin. {"action":"change_avatar"}`;
    }
    if (q.includes('instagram') || q.includes('insta')) {
      return `Opening Ratnesh's Instagram profile! {"action":"open_link","target":"instagram"}`;
    }
    if (q.includes('facebook') || q.includes('fb')) {
      return `Opening Ratnesh's Facebook profile! {"action":"open_link","target":"facebook"}`;
    }
    if (q.includes('linkedin')) {
      return `Opening Ratnesh's verified LinkedIn profile! {"action":"open_link","target":"linkedin"}`;
    }
    if (q.includes('github')) {
      return `Opening Ratnesh's GitHub repository hub! {"action":"open_link","target":"github"}`;
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      onScrollToSection?.('projects');
      return `Here are Ratnesh's featured engineering projects including SyncPulse, PAK Video Converter, and MediFlow. {"action":"scroll","target":"projects"}`;
    }
    if (q.includes('about') || q.includes('background') || q.includes('who is ratnesh')) {
      onScrollToSection?.('about');
      return `Ratnesh is a final-year ECE undergraduate at MAKAUT (2026) specializing in hardware-software convergence, real-time web audio DSP, and native Android media processing. {"action":"scroll","target":"about"}`;
    }
    if (q.includes('skills') || q.includes('stack')) {
      onScrollToSection?.('skills');
      return `Ratnesh specializes across 5 pillars: Full-Stack Real-Time Web, Android MediaCodec, AI Agent Workflows, Embedded RF Simulation, and Interactive 3D WebGL. {"action":"scroll","target":"skills"}`;
    }
    if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
      onScrollToSection?.('contact');
      return `You can reach Ratnesh directly at ${PORTFOLIO_DATA.email} or connect via LinkedIn and Instagram. {"action":"scroll","target":"contact"}`;
    }
    if (q.includes('song') || q.includes('music') || q.includes('play')) {
      return `What song or genre would you like to listen to? For example say: play lofi beats or play interstellar theme!`;
    }
    if (q.includes('namaste') || q.includes('kaise')) {
      return `Namaste! Main Raya hoon, Ratnesh ki AI assistant. Main aapko unke engineering projects aur skills explore karne mein madad kar sakti hoon!`;
    }
    if (q.includes('konnichiwa')) {
      return `Konnichiwa! Watashi wa Raya desu. Ratnesh no purojekuto o goannai shimasu!`;
    }

    return `Ratnesh is a multi-disciplinary engineer specializing in Web Audio DSP, Android MediaCodec, AI Agent workflows with Gemini API, and RF antenna simulation in Ansys HFSS. Ask me about any specific project or skill!`;
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      let botText = '';
      if (response.ok) {
        const data = await response.json();
        botText = data.reply || data.message || generateLocalResponse(query);
      } else {
        botText = generateLocalResponse(query);
      }

      processActionCommands(botText);

      // Strip JSON command from displayed bubble text
      const cleanDisplayText = botText.replace(/\{[^}]*"action"[^}]*\}/g, '').trim();

      const rayaMsg: Message = {
        id: `raya_${Date.now()}`,
        sender: 'raya',
        text: cleanDisplayText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, rayaMsg]);
      onUpdateSpeechText?.(cleanDisplayText);
      speakRaya(cleanDisplayText);
    } catch {
      const fallbackText = generateLocalResponse(query);
      processActionCommands(fallbackText);
      const cleanDisplayText = fallbackText.replace(/\{[^}]*"action"[^}]*\}/g, '').trim();

      const rayaMsg: Message = {
        id: `raya_${Date.now()}`,
        sender: 'raya',
        text: cleanDisplayText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, rayaMsg]);
      onUpdateSpeechText?.(cleanDisplayText);
      speakRaya(cleanDisplayText);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[420px] sm:h-[600px] z-50 flex flex-col bg-[#110b1d]/95 border border-purple-500/35 rounded-none sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none">
      {/* Raya Header */}
      <div className="p-4 bg-gradient-to-r from-purple-950/80 via-slate-900/80 to-purple-950/80 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <div className="w-full h-full rounded-[14px] bg-[#1a0f2e] flex items-center justify-center">
              <Bot size={20} className="text-purple-300 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#110b1d]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">Raya AI</h3>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                v2.5 Neural
              </span>
            </div>
            <p className="text-[11px] text-purple-300/80 font-mono">Portfolio Companion</p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={onOpenAvatarStudio}
            className="p-2 rounded-xl text-purple-300 hover:text-white hover:bg-purple-900/50 transition-all"
            title="Open Avatar Studio (14 Characters)"
          >
            <Layers size={16} />
          </button>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2 rounded-xl transition-all ${
              voiceEnabled ? 'text-purple-300 bg-purple-900/50' : 'hover:text-white hover:bg-white/[0.05]'
            }`}
            title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
          >
            {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={() => setMessages([messages[0]])}
            className="p-2 rounded-xl hover:text-white hover:bg-white/[0.05] transition-all"
            title="Reset Conversation"
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:text-white hover:bg-white/[0.05] transition-all"
            title="Close Chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Embedded YouTube Floating Player if Active */}
      {activeMusicQuery && (
        <div className="p-2.5 bg-[#170e28] border-b border-purple-500/20 flex items-center justify-between text-xs text-purple-200">
          <div className="flex items-center gap-2 truncate">
            <Music size={14} className="text-purple-400 animate-pulse" />
            <span className="truncate font-mono">Playing: {activeMusicQuery}</span>
          </div>
          <button
            onClick={() => setActiveMusicQuery(null)}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-purple-900/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs shadow-[0_4px_16px_rgba(147,51,234,0.3)]'
                  : 'bg-[#1a1228] text-slate-200 border border-purple-500/25 rounded-bl-xs shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#1a1228] border border-purple-500/20 text-purple-300 text-xs w-28">
            <Sparkles size={14} className="animate-spin text-purple-400" />
            <span>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-3 py-2 bg-[#0e0817] border-t border-purple-500/15 overflow-x-auto flex gap-1.5 scrollbar-none">
        {["Tell me about his ECE background", "Explain SyncPulse DSP", "Open Instagram profile", "Change Avatar Persona"].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-purple-950/60 hover:bg-purple-900/80 text-[11px] text-purple-300 hover:text-white border border-purple-500/20 whitespace-nowrap transition-all shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Bottom Input Box */}
      <div className="p-3 bg-[#0d0716] border-t border-purple-500/20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask Raya anything or say 'Hey Raya'..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#170f24] border border-purple-500/25 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"
          />

          <button
            type="button"
            onClick={toggleMic}
            className={`p-2 rounded-xl transition-all ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'text-purple-300 hover:bg-purple-900/50'
            }`}
            title="Voice Mic (Listening for 'Hey Raya')"
          >
            {isListening ? <MicOff size={15} /> : <Mic size={15} />}
          </button>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

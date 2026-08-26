import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  User, 
  Maximize2, 
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/lib/portfolioData';

interface Message {
  id: string;
  sender: 'user' | 'raya';
  text: string;
  timestamp: string;
}

interface RayaAICompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RayaAICompanion: React.FC<RayaAICompanionProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'raya',
      text: `Hello! I'm Raya, Ratnesh's AI companion. I know everything about his engineering projects, ECE background, AI workflows, and skills. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Tell me about his ECE background",
    "Explain SyncPulse DSP engine",
    "What is PAK Video Converter?",
    "What verified certifications does he hold?",
    "What are his core work values?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('ece') || q.includes('education') || q.includes('college') || q.includes('makaut')) {
      return `Ratnesh is a final-year B.Tech student in Electronics and Communication Engineering (ECE) at MAKAUT (Swami Vivekananda Institute of Science & Technology), graduating in 2026. He excels at hardware-software convergence, RF simulation in Ansys HFSS, and real-time computing.`;
    }
    if (q.includes('syncpulse') || q.includes('audio') || q.includes('dsp') || q.includes('sound')) {
      return `SyncPulse is Ratnesh's real-time spatial audio network. It implements Cristian's NTP clock sync algorithm over WebSockets to achieve sub-millisecond (±5ms) sync across multiple client devices, coupled with an 8D binaural 360° soundstage and an interactive Three.js 3D visualizer.`;
    }
    if (q.includes('pak') || q.includes('android') || q.includes('video') || q.includes('mediacodec')) {
      return `PAK Video Converter is a native Android application built by Ratnesh in Kotlin and Jetpack Compose. It uses Android's low-latency hardware MediaCodec and MediaMuxer pipelines to extract, transcode, and stream raw video payloads and game assets with zero frame drops.`;
    }
    if (q.includes('mediflow') || q.includes('hospital') || q.includes('healthcare')) {
      return `MediFlow is an outpatient hospital queue management system built with FastAPI, React 18, and PostgreSQL. It uses a Scikit-Learn Random Forest ML regression model to forecast patient wait times dynamically with real-time WebSocket token broadcasts.`;
    }
    if (q.includes('jobpilot') || q.includes('n8n') || q.includes('gemini') || q.includes('ai agent')) {
      return `JobPilot AI is an autonomous job search & resume tailoring workflow created on n8n Cloud powered by Google Gemini API. It scans job feeds, evaluates candidate semantic fit, tailors applications, and triggers webhook dispatches.`;
    }
    if (q.includes('cert') || q.includes('udemy') || q.includes('license')) {
      return `Ratnesh holds 4+ verified technical certifications on Udemy:
1. Internet of Things (IoT) Online Course (ID: UC-45f867df-23bf-440a-b362-0508bfb8d29f)
2. Prompt Engineering for Everyone (ID: UC-58952f65-94dc-45c4-abd9-aa490de18afc)
3. Master Java, Python, C & C++: All-in-One Programming (ID: UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b)
4. The Complete Introduction to C++ Programming (ID: UC-c57ec369-5a17-48e6-a9be-bcf9c0855867)`;
    }
    if (q.includes('values') || q.includes('philosophy') || q.includes('personality')) {
      return `Ratnesh values absolute truth, honesty, loyalty, and kindness. His core work rule is "Always keep learning and improving yourself." He is a balanced, logical thinker who breaks large challenges into small, solvable components.`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      return `You can reach Ratnesh directly via email at ${PORTFOLIO_DATA.email} or on LinkedIn at ${PORTFOLIO_DATA.linkedin}. He is actively open to full-time opportunities and engineering collaborations!`;
    }

    return `Ratnesh is a multi-disciplinary engineer specializing in Full-Stack Real-Time Web (React, Node.js, WebSockets), Native Android (Kotlin, MediaCodec), AI Agent Workflows (n8n, Gemini API), and RF Antennas (Ansys HFSS). Feel free to ask about any specific project or skill!`;
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
      // Try backend /api/chat endpoint
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

      const rayaMsg: Message = {
        id: `raya_${Date.now()}`,
        sender: 'raya',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, rayaMsg]);
      speakText(botText);
    } catch {
      const fallbackText = generateLocalResponse(query);
      const rayaMsg: Message = {
        id: `raya_${Date.now()}`,
        sender: 'raya',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, rayaMsg]);
      speakText(fallbackText);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[600px] z-50 flex flex-col bg-[#110b1d]/95 border border-purple-500/30 rounded-none sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.25)] backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 select-none">
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
                v2.5
              </span>
            </div>
            <p className="text-[11px] text-purple-300/80 font-mono">Portfolio Companion</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 text-slate-400">
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
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-purple-950/60 hover:bg-purple-900/80 text-[11px] text-purple-300 hover:text-white border border-purple-500/20 whitespace-nowrap transition-all shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
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
            placeholder="Ask Raya about Ratnesh's work..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#170f24] border border-purple-500/25 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-purple-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

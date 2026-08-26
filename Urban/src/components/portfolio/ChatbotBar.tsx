import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Info, 
  Sparkles, 
  Bot, 
  ChevronUp, 
  X,
  Volume2,
  Sliders,
  CornerDownLeft
} from 'lucide-react';

interface ChatbotBarProps {
  onSendMessage: (msg: string) => void;
  onOpenFullChat: () => void;
  onOpenAvatarStudio: () => void;
  isOpen: boolean;
}

export const ChatbotBar: React.FC<ChatbotBarProps> = ({
  onSendMessage,
  onOpenFullChat,
  onOpenAvatarStudio,
  isOpen
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showCommandsMenu, setShowCommandsMenu] = useState(false);
  const recognitionRef = useRef<any>(null);

  const builtInCommands = [
    { label: "Tell me about his ECE background", category: "Education" },
    { label: "Explain the SyncPulse DSP engine (±5ms)", category: "Project" },
    { label: "What is PAK Video Converter?", category: "Android" },
    { label: "Show verified Udemy certifications", category: "Credentials" },
    { label: "What are his core work philosophies?", category: "Profile" },
    { label: "Change Raya's 3D Avatar", category: "Action", isAvatarAction: true },
  ];

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          onSendMessage(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [onSendMessage]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
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

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
    setShowCommandsMenu(false);
  };

  const handleCommandClick = (cmd: any) => {
    if (cmd.isAvatarAction) {
      onOpenAvatarStudio();
    } else {
      onSendMessage(cmd.label);
    }
    setShowCommandsMenu(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* ═══ Built-In Commands & Info Popup Menu ═══ */}
      {showCommandsMenu && (
        <div className="w-[320px] sm:w-[380px] rounded-2xl bg-[#150d24]/95 border border-purple-500/30 p-3 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.2)] backdrop-blur-xl mb-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 font-bold">
              <Sparkles size={13} className="text-purple-400" />
              <span>Built-In Raya Commands & Prompts</span>
            </div>
            <button
              onClick={() => setShowCommandsMenu(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-1.5 max-h-56 overflow-y-auto scrollbar-thin p-0.5">
            {builtInCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleCommandClick(cmd)}
                className="w-full p-2 rounded-xl bg-[#1d1330] hover:bg-purple-900/40 text-left text-xs text-slate-200 hover:text-white border border-purple-500/15 hover:border-purple-500/40 transition-all flex items-center justify-between group"
              >
                <span>{cmd.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/25 group-hover:bg-purple-800">
                  {cmd.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Floating Interactive Chat Input Bar ═══ */}
      <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-full bg-[#120a20]/90 border border-purple-500/35 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(147,51,234,0.25)] backdrop-blur-2xl transition-all max-w-[95vw]">
        {/* Avatar Trigger / Open Chat Window */}
        <button
          onClick={onOpenFullChat}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-600 via-purple-700 to-indigo-600 p-0.5 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
          title="Open Full Chat Dialogue"
        >
          <div className="w-full h-full rounded-full bg-[#170e28] flex items-center justify-center">
            <Bot size={18} className="text-purple-300 animate-pulse" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#120a20]" />
        </button>

        {/* Input Form */}
        <form onSubmit={handleSend} className="flex items-center gap-1.5">
          <input
            type="text"
            placeholder="Type to Raya..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              if (!isOpen) onOpenFullChat();
            }}
            className="w-36 sm:w-60 md:w-72 px-3 py-1.5 text-xs sm:text-sm bg-transparent text-white placeholder-slate-400 focus:outline-none"
          />

          {/* Info / Built-In Commands Button ('i') */}
          <button
            type="button"
            onClick={() => setShowCommandsMenu(!showCommandsMenu)}
            className={`p-2 rounded-full transition-all ${
              showCommandsMenu 
                ? 'bg-purple-600 text-white shadow-[0_0_10px_#a855f7]' 
                : 'text-purple-300 hover:text-white hover:bg-purple-950/60'
            }`}
            title="Built-In Options & Commands"
          >
            <Info size={16} />
          </button>

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={toggleMic}
            className={`p-2 rounded-full transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-[0_0_12px_#ef4444]'
                : 'text-purple-300 hover:text-white hover:bg-purple-950/60'
            }`}
            title={isListening ? "Listening... (Click to Stop)" : "Voice Speak to Raya"}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_12px_rgba(168,85,247,0.5)] active:scale-95"
            title="Send Message"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

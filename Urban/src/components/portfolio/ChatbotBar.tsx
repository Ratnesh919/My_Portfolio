import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Info, 
  Sparkles, 
  X
} from 'lucide-react';

interface ChatbotBarProps {
  onSendMessage: (msg: string) => void;
  onOpenAvatarStudio: () => void;
  rayaSpeechText?: string;
  isSpeaking?: boolean;
}

export const ChatbotBar: React.FC<ChatbotBarProps> = ({
  onSendMessage,
  onOpenAvatarStudio,
  rayaSpeechText,
  isSpeaking
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showCommandsMenu, setShowCommandsMenu] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Built-in commands matching exact user requirements (strictly the 7 requested)
  const builtInCommands: Array<{ label: string; actionType: string; category?: string }> = [
    { label: "📩 Leave a message", actionType: "leave_msg", category: "Contact" },
    { label: "📜 Scroll down", actionType: "scroll_down", category: "Navigation" },
    { label: "🚀 Tell me about Ratnesh's project", actionType: "ask_projects", category: "Projects" },
    { label: "😄 Tell me a joke", actionType: "tell_joke", category: "Fun" },
    { label: "⚡ Tell me about Ratnesh's skills", actionType: "ask_skills", category: "Skills" },
    { label: "📞 Take me to contact section", actionType: "scroll_contact", category: "Contact" },
    { label: "🎵 Play a song", actionType: "play_music", category: "Music" },
  ];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

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

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
    setShowCommandsMenu(false);
  };

  const handleCommandClick = (cmd: any) => {
    if (cmd.actionType === "leave_msg") {
      setInput("Hi Ratnesh, ");
    } else if (cmd.actionType === "scroll_down") {
      onSendMessage("Scroll down the page");
    } else if (cmd.actionType === "ask_projects") {
      onSendMessage("Tell me about Ratnesh's project");
    } else if (cmd.actionType === "tell_joke") {
      onSendMessage("Tell me a joke");
    } else if (cmd.actionType === "ask_skills") {
      onSendMessage("Tell me about Ratnesh's skills");
    } else if (cmd.actionType === "scroll_contact") {
      onSendMessage("Take me to contact section");
    } else if (cmd.actionType === "play_music") {
      onSendMessage("Play a song for me on YouTube");
    } else {
      onSendMessage(cmd.label.replace(/^[^\w\s]+/, '').trim());
    }
    setShowCommandsMenu(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-7 right-4 sm:right-7 z-[2147483646] flex flex-col items-end gap-2.5 select-none max-w-[360px] sm:max-w-[400px]">
      {/* ═══ Authentic Speech Bubble (Matching Screenshot) ═══ */}
      {rayaSpeechText && (
        <div className="w-full relative p-4 rounded-2xl bg-[#0c0c12]/95 border border-[#ff416c]/45 text-white text-xs sm:text-sm font-sans leading-relaxed shadow-[0_8px_30px_rgba(0,0,0,0.75)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="whitespace-pre-line text-slate-100">{rayaSpeechText}</p>

          {/* Right Red/Pink Accent Bar */}
          <div className="absolute right-0 top-3 bottom-3 w-1.5 bg-[#ff416c] rounded-l-full shadow-[0_0_10px_#ff416c]" />
        </div>
      )}

      {/* Floating Wake Word Prompt Pill */}
      <div className="px-3 py-1 rounded-full bg-[#140c1e]/90 border border-purple-500/30 text-[11px] font-mono text-purple-300 shadow-md backdrop-blur-md self-center">
        Say wake word 'Hey Raya' to chat
      </div>

      {/* ═══ Built-In Commands Menu from (i) Button ═══ */}
      {showCommandsMenu && (
        <div className="w-full rounded-2xl bg-[#140d22]/98 border border-[#ff416c]/40 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.9)] backdrop-blur-2xl mb-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-purple-300 font-bold">
              <Sparkles size={13} className="text-[#ff416c]" />
              <span>💡 Quick Options & Commands</span>
            </div>
            <button
              onClick={() => setShowCommandsMenu(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X size={14} />
            </button>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto scrollbar-thin p-0.5">
            {builtInCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleCommandClick(cmd)}
                className="w-full p-2.5 rounded-xl bg-[#1d1330] hover:bg-purple-900/60 text-left text-xs text-slate-200 hover:text-white border border-purple-500/15 hover:border-[#ff416c]/50 transition-all flex items-center justify-between group"
              >
                <span>{cmd.label}</span>
                {cmd.category && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/25">
                    {cmd.category}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Bottom Input Row ═══ */}
      <form onSubmit={handleSend} className="w-full flex items-center gap-2">
        {/* Text Input Box */}
        <div className="flex-1 flex items-center bg-[#0c0c14]/92 border border-[#ff416c]/40 rounded-2xl px-3.5 py-2.5 shadow-[0_4px_18px_rgba(0,0,0,0.65)] backdrop-blur-xl focus-within:border-[#ff416c] transition-colors">
          <input
            type="text"
            placeholder="Type to Raya..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
          />

          <button
            type="button"
            onClick={() => setShowCommandsMenu(!showCommandsMenu)}
            className="p-1 text-slate-400 hover:text-purple-300 transition-colors ml-1"
            title="Help & Quick Commands (i)"
          >
            <Info size={16} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 rounded-2xl bg-[#36101d] hover:bg-[#52172b] disabled:opacity-40 border border-[#ff416c]/45 text-white flex items-center justify-center shadow-[0_4px_14px_rgba(255,65,108,0.35)] transition-all hover:scale-105 active:scale-95 shrink-0"
          title="Send Message"
        >
          <Send size={16} className="text-[#ff758c] -translate-x-0.5 translate-y-0.5" />
        </button>

        {/* Mic Button */}
        <button
          type="button"
          onClick={toggleMic}
          className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-[0_4px_14px_rgba(255,65,108,0.35)] transition-all hover:scale-105 active:scale-95 shrink-0 ${
            isListening
              ? 'bg-red-600 text-white border-red-400 animate-pulse'
              : 'bg-[#36101d] hover:bg-[#52172b] border-[#ff416c]/45 text-[#ff758c]'
          }`}
          title={isListening ? 'Listening...' : 'Talk to Raya'}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      </form>
    </div>
  );
};

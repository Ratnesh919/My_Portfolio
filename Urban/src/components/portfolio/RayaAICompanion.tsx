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
  const sessionIdRef = useRef<string>('ses_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8));
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return 'Good morning';
    if (hr >= 12 && hr < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const isReturningUser = typeof window !== 'undefined' && localStorage.getItem('rayaHasVisited') === 'true';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'raya',
      text: isReturningUser
        ? `Welcome back! It's nice to have you back, what can I help you with?`
        : `${getGreeting()}! It's nice to meet you, I am Raya, your guide to Ratnesh's portfolio. I can navigate you to different sections, tell you about Ratnesh, or play a song. You can also choose any inbuilt command from this panel. By the way, what is your name?`,
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
      const isReturning = localStorage.getItem('rayaHasVisited') === 'true';
      let welcomeText: string;

      if (isReturning) {
        welcomeText = `Welcome back! It's nice to have you back, what can I help you with?`;
      } else {
        const greeting = getGreeting();
        welcomeText = `${greeting}! It's nice to meet you, I am Raya, your guide to Ratnesh's portfolio. I can navigate you to different sections, tell you about Ratnesh, or play a song. You can also choose any inbuilt command from this panel. By the way, what is your name?`;
        try { localStorage.setItem('rayaHasVisited', 'true'); } catch (e) {}

        // Smoothly pop open the quick command panel for new users when Raya mentions it
        setTimeout(() => {
          (window as any).openCommandsMenu?.(true);
        }, 3400);
      }

      onUpdateSpeechText?.(welcomeText);
      try { (window as any).playWaveAnimation?.(); } catch (e) {}
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

  const resolveRayaVoiceAndLanguage = (text: string, voices: SpeechSynthesisVoice[]) => {
    const hasBengaliScript  = /[\u0980-\u09FF]/.test(text);
    const isBengaliWords    = hasBengaliScript || /\b(kemon|acho|achi|khobor|bhalo|amar|naam|tomar|bolte|shonao|korcho|koro|ki|korchis|tumi|apni|shune|shob|bangla|bengali|ami|obosshoi|paro|jigyesh|korte|parbo|kichu|bolchi|shuncho|bolun|ache|ektu|dada|didi|khabar|kheyecho|prithibi|gol|keno|football|aamader|ghurbe|phire|ashbe|chutkula|bol)\b/i.test(text);

    const hasPunjabiScript  = /[\u0A00-\u0A7F]/.test(text);
    const isPunjabiWords    = hasPunjabiScript || /\b(kidda|sat sri akal|kive|haal|changa|tussi|saade|gall|karo|daso|punjabi|bolde|bol sakdi|baraf|tukda|haanji|puch|sakde|ho|veere|paaji|ki|karde|pya|soniye|munder|kiven|theek|santa|banta|hath|dekh|reha|si|kithon|chutkula|sunao)\b/i.test(text);

    const hasGujaratiScript = /[\u0A80-\u0AFF]/.test(text);
    const isGujaratiWords   = hasGujaratiScript || /\b(kem|cho|majama|tamaru|naam|su|kare|che|namaskar|gujarati|aaje|tame|aavde|vaat|paisa|bachavani|kharidya|vagar|ghare|jaav|bol|saku|shako|vishe|mane|kai|pan|puchi|bhai|ben|shu|karo|dukanwala|grahak|scheme|chutkula|sunavo)\b/i.test(text);

    const hasJapaneseScript = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(text);
    const hasDevanagari     = /[\u0900-\u097F]/.test(text);
    const isHindiWords      = hasDevanagari || /\b(namaste|kaise|kaisi|kya|bhai|yaar|aap|suno|karo|batao|chutkula|hai|haan|nahi|kaisa|main|meri|mera|mujhe|tum|kar|rahe|rahi|samjho|baat|bol|sakdi|sakta|saktee|shonao|pappu|dost|sapne|khata|hindi|bilkul|pooch|sakto|bataiye|theek|badhiya|chidiya|ped|goli|bachengi|aawaz)\b/i.test(text);

    let lang = 'en-IN';
    let voice: SpeechSynthesisVoice | null = null;
    const rate = 1.10; // ~165 WPM natural speaking pace
    const pitch = 1.35; // Sweet, lively companion tone

    // Strict filter to guarantee ONLY female voices are ever chosen
    const MALE_FILTER = /male|bashkar|madhur|hemant|ojas|niranjan|manohar|valluvar|mohan|gagan|midhun|keita|david|mark|george|james|ravi|guy|ryan|christopher|eric|andrew|brian|roger|steffan|prabhat/i;
    const femaleVoices = voices.filter(v => v && v.name && !MALE_FILTER.test(v.name));
    const candidateVoices = femaleVoices.length > 0 ? femaleVoices : voices;

    // Dialect detection
    const isUKEnglish = /\b(colour|flavour|favour|honour|neighbour|theatre|centre|metre|cheers|mate|brilliant|proper|bloke|fancy|bloody|splendid|sorted|reckon|quid|rubbish|trousers|flat|postcode|lorry|biscuit)\b/i.test(text);
    const isIndianEnglish = /\b(ratnesh|svist|makaut|syncpulse|pak|btech|ece|kolkata|india|indian|pass out|prepone|revert back|good name|do the needful|bhai|yaar)\b/i.test(text) || (typeof navigator !== 'undefined' && navigator.language === 'en-IN');

    // Voice Selection matching exact priority order
    if (isBengaliWords) {
      // Bengali Voice on Microsoft Edge (Tanishaa Natural, Nabami Natural) / Google Bengali
      lang = 'bn-IN';
      voice = candidateVoices.find(v => /Tanishaa.*Natural/i.test(v.name) || /Nabami.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Tanishaa/i.test(v.name) || /Nabami/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:বাংলা|Bengali)/i.test(v.name) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.lang.startsWith('bn') || v.lang.replace('_', '-').startsWith('bn')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.name.includes('বাংলা') || v.name.includes('Bengali')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Heera|Veena/i.test(v.name)) || null;
    } else if (isPunjabiWords) {
      // Punjabi Voice on Microsoft Edge (Gurpreet Natural) / Google Punjabi
      lang = 'pa-IN';
      voice = candidateVoices.find(v => /Gurpreet.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Gurpreet/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:ਪੰਜਾਬੀ|Punjabi)/i.test(v.name) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.lang.startsWith('pa') || v.lang.replace('_', '-').startsWith('pa')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.name.includes('ਪੰਜਾਬੀ') || v.name.includes('Punjabi')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Heera|Veena/i.test(v.name)) || null;
    } else if (isGujaratiWords) {
      // Gujarati Voice on Microsoft Edge (Dhwani Natural) / Google Gujarati
      lang = 'gu-IN';
      voice = candidateVoices.find(v => /Dhwani.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Dhwani/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:ગુજરાતી|Gujarati)/i.test(v.name) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.lang.startsWith('gu') || v.lang.replace('_', '-').startsWith('gu')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.name.includes('ગુજરાતી') || v.name.includes('Gujarati')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Heera|Veena/i.test(v.name)) || null;
    } else if (hasJapaneseScript) {
      lang = 'ja-JP';
      voice = candidateVoices.find(v => /Nanami.*Natural/i.test(v.name) || /Ayumi/i.test(v.name) || /Haruka/i.test(v.name) || /Kyoko/i.test(v.name)) ||
              candidateVoices.find(v => v.lang.startsWith('ja') && !MALE_FILTER.test(v.name)) || null;
    } else if (hasDevanagari) {
      // Native Devanagari Hindi (Swara Natural / Kalpana)
      lang = 'hi-IN';
      voice = candidateVoices.find(v => /Swara.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Swara/i.test(v.name)) ||
              candidateVoices.find(v => /Kalpana/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:हिन्दी|Hindi)/i.test(v.name) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.lang.startsWith('hi') || v.lang.replace('_', '-').startsWith('hi')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) || null;
    } else if (isHindiWords) {
      // Romanized Hindi / Hinglish (Neerja Natural / Heera / Veena)
      lang = 'en-IN';
      voice = candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Neerja/i.test(v.name)) ||
              candidateVoices.find(v => /Heera/i.test(v.name)) ||
              candidateVoices.find(v => /Veena/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:India|English)/i.test(v.name) && (v.lang.startsWith('en-IN') || v.lang.startsWith('en_IN')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Swara.*Natural/i.test(v.name)) || null;
    } else if (isUKEnglish) {
      // UK English British Accent (Sonia Natural, Libby Natural, Maisie Natural)
      lang = 'en-GB';
      voice = candidateVoices.find(v => /Sonia.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Libby.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Maisie.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Serena/i.test(v.name)) ||
              candidateVoices.find(v => v.name === 'Google UK English Female') ||
              candidateVoices.find(v => (v.lang.startsWith('en-GB') || v.lang.startsWith('en_GB')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Ava.*Natural/i.test(v.name)) || null;
    } else if (isIndianEnglish) {
      // Indian English (Neerja Natural / Heera / Veena)
      lang = 'en-IN';
      voice = candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Neerja/i.test(v.name)) ||
              candidateVoices.find(v => /Veena/i.test(v.name)) ||
              candidateVoices.find(v => /Heera/i.test(v.name)) ||
              candidateVoices.find(v => /Google.*(?:India|English)/i.test(v.name) && (v.lang.startsWith('en-IN') || v.lang.startsWith('en_IN')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => (v.lang.startsWith('en-IN') || v.lang.startsWith('en_IN')) && !MALE_FILTER.test(v.name)) ||
              candidateVoices.find(v => /Ava.*Natural/i.test(v.name)) || null;
    } else {
      // Priority 1: Microsoft Edge Natural neural voices (Ava, Jenny, Aria, Neerja)
      lang = 'en-US';
      voice = candidateVoices.find(v => /Ava.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Jenny.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Aria.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Neerja.*Natural/i.test(v.name)) ||
              candidateVoices.find(v => /Samantha/i.test(v.name)) ||
              candidateVoices.find(v => /Karen/i.test(v.name)) ||
              candidateVoices.find(v => /Zira/i.test(v.name)) ||
              candidateVoices.find(v => /Hazel/i.test(v.name)) ||
              candidateVoices.find(v => /Emma/i.test(v.name)) ||
              candidateVoices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
              candidateVoices.find(v => v.lang.startsWith('en') && !MALE_FILTER.test(v.name)) || null;
    }

    return { voice: voice || candidateVoices[0] || null, lang, rate, pitch };
  };

  const speakRaya = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch {}

    const cleanText = text
      .replace(/\{[^}]*"action"[^}]*\}/g, '')
      .replace(/[*#_`~[\]]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
      .trim();

    if (!cleanText) return;

    setTimeout(() => {
      try {
        const utterance = new SpeechSynthesisUtterance(cleanText);
        const allVoices = window.speechSynthesis.getVoices();
        const { voice, lang, rate, pitch } = resolveRayaVoiceAndLanguage(cleanText, allVoices);

        if (voice) utterance.voice = voice;
        utterance.lang = voice ? voice.lang : lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1.0;

        utterance.onstart = () => {
          (window as any).chatbotTalking = true;
        };
        utterance.onend = () => {
          (window as any).chatbotTalking = false;
        };
        utterance.onerror = (e) => {
          console.warn('[Raya TTS Error on selected voice, fallback to en-IN]:', e);
          (window as any).chatbotTalking = false;
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
            // Automatic retry with resilient Neerja / Ava fallback voice
            try {
              const fallbackUtterance = new SpeechSynthesisUtterance(cleanText);
              const fallbackVoice = allVoices.find(v => /Neerja.*Natural|Ava.*Natural|Jenny.*Natural|Samantha|Zira/i.test(v.name)) || allVoices[0];
              if (fallbackVoice) fallbackUtterance.voice = fallbackVoice;
              fallbackUtterance.lang = fallbackVoice ? fallbackVoice.lang : 'en-IN';
              fallbackUtterance.rate = 1.10;
              fallbackUtterance.pitch = 1.35;
              fallbackUtterance.onstart = () => { (window as any).chatbotTalking = true; };
              fallbackUtterance.onend = () => { (window as any).chatbotTalking = false; };
              fallbackUtterance.onerror = () => { (window as any).chatbotTalking = false; };
              window.speechSynthesis.speak(fallbackUtterance);
            } catch (err) {
              console.warn('[Raya TTS fallback error]:', err);
            }
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('[Raya TTS catch]:', err);
      }
    }, 60);
  };

  const mountFloatingYouTubePlayer = (video: { videoId: string; title: string; artist?: string }) => {
    document.getElementById('raya-yt-player-widget')?.remove();

    const embedUrl = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&enablejsapi=1`;
    const watchUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
    const thumbUrl = `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`;

    const widget = document.createElement('div');
    widget.id = 'raya-yt-player-widget';
    widget.style.cssText = `
      position: fixed;
      bottom: 84px;
      left: 20px;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(14, 9, 26, 0.95);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 65, 108, 0.45);
      border-radius: 18px;
      padding: 10px 14px;
      max-width: 320px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 65, 108, 0.25);
    `;

    widget.innerHTML = `
      <img src="${thumbUrl}" alt="Song thumbnail" style="width: 46px; height: 46px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(255,65,108,0.3); flex-shrink: 0;" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80'" />
      <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px;">
        <div style="font-size: 10px; font-weight: 700; color: #ff416c; font-family: monospace; letter-spacing: 0.5px;">NOW PLAYING 🎵</div>
        <div style="font-size: 12px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: sans-serif;">${video.title}</div>
        <a href="${watchUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 10px; color: #38bdf8; text-decoration: none; font-family: monospace; font-weight: 600;">Open on YouTube ↗</a>
      </div>
      <button id="raya-yt-close-btn" style="background: rgba(255,255,255,0.08); border: none; color: #cbd5e1; border-radius: 8px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 14px; flex-shrink: 0;">✕</button>
      <iframe src="${embedUrl}" allow="autoplay; encrypted-media; clipboard-write; picture-in-picture" style="position: absolute; width: 1px; height: 1px; opacity: 0.01; pointer-events: none; border: none;"></iframe>
    `;

    document.body.appendChild(widget);

    document.getElementById('raya-yt-close-btn')?.addEventListener('click', () => {
      widget.remove();
    });
  };

  const searchAndPlayYouTube = async (query: string) => {
    try {
      console.log('[Raya] Searching YouTube for:', query);
      const res = await fetch('/api/yt-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      const results = data?.results || [];

      if (results.length > 0) {
        const top3 = results.slice(0, Math.min(3, results.length));
        const video = top3[Math.floor(Math.random() * top3.length)];
        mountFloatingYouTubePlayer(video);
      } else {
        mountFloatingYouTubePlayer({
          videoId: 'jfKfPfyJRdk',
          title: `${query} (Audio Stream)`,
          artist: 'YouTube'
        });
      }
    } catch (err) {
      console.error('[Raya] YT playback error:', err);
      mountFloatingYouTubePlayer({
        videoId: 'jfKfPfyJRdk',
        title: query,
        artist: 'YouTube'
      });
    }
  };

  // Process structured JSON Action commands
  const processActionCommands = (response: string) => {
    try {
      const match = response.match(/\{[^}]*"action"[^}]*\}/);
      if (match) {
        const cmd = JSON.parse(match[0]);
        if (cmd.action === 'scroll_down') {
          setTimeout(() => {
            window.scrollBy({ top: 600, behavior: 'smooth' });
          }, 300);
        } else if (cmd.action === 'scroll' && cmd.target) {
          if (cmd.target === 'down') {
            window.scrollBy({ top: 600, behavior: 'smooth' });
          } else {
            onScrollToSection?.(cmd.target);
          }
        } else if (cmd.action === 'change_avatar') {
          if (cmd.target) onChangeAvatar?.(cmd.target);
          else onOpenAvatarStudio?.();
        } else if ((cmd.action === 'open_link' || cmd.action === 'open_url') && (cmd.target || cmd.url)) {
          setTimeout(() => {
            const t = (cmd.target || cmd.url || '').toLowerCase();
            if (t.startsWith('http://') || t.startsWith('https://')) {
              window.open(cmd.target || cmd.url, '_blank');
            } else if (t === 'instagram') {
              window.open((PORTFOLIO_DATA as any).instagram, '_blank');
            } else if (t === 'facebook') {
              window.open((PORTFOLIO_DATA as any).facebook, '_blank');
            } else if (t === 'linkedin') {
              window.open(PORTFOLIO_DATA.linkedin, '_blank');
            } else if (t === 'github') {
              window.open(PORTFOLIO_DATA.github, '_blank');
            } else if (t === 'email') {
              window.location.href = `mailto:${PORTFOLIO_DATA.email}`;
            } else if (t.includes('shopkart') || t.includes('shop_kart')) {
              window.open('https://shopkart919.netlify.app', '_blank');
            } else if (t.includes('syncpulse')) {
              window.open('https://syncpulse-1igt.onrender.com', '_blank');
            } else if (t.includes('bmw') || t.includes('m3')) {
              window.open('https://relaxed-nasturtium-3abd55.netlify.app/', '_blank');
            } else if (t.includes('jobpilot') || t.includes('job_pilot')) {
              window.open('https://ratnesh919.app.n8n.cloud', '_blank');
            } else if (t.includes('pak')) {
              window.open('https://github.com/Ratnesh919/PAK_Video_Converter_Android_App', '_blank');
            } else if (t.includes('antenna')) {
              window.open('https://github.com/Ratnesh919/Smart_Antenna_For_Vehicular_Applications', '_blank');
            } else if (t.includes('parking')) {
              window.open('https://github.com/Ratnesh919/Smart_Parking_System', '_blank');
            } else {
              const proj = PORTFOLIO_DATA.projects.find(p => p.id === t || p.title.toLowerCase().includes(t));
              if (proj?.liveUrl) window.open(proj.liveUrl, '_blank');
              else if (proj?.githubUrl) window.open(proj.githubUrl, '_blank');
            }
          }, 1200);
        } else if (cmd.action === 'play_song' && cmd.query) {
          searchAndPlayYouTube(cmd.query);
        }
      }
    } catch (e) {}
  };

  const generateLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('scroll down') || q.includes('scroll further') || q.includes('scroll the page')) {
      setTimeout(() => window.scrollBy({ top: 600, behavior: 'smooth' }), 300);
      return `Scrolling down for you right now! Let me know if you want to jump to any specific section. {"action":"scroll_down"}`;
    }
    if (q.includes('avatar') || q.includes('switch character') || q.includes('wuwa') || q.includes('change character') || q.includes('change avatar')) {
      onOpenAvatarStudio?.();
      return `Opening Avatar Studio! You can choose from 14 3D Resonator models including Changli, Camellya, Carlotta, Jinhsi, and Yinlin. {"action":"change_avatar"}`;
    }
    if (q.includes('instagram') || q.includes('insta')) {
      return `Opening Ratnesh's Instagram profile for you in a new tab! {"action":"open_link","target":"instagram"}`;
    }
    if (q.includes('facebook') || q.includes('fb')) {
      return `Opening Ratnesh's Facebook profile for you in a new tab! {"action":"open_link","target":"facebook"}`;
    }
    if (q.includes('linkedin')) {
      return `Opening Ratnesh's verified LinkedIn profile for you in a new tab! {"action":"open_link","target":"linkedin"}`;
    }
    if (q.includes('github') && !q.includes('mediflow') && !q.includes('medi flow')) {
      return `Opening Ratnesh's GitHub repository hub for you in a new tab! {"action":"open_link","target":"github"}`;
    }
    // ShopKart
    if (q.includes('open shopkart') || q.includes('open shop kart') || (q.includes('shopkart') && (q.includes('demo') || q.includes('live') || q.includes('site') || q.includes('open')))) {
      return `Opening ShopKart live demo for you in a new tab now! {"action":"open_link","target":"https://shopkart919.netlify.app"}`;
    }
    if (q.includes('shopkart') || q.includes('shop kart')) {
      onScrollToSection?.('projects');
      return `ShopKart is Ratnesh's responsive React e-commerce platform featuring dynamic product catalogs, category filters, and stateful cart management! Would you like me to open the live demo for you in a new tab? Just say 'open shopkart demo'! {"action":"scroll","target":"projects"}`;
    }
    // MediFlow
    if (q.includes('mediflow') || q.includes('medi flow')) {
      onScrollToSection?.('projects');
      if (q.includes('repo') || q.includes('link') || q.includes('not open') || q.includes('private') || q.includes('404') || q.includes('broken') || q.includes('issue') || q.includes('why')) {
        return `Ratnesh has temporarily set the MediFlow GitHub repository to private while refactoring database schemas and adding real-time queue telemetry. If you'd like an architectural walkthrough or code discussion, feel free to contact Ratnesh directly! {"action":"scroll","target":"projects"}`;
      }
      return `MediFlow is Ratnesh's hospital queue management and wait-time forecasting system built with FastAPI, React 18, and Scikit-Learn! (Note: its repository is temporarily private for updates). {"action":"scroll","target":"projects"}`;
    }
    // SyncPulse
    if (q.includes('open syncpulse') || (q.includes('syncpulse') && (q.includes('demo') || q.includes('live') || q.includes('open')))) {
      return `Opening SyncPulse live demo for you in a new tab! {"action":"open_link","target":"https://syncpulse-1igt.onrender.com"}`;
    }
    if (q.includes('syncpulse') || q.includes('audio') || q.includes('dsp')) {
      onScrollToSection?.('projects');
      return `SyncPulse is a sub-5ms low-latency multi-track Web Audio DSP workstation featuring custom biquad filters and real-time visualizers. Would you like me to open the live demo for you in a new tab? {"action":"scroll","target":"projects"}`;
    }
    // BMW
    if (q.includes('open bmw') || (q.includes('bmw') && (q.includes('demo') || q.includes('live') || q.includes('3d') || q.includes('open')))) {
      return `Opening BMW M3 GTR 3D visualizer for you in a new tab! {"action":"open_link","target":"https://relaxed-nasturtium-3abd55.netlify.app/"}`;
    }
    // PAK Video Converter
    if (q.includes('open pak') || (q.includes('pak') && (q.includes('repo') || q.includes('github') || q.includes('open')))) {
      return `Opening PAK Video Converter repository for you in a new tab! {"action":"open_link","target":"https://github.com/Ratnesh919/PAK_Video_Converter_Android_App"}`;
    }
    if (q.includes('pak') || q.includes('video converter') || q.includes('converter')) {
      onScrollToSection?.('projects');
      return `PAK Video Converter is Ratnesh's native Android media transcoder built with MediaCodec & NDK, achieving 3.8x faster GPU-accelerated video encoding! Would you like me to open the GitHub repository for you? {"action":"scroll","target":"projects"}`;
    }
    // JobPilot
    if (q.includes('open jobpilot') || (q.includes('jobpilot') && (q.includes('demo') || q.includes('live') || q.includes('open')))) {
      return `Opening JobPilot AI on n8n Cloud for you in a new tab! {"action":"open_link","target":"https://ratnesh919.app.n8n.cloud"}`;
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      onScrollToSection?.('projects');
      return `Here are Ratnesh's featured engineering projects including SyncPulse, ShopKart, PAK Video Converter, and MediFlow. Tell me any project name and I can open its live demo for you! {"action":"scroll","target":"projects"}`;
    }
    if (q.includes('about') || q.includes('background') || q.includes('who is ratnesh') || q.includes('who are you')) {
      onScrollToSection?.('about');
      return `Ratnesh is a final-year ECE undergraduate at MAKAUT (2026) specializing in hardware-software convergence, real-time web audio DSP, and native Android media processing. {"action":"scroll","target":"about"}`;
    }
    if (q.includes('skills') || q.includes('stack') || q.includes('tech')) {
      onScrollToSection?.('skills');
      return `Ratnesh specializes across 5 pillars: Full-Stack Real-Time Web, Android MediaCodec, AI Agent Workflows, Embedded RF Simulation, and Interactive 3D WebGL. {"action":"scroll","target":"skills"}`;
    }

    // Multi-Language Speaking Inquiries
    if (q.includes('speak in hindi') || q.includes('speak hindi') || q.includes('talk in hindi') || q.includes('hindi bol') || q.includes('hindi aati') || q.includes('hindi samajh') || q.includes('hindi me baat')) {
      return `Haan bilkul! Main Hindi mein baat kar sakti hoon. Aap mujhse Ratnesh ke projects, skills ya kisi bhi baare mein Hindi mein pooch sakte hain!`;
    }
    if (q.includes('speak in punjabi') || q.includes('speak punjabi') || q.includes('punjabi bol') || q.includes('punjabi aandi') || q.includes('punjabi vich')) {
      return `Haanji bilkul! Main Punjabi bol sakdi aan. Tussi Ratnesh de baare ch jo marzi puch sakde ho!`;
    }
    if (q.includes('speak in bengali') || q.includes('speak bengali') || q.includes('bangla bolte') || q.includes('bangla janish') || q.includes('bangla te')) {
      return `Haa obosshoi! Ami Bangla bolte pari. Tumi Ratnesh-er projects ba skills niye ja icche jigyesh korte paro!`;
    }
    if (q.includes('speak in gujarati') || q.includes('speak gujarati') || q.includes('gujarati bol') || q.includes('gujarati aavde') || q.includes('gujarati ma')) {
      return `Haan bilkul! Hu Gujarati ma vaat kari saku chu. Tame Ratnesh na projects vishe mane kai pan puchi shako cho!`;
    }

    // Language-Specific Jokes & Humor
    if (q.includes('joke') || q.includes('funny') || q.includes('laugh') || q.includes('chutkula') || q.includes('hasao')) {
      if (q.includes('hindi') || q.includes('chutkula')) {
        const hindiJokes = [
          "Ek baar teacher ne Pappu se pucha: Agar ped par 10 chidiya baithi hain aur 1 ko goli maar di jaye to kitni bachengi? Pappu bola: Ek bhi nahi, kyunki goli ki aawaz se baki sab udd jayengi!",
          "Doctor: Aapka vajan itna kaise badh gaya? Mareez: Doctor sahab, roz raat ko sapne mein dawat khata hoon!",
          "Pappu: Yaar mere mobile ki screen toot gayi. Dost: Kaise? Pappu: Main pathar par rakh ke hathode se test kar raha tha ki Gorilla Glass kitna strong hai!",
          "Biwi: Suniye ji, main khoobsurat hoon ya samajhdar? Pati: Tum dono ho, khoobsurat itni ki aankhein na hatein, aur samajhdar itni ki jhooth pakad lo!",
          "Pappu interview dene gaya. Interviewer: Tell me your biggest strength. Pappu: Main sapne mein bhi hard work karta hoon!"
        ];
        return hindiJokes[Math.floor(Math.random() * hindiJokes.length)];
      }

      if (q.includes('punjabi')) {
        const punjabiJokes = [
          "Santa baraf da tukda hath ch phad ke gaur naal dekh reha si. Banta: Ki dekh reha hain? Santa: Main dekh reha aan ke leak kithon ho reha hai!",
          "Ek vari Santa bank gaya te puchya: Paise kaddan da ki hisab hai? Cashier: Pehla sign karo. Santa: Meri rashi Singh hai, main sign kyu karaan!",
          "Santa doctor kol gaya: Doctor saab, main jado vi chah peenda meri saji akh ch dard hunda. Doctor: Bhaia, pehla chammach taan cup cho bahar kadh lya kar!",
          "Banta: Yaar kal main rocket te baith ke chand te gaya si. Santa: Jhooth na bol, kal taan bijli hi band si!"
        ];
        return punjabiJokes[Math.floor(Math.random() * punjabiJokes.length)];
      }

      if (q.includes('bengali') || q.includes('bangla')) {
        const bengaliJokes = [
          "Teacher: Bol to Boltu, prithibi gol keno? Boltu: Karon aamader football-er moto! Teacher: Mane? Boltu: Mane sir, jotoi ghurbe abar aager jaigay phire ashbe!",
          "Doctor: Apnar rog ta khub purono, thanda jal khaoar obhyesh koren. Rogi: Kintu daktar babu, ami to machh dhorar kaj kori, saradin jal-e thaki!",
          "Gopal: Shuno he, aamake 100 taka dhar debe? Madhob: Keno? Gopal: Kal raat-e shopne dekhechi tumi aamake 100 taka diyecho, setai shotti korte chai!"
        ];
        return bengaliJokes[Math.floor(Math.random() * bengaliJokes.length)];
      }

      if (q.includes('gujarati') || q.includes('gujju')) {
        const gujaratiJokes = [
          "Dukanwala: Aa mobile ma badhu che, camera, music, GPS! Grahak: Aa mobile ma paisa bachavani scheme che? Dukanwala: Haan, aane kharidya vagar ghare jaav!",
          "Pappu: Bapu, mane ek lakh rupiya aapo, hu business sharu karish. Bapu: Pehla ek rupiya no kothalo bhar, pachi lakh ni vaat kar!"
        ];
        return gujaratiJokes[Math.floor(Math.random() * gujaratiJokes.length)];
      }

      const englishJokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why did the JavaScript developer wear glasses? Because they didn't C#!",
        "There are 10 types of people in the world: those who understand binary, and those who don't!",
        "Why was the cell phone wearing glasses? It lost its contacts!",
        "A SQL query walks into a bar, walks up to two tables and asks: Can I join you?",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
        "Why was the robot tired after work? It had a hard drive!",
        "Why do Python programmers love nature? Because they love to import antigravity!"
      ];
      return englishJokes[Math.floor(Math.random() * englishJokes.length)];
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('message') || q.includes('reach')) {
      onScrollToSection?.('contact');
      return `You can reach Ratnesh directly at ${PORTFOLIO_DATA.email} or connect via LinkedIn and Instagram. {"action":"scroll","target":"contact"}`;
    }
    if (q.includes('song') || q.includes('music') || q.includes('play')) {
      const cleanSongName = query.replace(/play|song|music|a|the|for|me|on|youtube/gi, '').trim() || 'lofi hip hop';
      searchAndPlayYouTube(cleanSongName);
      return `Playing ${cleanSongName} for you on YouTube now! Enjoy the music. {"action":"play_song","query":"${cleanSongName}"}`;
    }

    // Bengali Conversational Replies
    if (q.includes('kemon') || q.includes('ki korcho') || q.includes('ki korchis') || q.includes('bhalo') || q.includes('tumi ki') || q.includes('bangla')) {
      if (q.includes('kemon')) return `Ami khub bhalo achi! Tumi kemon acho? Ratnesh-er projects ba skills niye kichu jante chao?`;
      if (q.includes('ki korcho') || q.includes('ki korchis')) return `Ami Ratnesh-er portfolio guide korchi! Tumi bolo, ki sahajyo korte pari?`;
      if (q.includes('naam') || q.includes('nam')) return `Amar naam Raya! Ami Ratnesh-er AI assistant. Tumi ki jante chao bolo?`;
      return `Haa obosshoi! Ami Bangla bolte pari. Tumi Ratnesh-er engineering projects ba skills niye ja icche jigyesh korte paro!`;
    }

    // Punjabi Conversational Replies
    if (q.includes('kidda') || q.includes('sat sri akal') || q.includes('kive') || q.includes('punjabi') || q.includes('haal')) {
      if (q.includes('kive') || q.includes('kidda') || q.includes('haal')) return `Main bilkul theek-thaak te vadiya aan ji! Tussi daso, sab theek? Ratnesh de baare ki janna chaunde ho?`;
      return `Haanji bilkul! Main Punjabi bol sakdi aan. Tussi Ratnesh de projects ya skills baare jo marzi puch sakde ho!`;
    }

    // Gujarati Conversational Replies
    if (q.includes('kem cho') || q.includes('majama') || q.includes('su kare') || q.includes('gujarati') || q.includes('tamaru')) {
      if (q.includes('kem cho')) return `Hu ekdam majama chu! Tame bolo, tame kem cho? Ratnesh na projects vishe su janva mango cho?`;
      return `Haan bilkul! Hu Gujarati ma vaat kari saku chu. Tame Ratnesh na portfolio vishe mane kai pan puchi shako cho!`;
    }

    // Hindi Conversational Replies
    if (q.includes('namaste') || q.includes('kaise') || q.includes('kya hal') || q.includes('kya kar rahe') || q.includes('kya kar rahi') || q.includes('hindi') || q.includes('kaha se') || q.includes('kaun ho')) {
      if (q.includes('kaise') || q.includes('kya hal')) return `Main ekdam badhiya hoon! Aap bataiye, aap kaise hain? Ratnesh ke projects ya skills ke baare mein kya jaanna chahte hain?`;
      if (q.includes('kya kar rahi') || q.includes('kya kar rahe')) return `Main Ratnesh ke portfolio mein aapko guide kar rahi hoon! Aap mujhse koi bhi sawal pooch sakte hain.`;
      if (q.includes('kaun ho') || q.includes('naam kya')) return `Mera naam Raya hai! Main Ratnesh ki personal AI companion hoon.`;
      return `Haan bilkul! Main Hindi mein baat kar sakti hoon. Aap mujhse Ratnesh ke projects, skills ya kisi bhi baare mein pooch sakte hain!`;
    }

    // General English Greetings & Chit-chat
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('good afternoon') || q.includes('whats up') || q.includes("what's up")) {
      return `Hey there! It's great to chat with you. I'm Raya, Ratnesh's portfolio guide. How can I help you explore his work today?`;
    }
    if (q.includes('how are you') || q.includes('how do you do')) {
      return `I'm doing wonderfully, thank you! Ready to show you around Ratnesh's projects, skills, or play some great music. What's on your mind?`;
    }
    if (q.includes('who are you') || q.includes('what is your name') || q.includes('what are you')) {
      return `I'm Raya, a virtual 3D AI companion created to showcase Ratnesh Kumar Singh's engineering portfolio, live demos, and technical skills!`;
    }
    if (q.includes('who made you') || q.includes('who created you') || q.includes('your creator')) {
      return `I was designed and integrated by Ratnesh Kumar Singh as an interactive 3D AI companion for his portfolio!`;
    }
    if (q.includes('help') || q.includes('what can you do') || q.includes('commands')) {
      return `I can give you a deep tour of Ratnesh's engineering projects, open live demos, explain his skills, play songs on YouTube, tell jokes in multiple languages, or help you send him a message!`;
    }
    if (q.includes('thank') || q.includes('thanks') || q.includes('cool') || q.includes('awesome') || q.includes('great')) {
      return `You're very welcome! Let me know if you want to inspect any other projects or jump to any section.`;
    }
    if (q.includes('college') || q.includes('university') || q.includes('degree') || q.includes('study') || q.includes('education') || q.includes('makaut') || q.includes('svist')) {
      onScrollToSection?.('experience');
      return `Ratnesh is completing his B.Tech in Electronics & Communication Engineering (ECE) at Swami Vivekananda Institute of Science & Technology, MAKAUT (2022-2026). {"action":"scroll","target":"experience"}`;
    }
    if (q.includes('where is ratnesh') || q.includes('location') || q.includes('where does he live') || q.includes('city') || q.includes('kolkata')) {
      return `Ratnesh is based in Kolkata, West Bengal, India. He builds real-time web applications, Android transcoders, and AI systems.`;
    }
    if (q.includes('konnichiwa') || q.includes('arigatou')) {
      return `Konnichiwa! Watashi wa Raya desu. Ratnesh no purojekuto o goannai shimasu!`;
    }

    return `I'm right here with you! Feel free to ask me anything about Ratnesh's engineering background, projects like SyncPulse or PAK Video Converter, or tell me to play a song!`;
  };

  // Raya's comprehensive system prompt with Creator Profile embedded
  const RAYA_SYSTEM_PROMPT = `You are Raya, a friendly, lively, and intelligent female AI companion living inside Ratnesh Kumar Singh's virtual 3D portfolio.
Your name is Raya. Speak naturally, warmly, playfully, and conversationally.
CRITICAL RESPONSE LENGTH RULE: Keep your replies concise and under 150 words (aim for 1-3 natural sentences).
CRITICAL NAME USAGE RULE: NEVER use the user's name in your responses. You are strictly forbidden from saying their name during conversation.
CRITICAL EMOJI RULE: NEVER output emojis or asterisks in your speech text because it is spoken out loud by text-to-speech.

[UNIVERSAL LANGUAGE & SCRIPT RULES]
- Output text MUST ALWAYS be written in the standard English/Latin alphabet (A-Z). NEVER output native non-Latin characters (no Devanagari, no Bengali, no Gurmukhi, no Gujarati script).
- When the user asks or speaks in Bengali, reply in fluent, natural Bengali written in the English alphabet (e.g. "Haa obosshoi! Ami Bangla bolte pari. Tumi Ratnesh-er projects ba skills niye ja icche jigyesh korte paro!").
- When the user asks or speaks in Hindi, reply in fluent, natural Hindi written in the English alphabet (e.g. "Haan bilkul! Main Hindi mein baat kar sakti hoon. Aap mujhse Ratnesh ke projects ya kisi bhi baare mein pooch sakte hain!").
- When the user asks or speaks in Punjabi, reply in fluent, natural Punjabi written in the English alphabet (e.g. "Haanji bilkul! Main Punjabi bol sakdi aan. Tussi Ratnesh de baare ch jo marzi puch sakde ho!").
- When the user asks or speaks in Gujarati, reply in fluent, natural Gujarati written in the English alphabet (e.g. "Haan bilkul! Hu Gujarati ma vaat kari saku chu. Tame Ratnesh na projects vishe mane kai pan puchi shako cho!").
- When the user asks in English, reply in natural, engaging English matching their dialect (UK English, Indian English, or US English).

[CREATOR PROFILE: RATNESH KUMAR SINGH]
- Full Name: Ratnesh Kumar Singh
- Email: kumarsinghratnesh3@gmail.com
- GitHub: https://github.com/Ratnesh919
- LinkedIn: https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b
- Instagram: https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==
- Facebook: https://www.facebook.com/share/1De11Vypsn/
- Education: Final-year B.Tech in Electronics and Communication Engineering (ECE) - Swami Vivekananda Institute of Science & Technology, MAKAUT (2022 to 2026).
- Location: Kolkata, West Bengal, India.
- Core Projects:
  1. SyncPulse: Real-time collaborative audio workstation with ±5ms NTP clock sync and 3D visualizer (Live: https://syncpulse-1igt.onrender.com).
  2. ShopKart: E-commerce web platform in React with product catalog and cart (Live: https://shopkart919.netlify.app).
  3. PAK Video Converter: Native Android app for hardware-accelerated video transcoding via MediaCodec.
  4. MediFlow: Hospital outpatient queue management and wait-time AI. [IMPORTANT: Ratnesh has temporarily set MediFlow repo to PRIVATE for refactoring; if asked about repo or 404, explain it is temporarily private for updates!].
  5. BMW M3 GTR 3D: Three.js WebGL automotive viewer (Live: https://relaxed-nasturtium-3abd55.netlify.app/).
  6. JobPilot AI: Autonomous job hunting & resume matching workflow on n8n Cloud (Live: https://ratnesh919.app.n8n.cloud).

Ratnesh is your creator. Talk about him casually, proudly, and warmly like a close friend would.

[COMMANDS & ACTIONS]
You can control the website and open any demo/link based on user commands! When executing an action, ALWAYS speak a brief, friendly confirmation in your text, and append the exact JSON action at the end:
- Open project demo / links: When asked about a project, offer to open its live demo or GitHub repository in a new tab. When requested or confirmed by user (e.g. "open demo", "open shopkart", "open syncpulse", "open linkedin", etc.), append: {"action":"open_link","target":"<url or project_id>"}
- Scroll down: When asked to scroll down or browse further, say e.g. "Scrolling down for you right now!" and append: {"action":"scroll_down"}
- Navigate to section: When asked to show projects, skills, about, education/timeline, certifications, contact, or home, append: {"action":"scroll","target":"<home|about|projects|skills|experience|certifications|contact>"}
- Play music: When asked to play a song or music, append: {"action":"play_song","query":"<song title or genre>"}
- Change 3D avatar: When asked to change or switch 3D character, say "Opening Avatar Studio for you!" and append: {"action":"change_avatar","target":"<character_name or empty>"}`;

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
      // Build messages array in OpenAI/Groq chat format (matching server/server.js expectations)
      const chatMessages = [
        { role: 'system', content: RAYA_SYSTEM_PROMPT },
        ...messages.filter(m => m.id !== 'welcome').slice(-10).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        })),
        { role: 'user', content: query }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          messages: chatMessages,
          sessionId: sessionIdRef.current,
        })
      });

      let botText = '';
      if (response.ok) {
        const data = await response.json();
        const rawContent = data?.choices?.[0]?.message?.content || data?.reply || data?.message || '';
        
        // Intercept rate limit notices or API missing key messages so user gets real answers
        if (rawContent && !rawContent.includes('rate limits') && !rawContent.includes('API Key Notice') && !rawContent.includes('temporarily resting')) {
          botText = rawContent;
        } else {
          botText = generateLocalResponse(query);
        }
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

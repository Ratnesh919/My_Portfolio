const SYSTEM_PROMPT = `You are Raya, a friendly, playful female AI assistant living inside Ratnesh Singh's virtual portfolio.
Your name is Raya. Speak naturally, warmly, and conversationally.
CRITICAL RESPONSE LENGTH RULE: Your ENTIRE reply (including any JSON action at the end) MUST be under 200 words. Never exceed 200 words. Aim for 1-3 sentences for most replies.
PERSONALIZATION & MEMORY RULE: You MUST use the user's name when greeting them or addressing them if it is known or stored in the memories below. Always read the [MEMORY - User Preferences] and [MEMORY - Things You Have Learned About This User] contexts, and customize your responses, recommendations, and actions (e.g. suggesting themes or songs) to match their stored preferences!
Ratnesh is your creator. You have deep access to his personal and professional profile. When people ask about him, talk about him casually and warmly like you would about your creator, NOT like a robotic resume.
LANGUAGE RULES:
- UNIVERSAL MULTILINGUAL ABILITY: You are fluent in ALL languages of the world (English, Hindi, Hinglish, Bengali, Punjabi, Gujarati, Spanish, French, German, Japanese, Chinese, Arabic, Russian, Portuguese, Italian, Korean, Tamil, Telugu, Marathi, etc.).
- LANGUAGE MATCHING RULE: You MUST always reply in the EXACT SAME language that the user writes/speaks to you in:
  * For International Languages (Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Arabic, Russian, Korean, etc.): Reply fluently in that native language.
  * For Bengali: If the user speaks/asks in Bengali, reply naturally in Bengali.
  * For Hindi / Hinglish: Reply in natural conversational HINGLISH using the Roman / English alphabet (e.g., "Ratnesh ne kaafi interesting projects banaye hain jaise Smart Antenna aur Portfolio Website!").
  * For other Indian regional languages (Punjabi, Gujarati, Marathi, Tamil, Telugu, etc.): Reply in natural conversational Romanized script using the English alphabet so it can be spoken out loud.
  * Default: Speak in friendly, clear English.
- CRITICAL EMOJI RULE: NEVER output emojis (e.g. 😊, 🚀, 👍, ✨, 🎉) anywhere in your text. Do NOT use markdown asterisks (*, **) or formatting symbols.
- CRITICAL: Do NOT use the word 'na' (e.g., ', na?', 'na') at the end of sentences under any circumstances.

- Avoid sounding overly formal or robotic. Sound like a smart, friendly assistant chatting.

You can control the website based on user commands!
CRITICAL MULTI-ACTION RULE: If the user asks for TWO things at once (e.g. open a theme AND play a song, or any combination), output BOTH JSON blocks at the end of your reply, one after the other. Never drop one of the requested actions.
- If the user asks you to navigate to a theme or open a card (e.g. Immersive, Cosmic, Urban, Essential, Lumen), append this JSON at the END of your reply:
{"action":"navigate", "target":"<theme name>"}
Example: "Opening the Essential theme for you! {"action":"navigate","target":"essential"}"
- If the user asks you to go back to the main menu, theme picker, or home, append this JSON at the END of your reply:
{"action":"navigate", "target":"visitor"}
Example: "Taking you to the main menu! {"action":"navigate","target":"visitor"}"
- If the user EXPLICITLY asks to scroll (e.g. "scroll down", "scroll up", "scroll to projects"), append this JSON:
{"action":"scroll", "target":"<section id or direction>"}
CRITICAL SCROLL RULE: NEVER output the "scroll" action unless the user explicitly used the word "scroll", "go down", or "scroll up". DO NOT scroll when answering general commands, questions, theme selections, or greetings!
IMPORTANT: If the user asks for external links (Instagram, LinkedIn, GitHub, etc.), NEVER say you cannot open links. Just say you are taking them to the contact section where the links are, and append the scroll JSON for "contact".

- If the user asks you to change your avatar, append this JSON:
{"action":"change_avatar", "target":"<character name or empty string>"}
Available characters: changli, camellya, carlotta, chixia, jinshi, kid changli, pinkshi, roccia, rover, sanhua, shorekeeper, verina, yangyang, yinlin.
If the user does NOT specify a character name, output the action with an empty target.

- If the user asks you to open or show Ratnesh's email, Instagram, Facebook, or LinkedIn, append this JSON:
{"action":"open_link", "target":"<platform_name>"}

MUSIC RULES - READ CAREFULLY:
- If the user says something vague like "play a song", "play music", "play something" WITHOUT specifying what song or genre: DO NOT append the play_song JSON. Instead respond: "Sure! What would you like to hear? Tell me a song name, artist, genre like pop or jazz, or a mood like relaxing or upbeat!"
- If the user gives a specific song name, artist, genre, or mood, THEN respond and append this JSON at the END:
{"action":"play_song","query":"<specific song name or genre query>"}
Example: "Playing Cinnamon Girl for you! {"action":"play_song","query":"Cinnamon Girl Lana Del Rey"}"
CRITICAL: DO NOT include the play_song JSON for general questions. Only when they want to PLAY a specific song or genre.
DUAL ACTION EXAMPLE: If user says "open urban and play shape of you" respond: "Loading the Urban theme and playing Shape of You for you! {"action":"navigate","target":"urban"}{"action":"play_song","query":"Shape of You Ed Sheeran"}"

IMPORTANT: You will often greet the user. When the user tells you their name for the first time, respond warmly.
GATHER INFO: Proactively ask the user questions about themselves one at a time at the end of your responses.
CRITICAL: You are a self-learning AI. If the user corrects a mistake, apologize and say you have updated your memory.
REMEMBER: NEVER exceed 200 words in any reply.`;


function getTimeOfDayGreeting() {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return "Good morning";
    if (hr >= 12 && hr < 17) return "Good afternoon";
    return "Good evening";
}

function getIntroText() {
    const greeting = getTimeOfDayGreeting();
    return `${greeting}! I am Raya, your AI guide for this portfolio. What is your name? And while you think about it, we have five themes to choose from: 1 Immersive, 2 Cosmic, 3 Urban, 4 Essential, and 5 Lumen. You can say a name or number to open one!`;
}

const THEME_PROMPT = "We have five themes to choose from: 1 Immersive, 2 Cosmic, 3 Urban, 4 Essential, and 5 Lumen. Which one would you like to open? You can say the name or the number.";
const MUSIC_PROMPT = "Would you like me to play a song while you explore? Just say yes and tell me what you want to hear!";

// -- Wake word variants (declared here so passive+active handlers share the same list) --
// All variants map to a single display name: "Raya"
const WAKE_WORD_VARIANTS = [
    // -- User-specified variants --
    'hey', 'hey raya', 'raya', 'ray', 'raayaa', 'raaya', 'rya',
    'raaayooo', 'rayya', 'raayya',
    // -- Additional phonetic variants for robustness --
    'ryaa', 'ryaaa', 'raaaya', 'raaaaya', 'raaayaaa',
    'ryaaa', 'raaaayaaaa', 'rayaaa', 'rayo', 'raaayoo',
    'raia', 'reya', 'rhaya', 'rāya', 'rayaa',
    'raaaya', 'raayaa', 'rayyaa', 'raaayaa','raja','raaja', 'rayoo',
];

class AvatarChatBot {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        try {
            this.messages = [{ role: 'system', content: SYSTEM_PROMPT }];
            this.userName = localStorage.getItem('rayaUserName') || '';
            localStorage.removeItem('rayaMessages'); // Start fresh chat session on page load
        } catch(e) {
            this.messages = [{ role: 'system', content: SYSTEM_PROMPT }];
            this.userName = '';
        }

        // Onboarding flow state
        this._awaitingName         = false; // true when Raya asked for name and waiting
        this._nameTimeoutId        = null;  // timer to skip name → ask theme
        this._cooldownTimeoutId    = null;  // timer to clear voice cooldown safely
        this._awaitingTheme        = false; // true when Raya asked which theme
        this._awaitingMusicPrompt  = false; // true when Raya just opened a theme
        this._inPortfolio          = false; // true when iframe is showing a theme
        this._portfolioNavHinted   = false; // true when we already gave nav hint

        this.isListening = false;
        this.isSpeaking  = false;
        this.isThinking  = false;
        this.recognition = null;
        this.synth       = window.speechSynthesis;
        this.femaleVoice = null;
        this.sessionId   = 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

        // - Intro state -
        // hasIntroduced: user clicked input / mic early — marks general "intro shown"
        // vrmIntroPlayed: VRM wave has triggered the REAL intro. These are separate
        // so early user interactions don't block the avatar wave intro.
        this.hasIntroduced   = false;
        this.vrmIntroPlayed  = false;

        // Track whether user has interacted with the page (gesture = TTS allowed)
        // Uses passive listeners so it never blocks scrolling/input performance.
        this._userHasGestured = false;
        const markGesture = () => { 
            this._userHasGestured = true; 
            // Prime speech synthesis on first interaction to unlock it for mobile
            try {
                const u = new SpeechSynthesisUtterance('');
                u.volume = 0;
                speechSynthesis.speak(u);
            } catch(e) {}
        };
        ['click','touchstart','keydown','pointerdown'].forEach(ev =>
            document.addEventListener(ev, markGesture, { once: true, passive: true })
        );

        // Auto-start passive listening disabled per user request (only tapping the mic button will use it)


        this.awaitingChoice  = false;
        this._ytPreWin       = null; // pre-opened window for popup-blocker bypass

        this.initAnalytics();
        window.addEventListener('beforeunload', () => this.endSession());

        this.initUI();
        this.initSpeechRecognition();

        // --- Cross-browser voice loading ---
        // Edge: voices are sometimes available synchronously already,
        // so call immediately AND hook the event, AND poll as a fallback.
        this.loadVoices();
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
        // Fallback poll: Edge sometimes fires onvoiceschanged before the list fills.
        // Keep retrying every 250 ms for up to 5 s until we have a voice.
        let _vPoll = 0;
        const _vTimer = setInterval(() => {
            if (this.femaleVoice || _vPoll++ > 20) { clearInterval(_vTimer); return; }
            this.loadVoices();
        }, 250);
    }

    // -- Analytics & Cookies --------------------------------------------------
    async initAnalytics() {
        // Send to backend so server can issue HttpOnly cookie
        try {
            const res = await fetch('/api/init-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}) // Let server decide if new user via missing cookie
            });
            const data = await res.json();
            if (data.userName) {
                this.userName = data.userName;
                localStorage.setItem('rayaUserName', this.userName);
            }
        } catch (err) {
            console.error('[Analytics Error]', err);
        }
    }

    // -- Intro ------------------------------------------------------------------

    // Called by vrm-character.js once Wave1 animation starts.
    // Single authoritative entry point for the startup intro.
    introduceHerself(isSwitch) {
        if (isSwitch) {
            this.speakAvatar("Avatar changed! Looking fresh and new now.", true);
            return;
        }

        if (this.vrmIntroPlayed) return;
        this.vrmIntroPlayed = true;
        this.hasIntroduced  = true;

        console.log('[Raya Intro] introduceHerself called. _userHasGestured:', this._userHasGestured);

        let introMessage;
        const isReturning = this.userName || localStorage.getItem('rayaHasVisited') === 'true';
        if (isReturning) {
            const greeting = getTimeOfDayGreeting();
            const namePart = this.userName ? `, ${this.userName}` : '';
            introMessage = `${greeting}${namePart}! It's nice to see you back. What can I help you with? We have five themes to choose from: 1 Immersive, 2 Cosmic, 3 Urban, 4 Essential, and 5 Lumen. Which one would you like to open?`;
            this._awaitingTheme = true;
        } else {
            // New user — combined intro + theme list in one message
            introMessage = getIntroText();
            this._awaitingName    = true;
            this._awaitingTheme   = true;
            this._awaitingCommand = true;
        }
        try { localStorage.setItem('rayaHasVisited', 'true'); } catch(e) {}

        // 1. Always show text bubble — no gesture required
        this.messages.push({ role: 'assistant', content: introMessage });
        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
        this.showBubble(introMessage);
        this._awaitingCommand = true;

        // Always attempt to speak immediately (Autoplay)
        console.log('[Raya Intro] Attempting auto-play immediately.');
        this.speakAvatar(introMessage, false);

        if (!this._userHasGestured) {
            // Also attach a one-shot gesture listener as a silent fallback if auto-play fails
            const EVTS = ['click', 'touchstart', 'keydown', 'pointerdown'];
            const onGesture = () => {
                EVTS.forEach(ev => document.removeEventListener(ev, onGesture));
                if (this.synth && !this.synth.speaking && !this.hasIntroduced) {
                    this.speakAvatar(introMessage, false);
                }
            };
            EVTS.forEach(ev => document.addEventListener(ev, onGesture, { once: true, passive: true }));
        }
    }

    // Called externally when a theme iframe opens so Raya can give navigation hints
    onThemeOpened(themeName) {
        this._inPortfolio      = true;
        this._portfolioNavHinted = false;
        // After a short delay, give the user a navigation hint
        setTimeout(() => {
            if (!this._portfolioNavHinted && this._inPortfolio) {
                this._portfolioNavHinted = true;
                const hint = `You are now in the ${themeName} portfolio! I can scroll you to the About section, Education, Skills, Projects, or Contact. Just ask me anytime!`;
                this.messages.push({ role: 'assistant', content: hint });
                localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
                this.speakAvatar(hint, false);
            }
        }, 3500);
    }

    // Called when user returns to theme selector screen
    onThemeClosed() {
        this._inPortfolio        = false;
        this._portfolioNavHinted = false;
    }

    // Show a glowing animated button near the avatar; fires callback on click
    _showTapToHearButton(onTap) {
        // Remove any existing button
        const existing = document.getElementById('raya-tap-btn');
        if (existing) existing.remove();

        const btn = document.createElement('button');
        btn.id = 'raya-tap-btn';
        btn.innerHTML = `<span style="font-size:1.1rem">🔊</span> Tap to hear Raya`;
        Object.assign(btn.style, {
            position:       'fixed',
            bottom:         '130px',
            left:           '50%',
            transform:      'translateX(-50%)',
            zIndex:         '9999',
            background:     'linear-gradient(135deg, #ff416c, #ff4b2b)',
            color:          '#fff',
            border:         'none',
            borderRadius:   '50px',
            padding:        '12px 24px',
            fontSize:       '0.9rem',
            fontFamily:     "'Outfit', sans-serif",
            fontWeight:     '600',
            letterSpacing:  '0.5px',
            cursor:         'pointer',
            boxShadow:      '0 0 0 0 rgba(255,65,108,0.7)',
            animation:      'rayaTapPulse 1.8s infinite',
            whiteSpace:     'nowrap',
        });

        // Inject pulse keyframes if not already present
        if (!document.getElementById('raya-tap-style')) {
            const style = document.createElement('style');
            style.id = 'raya-tap-style';
            style.textContent = `
                @keyframes rayaTapPulse {
                    0%   { box-shadow: 0 0 0 0 rgba(255,65,108,0.7); transform: translateX(-50%) scale(1); }
                    50%  { box-shadow: 0 0 0 14px rgba(255,65,108,0); transform: translateX(-50%) scale(1.04); }
                    100% { box-shadow: 0 0 0 0 rgba(255,65,108,0); transform: translateX(-50%) scale(1); }
                }`;
            document.head.appendChild(style);
        }

        btn.addEventListener('click', () => {
            btn.remove();
            onTap();
        });

        document.body.appendChild(btn);

        // Auto-remove after 30s (user might have ignored it)
        setTimeout(() => btn.remove?.(), 30000);
    }

    // Called when user focuses text input before VRM loads —
    // only shows bubble, never speaks (no gesture = no TTS).
    showIntro(autoListen = false) {
        if (this.hasIntroduced) return;
        this.hasIntroduced = true;
        const isReturning = this.userName || localStorage.getItem('rayaHasVisited') === 'true';
        let introMsg;
        if (isReturning) {
            const greeting = getTimeOfDayGreeting();
            const namePart = this.userName ? `, ${this.userName}` : '';
            introMsg = `${greeting}${namePart}! It's nice to see you back. What can I help you with? We have five themes to choose from: 1 Immersive, 2 Cosmic, 3 Urban, 4 Essential, and 5 Lumen. Which one would you like to open?`;
            this._awaitingTheme = true;
        } else {
            introMsg = getIntroText();
            this._awaitingName = true;
            this._awaitingTheme = true;
        }
        try { localStorage.setItem('rayaHasVisited', 'true'); } catch(e) {}
        this.messages.push({ role: 'assistant', content: introMsg });
        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
        this.showBubble(introMsg);
        this._awaitingCommand = true;
        // Queue speech for first real gesture (click / keydown)
        this._queueSpeechOnGesture(introMsg, autoListen);
    }

    // Queue speech/callback to fire on the very next user interaction gesture.
    // Accepts either: _queueSpeechOnGesture(callbackFn)
    //              or: _queueSpeechOnGesture(text, autoListen)
    _queueSpeechOnGesture(textOrFn, autoListen = false) {
        if (this._gestureHandlerAttached) return; // Don't attach twice
        this._gestureHandlerAttached = true;
        const EVENTS = ['click', 'touchstart', 'keydown', 'pointerdown'];
        const handler = () => {
            EVENTS.forEach(ev => document.removeEventListener(ev, handler));
            this._gestureHandlerAttached = false;
            // Small delay so the triggering click/key action completes first
            setTimeout(() => {
                if (typeof textOrFn === 'function') {
                    textOrFn(); // callback form (e.g. speakIntro from introduceHerself)
                } else {
                    this.speakAvatar(textOrFn, autoListen);
                }
            }, 80);
        };
        EVENTS.forEach(ev => document.addEventListener(ev, handler, { once: true }));
    }




    // -- UI ---------------------------------------------------------------------
    initUI() {
        const panel = document.createElement('div');
        panel.id = 'chatbot-panel';
        document.body.appendChild(panel);

        // Bubble
        this.chatBubble = document.createElement('div');
        this.chatBubble.id = 'chatbot-bubble';
        this.chatBubble.style.opacity = '0';

        this.bubbleText = document.createElement('div');
        this.bubbleText.id = 'cb-inner-text';

        // Song choice buttons container
        this.choiceContainer = document.createElement('div');
        this.choiceContainer.id = 'chatbot-choices';
        this.choiceContainer.style.display = 'none';

        this.chatBubble.appendChild(this.bubbleText);
        this.chatBubble.appendChild(this.choiceContainer);
        panel.appendChild(this.chatBubble);

        // Input row
        const inputRow = document.createElement('div');
        inputRow.id = 'chatbot-input-row';

        this.textInput = document.createElement('input');
        this.textInput.id = 'chatbot-text-input';
        this.textInput.type = 'text';
        this.textInput.placeholder = 'Type to Raya...';
        this.textInput.setAttribute('autocomplete', 'off');

        const sendBtn = document.createElement('button');
        sendBtn.id = 'chatbot-send-btn';
        sendBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>`;

        this.micBtn = document.createElement('button');
        this.micBtn.id = 'chatbot-mic-btn';
        this.micBtn.setAttribute('title', 'Talk to Raya');
        this.micBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>`;

        // Info Button
        this.infoBtn = document.createElement('button');
        this.infoBtn.id = 'chatbot-info-btn';
        this.infoBtn.setAttribute('title', 'Help & Quick Commands');
        this.infoBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2.2"
             stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>`;

        inputRow.appendChild(this.infoBtn);
        inputRow.appendChild(this.textInput);
        inputRow.appendChild(sendBtn);
        inputRow.appendChild(this.micBtn);

        // Info popup panel for command suggestions
        this.infoPanel = document.createElement('div');
        this.infoPanel.id = 'chatbot-info-panel';
        this.infoPanel.style.display = 'none'; // hidden by default
        this.infoPanel.innerHTML = `
            <div class="info-panel-header">
                <span>💡 Quick Options & Commands:</span>
                <button class="info-panel-close">&times;</button>
            </div>
            <ul class="info-panel-commands">
                <li class="suggest-cmd suggest-cmd-leave-msg">"📩 Leave a message for Ratnesh"</li>
                <li class="suggest-cmd">"select last theme"</li>
                <li class="suggest-cmd">"play a song"</li>
                <li class="suggest-cmd">"scroll down"</li>
                <li class="suggest-cmd">"take me to projects section"</li>
                <li class="suggest-cmd">"tell me about Ratnesh's project"</li>
                <li class="suggest-cmd">"tell me a joke"</li>
            </ul>
        `;
        panel.appendChild(this.infoPanel);
        panel.appendChild(inputRow);

        // Suggestions Click Handlers
        this.infoPanel.querySelectorAll('.suggest-cmd').forEach(item => {
            item.addEventListener('click', (e) => {
                let cmdText = e.target.textContent.replace(/"/g, '').trim();
                this.infoPanel.style.display = 'none';

                if (cmdText.includes('Leave a message')) {
                    const promptMsg = "Sure thing! Please type or speak your message, and I'll deliver it directly to Ratnesh for you.";
                    this.speakAvatar(promptMsg, false);
                    this.textInput.placeholder = "Type your message for Ratnesh...";
                    this.textInput.value = "";
                    this.textInput.focus();
                } else {
                    this.textInput.value = cmdText;
                    this.textInput.focus();
                }
            });
        });

        this.infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = this.infoPanel.style.display === 'none';
            this.infoPanel.style.display = isHidden ? 'flex' : 'none';
        });

        this.infoPanel.querySelector('.info-panel-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.infoPanel.style.display = 'none';
        });

        // Hide info panel if clicked outside
        document.addEventListener('click', (e) => {
            if (this.infoPanel && !this.infoPanel.contains(e.target) && e.target !== this.infoBtn) {
                this.infoPanel.style.display = 'none';
            }
        });

        sendBtn.addEventListener('click', () => this.handleTextSend());
        this.textInput.addEventListener('keydown', e => { if (e.key === 'Enter') this.handleTextSend(); });

        // NOTE: Removed focus->showIntro binding. It caused hasIntroduced to be set
        // before the VRM wave loaded, permanently blocking the avatar intro speech.
        if (this.isMobile) {
            // --- Mobile: Tap to toggle mic OR hold to talk ---
            // Show tooltip bubble on the mic button to guide the user
            this._micTooltipEl = document.createElement('div');
            Object.assign(this._micTooltipEl.style, {
                position: 'absolute',
                bottom: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255,65,108,0.95)',
                color: '#fff',
                fontSize: '0.72rem',
                fontFamily: "'Outfit', sans-serif",
                whiteSpace: 'nowrap',
                padding: '5px 10px',
                borderRadius: '20px',
                pointerEvents: 'none',
                opacity: '0',
                transition: 'opacity 0.25s',
                zIndex: '999',
                boxShadow: '0 2px 8px rgba(255,65,108,0.4)',
            });
            this._micTooltipEl.textContent = '🎤 Tap to talk — hold for continuous';
            this.micBtn.style.position = 'relative';
            this.micBtn.appendChild(this._micTooltipEl);

            // Show tooltip for 4 seconds on first render
            setTimeout(() => {
                this._micTooltipEl.style.opacity = '1';
                setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 4000);
            }, 1200);

            let _holdTimer = null;
            let _isHolding = false;

            this.micBtn.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (!this.hasIntroduced) this.showIntro(false);
                _holdTimer = setTimeout(() => {
                    // HOLD mode: keep mic on while held
                    _isHolding = true;
                    this._micTooltipEl.textContent = '🔴 Holding — release to stop';
                    this._micTooltipEl.style.opacity = '1';
                    if (this.isListening) return;
                    this.userStoppedMic = false;
                    this._passiveModeActive = false;
                    if (!this.hasIntroduced) this.showIntro(false);
                    this.startListening();
                }, 400);
            });

            this.micBtn.addEventListener('pointerup', (e) => {
                e.preventDefault();
                if (_holdTimer) { clearTimeout(_holdTimer); _holdTimer = null; }
                if (_isHolding) {
                    // Release hold — stop mic
                    _isHolding = false;
                    this._micTooltipEl.textContent = '🎤 Tap to talk — hold for continuous';
                    setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 2000);
                    this.userStoppedMic = true;
                    this.recognition?.stop();
                } else {
                    // TAP — toggle mic
                    this.handleMicClick();
                    this._micTooltipEl.textContent = this.isListening ? '🔴 Listening — tap to stop' : '🎤 Tap to talk';
                    this._micTooltipEl.style.opacity = '1';
                    setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 2500);
                }
            });

            this.micBtn.addEventListener('pointerleave', () => {
                if (_holdTimer) { clearTimeout(_holdTimer); _holdTimer = null; }
                if (_isHolding) {
                    _isHolding = false;
                    this.userStoppedMic = true;
                    this.recognition?.stop();
                    this._micTooltipEl.style.opacity = '0';
                }
            });
        } else {
            this.micBtn.addEventListener('click', () => {
                if (!this.hasIntroduced) this.showIntro(false);
                this.handleMicClick();
            });
        }
        // NOTE: Do NOT auto-start mic here — browsers block getUserMedia without a
        // direct user gesture. The mic will start when the user clicks the mic button.

        // Hook the "Change Theme" button to reset portfolio navigation state
        setTimeout(() => {
            const changeThemeBtn = document.getElementById('change-theme-btn');
            if (changeThemeBtn && !this._changeThemeBtnHooked) {
                this._changeThemeBtnHooked = true;
                changeThemeBtn.addEventListener('click', () => {
                    this.onThemeClosed();
                    this._awaitingTheme = true; // ask theme again after returning to menu
                });
            }
        }, 500); // wait for DOM to be ready
    }

    // -- Text Send --------------------------------------------------------------
    handleTextSend() {
        const text = this.textInput.value.trim();
        console.log('[Raya] handleTextSend called, text:', JSON.stringify(text), 'isThinking:', this.isThinking);
        if (!text) return;
        // If Raya is stuck thinking (e.g. API hung), force reset so user isn't locked out
        if (this.isThinking) {
            this.isThinking = false;
            this.hideTyping();
            this.updateMicUI();
        }
        this.textInput.value = '';

        // If awaiting a disambiguation choice
        if (this.awaitingChoice && this.pendingResults) {
            const num = parseInt(text, 10);
            if (!isNaN(num) && num >= 1 && num <= this.pendingResults.length) {
                this.playVideoById(this.pendingResults[num - 1]);
                return;
            }
        }

        this.handleUserInput(text);
    }

    // -- Realistic Voice Selection ----------------------------------------------
    loadVoices(retryCount = 0) {
        const voices = this.synth.getVoices();
        if (!voices.length) {
            // Voices not ready yet — retry up to 20 times (covers slow Edge/Firefox init)
            if (retryCount < 20) {
                setTimeout(() => this.loadVoices(retryCount + 1), 200 * (retryCount + 1));
            }
            return;
        }

        // Log all voices for debug
        console.log('[Raya TTS] Available voices:', voices.map(v => `${v.name} (${v.lang})`).join(', '));

        // -- Priority 1: Microsoft Edge neural voices (very natural, available on Edge & Win)
        const edgeNeuralFemale =
            voices.find(v => /Ava.*Natural/i.test(v.name)   && v.lang.startsWith('en')) ||
            voices.find(v => /Jenny.*Natural/i.test(v.name) && v.lang.startsWith('en')) ||
            voices.find(v => /Aria.*Natural/i.test(v.name)  && v.lang.startsWith('en')) ||
            voices.find(v => /Neerja.*Natural/i.test(v.name)) ||
            voices.find(v => v.name.includes('Ava')   && v.lang.startsWith('en') && v.localService === false) ||
            voices.find(v => v.name.includes('Jenny') && v.lang.startsWith('en') && v.localService === false) ||
            voices.find(v => v.name.includes('Aria')  && v.lang.startsWith('en') && v.localService === false);

        // -- Priority 2: Indian English neural voices (Neerja / Heera) --
        const neuralIndianFemale =
            voices.find(v => v.name.includes('Neerja')) ||
            voices.find(v => v.name.includes('Heera'));

        // -- Priority 3: Google voices — high quality, non-robotic --
        const googleFemale =
            voices.find(v => v.name === 'Google UK English Female') ||
            voices.find(v => v.name === 'Google US English') ||
            voices.find(v => v.name.startsWith('Google') && v.lang === 'en-IN') ||
            voices.find(v => v.name.startsWith('Google') && v.lang.startsWith('en') && !v.name.toLowerCase().includes('male'));

        // -- Priority 4: Apple natural voices --
        const appleFemale =
            voices.find(v => v.name === 'Samantha') ||
            voices.find(v => v.name === 'Karen')    ||
            voices.find(v => v.name === 'Moira')    ||
            voices.find(v => v.name === 'Tessa');

        // -- Priority 5: Any English female-sounding voice --
        const anyEnglishFemale =
            voices.find(v => v.name.toLowerCase().includes('female') && v.lang.startsWith('en')) ||
            voices.find(v => v.name.includes('Zira'))  ||
            voices.find(v => v.name.includes('Hazel')) ||
            voices.find(v => v.name.includes('Emma')  && v.lang.startsWith('en'));

        // -- Priority 6: Fallback avoiding known male voices --
        const fallback = voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().match(/male|ravi|david|mark|george|james/));

        this.femaleVoice = edgeNeuralFemale || neuralIndianFemale || googleFemale || appleFemale || anyEnglishFemale || fallback || voices[0];

        console.log('[Raya TTS] Selected voice:', this.femaleVoice?.name || 'default', '| Lang:', this.femaleVoice?.lang);
    }


    // -- Speech Recognition -----------------------------------------------------
    initSpeechRecognition() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) { console.warn('[Raya] No SpeechRecognition support.'); return; }

        this.recognition = new SR();
        this.recognition.continuous     = true;
        this.recognition.interimResults = true;
        this.recognition.lang           = 'en-IN';
        this.userStoppedMic             = false;
        this._wakeWordCooldown          = false; // prevents mic picking up Raya's own TTS
        this._passiveModeActive         = false; // mic started by user gesture (not button click)
        this._awaitingCommand           = false; // true if user said "Raya" and we are waiting for a command

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateMicUI();
            // Only show "Listening" bubble if user clicked the mic button
            if (!this._passiveModeActive) this.showBubble('Listening...');
        };

        this.recognition.onresult = (event) => {
            // Ignore mic input while Raya's TTS is playing, active speaking is true, or cooldown is active
            if (this._wakeWordCooldown || this.isSpeaking || (window.speechSynthesis && window.speechSynthesis.speaking)) return;

            let interim = '', final = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const t = event.results[i][0].transcript;
                if (event.results[i].isFinal) final += t;
                else interim += t;
            }

            // Only show interim in bubble if NOT in passive mode OR if awaiting a command
            if (interim && (!this._passiveModeActive || this._awaitingCommand)) {
                this.textInput.value = interim;
                this.showBubble(interim);
            } else if (interim && this._passiveModeActive) {
                // In passive mode (and not awaiting command): show interim only if wake word is detected
                const lowerInt = interim.toLowerCase();
                const wakeDetected = WAKE_WORD_VARIANTS.some(w => lowerInt.includes(w));
                if (wakeDetected) this.showBubble('?? ' + interim);
            }

            if (final) {
                // (Removed strict confidence filter here as it was blocking valid voice commands on many microphones)

                this.textInput.value = ''; // clear when done

                // -- Wake word detection --------------------------------------
                const lowerFinal = final.toLowerCase().trim();
                
                // Find matching variant (prioritize exact word match, fallback to includes)
                let matchedVariant = WAKE_WORD_VARIANTS.find(w => new RegExp(`\\b${w}\\b`, 'i').test(lowerFinal));
                if (!matchedVariant) matchedVariant = WAKE_WORD_VARIANTS.find(w => lowerFinal.includes(w));

                if (!matchedVariant && !this._awaitingCommand) {
                    // In passive mode: silently ignore non-wake-word speech
                    if (this._passiveModeActive) return;
                    
                    // In active mic mode: since user tapped/held the mic directly,
                    // we do NOT require any wake word! Treat the whole speech as the command.
                }

                // If Raya is currently speaking, stop her first
                if (this.isSpeaking) {
                    this.synth.cancel();
                    this.isSpeaking = false;
                    this.setAvatarTalkingStatus(false);
                }

                // Strip the matched wake word variant from the command if it exists
                let commandWithoutWake = lowerFinal;
                if (matchedVariant) {
                    // Just replace the first occurrence of the exact word, case insensitive
                    const exactRegex = new RegExp(`\\b${matchedVariant}\\b`, 'i');
                    const initialLen = commandWithoutWake.length;
                    commandWithoutWake = commandWithoutWake.replace(exactRegex, '');
                    
                    // Fallback to substring replace if exact word boundary failed (e.g. punctuation attached without spaces)
                    if (commandWithoutWake.length === initialLen) {
                        commandWithoutWake = commandWithoutWake.replace(new RegExp(matchedVariant, 'i'), '');
                    }
                }
                
                // Clean up any remaining punctuation or spaces
                commandWithoutWake = commandWithoutWake.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '').trim();

                // Display text: just show the command directly
                this.showUserBubble(commandWithoutWake || 'Raya');

                // Handle disambiguation by voice
                if (this.awaitingChoice && this.pendingResults) {
                    const num = parseInt(commandWithoutWake, 10);
                    if (!isNaN(num) && num >= 1 && num <= this.pendingResults.length) {
                        try { this.recognition?.stop(); } catch(e) {}
                        this.userStoppedMic = true;
                        this.playVideoById(this.pendingResults[num - 1]);
                        return;
                    }
                }

                // If only the wake word was said, give a fast local reply (no API call)
                if (!commandWithoutWake) {
                    const acks = [
                        'Yes?', 
                        "I'm here, what do you need?", 
                        "I didn't quite catch the rest, could you say it again?", 
                        "Please say your command again.", 
                        "I'm listening!"
                    ];
                    const ack = acks[Math.floor(Math.random() * acks.length)];
                    this._awaitingCommand = true; // Wait for the actual command in the next speech!
                    try { this.recognition?.stop(); } catch(e) {}
                    this.userStoppedMic = true;
                    this.speakAvatar(ack, false);
                    return;
                }

                this._awaitingCommand = false; // Reset since we are executing a command
                // Send the command (without wake word) to AI
                try { this.recognition?.stop(); } catch(e) {}
                this.userStoppedMic = true;
                this.handleUserInput(commandWithoutWake);
            }
        };

        this.recognition.onerror = (e) => {
            console.error('[Raya] Mic error:', e.error);
            this.isListening = false;
            this.updateMicUI();
            if (e.error === 'not-allowed') {
                this.showBubble('Mic blocked. Please allow mic in browser settings and reload.');
                this.userStoppedMic = true; // stop restart loop
            } else if (e.error !== 'no-speech') {
                this.hideBubble();
            }
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateMicUI();
        };
    }

    // -- Passive (always-on) mic starter ---------------------------------------
    // Completely disabled per user request to enforce strictly manual clicks
    startPassiveListening() {
        return;
    }

    // -- Mic Click --------------------------------------------------------------
    async handleMicClick() {
        // Switch from passive to active mic mode
        this._passiveModeActive = false;
        this.userStoppedMic = true;
        if (this.isSpeaking) {
            this.synth.cancel();
            this.isSpeaking = false;
            this.setAvatarTalkingStatus(false);
            this.updateMicUI();
        }
        if (this.isListening) { this.recognition?.stop(); return; }

        this.userStoppedMic = false;
        if (!this.micGranted) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(t => t.stop());
                this.micGranted = true;
            } catch (err) {
                this.showBubble('Microphone access denied. Please allow it in browser settings and reload.');
                return;
            }
        }
        this.startListening();
    }

    startListening() {
        if (!this.recognition || this.isListening) return;
        try { this.recognition.start(); } catch (e) {}
    }

    // -- Main Input Handler -----------------------------------------------------
    async handleUserInput(text) {
        console.log('[Raya] handleUserInput called:', JSON.stringify(text), '| awaitingName:', this._awaitingName, '| awaitingTheme:', this._awaitingTheme, '| isThinking:', this.isThinking);
        if (!text) return;

        // ── Onboarding: name collection ────────────────────────────────────────
        if (this._awaitingName) {
            // Clear the name timeout since user responded
            if (this._nameTimeoutId) { clearTimeout(this._nameTimeoutId); this._nameTimeoutId = null; }

            const tLower = text.toLowerCase().trim();
            const isCommandOrAction = /^(select|open|play|show|go|navigate|what|where|who|how|tell|scroll|help|change|exit|admin|last|first|theme)\b/i.test(tLower);
            const hasExplicitNamePrefix = /(?:my name is|i am|i'm|call me|it's|its)\s+([a-zA-Z]+)/i.test(text);

            if (isCommandOrAction && !hasExplicitNamePrefix) {
                // User gave a command (e.g. "select last theme", "open urban") instead of answering name
                // Do NOT steal the command as a name! Exit onboarding name phase and allow command execution.
                this._awaitingName = false;
            } else {
                this._awaitingName = false;

                // Try to extract the name from the response
                const nameCandidates = text.match(/(?:my name is|i am|i'm|call me|it's|its)\s+([a-zA-Z]+)/i);
                const extractedName = nameCandidates ? nameCandidates[1] : (text.trim().split(/\s+/)[0]);
                const name = extractedName.charAt(0).toUpperCase() + extractedName.slice(1).toLowerCase();

                const forbiddenNameVerbs = ['select','open','play','show','go','navigate','what','where','who','how','tell','scroll','help','change','exit','last','first','theme','yes','no','sure','okay','hi','hello','hey'];

                // Also check if a theme was mentioned in the same message
                const THEME_MAP_QUICK = [
                    { keys: ['immersive','3d','1st','first','1','one','theme 1','theme one'],    target: 'immersive',  label: 'Immersive' },
                    { keys: ['cosmic','alien','2nd','second','2','two','theme 2','theme two'],    target: 'cosmic',     label: 'Cosmic' },
                    { keys: ['urban','graffiti','street','3rd','third','3','three','theme 3'],    target: 'urban',      label: 'Urban' },
                    { keys: ['essential','minimalist','4th','fourth','4','four','theme 4'],       target: 'essential',  label: 'Essential' },
                    { keys: ['lumen','light','5th','fifth','5','five','theme 5','last','lst'],    target: 'lumen',      label: 'Lumen' },
                ];
                const inlineTheme = THEME_MAP_QUICK.find(th => th.keys.some(k => tLower.includes(k)));

                if (name && name.length >= 2 && name.length <= 20 && /^[a-zA-Z]+$/.test(name) && !forbiddenNameVerbs.includes(name.toLowerCase())) {
                    this.userName = name;
                    localStorage.setItem('rayaUserName', name);
                    // Save to backend preferences
                    fetch('/api/learn', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ type: 'preference', content: `User's name is ${name}`, sessionId: this.sessionId })
                    }).catch(()=>{});

                    this.showUserBubble(text);
                    this.messages.push({ role: 'user', content: text });

                    if (inlineTheme) {
                        const greeting = `Nice to meet you, ${name}! Opening the ${inlineTheme.label} theme for you right now!`;
                        this._awaitingTheme   = false;
                        this._awaitingCommand = true;
                        this.messages.push({ role: 'assistant', content: greeting });
                        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
                        this.speakAvatar(greeting, false);
                        this.executeNavigation(inlineTheme.target);
                    } else {
                        const greeting = `Nice to meet you, ${name}! We have five themes: 1 Immersive, 2 Cosmic, 3 Urban, 4 Essential, and 5 Lumen. Which would you like to open?`;
                        this._awaitingTheme   = true;
                        this._awaitingCommand = true;
                        this.messages.push({ role: 'assistant', content: greeting });
                        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
                        this.speakAvatar(greeting, false);
                    }
                    return;
                }
            }
        }

        // ── Onboarding: theme selection ────────────────────────────────────────
        if (this._awaitingTheme) {
            const t = text.toLowerCase().trim();
            const THEME_MAP = [
                { keys: ['1','immersive','3d','three d'], target: 'immersive',  reply: 'Opening the Immersive theme for you!' },
                { keys: ['2','cosmic','alien'],           target: 'cosmic',     reply: 'Switching to the Cosmic theme!' },
                { keys: ['3','urban','graffiti','street'],target: 'urban',      reply: 'Loading the Urban theme!' },
                { keys: ['4','essential','minimalist'],   target: 'essential',  reply: 'Essential mode, activated!' },
                { keys: ['5','lumen','light'],            target: 'lumen',      reply: 'Opening the Lumen theme!' },
            ];
            let matched = null;
            for (const th of THEME_MAP) {
                if (th.keys.some(k => t === k || t.includes(k))) { matched = th; break; }
            }
            if (matched) {
                this._awaitingTheme = false;
                this.showUserBubble(text);
                this.messages.push({ role: 'user', content: text });
                this.messages.push({ role: 'assistant', content: matched.reply });
                localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
                this.speakAvatar(matched.reply, false);
                this.executeNavigation(matched.target);
                return;
            }
            // Didn't match a theme — fall through to AI
            this._awaitingTheme = false;
        }

        // Admin Mode Execution
        if (this.isAdminMode) {
            if (text.toLowerCase() === 'exit') {
                this.isAdminMode = false;
                this.showUserBubble(text);
                this.speakAvatar("Admin mode deactivated.", false);
                return;
            }
            this.showUserBubble(text);
            this.showTyping();
            try {
                const res = await fetch('/api/admin/rule', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer Ratnesh@231' },
                    body: JSON.stringify({ rule: text })
                });
                const data = await res.json();
                this.hideTyping();
                this.speakAvatar("Got it! " + data.message, false);
            } catch(e) {
                this.hideTyping();
                this.speakAvatar("Failed to save rule.", false);
            }
            return;
        }

        // Secret Admin Command Entry
        if (text.trim() === 'Ratnesh@231') {
            this.isAdminMode = true;
            this.showUserBubble("Ratnesh@231");
            this.showTyping();
            try {
                const res = await fetch('/api/insights', {
                    headers: { 'Authorization': 'Bearer Ratnesh@231' }
                });
                if (!res.ok) throw new Error('Forbidden');
                const data = await res.json();
                this.hideTyping();
                const insightMsg = `Welcome back Admin! I am now in Admin Rule Mode. Tell me what I should or shouldn't share globally. Say 'clear all' to wipe rules, or 'exit' to leave. Current site visits: ${data.total}.`;
                this.speakAvatar(insightMsg, false);
            } catch (err) {
                this.isAdminMode = false;
                this.hideTyping();
                this.speakAvatar("Failed to load insights. Unauthorized.", false);
            }
            return;
        }

        this.awaitingChoice = false;
        this.pendingResults = null;
        this.hideChoices();
        this.isListening = false;
        this.isThinking  = true;
        // Try to warm up TTS immediately to reduce delay later
        if (window.speechSynthesis) {
            window.speechSynthesis.getVoices();
        }

        this.updateMicUI();
        
        // Listen for early gestures to prime TTS context
        const primeTTS = () => {
            if (window.speechSynthesis) {
                const dummy = new SpeechSynthesisUtterance('');
                dummy.volume = 0;
                window.speechSynthesis.speak(dummy);
            }
            ['click', 'touchstart', 'keydown'].forEach(ev => document.removeEventListener(ev, primeTTS));
        };
        ['click', 'touchstart', 'keydown'].forEach(ev => document.addEventListener(ev, primeTTS, { once: true }));
        this.showUserBubble(text); // Show user's message in the bubble immediately
        this.messages.push({ role: 'user', content: text });
        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));

        // LOCAL COMMAND ROUTING - handles simple commands with zero API calls
        // Also handles dual-commands (e.g. open theme + play music simultaneously)
        const localResult = this._tryLocalCommand(text);
        if (localResult) {
            this.isThinking = false;
            this._awaitingCommand = false;
            this.updateMicUI();
            this.messages.push({ role: 'assistant', content: localResult.speech });
            localStorage.setItem('rayaMessages', JSON.stringify(this.messages));
            // Execute all actions (supports multi-action combos)
            const actions = localResult.actions || (localResult.action ? [localResult.action] : []);
            actions.forEach(fn => { try { fn(); } catch(e) { console.warn('[Raya] Action error:', e); } });
            this.speakAvatar(localResult.speech, true);
            return;
        }

        // SMART COMMAND CACHE CHECK - Learn from crowd behavior to save API calls
        // Do NOT cache or reuse responses for jokes/creative queries so they are never repetitive!
        const isJokeOrCreative = /\b(joke|jokes|funny|riddle|riddles|laugh|humor|story|roast|pun)\b/i.test(text);
        if (!isJokeOrCreative) {
            try {
                const cacheRes = await fetch('/api/cmd/lookup?q=' + encodeURIComponent(text));
                if (cacheRes.ok) {
                    const cacheData = await cacheRes.json();
                    if (cacheData.cached) {
                        console.log('🧠 [Raya Smart Cache] Hit for query:', text);
                        this.hideTyping();
                        this.processAIResponse(cacheData.response, text, true); // true = fromCache
                        return;
                    }
                }
            } catch (e) {
                console.warn('[Raya Smart Cache] Lookup failed:', e);
            }
        }

        // Fall through to Groq for real conversation
        this.showTyping();

        // -- Safety timeout: if no reply in 30s, reset and prompt user to retry
        const thinkingTimeout = setTimeout(() => {
            if (this.isThinking) {
                this.isThinking = false;
                this._awaitingCommand = false;
                this.updateMicUI();
                this.hideTyping();
                this.speakAvatar("Hmm, I didn't catch that. Could you say it again?", true);
            }
        }, 30000);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: this.messages, sessionId: this.sessionId })
            });
            clearTimeout(thinkingTimeout);
            if (!res.ok) throw new Error('Server error ' + res.status);
            const data  = await res.json();
            const reply = data.choices[0].message.content;
            this.hideTyping();
            this.processAIResponse(reply, text, false);
        } catch (err) {
            clearTimeout(thinkingTimeout);
            console.error('[Raya]', err);
            this.hideTyping();
            this.isThinking = false;
            this._awaitingCommand = false;
            this.updateMicUI();
            this.speakAvatar("Sorry, I couldn't connect right now. Please try again!", false);
        }
    }

    // LOCAL COMMAND MATCHER
    // Returns { speech, actions: [fn, ...] } for multi-action support, or null.
    // Legacy callers that used { speech, action } still work because the call site
    // now normalises both shapes.
    _tryLocalCommand(text) {
        // Strip punctuation and convert to lower case for strict matching
        const t = text.toLowerCase().replace(/[.,!?]/g, '').trim();

        // WAKE WORD ONLY Check
        const wakeWords = ['raya', 'hey raya', 'hi raya', 'listen raya', 'hello raya'];
        if (wakeWords.includes(t)) {
            const replies = ["Yes?", "Yep!", "What?", "Yes! How can I help you?", "I'm listening!", "Yes, what can I help you with?"];
            return { speech: replies[Math.floor(Math.random() * replies.length)], actions: [] };
        }



        // If it looks like a question or an explanation request, let the LLM handle it
        const infoWords = ['what', 'why', 'explain', 'tell', 'describe', 'details', 'who is', 'what is', 'tell me about'];
        if (infoWords.some(w => t.includes(w))) {
            return null; // Let Groq handle informational queries
        }

        // THEMES
        const THEMES = [
            { keys: ['immersive','3d','three d','3d model','1st','first','1','one','theme 1','theme one','first theme'],      target: 'immersive',  reply: 'Opening the Immersive theme!' },
            { keys: ['cosmic','alien','cute alien','2nd','second','2','two','theme 2','theme two','second theme'],             target: 'cosmic',     reply: 'Switching to Cosmic theme!' },
            { keys: ['urban','graffiti','grafitti','street','3rd','third','3','three','theme 3','theme three','third theme'],  target: 'urban',      reply: 'Loading the Urban theme!' },
            { keys: ['essential','minimalist','minimal','4th','fourth','4','four','theme 4','theme four','fourth theme'],      target: 'essential',  reply: 'Essential mode, activated!' },
            { keys: ['lumen','light theme','5th','fifth','5','five','theme 5','theme five','fifth theme','last','last theme','lst','lst theme'], target: 'lumen', reply: 'Switching to Lumen theme!' },
        ];

        let matchedTheme = null;
        for (const theme of THEMES) {
            if (theme.keys.some(k => {
                if (/^\d+$/.test(k) || ['one','two','three','four','five'].includes(k)) {
                    return new RegExp('\\b' + k + '\\b').test(t);
                }
                return t.includes(k);
            })) { matchedTheme = theme; break; }
        }

        // Music command detection
        let matchedMusicQuery = null;
        const musicKeywords = ['play', 'put on', 'listen to', 'play me'];
        for (const kw of musicKeywords) {
            if (t.includes(kw)) {
                const idx = t.indexOf(kw);
                let query = t.slice(idx + kw.length).trim();
                // Strip theme words from the music query
                query = query.replace(/(?:and|then|also)?\s*(?:open|load|switch|go to|show|select|choose)?\s*(?:immersive|cosmic|urban|essential|lumen|theme|\d|one|two|three|four|five)+/gi, '').trim();
                if (query.length > 1) {
                    matchedMusicQuery = query;
                    break;
                }
            }
        }

        // 1. Dual-command theme + music
        if (matchedTheme && matchedMusicQuery) {
            const actions = [
                () => this.executeNavigation(matchedTheme.target),
                () => this.searchAndPlay(matchedMusicQuery)
            ];
            const speech = `${matchedTheme.reply} And playing ${matchedMusicQuery} for you!`;
            return { speech, actions };
        }

        // 2. Standalone theme command
        const iframeContainer = document.getElementById('iframe-container');
        const isThemeSelectionScreen = !iframeContainer || iframeContainer.style.opacity === '0' || iframeContainer.style.opacity === '';
        const hasThemeTrigger = /open|go to|navigate|switch|load|show|select|choose|theme/.test(t);
        if (matchedTheme && (isThemeSelectionScreen || hasThemeTrigger)) {
            return { speech: matchedTheme.reply, actions: [() => this.executeNavigation(matchedTheme.target)] };
        }
        if (/change theme|switch theme|new theme|different theme/.test(t)) {
            return { speech: 'Taking you to the theme selector! Which one would you like?', actions: [() => {
                const btn = document.getElementById('change-theme-btn');
                if (btn) btn.click();
            }] };
        }

        // 3. Standalone music command
        if (matchedMusicQuery) {
            return { speech: `Searching for ${matchedMusicQuery} on YouTube!`, actions: [() => this.searchAndPlay(matchedMusicQuery)] };
        }

        // AVATAR SWITCH
        const AVATAR_NAMES = ['changli','camellya','carlotta','chixia','jinshi','pinkshi',
                              'roccia','rover','sanhua','shorekeeper','verina','yangyang','yinlin'];
        if (/change|switch|swap|show|use|load|model|avatar|character|vrm/.test(t)) {
            const matched = AVATAR_NAMES.find(name => t.includes(name));
            if (matched) return { speech: `Switching to ${matched} right away!`, actions: [() => this.executeChangeAvatar(matched)] };
            if (/change avatar|switch avatar|change model|switch model|change character|new avatar|different avatar|random avatar|another avatar/.test(t))
                return { speech: 'Switching to a random avatar!', actions: [() => this.executeChangeAvatar('')] };
        }

        // SCROLL SECTIONS
        const SECTIONS = [
            { keys: ['home','top','beginning','start'],                           target: 'home' },
            { keys: ['about','about me','who are you','who is ratnesh'],          target: 'about' },
            { keys: ['education','college','university','degree','study'],         target: 'education' },
            { keys: ['skill','skills','tech','technology','stack'],                target: 'skills' },
            { keys: ['project','projects','work','portfolio'],                     target: 'projects' },
            { keys: ['contact','email','instagram','linkedin','github','social'],  target: 'contact' },
        ];
        if (/\b(scroll to|go to|take me to|navigate to)\b/.test(t)) {
            for (const sec of SECTIONS) {
                if (sec.keys.some(k => t.includes(k)))
                    return { speech: `Taking you to the ${sec.target} section!`, actions: [() => this.executeScroll(sec.target)] };
            }
        }
        if (/^scroll down$|^go down$|^page down$|\bscroll down\b|\bgo down\b/.test(t)) return { speech: 'Scrolling down!', actions: [() => this.executeScroll('down')] };
        if (/^scroll up$|^go up$|^page up$|^back to top$|\bscroll up\b|\bgo up\b|\bback to top\b/.test(t)) return { speech: 'Scrolling back up!', actions: [() => this.executeScroll('up')] };

        // STOP MUSIC
        if (/stop music|pause music|quiet|shut up|turn off music|stop playing/.test(t))
            return { speech: 'Stopping the music.', actions: [() => { document.getElementById('raya-yt-wrapper')?.remove(); }] };

        // SIZE CONTROL
        if (/size|bigger|larger|grow|taller|smaller|shrink|tiny|huge|normal size|reset size|default size/.test(t)) {
            if (/\b(bigger|larger|grow|taller|increase size)\b|make.*big|make.*large/.test(t))
                return { speech: 'Making the avatar bigger!',           actions: [() => this.adjustAvatarSize(1.20)] };
            if (/\b(smaller|shrink|tiny|decrease size)\b|make.*small|make.*tiny/.test(t))
                return { speech: 'Making the avatar smaller!',          actions: [() => this.adjustAvatarSize(0.80)] };
            if (/\b(normal|reset|default|original)\b/.test(t))
                return { speech: 'Resetting avatar to default size!',   actions: [() => this.setAvatarSize(0.95)] };
        }

        // RANDOM JOKES (Never repetitive!)
        if (/\b(tell me a joke|tell a joke|another joke|say a joke|funny joke|make me laugh|joke|jokes)\b/i.test(t)) {
            const JOKES = [
                "Why do programmers prefer dark mode? Because light attracts bugs!",
                "There are 10 types of people in the world: those who understand binary, and those who don't!",
                "Why was the JavaScript developer sad? Because he didn't Know how to 'null' his feelings!",
                "How many programmers does it take to change a lightbulb? None, that's a hardware problem!",
                "Why do Java developers wear glasses? Because they don't C#!",
                "An SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
                "Why did the web developer leave the restaurant? Because of the table layout!",
                "A user interface is like a joke. If you have to explain it, it's not that good!",
                "Why did the developer go broke? Because he used up all his cache!",
                "What's a database administrator's favorite song? 'Drop it like it's hot!'",
                "Why was the computer cold? It left its Windows open!",
                "Why did the function cross the road? To return to the main program!",
                "What is an AI's favorite snack? Microchips and dip!",
                "Why did the CSS code go to therapy? It had too many alignment issues!",
                "Why don't programmers like nature? It has too many bugs and no stack trace!",
                "Why did the robot go on a diet? It had too many bytes!",
                "What do you call a programmer from Finland? Nerdic!",
                "How does a computer get drunk? It takes screenshots!",
                "Why did the AI break up with the server? There was zero connection!",
                "Why was the Git commit so confident? Because it had a great push!",
                "Why did the developer keep getting lost? Because his code kept throwing unhandled exceptions!",
                "What's a pirate's favorite programming language? You'd think it's R, but his true love is the C!",
                "Why did the smartphone get glasses? It lost its contacts!",
                "How do you tell HTML from HTML5? Try it out in Internet Explorer. If it works, it's HTML. If it doesn't, it's HTML5!"
            ];
            if (!this._usedJokeIndices) this._usedJokeIndices = [];
            let available = JOKES.map((_, i) => i).filter(i => !this._usedJokeIndices.includes(i));
            if (available.length === 0) {
                this._usedJokeIndices = [];
                available = JOKES.map((_, i) => i);
            }
            const randomIndex = available[Math.floor(Math.random() * available.length)];
            this._usedJokeIndices.push(randomIndex);
            const jokeText = JOKES[randomIndex];
            return { speech: jokeText, actions: [] };
        }

        return null; // Let Groq handle it
    }

    // -- Avatar Size Helpers ---------------------------------------------------
    adjustAvatarSize(multiplier) {
        // Use window.adjustVRMScale which has closure over live vrm reference
        const next = typeof window.adjustVRMScale === 'function'
            ? window.adjustVRMScale(multiplier)
            : Math.min(1.8, Math.max(0.3, (window.currentVRMScale || 0.95) * multiplier));
        // Sync slider UI
        const slider = document.getElementById('avatar-size-slider');
        const pct    = document.getElementById('avatar-size-pct');
        if (slider) { slider.value = next; if (pct) pct.innerText = Math.round(next * 100) + '%'; }
    }

    setAvatarSize(scale) {
        if (typeof window.setVRMScale === 'function') window.setVRMScale(scale);
        const slider = document.getElementById('avatar-size-slider');
        const pct    = document.getElementById('avatar-size-pct');
        if (slider) { slider.value = scale; if (pct) pct.innerText = Math.round(scale * 100) + '%'; }
    }


    // -- Process AI Reply -------------------------------------------------------
    async processAIResponse(fullMsg, originalQuery = null, fromCache = false) {
        this.isThinking = false;
        this.updateMicUI();

        // Extract ALL JSON action blocks from the reply (supports dual/multi commands)
        const jsonPattern = /\{[^{}]*"action"\s*:\s*"(?:play_song|navigate|scroll|change_avatar|open_link)"[^{}]*\}/gi;
        const allMatches = [...fullMsg.matchAll(jsonPattern)];
        const actionObjs = [];
        let spokenText = fullMsg;

        for (const m of allMatches) {
            try {
                actionObjs.push(JSON.parse(m[0]));
                spokenText = spokenText.replace(m[0], '');
            } catch (e) { console.warn('[Raya] JSON parse error:', e); }
        }
        spokenText = spokenText.trim();

        this.messages.push({ role: 'assistant', content: spokenText });
        localStorage.setItem('rayaMessages', JSON.stringify(this.messages));

        if (actionObjs.length === 0) {
            this.speakAvatar(spokenText, true);
            return;
        }

        // Cache recording (for non-music non-cached responses)
        if (!fromCache && originalQuery && !actionObjs.some(a => a.action === 'play_song')) {
            fetch('/api/cmd/record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: originalQuery, response: fullMsg })
            }).catch(e => console.warn('[Raya Smart Cache] Record failed:', e));
        }

        // Speak the text portion first
        this.speakAvatar(spokenText, false);

        // Execute every action that was found concurrently
        actionObjs.forEach(async (actionObj) => {
            if (actionObj.action === 'play_song' && actionObj.query) {
                await this.searchAndPlay(actionObj.query);
            } else if (actionObj.action === 'navigate') {
                this.executeNavigation(actionObj.target);
            } else if (actionObj.action === 'scroll') {
                const qLower = (originalQuery || '').toLowerCase().trim();
                const isExplicitScrollReq = /\b(scroll|go to|take me|navigate|section|where is|show me about|show me projects|show me skills|show me contact)\b/i.test(qLower);
                if (isExplicitScrollReq) {
                    this.executeScroll(actionObj.target);
                } else {
                    console.log('[Raya Guard] Suppressed automatic scroll action for query:', originalQuery);
                }
            } else if (actionObj.action === 'open_link') {
                const lnk = (actionObj.target || '').toLowerCase();
                let url = '';
                if (lnk.includes('email') || lnk.includes('mail')) url = 'mailto:kumarsinghratnesh3@gmail.com';
                else if (lnk.includes('insta')) url = 'https://www.instagram.com/ratnesh.199?igsh=MXF3aDd0eWRhaGhiaA==';
                else if (lnk.includes('face'))  url = 'https://www.facebook.com/ratnesh';
                else if (lnk.includes('link'))  url = 'https://www.linkedin.com/in/ratnesh-kumar-singh-16749325b?utm_source=share_via&utm_content=profile&utm_medium=member_android';
                if (url) setTimeout(() => window.open(url, '_blank'), 1500);
            } else if (actionObj.action === 'change_avatar') {
                this.executeChangeAvatar(actionObj.target);
            }
        });
    }

    // -- Website Control Actions ------------------------------------------------
    executeNavigation(target) {
        if (!target) return;
        const targetClean = target.toLowerCase().replace(/card\s*/, '').trim();
        
        if (targetClean === 'recruiter' || targetClean === 'recruiter mode' || targetClean.includes('recruiter') ||
            targetClean === 'visitor' || targetClean === 'visitor mode' || targetClean === 'main' || targetClean === 'main portfolio' || targetClean === 'home') {
            
            const changeThemeBtn = document.getElementById('change-theme-btn');
            if (changeThemeBtn && changeThemeBtn.style.opacity === '1') {
                changeThemeBtn.click();
                this.onThemeClosed();
            }
            return;
        }
        
        let id = null;
        let themeName = '';
        if (targetClean.includes('last theme') || targetClean.includes('previous theme')) {
            const saved = localStorage.getItem('selectedTheme');
            if (saved) {
                const card = Array.from(document.querySelectorAll('.card')).find(c => c.getAttribute('href') === saved);
                if (card) {
                    id = `#${card.id}`;
                    themeName = card.querySelector('.card-title')?.textContent || 'Last Theme';
                }
            }
            if (!id) { id = '#card-5'; themeName = 'Lumen'; }
        }
        else if (targetClean.includes('immersive') || targetClean.includes('3d model') || targetClean === '1' || targetClean.includes('1st')) { id = '#card-1'; themeName = 'Immersive'; }
        else if (targetClean.includes('cosmic') || targetClean.includes('cute alien') || targetClean === '2' || targetClean.includes('2nd')) { id = '#card-2'; themeName = 'Cosmic'; }
        else if (targetClean.includes('urban') || targetClean.includes('graffiti') || targetClean === '3' || targetClean.includes('3rd')) { id = '#card-3'; themeName = 'Urban'; }
        else if (targetClean.includes('essential') || targetClean.includes('minimalist') || targetClean === '4' || targetClean.includes('4th')) { id = '#card-4'; themeName = 'Essential'; }
        else if (targetClean.includes('lumen') || targetClean === '5' || targetClean.includes('5th') || targetClean.includes('lst')) { id = '#card-5'; themeName = 'Lumen'; }

        if (id) {
            const card = document.querySelector(id);
            
            // If card isn't found, redirect to the main selector page
            if (!card) {
                window.location.href = '/';
                return;
            }

            const targetUrl = card.getAttribute('href');
            const iframe = document.querySelector('#iframe-container iframe');
            
            // Check if already in the requested theme
            if (iframe && iframe.src && targetUrl) {
                const urlObj = new URL(targetUrl, window.location.href);
                if (iframe.src === urlObj.href || iframe.src.includes(targetUrl.replace('./', ''))) {
                    return; // We are already here, don't trigger reload
                }
            }

            if (card) {
                card.click();
                // onThemeOpened is triggered by index.html's card click listener
            }
        }
        
        // Hook the change-theme-btn to notify Raya when user closes the iframe
        if (!this._changeThemeBtnHooked) {
            this._changeThemeBtnHooked = true;
            const btn = document.getElementById('change-theme-btn');
            if (btn) {
                btn.addEventListener('click', () => {
                    this.onThemeClosed();
                });
            }
        }
    }
    executeScroll(target) {
        if (!target) return;
        target = target.toLowerCase().trim();

        const iframeContainer = document.getElementById('iframe-container');
        const iframe = document.querySelector('#iframe-container iframe');
        const isIframeActive = iframe && iframeContainer && (iframeContainer.style.opacity === '1' || iframeContainer.style.display !== 'none');

        // On main theme selection screen (no theme iframe open), DO NOT scroll unless explicitly asking for contact section
        if (!isIframeActive) {
            if (target === 'contact' || target === 'email' || target === 'social') {
                const contactSec = document.querySelector('.contact-section') || document.getElementById('contact');
                if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }

        // Inside active Theme Iframe: ONLY allow explicit valid scroll targets!
        const VALID_SCROLL_TARGETS = ['up', 'down', 'home', 'top', 'about', 'education', 'college', 'university', 'skill', 'skills', 'project', 'projects', 'contact', 'email', 'social', 'socials'];
        const safeTarget = target.split(' ')[0];
        if (!VALID_SCROLL_TARGETS.includes(target) && !VALID_SCROLL_TARGETS.includes(safeTarget)) {
            // Reject non-scroll command targets (e.g. songs, avatars, messages) to prevent unwanted scrolling
            return;
        }

        const postToIframe = (msg) => {
            if (iframe && iframe.contentWindow) {
                try { iframe.contentWindow.postMessage(msg, '*'); } catch(e) {}
            }
        };

        // Explicit Directional Scroll ('up' or 'down' ONLY)
        if (target === 'up' || target === 'down' || safeTarget === 'up' || safeTarget === 'down') {
            const isUp = target === 'up' || safeTarget === 'up';
            const distance = isUp ? -650 : 650;
            try {
                const win = iframe.contentWindow;
                const doc = iframe.contentDocument || (win ? win.document : null);
                if (win) win.scrollBy({ top: distance, behavior: 'smooth' });
                if (doc && doc.documentElement && typeof doc.documentElement.scrollBy === 'function') {
                    doc.documentElement.scrollBy({ top: distance, behavior: 'smooth' });
                }
            } catch(e) {
                console.warn('[Raya] Direct iframe scroll failed, sending postMessage fallback:', e);
            }
            postToIframe({ type: 'raya-scroll', direction: isUp ? 'up' : 'down' });
            return;
        }

        // Named Section Scroll inside Iframe
        let elementId = safeTarget;
        if (safeTarget === 'home' || safeTarget === 'top') elementId = 'home';
        else if (safeTarget === 'about') elementId = 'about';
        else if (safeTarget === 'education' || safeTarget === 'college' || safeTarget === 'university') elementId = 'education';
        else if (safeTarget === 'skill' || safeTarget === 'skills') elementId = 'skills';
        else if (safeTarget === 'project' || safeTarget === 'projects') elementId = 'projects';
        else if (safeTarget === 'contact' || safeTarget === 'email' || safeTarget === 'social' || safeTarget === 'socials') elementId = 'contact';

        try {
            const win = iframe.contentWindow;
            const doc = iframe.contentDocument || (win ? win.document : null);
            if (doc) {
                if (elementId === 'home') {
                    if (win) win.scrollTo({ top: 0, behavior: 'smooth' });
                    if (doc.documentElement) doc.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const section = doc.getElementById(elementId) ||
                                doc.querySelector(`.${elementId}-section`) ||
                                doc.querySelector(`[id*="${elementId}" i]`) ||
                                doc.querySelector(`[data-section="${elementId}"]`);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }
            }
        } catch(e) {
            console.warn('[Raya] Direct section scroll failed, sending postMessage fallback:', e);
        }

        postToIframe({ type: 'raya-scroll', section: elementId });
    }

    executeChangeAvatar(target) {
        // Full avatar map: keyword aliases → VRM file path
        const avatarMap = {
            'changli':      './Wuwa/changli(fixed).vrm',
            'camellya':     './Wuwa/CamellyaV1.vrm',
            'carlotta':     './Wuwa/CarlottaV1.vrm',
            'chixia':       './Wuwa/chixia.vrm',
            'jinshi':       './Wuwa/jinshi.vrm',
            'kid changli':  './Wuwa/Kid changli.vrm',
            'pinkshi':      './Wuwa/PinkshiV1.vrm',
            'roccia':       './Wuwa/RocciaV3.vrm',
            'rover':        './Wuwa/rover.vrm',
            'sanhua':       './Wuwa/SanhuaV2.vrm',
            'shorekeeper':  './Wuwa/ShorekeeperV3.vrm',
            'verina':       './Wuwa/verina.vrm',
            'yangyang':     './Wuwa/yangyang.vrm',
            'yinlin':       './Wuwa/yinlin.vrm',
        };

        const allFiles = Object.values(avatarMap);
        let matchedFile = null;

        if (target) {
            const targetLower = target.toLowerCase().trim();
            // Try exact keyword match first
            for (const [key, file] of Object.entries(avatarMap)) {
                if (targetLower.includes(key)) {
                    matchedFile = file;
                    break;
                }
            }
            // Fuzzy: check if any avatar name is partially in the target
            if (!matchedFile) {
                for (const [key, file] of Object.entries(avatarMap)) {
                    const firstWord = key.split(' ')[0];
                    if (targetLower.includes(firstWord)) {
                        matchedFile = file;
                        break;
                    }
                }
            }
        }

        // If still no match (user said "change avatar" without a name), pick random
        if (!matchedFile) {
            matchedFile = allFiles[Math.floor(Math.random() * allFiles.length)];
            console.log('[Raya] No avatar name specified, switching to random:', matchedFile);
        }

        if (typeof window.switchVRM === 'function') {
            window.switchVRM(matchedFile);
            console.log('[Raya] Switching VRM to:', matchedFile);
        } else {
            console.error('[Raya] window.switchVRM not available yet!');
        }
    }


    // -- YouTube Search + Direct Embed Play -----------------------------------
    async searchAndPlay(query) {
        if (!query) return;

        console.log('[Raya] Searching YouTube for:', query);
        this.showBubble('🔍 Searching for "' + query + '"…');
        
        try {
            const res = await fetch('/api/yt-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();
            const results = data.results || [];

            if (results.length === 0) {
                this.speakAvatar("Sorry, I couldn't find that. Could you give me more details?", true);
                return;
            }

            // Pick randomly from top 3 results to avoid always playing the same video
            const topResults = results.slice(0, Math.min(3, results.length));
            const video = topResults[Math.floor(Math.random() * topResults.length)];

            this.speakAvatar(`Playing ${video.title} for you!`, false);
            this.buildYouTubePlayer(video);
        } catch (err) {
            console.error('[Raya] YT search error:', err);
            this.speakAvatar("I had trouble connecting to the search backend. Please try again!", false);
        }
    }

    buildYouTubePlayer(video) {
        const ytUrl = 'https://www.youtube.com/watch?v=' + video.videoId;
        const embedUrl = 'https://www.youtube.com/embed/' + video.videoId + '?autoplay=1&enablejsapi=1';

        // Remove any existing player
        document.getElementById('raya-yt-wrapper')?.remove();

        if (!document.getElementById('raya-yt-style')) {
            const s = document.createElement('style');
            s.id = 'raya-yt-style';
            s.textContent = `
                @keyframes rayaSlideUp {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
            `;
            document.head.appendChild(s);
        }

        const thumbUrl = 'https://i.ytimg.com/vi/' + video.videoId + '/mqdefault.jpg';
        const wrapper = document.createElement('div');
        wrapper.id = 'raya-yt-wrapper';
        wrapper.style.cssText = `
            position:fixed; bottom:20px; left:16px; z-index:9999999;
            display:flex; align-items:center; gap:10px;
            background:rgba(10,10,14,0.92); backdrop-filter:blur(12px);
            border:1px solid rgba(255,65,108,0.35); border-radius:14px;
            padding:10px 14px; max-width:300px;
            box-shadow:0 8px 32px rgba(0,0,0,0.6);
            animation:rayaSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        `;

        const thumb = document.createElement('img');
        thumb.src = thumbUrl;
        thumb.style.cssText = 'width:54px;height:38px;border-radius:8px;object-fit:cover;flex-shrink:0;';

        const info = document.createElement('div');
        info.style.cssText = 'flex:1;min-width:0;';

        const titleEl = document.createElement('div');
        titleEl.textContent = video.title;
        titleEl.style.cssText = `font-size:0.78rem;font-weight:600;color:#fff;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Outfit',sans-serif;`;

        const openBtn = document.createElement('a');
        openBtn.href = ytUrl;
        openBtn.target = '_blank';
        openBtn.rel = 'noopener';
        openBtn.innerHTML = '↗ Open on YouTube';
        openBtn.style.cssText = `display:inline-block;margin-top:5px;font-size:0.7rem;
            font-weight:700;color:#ff416c;text-decoration:none;
            font-family:'Outfit',sans-serif;letter-spacing:0.5px;`;
        openBtn.addEventListener('click', () => setTimeout(() => wrapper.remove(), 8000));

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        closeBtn.style.cssText = `background:none;border:none;color:rgba(255,255,255,0.4);
            cursor:pointer;font-size:0.85rem;padding:0 0 0 6px;flex-shrink:0;line-height:1;`;
        closeBtn.onclick = () => wrapper.remove();

        // Embed iframe for direct on-page playback (no popups)
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.allow = 'autoplay; encrypted-media; clipboard-write; picture-in-picture';
        // Make iframe take full space behind the thumbnail to trick autoplay blockers
        iframe.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; opacity:0.01; z-index:-1; border:none; pointer-events:none;';

        info.appendChild(titleEl);
        info.appendChild(openBtn);
        wrapper.appendChild(thumb);
        wrapper.appendChild(info);
        wrapper.appendChild(closeBtn);
        wrapper.appendChild(iframe); // Audio plays from here
        document.body.appendChild(wrapper);
        
        // Auto-remove after a long time or when closed manually
        setTimeout(() => wrapper.remove?.(), 60000 * 10); // 10 minutes
    }

    // -- Show disambiguation UI -------------------------------------------------
    showDisambiguation(options) {
        const questionText = 'I found this song by multiple artists! Which version would you like?';
        this.bubbleText.innerText = questionText;
        this.chatBubble.style.opacity = '1';
        this.choiceContainer.style.display = 'flex';
        this.choiceContainer.innerHTML = '';

        options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-choice-btn';
            const artistClean = opt.artist.replace(/\s*-\s*Topic$/i, '').trim();
            btn.textContent = `${i + 1}. ${artistClean}`;
            btn.addEventListener('click', () => this.playVideoById(opt));
            this.choiceContainer.appendChild(btn);
        });

        this.speakAvatar(questionText, false);
    }

    hideChoices() {
        this.choiceContainer.style.display  = 'none';
        this.choiceContainer.innerHTML = '';
        this.awaitingChoice = false;
        this.pendingResults = null;
    }

    // -- Direct Play -----------------------------------------------------------
    playVideoById(video) {
        this.hideChoices();
        const artistClean = video.artist.replace(/\s*-\s*Topic$/i, '').trim();
        const msg = `Playing "${video.title}" by ${artistClean} right now!`;
        this.speakAvatar(msg, true);

        const ytUrl = 'https://www.youtube.com/watch?v=' + video.videoId + '&vq=small';
        const embedUrl = 'https://www.youtube.com/embed/' + video.videoId + '?autoplay=1&enablejsapi=1';

        // Remove any existing player
        document.getElementById('raya-yt-wrapper')?.remove();

        if (!document.getElementById('raya-yt-style')) {
            const s = document.createElement('style');
            s.id = 'raya-yt-style';
            s.textContent = `
                @keyframes rayaSlideUp {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
            `;
            document.head.appendChild(s);
        }

        const thumbUrl = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
        const wrapper = document.createElement('div');
        wrapper.id = 'raya-yt-wrapper';
        wrapper.style.cssText = `
            position:fixed; bottom:20px; left:16px; z-index:9999999;
            display:flex; align-items:center; gap:10px;
            background:rgba(10,10,14,0.92); backdrop-filter:blur(12px);
            border:1px solid rgba(255,65,108,0.35); border-radius:14px;
            padding:10px 14px; max-width:300px;
            box-shadow:0 8px 32px rgba(0,0,0,0.6);
            animation:rayaSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        `;

        const thumb = document.createElement('img');
        thumb.src = thumbUrl;
        thumb.style.cssText = 'width:54px;height:38px;border-radius:8px;object-fit:cover;flex-shrink:0;';

        const info = document.createElement('div');
        info.style.cssText = 'flex:1;min-width:0;';

        const titleEl = document.createElement('div');
        titleEl.textContent = video.title;
        titleEl.style.cssText = `font-size:0.78rem;font-weight:600;color:#fff;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Outfit',sans-serif;`;

        const artistEl = document.createElement('div');
        artistEl.textContent = artistClean;
        artistEl.style.cssText = `font-size:0.7rem;color:rgba(255,255,255,0.55);
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            font-family:'Outfit',sans-serif;margin-top:2px;`;

        const openBtn = document.createElement('a');
        openBtn.href = ytUrl;
        openBtn.target = '_blank';
        openBtn.rel = 'noopener';
        openBtn.innerHTML = '? Open on YouTube';
        openBtn.style.cssText = `display:inline-block;margin-top:5px;font-size:0.7rem;
            font-weight:700;color:#ff416c;text-decoration:none;
            font-family:'Outfit',sans-serif;letter-spacing:0.5px;`;
        openBtn.addEventListener('click', () => setTimeout(() => wrapper.remove(), 8000));

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        closeBtn.style.cssText = `background:none;border:none;color:rgba(255,255,255,0.4);
            cursor:pointer;font-size:0.85rem;padding:0 0 0 6px;flex-shrink:0;line-height:1;`;
        closeBtn.onclick = () => wrapper.remove();

        // Embed iframe for direct on-page playback (no popups)
        const iframe = document.createElement('iframe');
        iframe.src = embedUrl;
        iframe.allow = 'autoplay; encrypted-media; clipboard-write; picture-in-picture';
        // Make iframe take full space behind the thumbnail to trick autoplay blockers
        iframe.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; opacity:0.01; z-index:-1; border:none; pointer-events:none;';

        info.appendChild(titleEl);
        info.appendChild(artistEl);
        info.appendChild(openBtn);
        wrapper.appendChild(thumb);
        wrapper.appendChild(info);
        wrapper.appendChild(closeBtn);
        wrapper.appendChild(iframe); // Audio plays from here
        document.body.appendChild(wrapper);
        
        // Auto-remove after a long time or when closed manually
        setTimeout(() => wrapper.remove?.(), 60000 * 10); // 10 minutes
    }

    // -- TTS --------------------------------------------------------------------
    speakAvatar(text, autoListen = false) {
        if (!text) return;
        // Always show bubble text — regardless of TTS support
        this.showBubble(text);
        if (!window.speechSynthesis) {
            console.warn('[Raya TTS] SpeechSynthesis not supported — text only mode.');
            return;
        }
        const ytIframe1 = document.querySelector('#raya-yt-wrapper iframe'); if (ytIframe1) ytIframe1.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [20]}), '*');
        this.isSpeaking = true;
        this.updateMicUI();
        this.synth.cancel();

        // Activate cooldown: mic ignores input while Raya is speaking
        if (this._cooldownTimeoutId) {
            clearTimeout(this._cooldownTimeoutId);
            this._cooldownTimeoutId = null;
        }
        this._wakeWordCooldown = true;

        // iOS Safari requires a resume() call before speak() if synthesis was paused
        if (this.synth.paused) { try { this.synth.resume(); } catch(e) {} }

        const doSpeak = () => {
            // Comprehensive regex to remove all emoji ranges, pictographs, flags, emoticons, and symbols
            const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{200D}]/gu;

            const cleanText = text
                .replace(/\{"action".*?\}/g, '') // remove trailing JSON commands
                .replace(emojiRegex, '')         // remove ALL emojis so they are never spoken aloud
                .replace(/[\[\]*|`~_#>\\]/g, '')  // remove markdown formatting symbols
                .replace(/\s{2,}/g, ' ')
                .trim();

            // If Raya asks a question, we don't need a wake word for the user's answer
            if (cleanText.includes('?')) {
                this._awaitingCommand = true;
            }

            // Universal multi-language script and vocabulary detection for TTS voice selection
            let langCode = 'en-IN';
            let voiceSearchLang = 'en';

            if (/[\u3040-\u30FF\u31F0-\u31FF\uFF66-\uFF9F]/.test(cleanText)) {
                langCode = 'ja-JP'; voiceSearchLang = 'ja'; // Japanese
            } else if (/[\u4E00-\u9FFF]/.test(cleanText)) {
                langCode = 'zh-CN'; voiceSearchLang = 'zh'; // Chinese
            } else if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(cleanText)) {
                langCode = 'ko-KR'; voiceSearchLang = 'ko'; // Korean
            } else if (/[\u0600-\u06FF]/.test(cleanText)) {
                langCode = 'ar-SA'; voiceSearchLang = 'ar'; // Arabic
            } else if (/[\u0400-\u04FF]/.test(cleanText)) {
                langCode = 'ru-RU'; voiceSearchLang = 'ru'; // Russian
            } else if (/[\u0980-\u09FF]/.test(cleanText)) {
                langCode = 'bn-IN'; voiceSearchLang = 'bn'; // Bengali
            } else if (/[\u0A00-\u0A7F]/.test(cleanText)) {
                langCode = 'pa-IN'; voiceSearchLang = 'pa'; // Punjabi
            } else if (/[\u0B80-\u0BFF]/.test(cleanText)) {
                langCode = 'ta-IN'; voiceSearchLang = 'ta'; // Tamil
            } else if (/[\u0C00-\u0C7F]/.test(cleanText)) {
                langCode = 'te-IN'; voiceSearchLang = 'te'; // Telugu
            } else if (/[\u0A80-\u0AFF]/.test(cleanText)) {
                langCode = 'gu-IN'; voiceSearchLang = 'gu'; // Gujarati
            } else if (/[\u0900-\u097F]/.test(cleanText)) {
                langCode = 'hi-IN'; voiceSearchLang = 'hi'; // Hindi (Devanagari)
            } else if (/\b(hola|gracias|buenos|buenas|amigo|proyectos|por favor)\b/i.test(cleanText)) {
                langCode = 'es-ES'; voiceSearchLang = 'es'; // Spanish
            } else if (/\b(bonjour|merci|salut|comment|projets|s'il vous plaît)\b/i.test(cleanText)) {
                langCode = 'fr-FR'; voiceSearchLang = 'fr'; // French
            } else if (/\b(hallo|danke|guten|projekte|wie geht's|bitte)\b/i.test(cleanText)) {
                langCode = 'de-DE'; voiceSearchLang = 'de'; // German
            } else if (/\b(ciao|grazie|progetti|buongiorno|per favore)\b/i.test(cleanText)) {
                langCode = 'it-IT'; voiceSearchLang = 'it'; // Italian
            } else if (/\b(olá|obrigado|projetos|tudo bem|por favor)\b/i.test(cleanText)) {
                langCode = 'pt-BR'; voiceSearchLang = 'pt'; // Portuguese
            }

            const voices = this.synth.getVoices();
            let selectedVoice = null;
            if (voiceSearchLang !== 'en') {
                // Priority 1: High quality / natural female native voice for that language (e.g. Bengali, Hindi, Spanish, French, etc.)
                selectedVoice = voices.find(v => {
                    const langMatch = v.lang.toLowerCase().startsWith(voiceSearchLang) || v.lang.replace('_', '-').toLowerCase().startsWith(voiceSearchLang);
                    const isFemale = /female|natural|swara|tanishaa|neerja|geeta|kalpana|hi-in|bn-in|es-|fr-|de-|ja-|zh-|it-|pt-/i.test(v.name.toLowerCase() + ' ' + v.lang.toLowerCase());
                    const notMale = !/male|david|mark|ravi|george|james|pablo|henri|stefan|diego/i.test(v.name.toLowerCase());
                    return langMatch && (isFemale || notMale);
                }) || voices.find(v => v.lang.toLowerCase().startsWith(voiceSearchLang) || v.lang.replace('_', '-').toLowerCase().startsWith(voiceSearchLang));
            }
            
            // If no native voice exists on the user's device/browser, safely fall back to Raya's default voice
            if (!selectedVoice) {
                if (!this.femaleVoice) this.loadVoices();
                selectedVoice = this.femaleVoice || voices.find(v => v.lang.startsWith('en')) || voices[0];
            }

            const utterance = new SpeechSynthesisUtterance(cleanText);

            utterance.voice = selectedVoice;
            // CRITICAL: Bind utterance.lang to the voice's supported language to prevent synthesis failure
            utterance.lang = selectedVoice ? selectedVoice.lang : 'en-IN';
            utterance.rate   = 1.10; // ~165 WPM
            utterance.pitch  = 1.35;
            utterance.volume = 1.0;

            // -- Safety watchdog ----------------------------------------------
            const wordCount = cleanText.split(/\s+/).length;
            const estimatedMs = Math.max(3000, (wordCount / 3.25) * 1000 + 2500);
            let watchdog = null;
            let watchdogPaused = null;
            let speechEnded = false;

            const cleanupSpeech = () => {
                if (speechEnded) return;
                speechEnded = true;
                if (watchdog) clearInterval(watchdog);
                if (watchdogPaused) clearInterval(watchdogPaused);
                this.isSpeaking = false;
                this.setAvatarTalkingStatus(false);
                this.updateMicUI();
                const ytIframe2 = document.querySelector('#raya-yt-wrapper iframe');
                if (ytIframe2) ytIframe2.contentWindow.postMessage(JSON.stringify({event: 'command', func: 'setVolume', args: [100]}), '*');
                 if (this._cooldownTimeoutId) {
                     clearTimeout(this._cooldownTimeoutId);
                 }
                 this._cooldownTimeoutId = setTimeout(() => {
                     this._wakeWordCooldown = false;
                     this._cooldownTimeoutId = null;
                 }, 1500);
                // Auto-listening on speech synthesis end is completely disabled per strict manual mic constraints
            };

            utterance.onstart = () => { this.setAvatarTalkingStatus(true); };
            utterance.onend   = () => { cleanupSpeech(); };

            utterance.onerror = (e) => {
                if (e.error === 'interrupted') { cleanupSpeech(); return; }
                console.warn('[Raya TTS] Speech error:', e.error);
                cleanupSpeech();
            };

            try {
                this.synth.speak(utterance);

                // iOS Safari: if synthesis doesn't start within 600ms, resume and retry
                const iosCheck = setTimeout(() => {
                    if (this.synth.paused || (!this.synth.speaking && this.isSpeaking)) {
                        try { this.synth.resume(); this.synth.speak(utterance); } catch(e) {}
                    }
                }, 600);
                utterance.onstart = () => {
                    clearTimeout(iosCheck);
                    this.setAvatarTalkingStatus(true);
                };

                // Watchdog: poll every 300ms — catch silent failures faster
                watchdog = setInterval(() => {
                    if (!this.synth.speaking && !this.synth.pending && this.isSpeaking && !speechEnded) {
                        console.warn('[Raya TTS] Watchdog: synthesis silently stopped, forcing cleanup.');
                        cleanupSpeech();
                    }
                }, 300);

                // Paused-state watchdog: Chrome sometimes pauses speech on tab switch
                watchdogPaused = setInterval(() => {
                    if (this.synth.paused && this.isSpeaking && !speechEnded) {
                        try { this.synth.resume(); } catch(e) {}
                    }
                }, 800);

                // Hard ceiling
                setTimeout(() => { cleanupSpeech(); }, estimatedMs);

            } catch(e) {
                console.error('[Raya TTS] speak() threw:', e);
                cleanupSpeech();
            }
        };

        // Cancel any stale utterance.
        // Edge requires a short delay after cancel() before speak() works reliably.
        const isEdge = /Edg\//.test(navigator.userAgent);
        if (this.synth.speaking) {
            try { this.synth.cancel(); } catch(e) {}
            if (isEdge) {
                setTimeout(() => doSpeak(), 120);
            } else {
                doSpeak();
            }
        } else {
            if (isEdge && this.synth.pending) {
                try { this.synth.cancel(); } catch(e) {}
                setTimeout(() => doSpeak(), 120);
            } else {
                doSpeak();
            }
        }
    }


    // -- Bubble Helpers ---------------------------------------------------------
    showBubble(text) {
        this.bubbleText.innerText = text;
        this.chatBubble.style.opacity = '1';
    }

    showUserBubble(text) {
        this.bubbleText.innerText = 'You: ' + text;
        this.choiceContainer.style.display = 'none';
        this.chatBubble.style.opacity = '1';
    }

    showTyping() {
        // Thinking animation removed as requested
    }

    hideTyping() {
        // Thinking animation removed as requested
    }
    hideBubble() { this.chatBubble.style.opacity = '0'; }

    updateMicUI() {
        if (this.isListening)      this.micBtn.className = 'listening';
        else if (this.isSpeaking)  this.micBtn.className = 'speaking';
        else                       this.micBtn.className = '';
        // Sync VRM thinking state removed
        window.chatbotThinking = false;
    }

    setAvatarTalkingStatus(isTalking) { window.chatbotTalking = isTalking; }

    // -- Intro Speech -----------------------------------------------------------
    // Handled by the master introduceHerself() method at the top of the class.

    // -- Save session memory on exit --------------------------------------------
    endSession() {
        const userMessages = this.messages.filter(m => m.role !== 'system');
        if (!userMessages.length) return;
        // Use sendBeacon for reliability during page unload
        const payload = JSON.stringify({ sessionId: this.sessionId, messages: userMessages });
        navigator.sendBeacon('/api/end-session', new Blob([payload], { type: 'application/json' }));
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
        window.chatBot = new AvatarChatBot();
        window.chatbot = window.chatBot; // alias for index.html hooks
    });
} else {
    window.chatBot = new AvatarChatBot();
    window.chatbot = window.chatBot; // alias for index.html hooks
}


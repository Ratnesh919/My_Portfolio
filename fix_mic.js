const fs = require('fs');
let code = fs.readFileSync('chatbot.js', 'utf8');

const regex = /if \\(this\\.isMobile\\) \\{[\\s\\S]*?this\\.micBtn\\.addEventListener\\('pointerleave', [\\s\\S]*?\\}\\);\\s*\\}/m;

const replacement = if (this.isMobile) {
            // --- Mobile: Tap to toggle mic OR hold to talk ---
            this._micTooltipEl = document.createElement('div');
            Object.assign(this._micTooltipEl.style, {
                position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(255,65,108,0.95)', color: '#fff', fontSize: '0.72rem',
                fontFamily: "'Outfit', sans-serif", whiteSpace: 'nowrap', padding: '5px 10px',
                borderRadius: '20px', pointerEvents: 'none', opacity: '0', transition: 'opacity 0.25s',
                zIndex: '999', boxShadow: '0 2px 8px rgba(255,65,108,0.4)',
            });
            this._micTooltipEl.textContent = 'Tap to talk - hold for continuous';
            this.micBtn.style.position = 'relative';
            this.micBtn.appendChild(this._micTooltipEl);

            setTimeout(() => {
                this._micTooltipEl.style.opacity = '1';
                setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 4000);
            }, 1200);

            let _holdTimer = null;
            let _isHolding = false;

            const onTouchStart = (e) => {
                e.preventDefault();
                if (!this.hasIntroduced) this.showIntro(false);
                _holdTimer = setTimeout(() => {
                    _isHolding = true;
                    this._micTooltipEl.textContent = 'Holding - release to stop';
                    this._micTooltipEl.style.opacity = '1';
                    if (this.isListening) return;
                    this.userStoppedMic = false;
                    this._passiveModeActive = false;
                    this.startListening();
                }, 400);
            };

            const onTouchEnd = (e) => {
                e.preventDefault();
                if (_holdTimer) { clearTimeout(_holdTimer); _holdTimer = null; }
                if (_isHolding) {
                    _isHolding = false;
                    this._micTooltipEl.textContent = 'Tap to talk - hold for continuous';
                    setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 2000);
                    this.userStoppedMic = true;
                    this.recognition?.stop();
                } else {
                    this.handleMicClick();
                    this._micTooltipEl.textContent = this.isListening ? 'Listening - tap to stop' : 'Tap to talk';
                    this._micTooltipEl.style.opacity = '1';
                    setTimeout(() => { this._micTooltipEl.style.opacity = '0'; }, 2500);
                }
            };

            this.micBtn.addEventListener('touchstart', onTouchStart, { passive: false });
            this.micBtn.addEventListener('touchend', onTouchEnd, { passive: false });
            this.micBtn.addEventListener('touchcancel', onTouchEnd, { passive: false });
        };

code = code.replace(regex, replacement);
fs.writeFileSync('chatbot.js', code, 'utf8');

const fs = require('fs');
let code = fs.readFileSync('chatbot.js', 'utf8');

// The specific mojibake strings seen in the file
code = code.replace(/dYZ\s+/g, '🎤 ');
code = code.replace(/ðŸŽ¤/g, '🎤');
code = code.replace(/ðŸ” /g, '🔍');
code = code.replace(/ðŸ§ /g, '🧠');
code = code.replace(/â–¶/g, '▶');
code = code.replace(/âœ•/g, '✕');
code = code.replace(/â”€/g, '─');

// Fix any other known glitches
code = code.replace(/Type to Rayaâ€¦/g, 'Type to Raya...');
code = code.replace(/Type to Raya\?/g, 'Type to Raya...');

fs.writeFileSync('chatbot.js', code);
console.log("Fixed Mojibake");

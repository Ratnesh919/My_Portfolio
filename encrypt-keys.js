const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

if (!ENCRYPTION_KEY) {
    console.error("Please set ENCRYPTION_KEY in .env before running this script.");
    process.exit(1);
}

const groqKey = process.env.GROQ_API_KEY;
const groqKeys = process.env.GROQ_API_KEYS;

let envContent = fs.readFileSync('.env', 'utf8');

if (groqKey && !groqKey.includes(':')) {
    const encryptedKey = encrypt(groqKey);
    envContent = envContent.replace(`GROQ_API_KEY=${groqKey}`, `GROQ_API_KEY=${encryptedKey}`);
    console.log("Encrypted GROQ_API_KEY");
}

if (groqKeys && !groqKeys.includes(':')) {
    const keysArray = groqKeys.split(',').map(k => k.trim());
    const encryptedKeysArray = keysArray.map(k => encrypt(k));
    const encryptedKeysStr = encryptedKeysArray.join(',');
    envContent = envContent.replace(`GROQ_API_KEYS=${groqKeys}`, `GROQ_API_KEYS=${encryptedKeysStr}`);
    console.log("Encrypted GROQ_API_KEYS");
}

fs.writeFileSync('.env', envContent);
console.log(".env updated with encrypted keys.");

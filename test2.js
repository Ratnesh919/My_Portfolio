const str = `
Here is your request:
\`\`\`json
{"action":"navigate","target":"urban"}
{"action":"play_song","query":"Shape of You Ed Sheeran"}
\`\`\`
`;
const re = /\{[^{}]*"action"\s*:\s*"(?:play_song|navigate|scroll|change_avatar|open_link)"[^{}]*\}/gi;
console.log([...str.matchAll(re)].map(m => m[0]));

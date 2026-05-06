const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// Convert route handlers to async
code = code.replace(/app\.(post|get|delete|put)\('([^']+)',\s*(checkAdmin|chatLimiter|generalApiLimiter|ytLimiter)?(,\s*)?\((req,\s*res)\)\s*=>/g, 
    "app.$1('$2', $3$4async ($5) =>");

code = code.replace(/\(req, res\) =>/g, 'async (req, res) =>');

// Wait, the first regex might leave some checkAdmin without async if it doesn't match perfectly. 
// It's safer to just replace any `(req, res) => {` that isn't already `async`.
// Let's do it in a safer way.
code = fs.readFileSync('server.js', 'utf8');
code = code.replace(/(?<!async\s*)\(req,\s*res\)\s*=>/g, 'async (req, res) =>');
code = code.replace(/(?<!async\s*)\(req,\s*res,\s*next\)\s*=>/g, 'async (req, res, next) =>');

// Add await to mem calls
code = code.replace(/(?<!await\s+)(mem\.[a-zA-Z0-9_]+\()/g, 'await $1');

fs.writeFileSync('server.js', code);
console.log("Refactored server.js successfully.");

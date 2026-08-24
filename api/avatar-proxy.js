const axios = require('axios');

module.exports = async (req, res) => {
    // Enable CORS for client-side fetches
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    const { file } = req.query;
    if (!file || typeof file !== 'string') {
        return res.status(400).send('Missing file parameter');
    }

    let filename = file.substring(file.lastIndexOf('/') + 1);
    // Sanitize filename to prevent path traversal or SSRF
    filename = filename.replace(/[^a-zA-Z0-9_\-\.\(\)\s]/g, '').trim();
    if (!filename.endsWith('.vrm')) {
        return res.status(400).send('Invalid file extension');
    }

    if (filename === 'changli(fixed).vrm') {
        filename = 'changli.fixed.vrm';
    } else if (filename === 'Kid changli.vrm') {
        filename = 'Kid.changli.vrm';
    }

    const targetUrl = `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${filename}`;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    };
    if (process.env.GITHUB_TOKEN) {
        const token = process.env.GITHUB_TOKEN.trim();
        headers['Authorization'] = token.startsWith('Bearer ') || token.startsWith('token ') ? token : `Bearer ${token}`;
    }

    try {
        const response = await axios({
            method: 'get',
            url: targetUrl,
            responseType: 'stream',
            headers
        });

        res.setHeader('Content-Type', 'application/octet-stream');
        if (response.headers['content-length']) {
            res.setHeader('Content-Length', response.headers['content-length']);
        }

        response.data.pipe(res);
    } catch (error) {
        console.error('[Avatar Proxy Error]', error.message);
        const status = error.response ? error.response.status : 500;
        res.status(status).send(`Failed to fetch avatar asset: ${error.message}`);
    }
};

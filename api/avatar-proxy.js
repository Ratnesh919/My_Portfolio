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

    const FILE_MAP = {
        'changli(fixed).vrm': 'changli.fixed.vrm',
        'Kid changli.vrm': 'Kid.changli.vrm',
        'camellya.vrm': 'CamellyaV1.vrm',
        'CamellyaV1.vrm': 'CamellyaV1.vrm',
        'carlotta.vrm': 'CarlottaV1.vrm',
        'CarlottaV1.vrm': 'CarlottaV1.vrm',
        'chixia.vrm': 'chixia.vrm',
        'jinshi.vrm': 'jinshi.vrm',
        'pinkshi.vrm': 'PinkshiV1.vrm',
        'PinkshiV1.vrm': 'PinkshiV1.vrm',
        'roccia.vrm': 'RocciaV3.vrm',
        'RocciaV3.vrm': 'RocciaV3.vrm',
        'rover.vrm': 'rover.vrm',
        'sanhua.vrm': 'SanhuaV2.vrm',
        'SanhuaV2.vrm': 'SanhuaV2.vrm',
        'shorekeeper.vrm': 'ShorekeeperV3.vrm',
        'ShorekeeperV3.vrm': 'ShorekeeperV3.vrm',
        'verina.vrm': 'verina.vrm',
        'yangyang.vrm': 'yangyang.vrm',
        'yinlin.vrm': 'yinlin.vrm',
    };

    const targetFile = FILE_MAP[filename] || filename;
    const targetUrl = `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${targetFile}`;

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

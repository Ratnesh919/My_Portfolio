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
    if (!file) {
        return res.status(400).send('Missing file parameter');
    }

    let filename = file.substring(file.lastIndexOf('/') + 1);
    if (filename === 'changli(fixed).vrm') {
        filename = 'changli.fixed.vrm';
    } else if (filename === 'Kid changli.vrm') {
        filename = 'Kid.changli.vrm';
    }

    const token = process.env.GITHUB_TOKEN;

    if (!token) {
        return res.status(401).send('[Avatar Proxy Error] GITHUB_TOKEN environment variable is missing on Vercel. Please add GITHUB_TOKEN in Vercel Project Settings -> Environment Variables and redeploy.');
    }

    const authHeader = token.startsWith('bearer ') || token.startsWith('token ') ? token : `Bearer ${token}`;
    const reqHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Authorization': authHeader
    };

    try {
        // Fetch release asset metadata from GitHub REST API
        const relRes = await axios.get('https://api.github.com/repos/Ratnesh919/My_Portfolio/releases/tags/vrm-models-v1', {
            headers: {
                ...reqHeaders,
                'Accept': 'application/vnd.github+json'
            }
        });

        const assets = relRes.data.assets || [];
        const targetAsset = assets.find(a => a.name === filename);

        if (!targetAsset) {
            return res.status(404).send(`Asset '${filename}' not found in GitHub release assets list.`);
        }

        // Stream binary model data from GitHub API asset endpoint
        const assetRes = await axios({
            method: 'get',
            url: targetAsset.url,
            responseType: 'stream',
            headers: {
                ...reqHeaders,
                'Accept': 'application/octet-stream'
            }
        });

        res.setHeader('Content-Type', 'application/octet-stream');
        if (assetRes.headers['content-length']) {
            res.setHeader('Content-Length', assetRes.headers['content-length']);
        }

        assetRes.data.pipe(res);
    } catch (error) {
        console.error('[Avatar Proxy Error]', error.message);
        const status = error.response ? error.response.status : 500;
        const msg = error.response && error.response.data ? (typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data)) : error.message;
        res.status(status).send(`[Avatar Proxy Error] ${msg}`);
    }
};

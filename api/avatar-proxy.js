export const config = {
    runtime: 'edge'
};

// Cache asset ID mapping in edge memory for fast lookups
let assetIdMap = null;

async function getAssetApiUrl(filename, token) {
    if (assetIdMap && assetIdMap[filename]) {
        return assetIdMap[filename];
    }
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Accept': 'application/vnd.github+json'
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const relRes = await fetch('https://api.github.com/repos/Ratnesh919/My_Portfolio/releases/tags/vrm-models-v1', { headers });
        if (relRes.ok) {
            const data = await relRes.json();
            assetIdMap = {};
            if (data.assets && Array.isArray(data.assets)) {
                for (const asset of data.assets) {
                    assetIdMap[asset.name] = asset.url; // api.github.com/repos/.../releases/assets/:id
                }
            }
            return assetIdMap[filename] || null;
        }
    } catch (e) {
        console.error('Failed to fetch release info from GitHub API:', e);
    }
    return null;
}

export default async function handler(req) {
    if (req.method === 'OPTIONS') {
        const headers = new Headers();
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        return new Response(null, { status: 204, headers });
    }

    const { searchParams } = new URL(req.url);
    const file = searchParams.get('file');
    if (!file) {
        return new Response('Missing file parameter', { status: 400 });
    }

    let filename = file.substring(file.lastIndexOf('/') + 1);
    if (filename === 'changli(fixed).vrm') {
        filename = 'changli.fixed.vrm';
    } else if (filename === 'Kid changli.vrm') {
        filename = 'Kid.changli.vrm';
    }

    const token = process.env.GITHUB_TOKEN;
    const reqHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    };
    if (token) {
        reqHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Try direct release download URL first
    const directUrl = `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${filename}`;
    let assetResponse = await fetch(directUrl, { headers: reqHeaders });

    // If direct download returns 404/error (common for private repo releases), fallback to GitHub API asset endpoint
    if (!assetResponse.ok && token) {
        const apiUrl = await getAssetApiUrl(filename, token);
        if (apiUrl) {
            assetResponse = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/octet-stream'
                }
            });
        }
    }

    if (!assetResponse.ok) {
        return new Response(`Failed to fetch asset from GitHub (${assetResponse.status}): ${assetResponse.statusText}`, { status: assetResponse.status });
    }

    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers.set('Content-Type', 'application/octet-stream');
    
    const contentLength = assetResponse.headers.get('content-length');
    if (contentLength) {
        headers.set('Content-Length', contentLength);
    }

    return new Response(assetResponse.body, {
        status: 200,
        headers
    });
}

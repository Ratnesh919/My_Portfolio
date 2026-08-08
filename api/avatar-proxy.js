export const config = {
    runtime: 'edge'
};

let assetIdMap = null;

async function getAssetApiUrl(filename, token) {
    if (assetIdMap && assetIdMap[filename]) {
        return { url: assetIdMap[filename], error: null };
    }
    try {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${token}`
        };
        const relRes = await fetch('https://api.github.com/repos/Ratnesh919/My_Portfolio/releases/tags/vrm-models-v1', { headers });
        if (!relRes.ok) {
            const errText = await relRes.text();
            return { url: null, error: `GitHub Release API returned ${relRes.status}: ${errText}` };
        }
        const data = await relRes.json();
        assetIdMap = {};
        if (data.assets && Array.isArray(data.assets)) {
            for (const asset of data.assets) {
                assetIdMap[asset.name] = asset.url;
            }
        }
        if (!assetIdMap[filename]) {
            return { url: null, error: `Asset '${filename}' not found in release assets list` };
        }
        return { url: assetIdMap[filename], error: null };
    } catch (e) {
        return { url: null, error: `GitHub API fetch error: ${e.message}` };
    }
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

    if (!token) {
        return new Response(`[Avatar Proxy Error] GITHUB_TOKEN environment variable is missing on Vercel. Please add GITHUB_TOKEN in Vercel Project Settings -> Environment Variables and redeploy.`, { status: 401 });
    }

    const reqHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Authorization': `Bearer ${token}`
    };

    // 1. Try direct download URL
    const directUrl = `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${filename}`;
    let assetResponse = await fetch(directUrl, { headers: reqHeaders });

    // 2. Fallback to GitHub REST API asset endpoint for private repos
    let apiErrorLog = '';
    if (!assetResponse.ok) {
        const { url: apiUrl, error: apiErr } = await getAssetApiUrl(filename, token);
        if (apiUrl) {
            assetResponse = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/octet-stream'
                }
            });
        } else {
            apiErrorLog = apiErr ? ` | GitHub API Error: ${apiErr}` : '';
        }
    }

    if (!assetResponse.ok) {
        return new Response(`Failed to fetch avatar model '${filename}' (${assetResponse.status} ${assetResponse.statusText})${apiErrorLog}`, { status: assetResponse.status });
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

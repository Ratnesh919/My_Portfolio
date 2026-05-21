export const config = {
    runtime: 'edge'
};

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

    const targetUrl = `https://github.com/Ratnesh919/My_Portfolio/releases/download/vrm-models-v1/${filename}`;

    try {
        const assetResponse = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });

        if (!assetResponse.ok) {
            return new Response(`Failed to fetch asset from GitHub: ${assetResponse.statusText}`, { status: assetResponse.status });
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
    } catch (error) {
        return new Response(`Edge proxy error: ${error.message}`, { status: 500 });
    }
}

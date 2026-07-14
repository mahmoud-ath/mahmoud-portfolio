/**
 * CORS Middleware
 * Returns standard CORS headers and handles OPTIONS preflight.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Handle OPTIONS preflight — returns 200 with CORS headers.
 * Returns true if the request was handled (i.e. it was an OPTIONS request).
 */
export function handlePreflight(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS_HEADERS });
  }
  return null;
}

/**
 * Attach CORS headers to an existing Response or create one.
 */
export function cors(response, extraHeaders = {}) {
  const headers = { ...CORS_HEADERS, ...extraHeaders };
  if (response instanceof Response) {
    // Clone with merged headers
    const origHeaders = Object.fromEntries(response.headers.entries());
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: { ...headers, ...origHeaders },
    });
  }
  return new Response(JSON.stringify(response), { headers });
}

/**
 * Convenience: return JSON with CORS headers.
 */
export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

/**
 * Convenience: return an error JSON with CORS headers.
 */
export function error(message, status = 500) {
  return json({ error: message }, status);
}

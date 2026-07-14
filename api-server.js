/**
 * Bun API Server — Thin Orchestrator
 *
 * Delegates every request to domain-specific route handlers.
 * Projects → api/routes/projects.js
 * Blogs    → api/routes/blogs.js
 * Uploads  → api/routes/upload.js
 *
 * Start:  bun run api-server.js
 */

import { handlePreflight, json, error } from './api/middleware/cors.js';
import { handleProjectRoute } from './api/routes/projects.js';
import { handleBlogRoute } from './api/routes/blogs.js';
import { handleUploadRoute } from './api/routes/upload.js';

const PORT = 3001;

Bun.serve({
  port: PORT,

  async fetch(req) {
    // 1. Preflight
    const preflight = handlePreflight(req);
    if (preflight) return preflight;

    const { pathname: path } = new URL(req.url);

    try {
      // 2. Health check
      if (req.method === 'GET' && path === '/api/health') {
        return json({ status: 'ok', server: 'Bun API Server', uptime: process.uptime() });
      }

      // 3. Route to the right handler
      let response;

      response = await handleUploadRoute(req, path);
      if (response) return response;

      response = await handleProjectRoute(req, path);
      if (response) return response;

      response = await handleBlogRoute(req, path);
      if (response) return response;

      // 4. Unknown route
      return error('Not Found', 404);

    } catch (err) {
      console.error('API Error:', err);
      return error('Internal Server Error');
    }
  },
});

console.log(`🚀 Bun API Server → http://localhost:${PORT}`);
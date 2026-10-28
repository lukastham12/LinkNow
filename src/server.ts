import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * /backdrops was renamed to /party-decorations-singapore (28 Oct 2026, owner
 * request — keyword-aligned URL). A real HTTP 301 here (rather than relying
 * on the Angular router's client-side redirectTo) preserves SEO value for
 * any existing bookmarks/backlinks/search-index entries, and works even
 * when the requester doesn't execute JS. Registered before static-file
 * serving so it takes effect on every deployment target that runs this
 * Express server.
 */
app.get(['/backdrops', '/backdrops/'], (_req, res) => {
  res.redirect(301, '/party-decorations-singapore/');
});

/**
 * The generic '/party-decoration-singapore' (singular) SEO landing page was
 * removed the same day — it was keyword-cannibalizing against the real
 * portfolio page above. Same real-301 treatment for the same reasons.
 */
app.get(['/party-decoration-singapore', '/party-decoration-singapore/'], (_req, res) => {
  res.redirect(301, '/party-decorations-singapore/');
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

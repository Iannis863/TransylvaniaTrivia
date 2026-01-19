import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import express, { type Express } from "express";
import path from "path";

// The "Intelligence" Fix: Derive __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function serveStatic(app: Express) {
  // We go up one level from 'server/' then into 'dist/public'
  const distPath = resolve(__dirname, "..", "dist", "public");

  // Serve static files from the build output
  app.use(express.static(distPath));

  // The "Calculated" fallback: 
  // If a route isn't an API call, serve index.html (SPA routing)
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

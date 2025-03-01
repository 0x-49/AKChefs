import express, { Request, Response, NextFunction } from "express";
import { serveStatic, log } from "./vite";
import { registerRoutes } from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const reqPath = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  const originalJson = res.json.bind(res);
  res.json = (body, ...args) => {
    capturedJsonResponse = body;
    return originalJson(body, ...args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (reqPath.startsWith("/api")) {
      let logLine = `${req.method} ${reqPath} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });
  next();
});

let serverInstance: any; // HTTP server instance

const initializeServer = async () => {
  // Register routes and obtain the HTTP server instance (if any)
  serverInstance = await registerRoutes(app);

  // Error Handling Middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = (err as any).status || (err as any).statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    next(err);
  });

  if (process.env.NODE_ENV === "production") {
    // In production, serve built static files
    serveStatic(app);
  } else {
    // In development, set up Vite middleware for HMR
    const { setupVite } = await import("./vite");
    await setupVite(app, serverInstance);
  }
};

const serverPromise = initializeServer();

if (!process.env.VERCEL) {
  // Only start the server locally if not deployed on Vercel
  serverPromise.then(() => {
    const PORT = Number(process.env.PORT) || 5000;
    serverInstance.listen(PORT, "0.0.0.0", () => {
      log(`Server listening on port ${PORT}`);
    });
  });
}

// Export a handler for Vercel's serverless environment
const handler = async (req: Request, res: Response) => {
  await serverPromise;
  return app(req, res);
};

export default handler;

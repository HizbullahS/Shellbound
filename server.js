import http from "node:http";
import { readFile } from "node:fs/promises";
const allowed = new Set([
  "index.html",
  "app.js",
  "engine.js",
  "world.js",
  "style.css",
  "favicon.svg",
]);
const types = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  svg: "image/svg+xml",
};
const port = Number(process.env.PORT || 4180);
http
  .createServer(async (req, res) => {
    const path = new URL(req.url, "http://localhost").pathname;
    const file = path === "/" ? "index.html" : path.slice(1);
    if (!allowed.has(file)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    try {
      const data = await readFile(new URL("./dist/" + file, import.meta.url));
      res.writeHead(200, {
        "Content-Type": types[file.split(".").at(-1)],
        "X-Content-Type-Options": "nosniff",
      });
      res.end(data);
    } catch {
      res.writeHead(500);
      res.end("Unable to read file");
    }
  })
  .listen(port, "127.0.0.1", () =>
    console.log(`Local: http://127.0.0.1:${port}`),
  );

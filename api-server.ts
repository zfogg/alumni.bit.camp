import "dotenv/config";
import http from "http";
import url from "url";
import joinHandler from "./api/join.ts";
import supportHandler from "./api/support.ts";
import contactHandler from "./api/contact.ts";
import membersHandler from "./api/members.ts";
import prizesHandler from "./api/prizes.ts";
import winnersHandler from "./api/winners.ts";

const PORT = 3000;

const handlers: Record<string, any> = {
  "/api/join": joinHandler,
  "/api/support": supportHandler,
  "/api/contact": contactHandler,
  "/api/members": membersHandler,
  "/api/prizes": prizesHandler,
  "/api/winners": winnersHandler,
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url || "", true);
  const pathname = parsedUrl.pathname || "";

  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const handler = handlers[pathname];
  if (!handler) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  try {
    // Mock req object with parsed body
    let body = "";
    if (req.method === "POST" || req.method === "PUT") {
      body = await new Promise<string>((resolve, reject) => {
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => resolve(body));
        req.on("error", reject);
      });
    }

    const mockReq = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: body ? JSON.parse(body) : undefined,
    };

    const mockRes = {
      statusCode: 200,
      headers: {} as Record<string, string>,
      setHeader: (name: string, value: string) => {
        mockRes.headers[name] = value;
      },
      status: (code: number) => {
        mockRes.statusCode = code;
        return mockRes;
      },
      json: (data: any) => {
        mockRes.setHeader("Content-Type", "application/json");
        res.writeHead(mockRes.statusCode, mockRes.headers);
        res.end(JSON.stringify(data));
      },
      end: () => {
        res.writeHead(mockRes.statusCode, mockRes.headers);
        res.end();
      },
    };

    await handler(mockReq as any, mockRes as any);
  } catch (err) {
    console.error("Handler error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 API server running at http://localhost:${PORT}\n`);
});

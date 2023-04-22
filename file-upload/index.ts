import fs from "node:fs";
import http from "node:http";

// I think it is really cool how you can pipe streams in node.js
// This feature is not used much but it's super convenient, it feels very UNIX-like

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    fs.createReadStream("index.html").pipe(res);
    return;
  }

  if (req.url === "/upload" && req.method === "POST") {
    req.pipe(fs.createWriteStream("test.jpg"));
    req.on("end", () => {
      console.log("we are done here bois");
      res.statusCode = 201;
      res.end();
    });
  }

  if (req.url === "/video") {
    res.setHeader("Content-Type", "video/mp4");
    fs.createReadStream("fish-vid.mp4").pipe(res);
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on port 8080");
});

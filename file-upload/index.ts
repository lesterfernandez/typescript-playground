import fs from "node:fs";
import http from "node:http";

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    fs.createReadStream("index.html").pipe(res);
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on port 8080");
});

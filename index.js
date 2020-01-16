const express = require("express");
const postsRouter = require("./routers/posts.js");

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter);

server.listen(4000, () => {
  console.log("=== Server is listening on port 4000 ===");
});

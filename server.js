const express = require("express");
const server = express();
const home = require("./routes/home.js");
const allPosts = require("./routes/all-posts");
const logIn = require("./routes/log-in");
const logOut = require("./routes/log-out");
const signUp = require("./routes/sign-up");


const bodyHandler = express.urlencoded({ extended: false });
const staticHandler = express.static("public");

server.use(bodyHandler);
server.use(staticHandler);

server.get("/", home.get);
server.get("/sign-up", signUp.get);
server.get("/log-in", logIn.get);
server.get("/all-posts", allPosts.get);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
"use strict";

const HTTP = require("http");
const URL = require("url").URL;
const PORT = 3000;

const getParams = (path) => {
  const myURL = new URL(path, `http://localhost${PORT}`);
  return myURL.searchParams;
};
const dieRoll = (sides) => Math.floor(Math.random() * sides + 1);
const rollDice = (params) => {
  let rolls = Number(params.get("rolls"));
  let sides = Number(params.get("sides"));
  let body = "";
  for (let count = 0; count < rolls; count += 1) {
    body += dieRoll(sides) + "\n";
  }
  return body;
};

const SERVER = HTTP.createServer((req, res) => {
  let method = req.method;
  let path = req.url;

  let content = rollDice(getParams(path));

  if (path === "/favicon.ico") {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write(`${content}\n`);
    res.write(`${method} ${path}\n`);
    res.end();
  }
});

SERVER.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

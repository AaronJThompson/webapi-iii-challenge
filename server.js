const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log('Request Start[------');
  console.log('Method:', req.method);
  console.log('URL:', req.originalUrl);
  console.log('Timestamp', new Date().toDateString());
  console.log('Request End------]');
  next();
};

module.exports = server;

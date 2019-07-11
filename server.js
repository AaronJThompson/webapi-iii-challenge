const express = require('express');
const userDB = require('./users/userDb');
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

async function validateUserId(req, res, next) { 
  if (req.params.id) {
    if (!isNaN(parseInt(req.params.id))){
      if (await userDB.getById(req.params.id)) {
        next();
        return;
      }
    }
    res.status(400).json({ error: "invalid user id" });
  }
}

async function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
      return;
    } else {
      res.status(400).json({ error: "missing required name field" })
    }
  } else {
    res.status(400).json({ error: "missing user data" })
  }
}

module.exports = server;

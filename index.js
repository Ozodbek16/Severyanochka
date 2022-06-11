const express = require("express");
const { create } = require("express-handlebars");
const app = express();



try {
  const port = normalizePort(process.env.port || 8080);
} catch (error) {
    console.log(error)
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.listen(5000, () => {
  console.log('Server is running')
});

const koa = require('koa');
const loggerware = require('koa-logger');
const bodyware = require('koa-body');
const serverware = require('koa-static');

const app = module.exports = new koa();

// "database"
const posts = [];

// middleware
app.use(loggerware());
app.use(serverware(__dirname + '/public'));
app.use(bodyware());

if (!module.parent) app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000/');
});

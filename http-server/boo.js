
const koa = require('koa');
const loggerware = require('koa-logger');
const bodyware = require('koa-body');
const serverware = require('koa-static');
const routerware = require('koa-router')();
const render = require('./lib/render');

const app = module.exports = new koa();

routerware.get('/collection/:id', viewCollection);

// middleware
app.use(loggerware());
app.use(serverware(__dirname + '/public'));
app.use(render);
app.use(bodyware());
app.use(routerware.routes());

async function viewCollection(ctx) {
  const id = ctx.params.id;
  await ctx.render('collection');
}

if (!module.parent) app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000/');
});


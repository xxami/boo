
const koa = require('koa');
const loggerware = require('koa-logger');
const bodyware = require('koa-body');
const serverware = require('koa-static');
const routerware = require('koa-router')();
const storage = require('node-persist');
const render = require('./lib/render');

const app = module.exports = new koa();

storage.initSync({dir: '../discord-bot/.node-persist/storage'});
routerware.get('/collection/:id', viewCollection);

app.use(loggerware());
app.use(serverware(__dirname + '/public'));
app.use(render);
app.use(bodyware());
app.use(routerware.routes());

async function viewCollection(ctx) {
  let id = ctx.params.id;

  let players = storage.getItemSync('players');
  if (players === undefined) {
    return;
  }

  let player = players[id];
  if (player === undefined) {
    return;
  }

  let playerData = JSON.stringify(player);
  await ctx.render('collection', {playerData: playerData});
}

if (!module.parent) app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000/');
});


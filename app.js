const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const koaStatic = require('koa-static');
const pastec = require('./util/pastec')('localhost:4212');

const app = new Koa();

app.context.pastec = pastec;

app.use(koaStatic(path.join(__dirname, '/public'), { defer: true }));
app.use(require('./router'));

const options = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
};

const httpPort = 3000, httpsPort = 3001;

require('./util/init')(pastec).then(() => {
  require('http').createServer(app.callback()).listen(httpPort, () => {
    console.log(`http server started at port ${httpPort}...`);
  });
  require('https').createServer(options, app.callback()).listen(httpsPort, () => {
    console.log(`https server started at port ${httpsPort}...`);
  });
}).catch(err => {
  console.log('init pastec fail');
  console.log(err);
});

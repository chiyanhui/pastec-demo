const Router = require('koa-router');
const KoaBody = require('koa-body');

const router = new Router({ prefix: '/api' });

const koaBody = KoaBody({
  multipart: true,
  formidable: {
      maxFileSize: 10*1024*1024
  }
});
router.use(koaBody);

router.use('/webar', require('./webar'));

module.exports = router.routes();
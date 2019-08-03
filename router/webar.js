const Router = require('koa-router');
const router = new Router();

router.post('/search', async (ctx, next) => {
    const file = ctx.request.files.file;
    const json = {
        success: false,
    }
    if (!file) {
        json.msg = '请使用`file`字段提交图片';
    } else {
        const result = await ctx.pastec.search(file.path);
        if (result.image_ids.length > 0) {
          json.id = result.image_ids[0];
          json.success = true;
        }
    }
    ctx.response.body = json;
});

module.exports = router.routes();
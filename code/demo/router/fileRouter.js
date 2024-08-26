const Router = require('@koa/router')
const fileController = require('../controller/fileController')
const router = new Router()

router.get('/', async (ctx, next) => {
  // test
	ctx.body = { a: 1, v: 2 }
})

router.post('/uploadSmallFile', fileController.uploadSmallFile)
router.post('/uploadBigFile', fileController.uploadBigFile)
router.post('/mergeFile', fileController.mergeFile)
router.get('/getFileList', fileController.getFileList)
router.get('/download', fileController.download)

module.exports = router

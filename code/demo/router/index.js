const Router = require('@koa/router')
const ioRouter = require('./ioRouter')
const fileRouter = require('./fileRouter')

const indexRouter = new Router()

indexRouter.use('/io_start', ioRouter.routes())
indexRouter.use('/file', fileRouter.routes())

module.exports = indexRouter

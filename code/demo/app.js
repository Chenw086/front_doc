const Koa = require('koa')
const path = require('path')
const http = require('http')
const parameter = require('koa-parameter')
const views = require('koa-views')
const { koaBody } = require('koa-body')
const static = require('koa-static')
const sequelize = require('./db/seq')
const router = require('./router')
const cors = require('koa2-cors')
// const initSocketIo = require('./plugin/socketIo/start/start')

require('./utils/sync')

const app = new Koa()

app.use(
	cors({
		origin: function (ctx) {
			// 获取请求头中的 origin
			const origin = ctx.header.origin
			// 允许来自 http://localhost:5173 的请求
			return origin === 'http://localhost:5174' ? origin : '*'
		},
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
		credentials: true
	})
)

app.use(static(path.join(__dirname, 'public')))

const render = views(__dirname + '/page', {
	map: {
		html: 'ejs'
	},
	extension: 'html'
})

app.use(render)

parameter(app)

app.use(async (ctx, next) => {
	ctx.model = sequelize.models
	await next()
})
app.use(
	koaBody({
		multipart: true
	})
)
app.use(router.routes())
app.use(router.allowedMethods())

const server = http.createServer(app.callback())

// 初始化 socketIo
// initSocketIo(server)

server.listen(3000, () => {
	console.log('Server is running on port 3000')
})

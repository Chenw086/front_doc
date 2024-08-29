// 全局路由中间件，必须要取名 global
export default defineNuxtRouteMiddleware((to, from) => {
	// 每在一个页面跳转的时候都会运行这里
  // 如果有多个全局路由中间件，那么会按照名字的 ascii 运行
	console.log('全局路由中间件是否运行')
})

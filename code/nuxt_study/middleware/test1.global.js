// 全局路由中间件，必须要取名 global
export default defineNuxtRouteMiddleware((to, from) => {
	/*
    全局路由中间件是否运行
    test1.global.js:3 全局路由中间件是否运行 test1
  */
	console.log('全局路由中间件是否运行 test1')
})

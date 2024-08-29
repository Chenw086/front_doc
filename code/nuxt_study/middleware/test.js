export default defineNuxtRouteMiddleware((to, from) => {
	console.log(to.path)
	if (to.path === '/login') {
		return navigateTo('/user') // 这样写不会运行后面的中间件
		// return true
	}
})

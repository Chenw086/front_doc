// 全局路由中间件，必须要取名 global
export default defineNuxtRouteMiddleware((to, from) => {
	const passUrl = ['/', '/login', '/name']
	if (!passUrl.includes(to.path)) {
		// const token = localStorage.getItem('token') // 这样写会出现一个问题：直接访问 /user 的时候会返回 500 报错，服务端没有 localStorage，所以需要进行判断

		let token = ''
		if (import.meta.client) {
			token = localStorage.getItem('token')
			ElMessage.error('请先登陆') // 服务端也没有 ElMessage
		}
		if (!token) {
			return navigateTo({
				path: '/login',
				query: {
					code: 401,
					message: '没有token'
				}
			})
		}
	}
})

import axios from 'axios'
const service = axios.create({
	baseURL: '/',
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	},
	withCredentials: true, // 跨域请求时是否需要使用凭证
	timeout: 30000
})

// 错误处理函数
function errorHandle(response) {
	switch (response.status) {
		case 400:
			// 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
			// return Promise.resolve(error)
			break
		case 401:
			//
			break
		case 404:
			//
			break
		// ...
		default:
			throw new Error('未知错误')
	}
}

function successHandle(response) {
	switch (response.status) {
		case 200:
			//
			return response.data
		// ....
		default:
			return
	}
}

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		// 错误抛到业务代码
		error.data = {}
		error.data.msg = '服务器异常'
		return Promise.resolve(error)
	}
)

service.interceptors.response.use(
	(response) => {
		return successHandle(response)
	},
	(err) => {
		return errorHandle(err)
	}
)

export const get = (url, params, headers = {}) =>
	service.get(url, {
		params,
		headers
	})
export const post = (url, data, headers = {}) =>
	service.post(url, data, { headers })

export default Api

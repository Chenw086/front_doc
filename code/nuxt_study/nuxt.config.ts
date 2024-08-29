// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/css/base.scss" as *;'
				}
			}
		}
	},

	// 引入 element-plus
	modules: ['@element-plus/nuxt'],

	// 运行时的一些全局变量
	runtimeConfig: {
		public: {}
	}
})

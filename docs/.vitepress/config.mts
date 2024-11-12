import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: '前端笔记',
	titleTemplate: ':title',
	description: 'ts、小程序、flutter、vue...',
	head: [['link', { rel: 'icon', href: '/favicon.ico' }]], // 网址图标
	srcDir: 'src', // 相对于根目录的 md 文件夹
	srcExclude: ['**/README.md'],
	assetsDir: 'static', // 静态资源的目录
	lastUpdated: true, // 是否显示最后修改时间
	markdown: {
		container: {
			tipLabel: '提示',
			warningLabel: '警告',
			dangerLabel: '危险',
			infoLabel: '信息',
			detailsLabel: '详细信息'
		},
		lineNumbers: false, // 行号
		image: {
			// 默认禁用图片懒加载
			lazyLoading: true
		}
	},
	themeConfig: {
		docFooter: {
			prev: '上一章',
			next: '下一章'
		},
		logo: '/logo.svg',
		siteTitle: '陈伟的前端',
		// outlineTitle: '大纲',
		// outline: [2, 4],
		externalLinkIcon: true,
		outline: {
			label: '大纲',
			level: [2, 4]
		},
		lastUpdated: {
			text: '最后修改时间：',
			formatOptions: {
				dateStyle: 'full',
				timeStyle: 'medium'
			}
		},
		search: {
			provider: 'local'
		},
		footer: {
			message: '好好学习，天天向上。',
			copyright: 'Copyright © 2019-present Wei Chen'
		},
		nav: [{ text: '小程序', link: '/miniProgram', activeMatch: '/miniProgram/' }],

		sidebar: {
			'/miniProgram/': [
				{
					text: '说明',
					link: '/miniProgram/'
				},
				{
					text: '基础',
					collapsed: true,
					items: [
						{text: '基础', link: '/miniProgram/base/'},
						{text: '配置文件', link: '/miniProgram/base/configFile'},
						{text: '组建和样式', link: '/miniProgram/base/style'},
						{text: '组件案例', link: '/miniProgram/base/demo1'},
						{text: '事件', link: '/miniProgram/base/event'},
					]
				}
			]
		},

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
	}
})

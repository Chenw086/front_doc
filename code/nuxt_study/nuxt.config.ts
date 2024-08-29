// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // nuxt 中根目录使用 ~表示, 初始化样式，在 app.vue 里面无法使用里面定义的变量
  // 想要使用就必须在 vite 里面使用
  // css: ['~/assets/css/base.scss'],

  // 以下这样定义以后就能在 app.vue 里面使用定义的 css 变量了
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/base.scss" as *;'
        }
      }
    }
  },

  // 运行时的一些全局变量
  runtimeConfig: {
    // 只能在服务端取到
    count: 1,

    // 既能在服务端也能在客户端
    public: {
      baseURL: 'localhost:8080'
    }
  }
})

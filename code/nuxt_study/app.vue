<template>
	<h1>你好陈伟</h1>
  <p>test</p>
</template>

<script setup>
// 这个函数拿到全局配置
const config = useRuntimeConfig()
console.log(config.count)  // 重新访问的时候，只能在服务端取到，客户端会打印 ...
console.log(config.public.baseURL)  // public 里面定义的，既能在服务端也能在客户端取到

// 这是自己配置变量的方式，不推荐
// if(config.isServer) {
//   console.log('当前在 服务端')
// } else {
//   console.log('当前在客户端')
// }

// 使用变量获取
if(import.meta.server){
  console.log('当前在 服务端')
} else {
  console.log('当前在客户端')
}
</script>

<style lang="scss">
p{
  color: $colorTest;
}
</style>
<template>
	<div>你好陈伟 {{ name }}</div>
	<button @click="test">测试按钮</button>
	<button @click="test1">弹窗测试</button>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('aaa')

console.log(1111)
// 在浏览器控制台打印一次，在终端打印一次
// 因为用户请求的时候，会在服务端先渲染一次，此时会在终端打印，然后给前端， 前端渲染的时候再打印一次

const test = () => {
	console.log('打印测试')
}
// 这个打印是正常的， 请求后点击按钮是在客户端渲染

// for (let i = 0; i < 2; i++) {
// 	alert('弹窗', i)
// }
// ctrl + s 会正常渲染，因为 hmr 只体现在客户端
// 但是此时重新请求页面，就会报错，因为此时会重新渲染，读 alter 而在服务端是没有 alter 的，就会报错

// 但是上面内容包含在按钮函数里面就没事，此时服务端渲染不会运行函数里面的内容
const test1 = () => {
  for (let i = 0; i < 2; i++) {
	alert('弹窗', i)
}
}
</script>

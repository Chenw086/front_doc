<template>
	<div></div>
</template>

<script setup>
const route = useRoute()
// 命名路由
// http://localhost:3000/user/123 的时候这里就会打印 123 了
console.log('当前获取到的 id', route.params.id)
</script>

<style lang="scss" scoped></style>

<template>
	<div>登陆页面</div>
</template>

<script setup>
onMounted(() => {
	// 如果写在外面，直接地址栏进入 login 会报错，因为服务端读不到 ElMessage，但是如果是 onMounted 里面，里面的内容是在页面渲染完毕以后才会弹出，服务端没有读，不会报错的
	const route = useRoute()
	if (route.query.code) {
		ElMessage.error(route.query.code + route.query.message)
	}
})
</script>

<style lang="scss" scoped></style>

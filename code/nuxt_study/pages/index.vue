<template>
	<div>user/</div>
	<el-button @click="() => router.push('/login')"
		>index 页面跳转</el-button
	>
</template>

<script setup>
const router = useRouter()

// 直接在下面写也会直接在客户端执行执行，如果在下面打印，在客户端不会运行，但是会在服务端运行
// router.push('/login')
// console.log(123)

onMounted(() => {
	// 查询数据然后渲染页面
	// onMounted 这个周期是已经渲染完成以后，再请求， 这里面的渲染就是客户端阶段了。
	// 如果想让东西被搜索引擎找到， 就不要在这里面写
	// 在这里面写就没有 seo 优化了
})
</script>

<style lang="scss" scoped></style>

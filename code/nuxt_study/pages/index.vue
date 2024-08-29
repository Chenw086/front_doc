<template>
	<div>user/</div>
	<el-button @click="() => router.push('/login')">登陆页面</el-button>
	<el-button @click="() => router.push('/name')">名字页面</el-button>
	<el-button @click="() => router.push('/user')">用户页面</el-button>
</template>

<script setup>
const router = useRouter()
</script>

<style lang="scss" scoped></style>

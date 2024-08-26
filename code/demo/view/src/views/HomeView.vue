<template>
	<div class="home--wrapper">
		<el-card shadow="never">
			<el-button v-for="item in list" @click="routerTo(item.name)">{{
				item.label
			}}</el-button>
		</el-card>
		<div class="home__main--wrapper">
			<RouterView />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import list from '../config/demo-list.config'
const router = useRouter()
const routerTo = (val) => {
  console.log(val)
	router.push({
		name: val
	})
}

onMounted(() => {
	console.log('查看相应数据', list)
})
</script>

<style lang="scss" scoped>
.home--wrapper {
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	row-gap: 20px;
	.home__main--wrapper {
		flex: 1;
		overflow: hidden;
	}
}
</style>

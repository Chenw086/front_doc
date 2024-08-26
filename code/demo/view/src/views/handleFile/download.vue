<template>
	<div class="download--wrapper">
		<el-card shadow="never">
			<div class="list--wrapper">
				<div v-for="(item, index) in list">
					<el-button type="primary">
						{{ item
						}}<el-icon v-if="state.isLoading && state.curIndex === index"
							><Loading
						/></el-icon>
					</el-button>
					<!-- <el-button size="small">range 下载</el-button> -->
					<el-button size="small" @click="downloadFile(item)"
						>直接下载</el-button
					>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { Loading } from '@element-plus/icons-vue'
import { getFileList } from '../../api/handleFile'
import { onMounted, reactive, ref } from 'vue'

const state = reactive({
	isLoading: false,
	curIndex: 0
})

const downloadFile = (filename) => {
	const name = encodeURIComponent(filename)
	const url = `http://localhost:3000/file/download?filename=${name}`
	const link = document.createElement('a')
	link.href = url
	link.download = filename
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

const list = ref([])

onMounted(async () => {
	const res = await getFileList()
	list.value = res.data
})
</script>

<style lang="scss" scoped>
.download--wrapper {
	display: flex;
	height: 100%;

	.el-card {
		width: 100%;
		height: 100%;
	}

	.list--wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	.el-icon {
		margin-left: 8px;
	}
}
</style>

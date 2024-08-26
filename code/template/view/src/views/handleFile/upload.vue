<template>
	<div class="upload--wrapper">
		<el-card shadow="never">
			<el-upload
				v-model:file-list="fileList"
				ref="upload"
				class="upload-demo"
				:limit="1"
				:on-exceed="handleExceed"
				:auto-upload="false">
				<template #trigger>
					<el-button type="primary" :disabled="isUpload">select file</el-button>
				</template>
				<el-button
					class="ml-3"
					type="success"
					:disabled="isUpload"
					@click="submitUpload">
					upload to server
				</el-button>
				<template #tip>
					<div class="el-upload__tip text-red">
						选中一个文件，重复选中会替换
					</div>
				</template>
			</el-upload>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import fileConfig from '../../config/file-config'
import { genFileId } from 'element-plus'
import SparkMD5 from 'spark-md5'

const isUpload = ref(false)
const fileList = ref([])

const upData = reactive({
	file: null,
	fileChunkList: [],
	fileArr: [],
	total: 0,
	md5: ''
})

const upload = ref()

// 切换当前文件
const handleExceed = (files) => {
	upload.value.clearFiles()
	const file = files[0]
	file.uid = genFileId()
	upload.value.handleStart(file)
}

// 计算 md5
const calculateFileHash = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = (e) => {
			const spark = new SparkMD5.ArrayBuffer()
			spark.append(e.target.result)
			const hash = spark.end()
			resolve(hash)
		}

		fileReader.onerror = () => {
			reject('文件读取出错')
		}

		fileReader.readAsArrayBuffer(file)
	})
}

// 上传
const submitUpload = async () => {
	const file = fileList.value[0].raw
	upData.file = file
	const size = fileConfig.SLICE_SIZE
	if (!file) return
	upData.fileChunkList = []
	upData.total = Math.ceil(file.size / size)
	upData.md5 = await calculateFileHash(file)

	let cur = 0
	while (cur < file.size) {
		const chunk = file.slice(cur, cur + size)
		upData.fileChunkList.push({ file: chunk })
		cur += size
	}
	upData.fileArr = upData.fileChunkList.map(({ file: curFile }, index) => ({
		chunk: curFile,
		hash: file.name + '-' + index
	}))
	console.log(upData)
}
</script>

<style lang="scss" scoped>
.upload--wrapper {
	display: flex;
	height: 100%;

	.el-card {
		width: 100%;
		height: 100%;
	}

	.ml-3 {
		margin-left: 10px;
	}
}
</style>

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
					<el-button type="primary" :disabled="isUpload">选择文件</el-button>
				</template>
				<el-button
					class="ml-3"
					type="success"
					:disabled="isUpload"
					@click="submitUpload">
					上传文件
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
import { ref, reactive, onMounted } from 'vue'
import fileConfig from '../../config/file-config'
import { genFileId } from 'element-plus'
import SparkMD5 from 'spark-md5'
import {
	test,
	uploadSmallFile,
	uploadBigFile,
	mergeFile
} from '../../api/handleFile'

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
	console.log(file)
	if (!file) return
	const size = fileConfig.SLICE_SIZE

	if (file.size < size) {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('filename', file.name)
		await uploadSmallFile(formData)
		return
	}
	upData.file = file
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
		hash: file.name + '-' + index,
		md5: upData.md5,
		total: upData.total,
		filename: upData.file.name
	}))

	const requestArr = upData.fileArr
		.map((file) => {
			const formData = new FormData()
			formData.append('file', file.chunk)
			formData.append('hash', file.hash)
			formData.append('md5', file.md5)
			formData.append('total', file.total)
			formData.append('filename', file.filename)
			return formData
		})
		.map((formData) => {
			return uploadBigFile(formData)
		})

	// 使用 Promise.all 来并发处理所有上传请求
	try {
		await Promise.all(requestArr)
		console.log('文件全部上传成功，合并文件')
	} catch (error) {
		console.log('文件上传失败', error)
	}

	await mergeFile({
		md5: upData.md5,
		name: upData.file.name
	})
}

onMounted(async () => {
	await test()
})
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

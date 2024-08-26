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
import {
	test,
	uploadSmallFile,
	uploadBigFile,
	mergeFile,
	queryChunk
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
	const worker = new Worker('worker.js')

	return new Promise((resolve, reject) => {
		worker.postMessage(file)
		worker.onmessage = (event) => {
			resolve(event.data)
		}
		worker.onerror = (error) => {
			reject(error)
		}
	})
}

// 上传
const submitUpload = async () => {
	// file 信息
	const file = fileList.value[0].raw
	if (!file) return
	const size = fileConfig.SLICE_SIZE

	// 如果小于切片值，则直接上传
	if (file.size < size) {
		const formData = new FormData()
		formData.append('file', file)
		formData.append('filename', file.name)
		await uploadSmallFile(formData)
		return
	}

	upData.file = file
	upData.total = Math.ceil(file.size / size)
	upData.md5 = await calculateFileHash(file)

	// 进行切片,在这里进行已有分片的请求判断，如果没有指定文件则上传所有分片
	// 如果没有指定分片，则补齐分片
	const queryChunkData = await queryChunk({
		filename: file.name,
		md5: upData.md5
	})
	const haveSet = new Set(queryChunkData.chunkList)

	const curSet = new Set()
	for (let i = 0; i < upData.total; i++) {
		curSet.add(`${file.name}-${i}`)
	}

	const shouldUploadSet = curSet.difference(haveSet)
	console.log('需要继续传递的部分是：', shouldUploadSet)

	shouldUploadSet.forEach((val) => {
		const cur = parseInt(val.match(/\d+$/)[0], 10)
		const currentIndex = cur * size
		const chunk = file.slice(currentIndex, currentIndex + size)
		upData.fileChunkList.push({ file: chunk })
		upData.fileArr.push({
			chunk: chunk,
			hash: val,
			md5: upData.md5,
			total: upData.total,
			filename: upData.file.name
		})
	})
	// let cur = 0
	// while (cur < file.size) {
	// 	const chunk = file.slice(cur, cur + size)
	// 	upData.fileChunkList.push({ file: chunk })
	// 	cur += size
	// }

	// // 在每个切片里面存储信息，供后台拿到
	// upData.fileArr = upData.fileChunkList.map(({ file: curFile }, index) => ({
	// 	chunk: curFile,
	// 	hash: file.name + '-' + index,
	// 	md5: upData.md5,
	// 	total: upData.total,
	// 	filename: upData.file.name
	// }))

	console.log('查看所有数据详情', upData)

	// 使用 Promise.all 来并发处理所有上传请求
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

	try {
		await Promise.all(requestArr)
		console.log('文件全部上传成功，合并文件')
	} catch (error) {
		console.log('文件上传失败', error)
		return
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

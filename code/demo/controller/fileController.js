const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const { promisify } = require('util')

// 递归创建目录的异步函数
function createDirRecursively(dirPath) {
	if (fs.existsSync(dirPath)) {
		return // 目录已存在
	}

	const parentDir = path.dirname(dirPath)
	if (!fs.existsSync(parentDir)) {
		createDirRecursively(parentDir) // 递归创建父目录
	}

	fs.mkdirSync(dirPath) // 创建目录
}

// 获取文件的 MD5 值
function calculateMD5(filePath) {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash('md5')
		const stream = fs.createReadStream(filePath)

		stream.on('data', (data) => {
			hash.update(data)
		})

		stream.on('end', () => {
			const md5 = hash.digest('hex')
			resolve(md5)
		})

		stream.on('error', (err) => {
			reject(err)
		})
	})
}

// 获取目录下面的所有文件

async function getFiles(dir) {
	const readdir = promisify(fs.readdir)
	const stat = promisify(fs.stat)
	let fileList = []

	async function traverseDirectory(currentDir, relativePath = '') {
		const files = await readdir(currentDir)

		for (const file of files) {
			const filePath = path.join(currentDir, file)
			const fileStat = await stat(filePath)

			// 如果是目录，递归遍历
			if (fileStat.isDirectory()) {
				await traverseDirectory(filePath, path.join(relativePath, file))
			} else {
				// 添加相对路径到文件列表
				fileList.push(path.join(relativePath, file))
			}
		}
	}

	await traverseDirectory(dir)
	return fileList
}

module.exports = {
	async uploadSmallFile(ctx) {
		const files = ctx.request.files
		const body = ctx.request.body
		if (files.file) {
			const file = files.file

			// 目标目录
			const uploadDir = path.join(__dirname, '../upload')

			try {
				createDirRecursively(uploadDir)
				// 目标文件路径
				const targetPath = path.join(uploadDir, file.originalFilename)

				// 创建读取流
				const readStream = fs.createReadStream(file.filepath)

				// 创建写入流
				const writeStream = fs.createWriteStream(targetPath)

				// 将读取流的数据管道到写入流
				readStream.pipe(writeStream)

				// 等待写入完成
				await new Promise((resolve, reject) => {
					writeStream.on('finish', resolve)
					writeStream.on('error', reject)
				})
				ctx.body = '文件上传成功'
			} catch (err) {
				ctx.status = 500
				ctx.body = '文件上传失败'
			}
		} else {
			ctx.status = 400
			ctx.body = '没有上传的文件'
		}
	},

	async uploadBigFile(ctx) {
		const files = ctx.request.files
		const body = ctx.request.body
		if (files.file) {
			const file = files.file

			// 目标目录
			const uploadDir = path.join(__dirname, `../upload/${body.md5}`)

			try {
				createDirRecursively(uploadDir)
				// 目标文件路径
				const targetPath = path.join(uploadDir, body.hash)

				// 创建读取流
				const readStream = fs.createReadStream(file.filepath)

				// 创建写入流
				const writeStream = fs.createWriteStream(targetPath)

				// 将读取流的数据管道到写入流
				readStream.pipe(writeStream)

				// 等待写入完成
				await new Promise((resolve, reject) => {
					writeStream.on('finish', resolve)
					writeStream.on('error', reject)
				})
				ctx.body = {
					status: 200,
					message: '文件长传成功'
				}
			} catch (err) {
				ctx.status = 500
				ctx.body = {
					status: 500,
					message: '文件上传失败'
				}
			}
		} else {
			ctx.status = 400
			ctx.body = {
				status: 400,
				message: '没有上传的文件'
			}
		}
	},

	async mergeFile(ctx) {
		const bodyData = ctx.request.body
		try {
			// 读取目录下所有文件
			const uploadDir = path.join(__dirname, `../upload/${bodyData.md5}`)
			const fileList = fs.readdirSync(uploadDir)
			const sortedFiles = fileList.sort((a, b) => {
				const numA = parseInt(a.match(/\d+$/)[0], 10)
				const numB = parseInt(b.match(/\d+$/)[0], 10)
				return numA - numB
			})
			console.log('查看文件排序', sortedFiles)

			// 合并输出到指定位置
			const outputFilePath = path.join(__dirname, `../upload/${bodyData.name}`)
			const writeStream = fs.createWriteStream(outputFilePath)

			for (const file of sortedFiles) {
				const filePath = path.join(uploadDir, file)
				await new Promise((resolve, reject) => {
					const readStream = fs.createReadStream(filePath)
					readStream.pipe(writeStream, { end: false })

					readStream.on('end', resolve)
					readStream.on('error', reject)
				})
			}

			// 关闭写流
			writeStream.end()

			// 等待写入完成
			writeStream.on('finish', async () => {
				// 计算合并后文件的 MD5 值
				const md5 = await calculateMD5(outputFilePath)
				if (md5 === bodyData.md5) {
					ctx.body = {
						status: 200,
						message: '合并成功，可以读取此文件了'
					}
				}
			})

			// 等待写入完成
			await new Promise((resolve, reject) => {
				writeStream.on('finish', resolve)
				writeStream.on('error', reject)
			})

			// 计算合并后文件的 MD5 值
			const md5 = await calculateMD5(outputFilePath)
			if (md5 === bodyData.md5) {
				const rmPromise = promisify(fs.rm)
				await rmPromise(uploadDir, { recursive: true })
				ctx.body = {
					status: 200,
					message: '合并成功，可以读取此文件了'
				}
			} else {
				ctx.body = {
					status: 400,
					message: '合并失败，MD5 不匹配'
				}
			}
		} catch (error) {
			ctx.body = {
				status: 500,
				message: '合并过程中发生错误'
			}
		}
	},

	async getFileList(ctx) {
		const uploadDir = path.join(__dirname, `../upload`)
		const list = await getFiles(uploadDir)
		ctx.body = {
			status: 200,
			data: list
		}
	},

	async download(ctx) {
		const filePath = path.join(__dirname, `../upload`)
		const filename = ctx.query.filename // 从 URL 参数中提取文件名
		if (fs.existsSync(filePath)) {
			ctx.body = fs.createReadStream(path.join(filePath, filename))
			ctx.set('Content-Disposition', `attachment; filename=${filename}`)
			ctx.set('Content-Type', 'application/octet-stream')
		} else {
			ctx.status = 404
			ctx.body = 'File not found'
		}
	}
}

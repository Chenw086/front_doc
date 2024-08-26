import { get, post } from '../utils/net'

export function test(data) {
	return get('/file', data)
}

export function uploadSmallFile(data) {
	return post('/file/uploadSmallFile', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export function uploadBigFile(data) {
	return post('/file/uploadBigFile', data, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}

export function mergeFile(data) {
	return post('/file/mergeFile', data)
}

export function getFileList() {
	return get('/file/getFileList')
}

export function queryChunk(data) {
	return post('/file/queryChunk', data)
}

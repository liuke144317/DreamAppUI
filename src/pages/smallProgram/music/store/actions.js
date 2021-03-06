import {ip} from '@/storeConfig.ts'
export default {
	// 添加音乐资源
	'webDav/setMusic': async ({ commit }, data) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = data.files.map(item => ({
				name: 'file',
				uri: item
			}))
			uni.uploadFile({
			    url: ip + '/webDav/setMusic',
				files: tempFilePaths,
			    formData: {
					rename: Date.now().toString(), // 数据库中名
					name: data.rename, // 展示歌名
					author: data.author,
					album: data.album,
					userid: data.userid
			    },
			    success: (uploadFileRes) => {
			        console.log('上传成功！');
					resolve(uploadFileRes)
			    }
			});
		})
	},
	// 修改音乐资源
	'webDav/updateMusic': async ({ commit }, data) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = data.files.map(item => ({
				name: 'file',
				uri: item
			}))
			uni.uploadFile({
			    url: ip + '/webDav/updateMusic',
				files: tempFilePaths,
			    formData: {
					rename: Date.now().toString(), // 数据库中名
					name: data.rename, // 展示歌名
					author: data.author,
					album: data.album,
					userid: data.userid,
					id: data.id // 音乐id
			    },
			    success: (uploadFileRes) => {
			        console.log('上传成功！');
					resolve(uploadFileRes)
			    }
			});
		})
	},
	'webDav/deleteMusic': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/webDav/deleteMusic',
			method: 'POST',
			data: data
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'getList': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/music/getlist?userid=' + data,
			method: 'GET'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'getSource': async ({ commit }, data) => {
		console.log('data', data)
		let [error, res] = await uni.request({
			url: ip + '/music/getSource',
			method: 'POST',
			data: {
				path: data
			}
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'getLyricSource': async ({ commit }, data) => {
		console.log('data', data)
		let [error, res] = await uni.request({
			url: ip + '/music/getLyricSource',
			method: 'POST',
			data: {
				path: data
			}
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	}
}
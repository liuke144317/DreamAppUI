import {ip} from '@/storeConfig.ts'
export default {
	// 获取电影列表
	'webDav/setMusic': async ({ commit }, data) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = data.files.map(item => ({
				name: 'file',
				uri: item
			}))
			console.log('tempFilePaths', tempFilePaths);
			uni.uploadFile({
			    url: ip + '/webDav/setMusic',
				files: tempFilePaths,
				fileType: "image",
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
	}
}
import {ip} from '@/storeConfig.ts'
export default {
	// 获取电影列表
	'webDav/setMusic': async ({ commit }, data) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = data.music[0];
			uni.uploadFile({
			    url: ip + '/webDav/setMusic',
			    filePath: tempFilePaths,
			    name: 'file',
			    formData: {
					//'fileType': data.fileType,
					// 'musicPath': data.musicPath,
					// 'userid': data.userid,
					// 'rename': data.rename,
					// 'author': data.author,
					// 'album': data.author
			    },
			    success: (uploadFileRes) => {
			        console.log('上传成功！');
					console.log('uploadFileRes', uploadFileRes)
					let path = JSON.parse(uploadFileRes.data)
					resolve(path)
			    }
			});
		})
	}
}
import {ip} from '@/storeConfig.ts'
export default {
	// 上传图片
	upLoadCover: (commit, payload) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = payload.imgSrc;
			uni.uploadFile({
			    url: ip + '/BLogs/upLoad/img',
			    filePath: tempFilePaths[0],
			    name: 'file',
			    formData: {
			        'type': payload.type,
					'userid': payload.userid
			    },
			    success: (uploadFileRes) => {
			        console.log('上传成功！');
					let path = JSON.parse(uploadFileRes.data).path
					resolve(path)
			    }
			});
		})
	},
	// 插入一条BLog记录
	insertBLogItem: async (payload) => {
		let [error, res] = await uni.request({
			url: ip + '/BLogs/add',
			method: 'POST',
			data: payload
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	}
}
export default {
	// 上传富文本框
	upLoadImage: (commit,editorCtx) => {
		uni.chooseImage({
		    success: (chooseImageRes) => {
				console.log('成功选择图片')
		        const tempFilePaths = chooseImageRes.tempFilePaths;
		        uni.uploadFile({
		            url: 'http://localhost:3000/BLogs/upLoad/img',
		            filePath: tempFilePaths[0],
		            name: 'file',
		            formData: {
		                'user': 'test'
		            },
		            success: (uploadFileRes) => {
		                console.log('上传成功！');
						let path = JSON.parse(uploadFileRes.data).path
						editorCtx.insertImage({
							src: 'http://localhost:3000/'+path,
							alt: '图像',
							success: function() {
								console.log('insert image success')
							}
						})
		            }
		        });
		    }
		});
	},
	// 上传图片
	upLoadCover: (commit, payload) => {
		return new Promise((resolve, reject) => {
			const tempFilePaths = payload.tempFilePaths;
			uni.uploadFile({
			    url: 'http://localhost:3000/BLogs/upLoad/img',
			    filePath: tempFilePaths[0],
			    name: 'file',
			    formData: {
			        'user': 'test'
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
			url: 'http://localhost:3000/BLogs/add',
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
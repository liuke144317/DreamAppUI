import {ip} from '@/storeConfig.ts'
export default {
	// 获取电影列表
	'webDav/setMusic': async ({ commit }, data) => {
		console.log('data123', data)
		let [error, res] = await uni.request({
			url: ip + '/webDav/setMusic',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			dataType: 'json',
			method: 'POST',
			data: data
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	}
}
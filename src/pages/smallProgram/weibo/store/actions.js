import {ip} from '@/storeConfig.ts'
export default {
	// 获取博客列表
	'hot/search': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/find/msg',
			method: 'GET',
			data: data
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'hot/searchDtl': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/find/msgDtl?data=' + data,
			method: 'GET',
			data: []
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	}
}
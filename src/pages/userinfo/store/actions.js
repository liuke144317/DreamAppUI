import {ip} from '@/storeConfig.ts'
export default {
	// 获取博客列表
	'update': async ({ commit }, data) => {
		console.log('sdata', data)
		let [error, res] = await uni.request({
			url: ip + '/UserInfo/update',
			method: 'POST',
			data: data
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	// 获取博客列表
	'updateHeader': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/UserInfo/updateHeader',
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
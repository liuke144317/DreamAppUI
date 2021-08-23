import {ip} from '@/storeConfig.ts'
export default {
	// 获取电影列表
	'find/msg': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/movie/find/msg?data=' + data,
			method: 'GET'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	// 获取集数
	'find/msgDtl': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/movie/find/msgDtl?data=' + data,
			method: 'GET'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'find/play': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/movie/find/play?data=' + data,
			method: 'GET'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	'find/changePlayRoad': async ({ commit }, data) => {
		let [error, res] = await uni.request({
			url: ip + '/movie/find/changePlayRoad',
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
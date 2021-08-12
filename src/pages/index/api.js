import {ip} from '@/storeConfig.ts'
export default {
	getBLogList: async () => {
		let [error, res] = await uni.request({
			url:ip + '/BLogs/Home/showList'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	},
	deleteBLog: async (data) => {
		console.log('data23', data)
		let [error, res] = await uni.request({
			url:ip + '/BLogs/Home/delete',
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

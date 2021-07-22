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
	}
}

export default {
	getBLogList: async () => {
		let [error, res] = await uni.request({
			url:'http://localhost:3000/BLogs/Home/showList'
		})
		if(res!==undefined){
			return res
		}else {
			return error
		}
	}
}

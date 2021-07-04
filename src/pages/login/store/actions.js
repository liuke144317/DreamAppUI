export default {
	// 获取博客列表
	'login': async ({ commit }, data) => {
		console.log('sdata', data)
		let [error, res] = await uni.request({
			url: 'http://localhost:3000/BLogs/Login',
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
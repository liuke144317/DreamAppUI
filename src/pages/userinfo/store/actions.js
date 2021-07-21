export default {
	// 获取博客列表
	'update': async ({ commit }, data) => {
		console.log('sdata', data)
		let [error, res] = await uni.request({
			url: 'http://localhost:3000/UserInfo/update',
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
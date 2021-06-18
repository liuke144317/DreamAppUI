import Api from '../api.js'
export default {
	// 获取博客列表
	'getBLogList': async ({ commit }, data) => {
		let res = await Api.getBLogList()
		return res
	}
}
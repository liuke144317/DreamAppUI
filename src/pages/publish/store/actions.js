import api from '../api.js'
export default {
	'upload/cover': async (commit,payload) =>{
		let path = await api.upLoadCover(commit,payload)
		return path
	},
	'insert/BLogItem': async (commit,payload) => {
		let res = await api.insertBLogItem(payload)
		return res
	}
}
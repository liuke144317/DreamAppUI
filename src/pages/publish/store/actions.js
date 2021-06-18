import api from '../api.js'
export default {
	uploadImage (commit, editorCtx) {
		api.upLoadImage(commit,editorCtx)
	},
	'upload/cover': async (commit,payload) =>{
		let path = await api.upLoadCover(commit,payload)
		return path
	},
	'insert/BLogItem': async (commit,payload) => {
		let res = await api.insertBLogItem(payload)
		return res
	}
}
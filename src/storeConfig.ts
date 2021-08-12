const config:any = {
	index:{
		name:'index',
		moduleName:'index',
		path:'./pages/index/',
		store:'store/index.js'
	},
	publish:{
		name:'index',
		moduleName:'publish',
		path:'./pages/publish/',
		store:'store/index.js'
	},
	login: {
		name:'index',
		moduleName:'login',
		path:'./pages/login/',
		store:'store/index.js'
	},
	userinfo: {
		name:'index',
		moduleName:'userinfo',
		path:'./pages/userinfo/',
		store:'store/index.js'
	},
	weibo: {
		name:'index',
		moduleName:'weibo',
		path:'./pages/smallProgram/weibo/',
		store:'store/index.js'
	}
}
export const ip: string = 'http://localhost:3000'
// export const ip: string = 'http://112.74.31.208:3000'
// module.exports = config
export default config
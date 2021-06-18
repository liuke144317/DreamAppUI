import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
const store = new Vuex.Store({})
new App({
	store
}).$mount()

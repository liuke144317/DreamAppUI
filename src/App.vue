<script lang="ts">
    import Vue from 'vue';
	import storeConfig from './storeConfig';
    export default Vue.extend({
        mpType: 'app',
        onLaunch() {
			for(let key in storeConfig){
				const storeObj = require('' + storeConfig[key].path + storeConfig[key].store)
				this.$store.registerModule([storeConfig[key].moduleName],storeObj.default)
			}
			let userinfo = null;
			if (uni.getStorageSync('userinfo')) {
				userinfo = JSON.parse(uni.getStorageSync('userinfo'))
			}
			if (!userinfo || !userinfo.username || !userinfo.password) {
				uni.redirectTo({
					url: '/pages/login/index'
				});
			}
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
	@import url("./static/iconfont/iconfont.css");
	@import url("./static/common/index.css");
</style>

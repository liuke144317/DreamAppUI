<template>
	<view class="content">
		<!--  登录页 1 -->
		<view class="login">
			<view class="login-title">
				<view class="login-input">
					<input
					class="input"
					type="text" 
					v-model="username" 
					placeholder="用户名"
					placeholder-style="color:#FFFFFF; text-align: center;"
					/>
				</view>
				<view class="login-input">
					<input 
					class="input"
					type="text" 
					password="true"
					v-model="password"
					placeholder="密码"
					placeholder-style="color:#FFFFFF; text-align: center;"
					/>
				</view>
			</view>
			<view class="sign"  @tap="toLogin">
				<view class="sign-title">
					登录
				</view>
				<text class="sign-icon text-white cuIcon-right"></text>
			</view>
			<view class="forgot">
				忘记密码?
			</view>
			
			<view class="login-tip">
				<view class="login-tip-1">
					没有账号?
				</view>
				<view class="login-tip-2">
					注册
				</view>
			</view>
		</view>
		<!-- ifShow -->
		<view class="Btn">
			<text 
			class="text-white"
			:class="ifDrawerShow ? 'cuIcon-back' : 'cuIcon-right' "
			@tap="showDrawer"
			></text>
		</view>
		<!-- popup -->
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{publishStatus}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	@Component({
		components: {
			uniPopup
		}
	})
	export default class LoginIndex extends Vue {
		ifDrawerShow: boolean = false;
		username: string = '';
		password: string = '';
		publishStatus: string = ''
		showDrawer ():void {
			this.ifDrawerShow = ! this.ifDrawerShow;
		}
		goPage (id: string):void {
			uni.navigateTo({
				url: '../login'+ id +'/login'+ id
			})
		}
		async toLogin ():Promise<void>  {
			var res = await this.$store.dispatch('login/login', {username: this.username, password: this.password})
			if (res.statusCode === 200 && res.data.length !== 0) {//登录成功
				this.publishStatus = '登录成功'
				this.$refs.popup.open()
				setTimeout(() => {
					this.$refs.popup.close()
					uni.redirectTo({
						url: '/pages/index/index',
					});
				},1000)
			} else {
				this.publishStatus = '账号或密码错误！'
				this.$refs.popup.open()
				setTimeout(() => {
					this.$refs.popup.close()
				},1000)
			}
		}
	}
</script>

<style>
	@import url("./index.css");
	.popup >>> .dialog{
		width: 150px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		border-radius: 5px;
		background: rgba(0,0,0,.5);
		color: #fff;
	}
	.popup >>> .uni-transition{
		background: rgba(0,0,0,0)!important;
	}
</style>


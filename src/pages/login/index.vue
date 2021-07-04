<template>
	<view class="content">
		<!--  登录页 1 -->
		<view class="login">
			<view class="login-title">
				<view class="login-input">
					<input
					class="input"
					type="text" 
					value="username" 
					placeholder="用户名"
					placeholder-style="color:#FFFFFF; text-align: center;"
					/>
				</view>
				<view class="login-input">
					<input 
					class="input"
					type="text" 
					password="true"
					value="password"
					placeholder="密码"
					placeholder-style="color:#FFFFFF; text-align: center;"
					/>
				</view>
			</view>
			<view class="sign">
				<view class="sign-title" @tap="toLogin">
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
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class LoginIndex extends Vue {
		ifDrawerShow: boolean = false;
		username: string = '';
		password: string = '';
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
			console.log('res', res)
		}
	}
</script>

<style>
	@import url("./index.css");
</style>


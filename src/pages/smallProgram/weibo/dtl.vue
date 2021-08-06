<template>
	<view v-if="show" class="box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="headerInfo">
				<image class="pusherHeadImg" :src="form.pusherHeadImg"></image>
				<view class="hi-text">
					<view class="hi-pusherName">{{form.pusherName}}</view>
					<view class="hi-msgType">类型：{{form.msgType}}</view>
				</view>
			</view>
			<view>{{form.pushContentText}}</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { mapState } from 'vuex'
	@Component({})
	export default class Index extends Vue {
		show:boolean = false
		dtlParams: string = ''
		form = {
			pusherHeadImg: '',
			msgType: '',
			pusherName: '',
			pushContentText: ''
		}
		mounted () {
			this.getData(this.$store.state.weibo.toDtlParams)
		}
		async getData (params: string) {
			let res = await this.$store.dispatch('weibo/hot/searchDtl', params)
			if (res.statusCode === 200) {
				this.show = true
				this.form = res.data
			}
			console.log('res', res)
		}
	}
</script>

<style scoped>
	.box{
		padding: 20rpx;
	}
	.pusherHeadImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.hi-text{
		display: inline-block;
		height: 100rpx;
		line-height: 100rpx;
		vertical-align: top;
		margin-left: 20rpx;
	}
	.hi-pusherName{
		font-size: 30rpx;
		font-weight: bold;
		height: 50rpx;
		line-height: 50rpx;
	}
	.hi-msgType{
		font-size: 30rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.hi-pusherName, .hi-msgType{
		height: auto;
		line-height: auto;
	}
</style>

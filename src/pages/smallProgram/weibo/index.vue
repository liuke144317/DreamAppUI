<template>
	<view class="box">
		<view class="tab">
			<view class="tab-panel hot-search">热搜</view>
			<view class="tab-panel">要闻</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view v-for="(item, index) in newData" class="sb-box">
				<view class="sb-num">{{index + 1}}</view>
				<view class="sb-text" @tap="toDtl(item.href)">{{item.text}}</view>
				<view class="sb-hot" :style="{color: item.hot === '沸' ? '#f86400' : (item.hot === '热' ? '#ff9406' : '#00b7ee')}">{{item.hot}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		newData: Array<any> = [];
		tabChange () {}
		mounted () {
			this.getHotSearch()
		}
		async getHotSearch () {
			let res = await this.$store.dispatch('weibo/hot/search','')
			this.newData = res.data
		}
		toDtl (href: string) {
			this.$store.commit('weibo/toDtlParams/set', href)
			uni.navigateTo({
				url: '/pages/smallProgram/weibo/dtl'
			})
		}
	}
</script>

<style scoped>
	.box{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}
	.hot-search{
		background: #BABABA;
		color: #fff;
		font-weight: bold;
	}
	.scroll-box{
		position: absolute;
		top: 62rpx;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.tab-panel{
		height: 60rpx;
		line-height: 60rpx;
		width: 50%;
		display: inline-block;
		text-align: center;
		font-size: 15px;
		border-bottom: 2rpx solid #F8F8F8;
	}
	.sb-num, .sb-text, .sb-hot{
		font-size: 14px;
		display: inline-block;
	}
	.sb-num{
		color: #f26d5f;
		width: 80rpx;
		text-align: center;
	}
	.sb-text{
		color: #0078b6
	}
	.sb-hot{
		width: 60rpx;
		text-align: center;
		font-weight: bold;
	}
</style>

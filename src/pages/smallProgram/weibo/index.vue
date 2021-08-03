<template>
	<view class="box">
		<view class="tab">
			<view class="tab-panel">热搜</view>
			<view class="tab-panel">要闻</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		tabChange () {}
		mounted () {
			this.getHotSearch()
		}
		getHotSearch () {
			this.$store.dispatch('weibo/hot/search','')
		}
	}
</script>

<style>
	.tab-panel{
		height: 60rpx;
		line-height: 60rpx;
		width: 50%;
		display: inline-block;
		text-align: center;
		font-size: 15px;
		border-bottom: 2rpx solid #999;
	}
</style>

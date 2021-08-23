<template>
	<view class="box">
		<view class="tab">
			<view class="tab-box">
				<view class="tab-panel">
					<input :value="searchVal" class="search-input" placeholder="电影/电视剧" @input="searchChange"/>
				</view>
				<view class="tab-panel hot-search-btn" @tap="search">搜索</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view v-for="(item, index) in newData" class="sb-box" @tap="toDtl(item.url)">
				<image :src="item.thumb" class="sb-img"></image>
				<view class="sb-content">
					<view class="sc-title">{{item.title}}</view>
					<view class="sc-time">{{item.time}}</view>
					<view class="sc-area">{{item.area}}</view>
					<view class="sc-source">{{item.source}}</view>
					<view class="sc-star">{{item.star}}</view>
					<view v-if="item.lianzaijs" class="sc-star">{{item.lianzaijs}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		newData: Array<any> = [];
		searchVal = '';
		tabChange () {}
		mounted () {}
		async search () {
			let res = await this.$store.dispatch('movie/find/msg', this.searchVal)
			console.log('res', res)
			if (res.data.length !== 0) {
				this.newData = res.data
			} else {
				console.log('无数据！')
			}
			// this.newData = res.data
		}
		searchChange (e: any) {
			this.searchVal = e.detail.value;
		}
		toDtl (href: string) {
			console.log('href', href)
			this.$store.commit('movie/toDtlParams/set', href)
			uni.navigateTo({
				url: '/pages/smallProgram/movie/dtl'
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
	.scroll-box{
		position: absolute;
		top: 102rpx;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.tab{
		height: 100rpx;
		line-height: 100rpx;
		background:#F8F8F8;
		
	}
	.tab-box{
		margin: auto 20rpx;
		height: 64rpx;
		line-height: 64rpx;
		padding-top: 16rpx;
	}
	.tab-panel{
		height: 60rpx;
		line-height: 60rpx;
		vertical-align: bottom;
		width: 85%;
		display: inline-block;
		text-align: center;
		font-size: 15px;
	}
	.search-input{
		background: #fff;
		height: 60rpx;
		line-height: 60rpx;
	}
	.hot-search-btn{
		background: #BABABA;
		color: #fff;
		font-weight: bold;
		width: 15%;
	}
	.sb-box{
		display: flex;
		margin: auto 20rpx 20rpx 20rpx;
	}
	.sb-img{
		width: 140rpx;
		height: 180rpx;
		flex-shrink: 0;
	}
	.sb-content{
		margin-left: 20rpx;
		flex-grow: 1;
		overflow: hidden;
		border-bottom: #EDEDED 1px solid;
	}
	.sb-opretion{}
	.sc-title{
		font-size: 30rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.sc-time,.sc-area, .sc-source{
		display: inline-block;
	}
	.sc-area, .sc-source{
		/* margin-left: 10rpx; */
	}
	.sc-time,.sc-area,.sc-star, .sc-source{
		font-size: 26rpx;
		color: #666666;
	}
	.sc-star{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>

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
			<view v-for="(item, index) in newData" class="sb-box" @tap="toDtl(item)">
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
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{msg}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		newData: Array<any> = [];
		searchVal = '';
		msg: string = ''
		tabChange () {}
		mounted () {}
		async search () {
			uni.showLoading({
			    title: '搜索中...',
				mask: true
			});
			let res = await this.$store.dispatch('movie/find/msg', this.searchVal)
			uni.hideLoading();
			console.log('res', res)
			if (res.statusCode === 200) {
				this.newData = res.data
			} else {
				this.msg = '请求失败！';
				(this.$refs.popup as any).open()
				setTimeout(() => {
					(this.$refs.popup as any).close()
				},1000)
			}
			// this.newData = res.data
		}
		searchChange (e: any) {
			this.searchVal = e.detail.value;
		}
		toDtl (item: any) {
			this.$store.commit('movie/toDtlParams/set', item.url)
			this.$store.commit('movie/listType/set', item.listType)
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

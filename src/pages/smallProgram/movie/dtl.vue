<template>
	<view v-if="show" class="box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view v-for="(item,index) in collections" :class="['sb-collection', index%5===4?'newSty':'']" :style="{width: contentImgSize + 'px'}">{{item.text}}</view>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { mapState } from 'vuex'
	@Component({
		components: {}
	})
	export default class Index extends Vue {
		show:boolean = false
		dtlParams: string = ''
		contentImgSize: number = 0
		collections: Array<any> = []
		form = {
			pusherHeadImg: '',
			msgType: '',
			pusherName: '',
			pushContentText: '',
			pushContentImg: [],
			pushContentVideo: []
		}
		imgs: Array<string> = []
		mounted () {
			this.getData(this.$store.state.movie.toDtlParams)
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.contentImgSize = (windowWidth - 40)/5
		}
		async getData (params: string) {
			let res = await this.$store.dispatch('movie/find/msgDtl', params)
			console.log('res', res)
			if (res.statusCode === 200) {
				this.show = true
				this.collections = res.data
			} else {
				console.log('无数据')
			}
			console.log('res', res)
		}
		previewImg (item: string) {
			(this.$refs.previewImage as any).open(item);
		}
	}
</script>

<style scoped>
	.box{
		padding: 20rpx;
	}
	.sb-collection{
		font-size: 28rpx;
		height: 52rpx;
		line-height: 52rpx;
		border: #EDEDED 1px solid;
		display: inline-block;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		box-sizing: border-box;
		text-align: center;
	}
	.newSty{
		margin-right: 0;
	}
</style>

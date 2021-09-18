<template>
	<view class="box">
		<view class="header">
			<view class="header-title">
				歌单
				<!-- <i class="ht-search iconfont icon-icon_search"></i> -->
			</view>
			<view class="header-poster">
				<view class="hp-image">
					<view class="hi-main" :style="currentStyles"></view>
				</view>
				<view class="hp-decs">
				</view>
			</view>
			<view class="hp-shadow"></view>
			<view class="hp-blur" :style="currentStyles"></view>
			<view></view>
		</view>
		<view class="music-all-play">
			<i class="map-header iconfont icon-bofang"></i>
			<view class="map-desc">播放全部</view>
			<i class="map-footer iconfont icon-shangchuan" @click="changePanel()"></i>
		</view>
		<view class="music-list">
			<view class="music-list-item" v-for="(item,index) in musicList" @click="toDetail(item)">
				<span class="map-header">{{index+1}}</span>
				<view class="map-desc">
					<view>{{item.name}}</view>
					<view class="bottom">
						<span>{{item.author ? item.author : '未知'}}</span><span>-{{item.album ? item.album : item.name}}</span>
					</view>
				</view>
				<i class="map-footer" nz-icon nzType="more" nzTheme="outline"></i>
			</view>
		</view>
		<view class="current-play">
			<view class="cp-image">
				<view class="cp-image-content" :style="currentStyles"></view>
			</view>
			<view class="cp-desc">迷人的危险-板板</view>
			<i class="cp-play" nz-icon nzType="play-circle" nzTheme="outline"></i>
		</view>
		<view v-if="showSplitPanel" class="split-panel" @click="changePanel()"></view>
		<view class="upload-panel" :style="{height: showUploadPanel ? '800rpx' : '0px'}">
			<view style="width: 100%;margin-top: 5px">
				<button type="primary" plain="true" style="float: left;border: 0;" @click="changePanel()">取消</button>
				<button type="primary" plain="true" style="float: right;border: 0;" @click="submit()">提交</button>
			</view>
			<view style="width: 100%;display: inline-block"></view>
			<view>
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
						<view class="title">歌曲</view>
						<input class="uni-input" type="input" name="input" disabled v-model="insertData.music" />
						<button class="uni-select" @click="selectSource(1)">选择</button>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">歌词</view>
						<input class="uni-input" name="input" disabled v-model="insertData.lyric" />
						<button class="uni-select" @click="selectSource(2)">选择</button>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">封面</view>
						<input class="uni-input" name="input" disabled v-model="insertData.post" />
						<button class="uni-select" @click="selectSource(3)">选择</button>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">歌曲名</view>
						<input class="uni-input" name="input" v-model="insertData.rename" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">歌手</view>
						<input class="uni-input" name="input" v-model="insertData.author" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">专辑</view>
						<input class="uni-input" name="input" v-model="insertData.album" />
					</view>
				</form>
			</view>
		</view>
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{msg}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {
		Vue,
		Component
	} from 'vue-property-decorator'
	@Component({
		components: {
			uniPopup
		}
	})
	export default class Index extends Vue {
		msg:string = ''
		showSplitPanel: boolean = false
		showUploadPanel: boolean = false
		fileToUpload: any = null
		uploadType = ''
		userid: string = ''
		formData: any = {
			music: '',
			lyric: '',
			post: '',
			files: [],
			rename: '',
			author: '',
			album: ''
		}
		insertData = {
			music: '',
			lyric: '',
			post: '',
			rename: '',
			author: '',
			album: ''
		}
		currentStyles: any = {
			'background-image': 'url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633144589&t=cc9feb540d639e0e0df1ed3034afd31f")'
		}
		musicList: Array < any > = []
		created() {
			if (uni.getStorageSync('userinfo')) {
				let userinfo = JSON.parse(uni.getStorageSync('userinfo'))
				this.userid = userinfo.userid
				this.getMusicList(this.userid)
			}
		}
		async getMusicList (userid: any) {
			let res: any = await this.$store.dispatch('music/getList', userid)
			this.musicList = res.data
			console.log('res', res)
		}
		formSubmit() {}
		selectSource(type: number) {
			let _t = this
			uni.chooseFile({
				success(chooseFileRes: any) {
					console.log('chooseFileRes', chooseFileRes)
					if (type === 1) {
						_t.uploadType = 'music'
						_t.formData.files[0] = chooseFileRes.tempFilePaths[0]
					} else if (type === 2) {
						_t.uploadType = 'lyric'
						_t.formData.files[1] = chooseFileRes.tempFilePaths[0]
					} else if (type === 3) {
						_t.uploadType = 'post'
						_t.formData.files[2] = chooseFileRes.tempFilePaths[0]
					}
					(_t.insertData as any)[_t.uploadType] = chooseFileRes.tempFiles[0].name
				}
			})
		}
		toDetail(item: any) {
			console.log('item', item)
			uni.navigateTo({
				url: '/pages/smallProgram/music/dtl?items=' + encodeURIComponent(JSON.stringify(item))
			})
			// this.router.navigate(['/detail']);
		}
		changePanel() {
			if (!this.showUploadPanel) {
				this.showSplitPanel = true
				this.showUploadPanel = true
			} else {
				this.showSplitPanel = false
				this.showUploadPanel = false
			}
			this.insertData = {
				music: '',
				lyric: '',
				post: '',
				rename: '',
				author: '',
				album: ''
			}
			this.formData = {
				music: '',
				lyric: '',
				post: '',
				files: [],
				rename: '',
				author: '',
				album: ''
			}
		}
		async submit() {
			if (!this.insertData.music) {
				this.msg = '请选择上传歌曲！';
				(this.$refs.popup as any).open();
				setTimeout(() => {
					(this.$refs.popup as any).close()
				},1000)
				return
			}
			this.formData.rename = this.insertData.rename
			this.formData.author = this.insertData.author
			this.formData.album = this.insertData.album
			this.formData.userid = this.userid
			this.formData.files = this.formData.files.filter((item:any) => item);
			let res: any = await this.$store.dispatch('music/webDav/setMusic', this.formData)
			console.log('res', res)
			if (res.statusCode === 200) {
				this.msg = '歌曲上传成功！';
				this.getMusicList(this.userid)
			} else {
				this.msg = '歌曲上传失败！';
			}
			(this.$refs.popup as any).open();
			setTimeout(() => {
				(this.$refs.popup as any).close()
			},1000)
			this.changePanel()
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		top: var(--status-bar-height);
		bottom: 0;
		display: flex;
		flex-direction: column;
		position: fixed;
	}

	.upload-panel {
		position: absolute;
		bottom: 0;
		/* height: 80%!important; */
		overflow: hidden;
		transition: height .3s linear;
		width: 100%;
		background: #F4F5F6;
		border-radius: 60rpx 60rpx 0 0;
	}

	.split-panel {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 0;
	}

	.header {
		width: 100%;
		height: 35%;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header-title {
		height: 90rpx;
		line-height: 90rpx;
		font-weight: bold;
		width: 100%;
		color: #FFF;
		text-align: center;
		font-size: 32rpx;
	}

	.ht-search {
		font-size: 40rpx;
		position: absolute;
		right: 40rpx;
		top: 26rpx;
	}

	.header-poster {
		display: flex;
		flex-grow: 1;
		height: 0;
	}

	.hp-blur {
		position: absolute;
		top: 0;
		z-index: -2;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: 50%;
		filter: blur(30rpx);
	}

	.hp-shadow {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}

	.hp-image,
	.hp-decs {
		height: 100%;
		flex-shrink: 0;
		display: inline-block;
	}

	.hp-image {
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.hi-main {
		border-radius: 20rpx;
		margin: auto;
		width: 260rpx;
		height: 260rpx;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-color: #fff;
	}

	.hp-decs {
		width: 70%;
	}

	.music-all-play,
	.music-list-item {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
	}

	.music-list {
		flex-grow: 1;
	}

	.music-list-item {
		margin-bottom: 20rpx;
	}

	.bottom {
		font-size: 24rpx;
		height: 32rpx;
		line-height: 32rpx;
	}

	.music-all-play .map-header,
	.music-all-play .map-footer {
		width: 80rpx;
		font-size: 40rpx;
		line-height: 84rpx;
		text-align: center;
	}

	.music-list .map-header,
	.music-list .map-footer {
		width: 80rpx;
		font-size: 36rpx;
		line-height: 84rpx;
		height: 80rpx;
		text-align: center;
	}

	.music-all-play .map-desc {
		font-weight: bold;
		font-size: 32rpx;
		flex-grow: 1;
	}

	.music-list .map-desc {
		flex-grow: 1;
		font-size: 32rpx;
		height: 48rpx;
		line-height: 48rpx;
	}

	.current-play {
		display: flex;
		height: 140rpx;
		border-top: 2rpx solid #E4E4E4;
		box-sizing: content-box;
	}

	.cp-image {
		width: 160rpx;
		height: 100px;
	}

	.cp-image-content {
		margin: -10rpx auto auto;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		border: 14rpx solid #000;
	}

	.cp-play {
		width: 100rpx;
		height: 100rpx;
	}

	.cp-desc {
		flex-grow: 1;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 16rpx;
	}

	.cp-play {
		font-size: 52rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-top: 16rpx;
	}

	.form-item-label {
		text-align: right;
		height: 56rpx;
		line-height: 56rpx;
		padding-right: 20rpx;
	}

	.ant-btn-primary {
		height: 56rpx;
		line-height: 28rpx;
	}

	.ant-row {
		margin-bottom: 12rpx;
	}

	.uni-column {
		display: flex;
	}
	.title{
		text-align: right;
		margin-right: 10rpx;
		width: 170rpx;
		font-size: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
	}
	.uni-form-item >>> .uni-input-input{
		background-color: #fff;
		height: 60rpx;
		line-height: 60rpx;
	}
	.uni-form-item >>> .uni-input{
		height: 60rpx;
		line-height: 60rpx;
	}
	.uni-select{
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
	}
	.uni-form-item{
		margin-bottom: 20rpx;
	}
	.popup >>> .dialog{
		width: 340rpx;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		border-radius: 10rpx;
		background: rgba(0,0,0,.5);
		color: #fff;
	}
	.popup >>> .uni-transition{
		background: rgba(0,0,0,0)!important;
	}
</style>

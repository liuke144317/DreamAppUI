<template>
	<view class="box">
		<view class="hp-shadow"></view>
		<view class="hp-blur" :style="currentStyles"></view>
		<view class="header">
			<i class="hd-back" nz-icon nzType="left" nzTheme="outline" @click="back()"></i>
			<view class="hd-title">
				<view class="ht-title">{{musicDetail.songTitle}}</view>
				<view class="ht-author">{{musicDetail.author}}</view>
			</view>
			<i class="hd-share" nz-icon nzType="share-alt" nzTheme="outline"></i>
		</view>
		<view class="hp-middle">
			<view class="hm-image" :style="{'background-image': postSource, transform: `rotate(${rotateDeg}deg)`}">
			</view>
		</view>
		<view class="play-bar">
			<span class="audio-length-current" ref="audioCurTime">{{formatSeconds(this.currentTime)}}</span>
			<view class="progress-bar-bg" ref="progressBarBg">
				<span class="progress-bar-dot" :style="{left: progressDotLeft}"></span>
				<view class="progress-bar" :style="{width: progressBarWidth}"></view>
				<view class="progress-total" ref="progressTotal"></view>
			</view>
			<span class="audio-length-total" ref="duration">{{formatSeconds(this.duration)}}</span>
		</view>
		<view class="hp-play">
			<!-- <audio #myBox [src]="musicDetail.musicSource" id="audio-source"></audio> -->
			<i class="iconfont icon-suijibofang set-width"></i>
			<i class="iconfont icon-skip--back"></i>
			<i v-if="isPlay" class="iconfont icon-pause--outline set-size" @click="playOrPause()"></i>
			<i v-else class="iconfont icon-play--outline set-size" @click="playOrPause()"></i>
			<i class="iconfont icon-skip--forward"></i>
			<i class="iconfont icon-gengduo set-width"></i>
		</view>
	</view>

</template>

<script lang="ts">
	import {
		Vue,
		Component
	} from 'vue-property-decorator'
	import {
		mapState
	} from 'vuex'
	@Component({
		components: {}
	})
	export default class Index extends Vue {
		pramas: any = ''
		post_src: string = ''
		lyric_src: string = ''
		duration: any = 0
		currentTime: any = 0
		isPlay: boolean = false
		rotate: number = 0
		rotateObj: any = null
		Audio: any = ''
		postSource: string =
			'url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg")'
		rotateDeg = 0
		progressDotLeft = ''
		progressBarWidth = ''
		currentStyles: any = {
			'background-image': 'url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg")'
		}
		musicDetail: any = {
			songTitle: 'xxx1',
			author: 'xxx2',
			album: 'xxx3',
			musicSource: 'http://dl.stream.qqmusic.qq.com/C400000AaPOW1pic6m.m4a?guid=2995541907&vkey=001F04D5F4D9A71EE16B1EEF17133E01CD9BC33D4CAD97C979C70E5AFE8A8959B922D166E2C0F98B7B223D7202F9F23E9DC25AA93D833A4E&uin=&fromtag=66'
		}
		onLoad (option: any) {
			const items = decodeURIComponent(option.items)
			this.pramas = JSON.parse(items)
		}
		created() {
			console.log('this.pramas', this.pramas)
			this.musicDetail.songTitle = this.pramas.name
			this.musicDetail.author = this.pramas.author
			
			this.Audio = uni.createInnerAudioContext();
			/* 获取歌曲资源 */
			this.getMusicSource(this.pramas.music_position)
			/* 获取海报资源 */
			if (this.pramas.post_position) {
				this.getPostSource(this.pramas.post_position)
			}
			/* 获取歌词资源 */
			if (this.pramas.lyric_position) {
				this.getLyricSource(this.pramas.lyric_position)
			}
		}
		onBackPress () {
			this.Audio.pause()
		}
		back() {}
		async getMusicSource(path: string) {
			let res: any = await this.$store.dispatch('music/getSource', path)
			this.Audio.src = res.data
			this.updateProgress()
		}
		async getPostSource(path: string) {
			let res: any = await this.$store.dispatch('music/getSource', path)
			// this.post_src = `url("${res.data}")`
			this.post_src = res.data
		}
		async getLyricSource(path: string) {
			let res: any = await this.$store.dispatch('music/getSource', path)
			this.lyric_src = res.data
		}
		playOrPause() {
			this.isPlay = !this.isPlay
			if (this.isPlay) {
				this.Audio.play()
				this.playRotateImage(this.rotate)
			} else {
				this.Audio.pause()
				this.pauseRotateImage(this.rotateObj)
			}
		}
		/* 音频监听 */
		updateProgress() {
			/* 音频时间变化 */
			this.Audio.onCanplay(() => {
				this.duration = this.Audio.duration
			})
			this.Audio.onTimeUpdate(() => {
				this.currentTime = this.Audio.currentTime
				let percent = this.currentTime / this.duration
				this.setProgress(percent)
			})
			/* 播放结束 */
			this.Audio.onEnded(() => {
				console.log('播放结束')
				this.isPlay = !this.isPlay
				this.pauseRotateImage(this.rotateObj)
				this.setProgress(0)
			})
			const AudioContext = window.AudioContext
			const audioContext = new AudioContext();
			// const track = audioContext.createMediaElementSource(this.myBox.nativeElement)
		}
		/* 设置进度条 */
		setProgress(percentOfBar: number) {
			let totalWidth = (this.$refs.progressTotal as any).$el.clientWidth
			let left = totalWidth * percentOfBar
			this.progressDotLeft = left + 'px'
			this.progressBarWidth = left + 'px'
		}
		/* 旋转图片 */
		playRotateImage(rotate: number) {
			rotate = rotate + 30
			this.rotateDeg = rotate
			this.rotateObj = setInterval(() => {
				rotate = rotate + 30
				this.rotateDeg = rotate
				this.rotate = rotate
			}, 1000)
		}
		/* 暂停旋转图片 */
		pauseRotateImage(obj: any) {
			clearInterval(obj);
		}
		formatSeconds(value: any) {
		    let result = parseInt(value)
		    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
		    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
		    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
		 
		    let res = '';
			
		    res = `${m}`;
		    res += `:${s}`;
		    return res;
		}
	}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.hp-shadow {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .4);
	}

	.hp-blur {
		position: absolute;
		top: 0;
		z-index: -2;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: 50%;
		filter: blur(15px);
	}

	.header {
		position: relative;
		text-align: center;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 0;
		display: flex;
	}

	.hd-back,
	.hd-share {
		font-size: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		width: 100rpx;
	}

	.hd-title {
		font-size: 32rpx;
		flex-grow: 1;
	}

	.hd-back {
		/*float: left;*/
	}

	.hd-share {
		/*float: right;*/
	}

	.ht-title {
		height: 60rpx;
		line-height: 60rpx;
	}

	.ht-author {
		height: 30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
	}

	.hp-middle {
		flex-grow: 1;
	}

	.hm-image {
		width: 400rpx;
		height: 400rpx;
		margin: 200rpx auto auto;
		border-radius: 50%;
		transition: transform 1s linear;
		border: 80rpx #000 solid;
		box-sizing: content-box;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	.hp-play {
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		color: #fff;
	}

	.hp-play .iconfont {
		font-size: 90rpx;
	}

	.set-size {
		font-size: 160rpx !important;
		line-height: 96rpx;
	}

	.set-width {
		width: 160rpx;
		text-align: center;
	}

	.play-bar {
		margin-bottom: 40rpx;
		color: #fff;
		display: flex;
	}

	.progress-bar-bg {
		flex-grow: 1;
		position: relative;
	}

	.progress-total {
		height: 4rpx;
		line-height: 4rpx;
		background: #fff;
		width: 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}

	.progress-bar {
		height: 4rpx;
		width: 0;
		background: lawngreen;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		z-index: 1;
	}

	.progress-bar-dot {
		height: 20rpx;
		width: 20rpx;
		border-radius: 50%;
		background: lawngreen;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	.audio-length-total,
	.audio-length-current {
		font-size: 24rpx;
		width: 120rpx;
		text-align: center;
	}
</style>

<template>
	<view class="play-panel-box">
		<view class="hp-shadow"></view>
		<view class="hp-blur" :style="currentStyles"></view>
		<view class="header">
			<i class="hd-back iconfont icon-shouqi2" @click="back()"></i>
			<view class="hd-title">
				<view class="ht-title">{{musicDetail.songTitle}}</view>
				<view class="ht-author">{{musicDetail.author}}</view>
			</view>
			<!-- <i class="hd-share" nz-icon nzType="share-alt" nzTheme="outline"></i> -->
		</view>
		<scroll-view v-if="showLyric" class="hp-middle" @tap="changeShowType" scroll-y="true" :scroll-top="scrollViewTop">
			<view ref="scrollItem" class="scroll-item">
				<view v-for="item in lyricArr" :class="{'active': item.active, 'lyric-item': true}">{{item.lyric}}</view>
			</view>
		</scroll-view>
		<view v-else class="hp-middle" @tap="changeShowType" style="overflow: hidden;">
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
			<i v-if="isRandom" class="iconfont icon-suijibofang set-width" @tap="changeRandom"></i>
			<i v-else class="iconfont icon-bofangliebiao set-width" @tap="changeRandom"></i>
			<i class="iconfont icon-skip--back" @tap="lastSong"></i>
			<i v-if="isPlay" class="iconfont icon-pause--outline set-size" @click="playOrPause()"></i>
			<i v-else class="iconfont icon-play--outline set-size" @click="playOrPause()"></i>
			<i class="iconfont icon-skip--forward" @tap="nextSong"></i>
			<i class="iconfont icon-gengduo set-width"></i>
		</view>
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{msg}}</text>
		    </view>
		</uni-popup>
	</view>

</template>

<script lang="ts">
	import {Vue,Component,Prop} from 'vue-property-decorator'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import {mapState} from 'vuex'
	@Component({
		components: {
			uniPopup
		}
	})
	export default class Index extends Vue {
		@Prop() pramas!: any
		msg: string = ''
		isRandom: boolean = false
		scrollViewTop = 0
		post_src: string = ''
		lyric_src: string = ''
		duration: any = 0
		currentTime: any = 0
		isPlay: boolean = false
		showLyric: boolean = false
		lyricArr = []
		rotate: number = 0
		rotateObj: any = null
		Audio: any = ''
		postSource: string ='url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg")'
		rotateDeg = 0
		progressDotLeft = ''
		progressBarWidth = ''
		currentStyles: any = {
			'background-image': 'url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg")'
		}
		musicDetail: any = {
			songTitle: '',
			author: '',
			album: '',
			musicSource: ''
		}
		lastSong () {
			this.msg = '上一首';
			(this.$refs.popup as any).open();
			setTimeout(() => {
				(this.$refs.popup as any).close()
			},1000)
			if (this.isRandom) {
				this.$emit('lastSong', 'isRandom')
			} else {
				this.$emit('lastSong', 'notRandom')
			}
		}
		nextSong () {
			this.msg = '下一首';
			(this.$refs.popup as any).open();
			setTimeout(() => {
				(this.$refs.popup as any).close()
			},1000)
			if (this.isRandom) {
				this.$emit('nextSong', 'isRandom')
			} else {
				this.$emit('nextSong', 'notRandom')
			}
		}
		changeRandom () {
			this.isRandom = !this.isRandom
			if (this.isRandom) {
				this.msg = '随机播放';
			} else {
				this.msg = '顺序播放';
			}
			(this.$refs.popup as any).open();
			setTimeout(() => {
				(this.$refs.popup as any).close()
			},1000)
		}
		play () {
			this.showLyric = false
			if (this.musicDetail.id === this.pramas.id) { // 同一首歌，不切换
				return
			} else { // 不同歌曲销毁并切换新歌
				if (this.Audio) {
					this.currentTime = 0
					this.lyricArr = []
					this.Audio.destroy()
				}
			}
			this.musicDetail.songTitle = this.pramas.name
			this.musicDetail.author = this.pramas.author
			this.musicDetail.id = this.pramas.id
			this.Audio = uni.createInnerAudioContext();
			/* 获取歌曲资源 */
			this.getMusicSource(this.pramas.music_position)
			/* 获取海报资源 */
			if (this.pramas.post_position) {
				this.getPostSource(this.pramas.post_position)
			}
		}
		onBackPress () {
			this.Audio.pause()
		}
		back() {
			this.$emit('backClick')
		}
		async getMusicSource(path: string) {
			let res: any = await this.$store.dispatch('music/getSource', path)
			this.Audio.src = res.data
			this.updateProgress()
			this.Audio.play()
			this.isPlay = true
		}
		async getPostSource(path: string) {
			let res: any = await this.$store.dispatch('music/getSource', path)
			// this.post_src = `url("${res.data}")`
			this.post_src = res.data
		}
		async getLyricSource(path: string) {
			let res: any = await this.$store.dispatch('music/getLyricSource', path)
			this.lyric_src = res.data
			this.lyricArr = this.parseLyric(this.lyric_src)
		}
		changeShowType () {
			this.showLyric = !this.showLyric
			if (this.lyricArr.length ===0 && this.showLyric && this.pramas.lyric_position) {
				/* 获取歌词资源 */
				this.getLyricSource(this.pramas.lyric_position)
			}
		}
		parseLyric(lrc: any) {    //传入歌词，解析参数   lrc
	　　　　if(lrc === '') return '';　　//判断非空
	　　　　var lyrics = lrc.split("\n");　　//去除空格
	　　　　var lrcObj: any = [];
	　　　　for(var i=0;i<lyrics.length;i++){
		　　　　var lyric = decodeURIComponent(lyrics[i]);
		　　　　var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		　　　　var timeRegExpArr = lyric.match(timeReg);
		　　　　if(!timeRegExpArr)continue;
		　　　　var clause = lyric.replace(timeReg,'');
		　　　　for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
			　　　　var t = timeRegExpArr[k];
			　　　　var min = Number(String(t.match(/\[\d*/i)).slice(1)),
			　　　　sec = Number(String(t.match(/\:\d*/i)).slice(1));
			　　　　var time = min * 60 + sec;
				if (clause) {
					lrcObj.push({
						time: time,
						lyric: clause,
						active: lrcObj.length === 0 ? true : false
					});
				}
		　　　　}
		　　}
		　　return lrcObj;
		}
		playOrPause() {
			this.isPlay = !this.isPlay
			if (this.isPlay) {
				this.msg = '播放';
				this.Audio.play()
				this.playRotateImage(this.rotate)
			} else {
				this.msg = '暂停';
				this.Audio.pause()
				this.pauseRotateImage(this.rotateObj)
			}
			(this.$refs.popup as any).open();
			setTimeout(() => {
				(this.$refs.popup as any).close()
			},1000)
		}
		/* 音频监听 */
		updateProgress() {
			/* 音频时间变化 */
			this.Audio.onCanplay(() => {
				this.duration = this.Audio.duration
			})
			this.Audio.onTimeUpdate(() => {
				this.currentTime = this.Audio.currentTime
				this.changeFocus(this.currentTime)
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
		changeFocus (time: any) {
			let timeInt = Math.floor(time)
			let index = this.lyricArr.findIndex((item: any) => item.time === timeInt)
			if (index !== -1) {
				let data = this.lyricArr.map((item: any, indexitem) => ({
					...item,
					active: (indexitem === index) ? true : false
				}))
				this.lyricArr = JSON.parse(JSON.stringify(data))
				if (index > 6) {
					let scrollTop = (index - 6) * 31
					this.scrollViewTop = scrollTop
				} else {
					this.scrollViewTop = 0.1
				}
			}
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
	.play-panel-box {
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
		position: absolute;
		top: 0;
		left: 0;
		width: 90rpx;
		height: 90rpx;
		font-size: 40rpx;
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
		height: 0;
		overflow-y: auto;
		text-align: center;
		color: #B2B7BD;
		margin-bottom: 30rpx;
		font-size: 32rpx;
	}
	.active{
		color: #ffffff;
	}

	.lyric-item{
		margin-bottom: 20rpx;
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

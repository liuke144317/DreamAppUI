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
	    <view></view>
	  </view>
	  <view class="music-all-play">
	    <i class="map-header iconfont icon-bofang"></i>
	    <view class="map-desc">播放全部</view>
	    <i class="map-footer iconfont icon-shangchuan" @click="changePanel()"></i>
	  </view>
	  <view class="music-list">
	    <view class="music-list-item"v-for="(item,index) in musicList" @click="toDetail()">
	      <span class="map-header">{{index+1}}</span>
	      <view class="map-desc">
	        <view>{{item.songTitle}}</view>
	        <view class="bottom">
	          <span>{{item.author}}</span><span>-{{item.album ? item.album : item.songTitle}}</span>
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
	  <view class="upload-panel" :style="{height: showUploadPanel ? '80%' : '0px'}">
	    <view style="width: 100%;margin-top: 5px">
	      <button style="float: left" nz-button nzType="link" @click="changePanel()">取消</button>
	      <button style="float: right" nz-button nzType="link" @click="submit()">提交</button>
	    </view>
	    <input style="display: none" type="file" #fileSource @change="handleFileInput($event.target)">
	    <view style="width: 100%;display: inline-block"></view>
	    <view>
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">歌曲</view>
	        <view nz-col nzSpan="12">
	          <input nz-input name="email" type="email" disabled v-model="insertData.music">
	        </view>
	        <view nz-col nzSpan="6">
	          <button nz-button nzType="primary" @click="selectSource(1)">选择</button>
	        </view>
	      </view >
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">歌词</view>
	        <view nz-col nzSpan="12">
	          <input nz-input name="email" type="email" disabled v-model="insertData.lyric">
	        </view>
	        <view nz-col nzSpan="6">
	          <button nz-button nzType="primary" @click="selectSource(2)">选择</button>
	        </view>
	      </view >
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">封面</view>
	        <view nz-col nzSpan="12">
	          <input nz-input name="email" type="email" disabled v-model="insertData.post">
	        </view>
	        <view nz-col nzSpan="6">
	          <button nz-button nzType="primary" @click="selectSource(3)">选择</button>
	        </view>
	      </view>
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">歌曲名</view>
	        <view nz-col nzSpan="14">
	          <input nz-input name="email" type="email" v-model="insertData.rename">
	        </view>
	      </view >
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">歌手</view>
	        <view nz-col nzSpan="14">
	          <input nz-input name="email" type="email" v-model="insertData.author">
	        </view>
	      </view >
	      <view nz-row>
	        <view nz-col nzSpan="6" class="form-item-label">专辑</view>
	        <view nz-col nzSpan="14">
	          <input nz-input name="email" type="email" v-model="insertData.album">
	        </view>
	      </view >
	    </view>
	  </view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		showSplitPanel:boolean = false
		showUploadPanel:boolean = false
		fileToUpload: any = null
		formData: FormData = new FormData()
		uploadType = ''
		insertData = {
		    music: '',
		    lyric: '',
		    post: '',
		    rename: '',
		    author: '',
		    album: ''
		}
		currentStyles: any = {'background-image': 'url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1404%2F26%2Fc5%2F33596317_33596317_1398517630015_mthumb.jpg&refer=http%3A%2F%2Fimg.pconline.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633144589&t=cc9feb540d639e0e0df1ed3034afd31f")'}
		musicList: Array<any> = [{
		    songTitle: '迷人的危险',
		    author: '明星月',
		    album: '木头人'
		},{
		    songTitle: 'Kill The Game',
		    author: 'Round_2',
		    album: ''
		}]
		handleFileInput(files: any) {
		    this.fileToUpload = files.files.item(0);
		    console.log('this.fileToUpload', this.fileToUpload)
		    this.formData.append(this.uploadType, this.fileToUpload);
		    (this.insertData as any)[this.uploadType] = this.fileToUpload.name
		    console.log('this.formData', this.formData)
		  }
		  selectSource (type: number) {
		    this.fileSource.nativeElement.click()
		    if (type === 1) {
		      this.uploadType = 'music'
		    } else if (type === 2) {
		      this.uploadType = 'lyric'
		    } else if (type === 3) {
		      this.uploadType = 'post'
		    }
		  }
		  toDetail () {
		    this.router.navigate(['/detail']);
		  }
		  changePanel () {
			  console.log('123123', this.showUploadPanel)
		    if (!this.showUploadPanel) {
		      this.showSplitPanel = true
			  this.showUploadPanel = true
		    } else {
		      this.showSplitPanel = false
			  this.showUploadPanel = false
		    }
		    this.formData = new FormData()
		    this.insertData = {music: '',lyric: '',post: '',rename: '',author: '',album: ''}
		  }
		  submit () {
		    if (!this.insertData.music) {
		      this.message.info('请选择上传歌曲！');
		      return
		    }
		    this.formData.append('rename', this.insertData.rename)
		    this.formData.append('author', this.insertData.author)
		    this.formData.append('album', this.insertData.album)
		  }
	}
</script>

<style scoped>
	.box{
	    width: 100%;
	    height: 100%;
	    display: flex;
	    flex-direction: column;
	    position: relative;
	}
	.upload-panel{
	    position: absolute;
	    bottom: 0;
	    /* height: 80%!important; */
	    overflow: hidden;
	    transition: height .3s linear;
	    width: 100%;
	    background: #fff;
	    border-radius: 60rpx 60rpx 0 0;
	}
	.split-panel{
	    position: absolute;
	    bottom: 0;
	    height: 100%;
	    width: 100%;
	    background: rgba(0,0,0, .5);
	    z-index: 0;
	}
	.header{
	    width: 100%;
	    height: 35%;
	    position: relative;
	    display: flex;
	    flex-direction: column;
	    overflow: hidden;
	}
	.header-title{
	    height: 90rpx;
	    line-height: 90rpx;
	    font-weight: bold;
	    width: 100%;
	    color: #FFF;
	    text-align: center;
	    font-size: 32rpx;
	}
	.ht-search{
	    font-size: 40rpx;
	    position: absolute;
	    right: 40rpx;
	    top: 26rpx;
	}
	.header-poster{
	    display: flex;
	    flex-grow: 1;
	    height: 0;
	}
	.hp-blur{
	    position: absolute;
	    top: 0;
	    z-index: -2;
	    width: 100%;
	    height: 100%;
	    background-size:cover;
	    background-position: 50%;
	    filter: blur(30rpx);
	}
	.hp-shadow{
	    position: absolute;
	    top: 0;
	    z-index: -1;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,.4);
	}
	.hp-image,.hp-decs{
	    height: 100%;
	    flex-shrink: 0;
	    display: inline-block;
	}
	.hp-image{
	    width: 40%;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
	.hi-main{
	    border-radius: 20rpx;
	    margin: auto;
	    width: 260rpx;
	    height: 260rpx;
	    background-position: center;
	    background-size: cover;
	    background-repeat: no-repeat;
	    background-color: #fff;
	}
	.hp-decs{
	    width: 70%;
	}
	.music-all-play,.music-list-item{
	    display: flex;
	    height: 80rpx;
	    line-height: 80rpx;
	}
	.music-list{
	    flex-grow: 1;
	}
	.music-list-item{
	    margin-bottom: 20rpx;
	}
	.bottom{
	    font-size: 24rpx;
	    height: 32rpx;
	    line-height: 32rpx;
	}
	.music-all-play .map-header, .music-all-play .map-footer{
	    width: 80rpx;
	    font-size: 40rpx;
	    line-height: 84rpx;
	    text-align: center;
	}
	.music-list .map-header, .music-list .map-footer{
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
	.current-play{
	    display: flex;
	    height: 140rpx;
	    border-top: 2rpx solid #E4E4E4;
	    box-sizing: content-box;
	}
	.cp-image{
	    width: 160rpx;
	    height: 100px;
	}
	.cp-image-content{
	    margin: -10rpx auto auto;
	    width: 90rpx;
	    height: 90rpx;
	    border-radius: 50%;
	    background-position: center;
	    background-size: cover;
	    background-repeat: no-repeat;
	    border: 14rpx solid #000;
	}
	.cp-play{
	    width: 100rpx;
	    height: 100rpx;
	}
	.cp-desc{
	    flex-grow: 1;
	    height: 60rpx;
	    line-height: 60rpx;
	    margin-top: 16rpx;
	}
	.cp-play{
	    font-size: 52rpx;
	    height: 60rpx;
	    line-height: 60rpx;
	    margin-top: 16rpx;
	}
	.form-item-label{
	    text-align: right;
	    height: 56rpx;
	    line-height: 56rpx;
	    padding-right: 20rpx;
	}
	.ant-btn-primary{
	    height: 56rpx;
	    line-height: 28rpx;
	}
	.ant-row{
	    margin-bottom: 12rpx;
	}
</style>

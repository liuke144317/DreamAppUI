<template>
	<view class="box">
		<view class="title-padding"></view>
		<!-- 头部 -->
		<uni-nav-bar left-icon="back" title="" background-color="rgb(248, 248, 248)" @clickLeft="back">
			<view slot="right" class="post-message" @click="publish">发表</view>
		</uni-nav-bar>
		<!-- 编辑内容 -->
		<view class="editor-box">
			<textarea name="" class="defaultTextOne" rows="5" :placeholder="defaultTextOne" v-model="formData.title"></textarea>
			<textarea name="" class="defaultTextSecond" :placeholder="defaultTextSecond" v-model="formData.slogan"></textarea>
			<textarea name="" class="defaultTextContent" :placeholder="defaultTextContent" v-model="formData.description"></textarea>
			<view>
				<view v-if="formData.coverSrc" class="eb-icon-box">
					<image class="eb-icon" :src='formData.coverSrc' @tap="insertImage"></image>
					<view class="eb-close" @click="deleteImg">x</view>
				</view>
				<view v-else class="iconfont icon-tianjia addImg" @tap="insertImage"></view>
			</view>
		</view>
		<!-- popup -->
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{publishStatus}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { Vue, Component } from 'vue-property-decorator'
	import {ip} from '@/storeConfig.ts'
	@Component({
		components: {
			uniNavBar,
			uniPopup
		}
	})
	export default class Index extends Vue{
		defaultTextOne: string = '这一刻的主题...'
		defaultTextSecond: string = '主题的描述...'
		defaultTextContent: string = '想讲的内容...'
		publishStatus: string = ''
		chooseImageRes: any = ''
		userid: string = ''
		formData: any = {
			coverSrc: '',
			title: '',
			slogan: ''
		}
		created() {
			if (uni.getStorageSync('userinfo')) {
				let userinfo = JSON.parse(uni.getStorageSync('userinfo'))
				console.log('userinfo', userinfo)	
				this.userid = userinfo.userid
				console.log('this.userid', this.userid)
			}
		}
		/**
		 * @description 返回
		 */
		back ():void {
			uni.navigateBack({
			    delta: 1
			})
		}
		/**
		 * @description 插入图片
		 */
		insertImage ():void {
			let _t = this
			uni.chooseImage({
				success(chooseImageRes: any) {
					console.log('chooseImageRes', chooseImageRes)
					_t.formData.coverSrc = chooseImageRes.tempFilePaths[0]
					_t.chooseImageRes = chooseImageRes
				}
			})
		}
		/**
		 * @description 发布
		 */
		async publish ():Promise<void> {
			uni.showLoading({
			    title: '发表中...',
				mask: true
			});
			let _t:any = this
			// insert/BLogItem
			// 1.假设获取到用户信息
			let userInfo = {
				title: this.formData.title, //对应填入数据库title
				slogan: this.formData.slogan ,//对应填入slogan
				id: this.userid // 对应userid
			}
			// 2.formData对应属性description和image
			// 3.日期
			let newOrgDate = new Date()
			let nowDate = newOrgDate.getFullYear() + '-' + (newOrgDate.getMonth() + 1) + '-' + newOrgDate.getDate()
			
			let mergeData = {...userInfo,nowDate,...this.formData,label:''}
			let {title,slogan,description,coverSrc:image,label,nowDate:date,id:userid} = mergeData
			let insertData = {title,slogan,description,image,label,date,userid}
			if (_t.chooseImageRes) {
				let path = await this.$store.dispatch('publish/upload/cover', {imgSrc: _t.chooseImageRes.tempFilePaths, type: 'push'})
				path = path.replace(/\\/g,'/')
				insertData.image = ip +'/'+ path
			}
			let res: any = await this.$store.dispatch('publish/insert/BLogItem', insertData)
			if(res.statusCode === 200){
				uni.hideLoading();
				_t.publishStatus = '发布成功'
				uni.setStorageSync('isDoRefresh', 1)
				_t.$refs.popup.open()
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				},1000)
			}else{
				uni.hideLoading();
				_t.publishStatus = '发布失败'
				_t.$refs.popup.open()
				setTimeout(() => {
					_t.$refs.popup.close()
				},1000)
			}
		}
		deleteImg (): void {
			this.formData.coverSrc = ''
			this.chooseImageRes = null
		}
	}
</script>

<style scoped>
	.title-padding {
		height: var(--status-bar-height);
		box-sizing: content-box;
	}
	.editor-box{
		margin: 0 20rpx;
	}
	.editor-box uni-textarea{
		width: auto!important;
	}
	.defaultTextOne{
		height: 135rpx;
		margin-top: 10rpx;
	}
	.defaultTextSecond {
		height: 180rpx;
	}
	.eb-icon-box{
		position: relative;
	}
	.eb-close{
		position: absolute;
		top: 0;
		right: 0;
		height: 25px;
		line-height: 20px;
		vertical-align: middle;
		width: 25px;
		text-align: center;
		color: #fff;
		background: #000;
	}
	.eb-icon, .eb-icon-box{
		width: 240rpx;
		height: 180rpx;
	}
	.editor-box .addImg{
		font-size: 90rpx;
		width: 240rpx;
		height: 180rpx;
		line-height: 180rpx;
		text-align: center;
		background-color: #F7F7F7;
		color: #AAAAAA
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

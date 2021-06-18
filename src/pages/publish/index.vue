<template>
	<view class="box">
		<!-- 头部 -->
		<uni-nav-bar left-icon="back" title="诉" background-color="rgb(248, 248, 248)" @clickLeft="back">
			<view slot="right" class="post-message" @click="publish">发布</view>
		</uni-nav-bar>
		<!-- 编辑内容 -->
		<view class="editor-box">
			<textarea name="" id="" cols="30" rows="10" :placeholder="defaultText" v-model="formData.text"></textarea>
			<view class="iconfont icon-tianjiatupian1 addImg" @tap="insertImage"></view>
		</view>
		<!-- popup -->
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{publishStatus}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data () {
			return {
				defaultText: '输入文字',
				formData: {
					coverSrc: '',
					text: ''
				},
				'publishStatus': '发布成功'
			}
		},
		components: {
			uniNavBar,
			uniPopup
		},
		methods: {
			/**
			 * @description 返回
			 */
			back () {
				uni.navigateBack({
				    delta: 1
				})
			},
			/**
			 * @description 插入图片
			 */
			insertImage () {
				let _t = this
				uni.chooseImage({
					success(chooseImageRes) {
						_t.uploadCover(chooseImageRes).then( res => {
							let path = res.replace(/\\/g,'/')
							_t.formData.coverSrc = 'http://localhost:3000/' + path
							console.log('_t.formData.coverSrc', _t.formData.coverSrc)
						})
					}
				})
			},
			/**
			 * @description 上传图片
			 */
			async uploadCover (chooseImageRes) {
				let path = await this.$store.dispatch('publish/upload/cover', chooseImageRes)
				return path
			},
			/**
			 * @description 发布
			 */
			async publish () {
				let _t = this
				// insert/BLogItem
				// 1.假设获取到用户信息
				let userInfo = {
					name: '火箭少女101', //对应填入数据库title
					motto: '披荆斩棘天使翼，火箭少女101' ,//对应填入slogan
					id: 1 // 对应userid
				}
				// 2.formData对应属性description和image
				// 3.日期
				let newOrgDate = new Date()
				let nowDate = newOrgDate.getFullYear() + '-' + (newOrgDate.getMonth() + 1) + '-' + newOrgDate.getDate()
				
				let mergeData = {...userInfo,nowDate,...this.formData,label:''}
				let {name:title,motto:slogan,text:description,coverSrc:image,label,nowDate:date,id:userid} = mergeData
				let insertData = {title,slogan,description,image,label,date,userid}
				let res = await this.$store.dispatch('publish/insert/BLogItem', insertData)
				console.log('发布成功', res)
				if(res.statusCode === 200){
					_t.publishStatus = '发布成功'
					_t.$refs.popup.open()
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1
						})
					},1000)
				}else{
					_t.publishStatus = '发布失败'
					_t.$refs.popup.open()
					setTimeout(() => {
						_t.$refs.popup.close()
					},1000)
				}
			}
		}
	}
</script>

<style>
	.editor-box{
		margin: 0 20rpx;
	}
	.editor-box uni-textarea{
		width: auto!important;
	}
	.editor-box .addImg{
		font-size: 240rpx;
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

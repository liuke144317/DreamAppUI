<template>
	<view class="container">
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view class="imgAvatar">
					<view class="iavatar" :style="'background: url('+this.userImg+') no-repeat center/cover #eeeeee;'"></view>
				</view>
				<text v-if="avater">修改头像</text>
				<text v-if="!avater">授权微信</text>
				<button v-if="!avater" open-type="getUserInfo" @tap="getUserInfo" class="getInfo"></button>
			</view>
			<view class="ui-list">
				<text>昵称</text>
				<input type="text" :placeholder="value" :value="nickName" @input="bindnickName"
					placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>地区</text>
				<uni-data-picker></uni-data-picker>
			</view>
			<view class="ui-list">
				<text>手机号</text>
				<!-- <input v-if="phone" type="tel" :placeholder="value" :value="phone" @input="bindmobile"
					placeholder-class="place" />
				<button v-if="!phone" open-type="getPhoneNumber" @getphonenumber="getphonenumber"
					class="getInfo bun">绑定手机号</button> -->
					<input type="tel" :placeholder="value" :value="phone" @input="bindmobile"
						placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text>邮箱</text>
				<!-- <input v-if="email" type="tel" :placeholder="value" :value="email" @input="bindmobile"
					placeholder-class="place" />
				<button v-if="!email" open-type="getPhoneNumber" @getphonenumber="getphonenumber"
					class="getInfo bun">绑定邮箱</button> -->
					<input type="tel" :placeholder="value" :value="email" placeholder-class="place" />
			</view>
			<view class="ui-list right">
				<text>性别</text>
				<picker @change="bindPickerChange" mode="selector" range-key="name" :value="sexIndex" :range="sex">
					<view class="picker">
						{{sex[sexIndex].name}}
					</view>
				</picker>
			</view>
			<view class="ui-list right">
				<text>生日</text>
				<picker mode="date" :value="date" @change="bindDateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<button class="save" @tap="savaInfo">保 存 修 改</button>
			<button class="signOut" @tap="signOut">退 出 登 录</button>
		</view>
		<kps-image-cutter @ok="onok" @cancel="oncancle" :url="url" :fixed="true" :width="100" :height="100"></kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import {ip} from '@/storeConfig.ts'
	export default {
		components:{
			kpsImageCutter
		},
		mounted() {
			let userinfo = null;
			if (uni.getStorageSync('userinfo')) {
				userinfo = JSON.parse(uni.getStorageSync('userinfo'))
				this.userImg = userinfo.userImg
				this.nickName = userinfo.nickname
				this.phone = userinfo.phone
				this.sexIndex = (userinfo.sex || userinfo.sex === 0) ? userinfo.sex : 1
				this.email = userinfo.email
				this.address = userinfo.address
				this.userid = userinfo.userid
				this.userImg = userinfo.userImg
				this.date = this.format(new Date(userinfo.birthday))
			}
		},
		data() {
			return {
				value: '请填写',
				sex: [{
					id: 0,
					name: '女'
				}, {
					id: 1,
					name: '男'
				}],
				sexIndex: 0,
				region: ['请填写'],
				date: '请填写',
				avater: '',
				url: '',
				nickName: '',
				phone: '',
				sexVal: '',
				headimg: '',
				email: '',
				url: '',
				userImg: '',
				address: ''

			}

		},
		methods: {
			format(shijianchuo) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(shijianchuo);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				return y + '-' + this.add0(m) + '-' + this.add0(d);
			},
			add0(m){return m<10?'0'+m:m },
			bindPickerChange(e) {
				this.sexIndex = e.detail.value;
			},
			bindRegionChange(e) {
				this.region = e.detail.value;
			},
			bindDateChange(e) {
				this.date = e.detail.value;
			},
			bindnickName(e) {
				this.nickName = e.detail.value;
			},
			bindmobile(e) {
				this.phone = e.detail.value;
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						that.url = res.tempFilePaths[0];
					}
				});
			},
			async onok(ev) {
				let path = await this.$store.dispatch('publish/upload/cover', {imgSrc: [ev.path.toString()], type: 'user', userid: this.userid})
				path = path.replace(/\\/g,'/')
				this.userImg = ip +'/'+ path
				let res = await this.updateHeader({userImg: this.userImg, userid:this.userid})
				uni.setStorageSync('userinfo', JSON.stringify(res.data.data))
				this.url = "";
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
			},
			getUserInfo() {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res);
						uni.showToast({
							title: '已授权',
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			getphonenumber(e) {
				if (e.detail.iv) {
					console.log(e.detail.iv) //传后台解密换取手机号
					uni.showToast({
						title: '已授权',
						icon: 'none',
						duration: 2000
					})
				}
			},
			savaInfo() {
				let that = this;
				let userImg = that.userImg;
				let nickname = that.nickName;
				let headimg = that.headimg;
				let phone = that.phone;
				let address = that.address;
				let birthday = that.date;
				let sex = that.sexIndex;
				let email = that.email;
				let userid = that.userid;
				let updata = {};
				updata.userImg = userImg;
				if (!nickname) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.nickname = nickname;
				if (userid) {
					updata.userid = userid;
				} else {
					uni.showToast({
						title: '系统异常',
						icon: 'none',
						duration: 2000
					});
				}
				if (sex || sex === 0) {
					updata.sex = sex;
				} else {
					uni.showToast({
						title: '请选择性别',
						icon: 'none',
						duration: 2000
					});
					return
				}
				if (email) {
					updata.email = email;
				} else {
					uni.showToast({
						title: '请填写邮箱',
						icon: 'none',
						duration: 2000
					});
				}
				if (!headimg) {
					headimg = that.avater;
				}
				updata.headimg = headimg;
				console.log('phone', phone)
				if (that.isPoneAvailable(phone)) {
					updata.phone = phone;
				} else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				// if (address.length == 1) {
				// 	uni.showToast({
				// 		title: '请选择常住地',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// } else {
				// 	updata.province = address[0];
				// 	updata.city = address[1];
				// 	updata.area = address[2];
				// }
				if (birthday == "0000-00-00") {
					uni.showToast({
						title: '请选择生日',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.birthday = birthday;
				that.updata(updata);
			},
			signOut() {
				uni.setStorageSync('userinfo', null)
				uni.redirectTo({
					url: '/pages/login/index'
				});
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			async updata(datas) {
				//传后台
				this.$store.dispatch('userinfo/update', datas).then((res) => {
					if (res.statusCode === 200) {
						uni.showToast({
							title: '用户信息修改成功',
							icon: 'none',
							duration: 2000
						});
						uni.setStorageSync('userinfo', JSON.stringify(res.data.data))
					} else {
						uni.showToast({
							title: '用户信息修改失败',
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			updateHeader(datas) {
				return new Promise((resolve, reject) => {
					this.$store.dispatch('userinfo/updateHeader', datas).then((res) => {
						if (res.statusCode === 200) {
							uni.showToast({
								title: '修改成功',
								icon: 'none',
								duration: 2000
							});
						} else {
							uni.showToast({
								title: '修改失败',
								icon: 'none',
								duration: 2000
							});
						}
						resolve(res)
					})
				})
			},
			imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						Authorization: uni.getStorageSync('token')
					},
					url: '/api/upload/image', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					formData: {
						type: 'user_headimg'
					},
					success: function(res) {
						var data = JSON.parse(res.data);
						data = data.data;
						that.avater = that.url + data.img;

						that.headimg = that.url + data.img;


					},
					fail: function(error) {
						console.log(error);
					}
				});
			},

		},
		onLoad() {}

	}
</script>

<style lang="scss">
	.container {
		display: block;
	}
	.ui-all {
		padding: 20rpx 40rpx;
		overflow: hidden;
		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}

			&:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 85rpx;
				right: 0;
			}
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			text {
				color: #4a4a4a;
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150rpx;
			}

			input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}

			button {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;

				&::after {
					display: none;
				}
			}

			picker {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30rpx;
				left: 150rpx;
			}

			.uni-data-tree {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 8rpx;
				left: 150rpx;

				/deep/ .input-value-border {
					border: 0 solid #e5e5e5;
					padding-left: 0;
				}

				/deep/ .selected-area {
					color: #030303;
					font-size: 15px;
				}
			}

			textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.right:after {
			content: ' ';
			width: 20rpx;
			height: 20rpx;
			border-top: solid 1px #030303;
			border-right: solid 1px #030303;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			/* IE 9 */
			-moz-transform: rotate(45deg);
			/* Firefox */
			-webkit-transform: rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(45deg);
			position: absolute;
			top: 40rpx;
			right: 0;
		}

		.save {
			background: #093E56;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}

		.signOut {
			background: #EB544D;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}
</style>

<template>
	<div>
		<transition name="slideTopToBottom">
			<div class="read-content-header" v-show="menuSetFlag">
				<i class="iconfont icon-i-left" style="color:white;font-size:18px;" @click="$router.go(-1)"></i>
				<i class="iconfont icon-moreif" 
					style="color:white;font-size:20px;margin-right:0.12rem" 
					@click="otherListFlag=!otherListFlag">
				</i>
			</div>
		</transition>
		<div class="other-list" v-show="otherListFlag">
			<ul>
				<router-link tag="li" :to="{name:'book',query:{bookId:$route.query.bookId}}"><i class="iconfont icon-shuben"></i>书籍详情</router-link>
				<router-link tag="li" to="/book_save"><i class="iconfont icon-books"></i>返回书架</router-link>
				<router-link tag="li" to="/"><i class="iconfont icon-shouye"></i>返回首页</router-link>
			</ul>
		</div>
		<transition name="slideRightToLeft">
			<div class="read-join-shelf" v-show="menuSetFlag" @click="joinBookself">
				<span>{{iscollected==2?'已在书架':'加入书架'}}</span>
			</div>
		</transition>
		<transition name="slideBottomToTop">
			<div class="read-content-footer" v-show="menuSetFlag">
			<ul class="footer-tab">
				<li class="footer-tab-item" @click="$router.push(`/menu?bookId=${$route.query.bookId}`)">
					<div class="footer-tab-icon">
						<i class="iconfont icon-Service-catalog" style="font-size:18px"></i>
					</div>
					<p class="footer-tab-label">
						目录
					</p>
				</li>
				<li class="footer-tab-item" @click="$emit('nightFlagToggle')">
					<div class="footer-tab-icon">
						<i class="iconfont" style="font-size:18px" :class="[nightFlag?'icon-taiyang':'icon-yueliang']"></i>
					</div>
					<p class="footer-tab-label">
						{{nightFlag?'日间模式':'夜间模式'}}
					</p>
				</li>
				<li class="footer-tab-item" @click="contentSetFlag=!contentSetFlag">
					<div class="footer-tab-icon">
						<i class="iconfont icon-icon-yxj-font" style="font-size:18px"></i>
					</div>
					<p class="footer-tab-label">
						设置
					</p>
				</li>
			</ul>
			</div>
		</transition>
		<div class="read-content-set" v-show="contentSetFlag">
			<ul class="read-set-bg-list">
				<li class="read-set-bg-item">
					<span class="skin-default" :class="{active:activeSkin=='skin-default'}" @click="$emit('skinChange','skin-default')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
				<li class="read-set-bg-item">
					<span class="skin-blue" :class="{active:activeSkin=='skin-blue'}" @click="$emit('skinChange','skin-blue')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
				<li class="read-set-bg-item">
					<span class="skin-green" :class="{active:activeSkin=='skin-green'}" @click="$emit('skinChange','skin-green')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
				<li class="read-set-bg-item">
					<span class="skin-pink" :class="{active:activeSkin=='skin-pink'}" @click="$emit('skinChange','skin-pink')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
				<li class="read-set-bg-item">
					<span class="skin-dark" :class="{active:activeSkin=='skin-dark'}" @click="$emit('skinChange','skin-dark')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
				<li class="read-set-bg-item">
					<span class="skin-light" :class="{active:activeSkin=='skin-light'}" @click="$emit('skinChange','skin-light')">
						<i class="iconfont icon-right" style="color:red;font-size:18px"></i>
					</span>
				</li>
			</ul>
			<div class="read-set-switch">
				<div class="read-set-switch-item" @click="fontSize==12?'':$emit('fontSizeChange',fontSize-1)">
					<i class="iconfont icon-zitijianxiao01" style="font-size:20px"></i>
				</div>
				<div class="read-set-switch-item" @click="$emit('fontSizeChange',fontSize+1)">
					<i class="iconfont icon-zitijiada01" style="font-size:20px"></i>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div v-show="guildImgFlag&&!isLoading" @click="guildImgFlag=false"  class="guildImg">
				<img src="../assets/updown.png" alt="" >
			</div>
		</transition>


	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "chapter_tool",
	data() {
		return {
			contentSetFlag: false,
			otherListFlag: false,
			guildImgFlag: false
		};
	},
	props: {
		menuSetFlag: {
			type: Boolean
		},
		nightFlag: {
			type: Boolean
		},
		activeSkin: {
			type: String
		},
		iscollected: {
			type: Number
		},
		fontSize: {
			type: Number
		},
		isLoading: {
			type: Boolean
		}
	},
	methods: {
		joinBookself() {
			if (!this.$userInfo.isLogin) {
				this.$turnToLogin(
					"请先登录",
					`chapter?bookId=${this.$route.query.bookId}&chapterId=${
						this.$route.query.chapterId
					}`
				);
				return;
			}
			if (this.iscollected != 1) return;
			axios
				.get(
					`/apis/0.1/Bookself.php?book_id=${
						this.$route.query.bookId
					}&auto=2`
				)
				.then(res => {
					if (res.data.status == 0) {
						this.$emit("collectedStatusChange", 2);
					}
				});
		},
		showGuidPicture() {
			if (localStorage.getItem("isFirstEnter") != "no") {
				this.guildImgFlag = true;
				localStorage.setItem("isFirstEnter", "no");
				//setTimeout(()=>{ this.guildImgFlag = false; },2000)
			}
		}
	},
	watch: {
		menuSetFlag(newOne, oldOne) {
			if (!newOne) {
				this.contentSetFlag = false;
				this.otherListFlag = false;
			}
		},
		fontSize(newOne, oldOne) {
			localStorage.setItem("fontSize", newOne);
		},
		activeSkin(newOne, oldOne) {
			localStorage.setItem("activeSkin", newOne);
		},
		nightFlag(newOne, oldOne) {
			localStorage.setItem("nightFlag", newOne ? 1 : 0);
		}
	},
	created() {
		this.showGuidPicture();
	}
};
</script>

<style lang="less" scoped>
.read-join-shelf {
	position: fixed;
	top: 80px;
	right: 0;
	height: 30px;
	width: 70px;
	line-height: 30px;
	text-align: center;
	border-radius: 15px 0 0 15px;
	overflow: hidden;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 99;
}
.read-content-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 40px;
	overflow: hidden;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 99;
	display: flex;
	align-items: center;
	padding: 0 10px;
	justify-content: space-between;
}
.read-content-set {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 50px;
	font-size: 14px;
	overflow: hidden;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 99;
}
.read-content-set .read-set-bg-list {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	padding: 10px 0;
	overflow: hidden;
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
}
.read-set-bg-list .read-set-bg-item {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
}
.read-set-bg-item span.active {
	border-color: #ed424b;
}
.read-set-bg-item span {
	position: relative;
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	border: 2px solid rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
}
.read-set-bg-item span i {
	display: none;
}
.read-set-bg-item span.active i {
	display: inherit;
}
.read-content-set .read-set-switch {
	padding: 10px;
	display: flex;
	border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
	justify-content: space-around;
}
.read-set-switch .read-set-switch-item {
	text-align: center;
	width: 40%;
	border: 1px solid white;
	border-radius: 20px;
	height: 38px;
	line-height: 38px;
}

.read-set-switch-item span {
	display: inline-block;
	width: 80%;
	margin: 0 10%;
	border: 1px solid #fff;
	border-radius: 100px;
	line-height: 36px;
	text-align: center;
	font-size: 20px;
	color: #fff;
}

.read-content-footer {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 50px;
	overflow: hidden;
	font-size: 12px;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.9);
	z-index: 9999;
}
.read-content-footer .footer-tab {
	position: relative;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	padding: 7px 0;
}
.read-content-footer .footer-tab-item {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
}
.guildImg {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.9);
	img {
		max-width: 100%;
	}
}
.other-list {
	position: fixed;
	top: 40px;
	background: #1e2027;
	color: white;
	right: 0;
	z-index:9999;
	padding: 5px 8px;
	width: 200px;
	li {
		border-bottom: 1px solid #949598;
		padding: 14px;
		color: #c3c3c3;
		&:last-child{
			border-bottom:none
		}
		i{
			font-size: 16px;
			margin-right: 10px;
		}
	}
}
</style>

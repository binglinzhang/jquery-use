<template>
    <div>
        <div class="banner-box">
            <div class="banner-box">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="item in banners"><img :src="item.image" class="banner-img" @click="$router.push(`/book/?bookId=${item.book_id}`)"/></swiper-slide>
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
        </div>

		<div class="readRecord" v-if="Object.keys(recordObj).length">
			<div class="title">阅读记录</div>
			<router-link :to="{path:'/chapter',query:{bookId:recordObj.bookId,chapterId:recordObj.chapterId}}" class="entry" tag="div">
				<p class="bookname entry-item">{{recordObj.bookName}}</p>
				<p class="chapter entry-item">{{recordObj.chapterName}}</p>
			</router-link>
			<div class="arrow">
				<i class="iconfont icon-right1"></i>
			</div>
		</div>

        <div class="classification">
            <ul class="ification">
                <li>
                    <router-link to="/library">
                        <span></span>
                        书库
                    </router-link>
                </li>
                <li>
                    <router-link to="/rank">
                        <span></span>
                        排行榜
                    </router-link>
                </li>
                <li>
                    <router-link to="/book_save">
                        <span></span>
                        书架
                    </router-link>
                </li>
                <li>
                    <a @click="goToRecharge">
                        <span></span>
                        充值
                    </a>
                </li>
                <li>
                    <router-link to="/user">
                        <span></span>
                        个人中心
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			banners: [],
			swiperOption: {
				pagination: {
					el: ".swiper-pagination"
				},
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				}
			},
			recordObj:{}
		};
	},
	methods:{
		getReadRecord(){
			this.recordObj = JSON.parse(localStorage.getItem('readRecord')) || {};
		},
		goToRecharge(){
			if(!this.$userInfo.isLogin){
				this.$router.push('/login');
				return
			}
			window.location.href = this.$config.rechargeUrl+'#/r_common'
		}
	},
	created() {
		axios.get("/apis/0.1/Slide.php").then(res => {
			this.banners = res.data.data;
		});
		this.getReadRecord();
	}
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.banner-box {
	height: 2.8rem;
	overflow: hidden;
	position: relative;
	//   margin-top: .2rem;
}
.banner-box .banner {
	position: absolute;
	bottom: 0;
	right: 0;
	left: 0;
	top: 0;
	-webkit-transition: opacity ease 800ms;
	transition: opacity ease 800ms;
	opacity: 0;
}
.banner-box .banner a {
	display: block;
	height: 2.8rem;
	padding: 5px;
	padding: 0.1rem 0.24rem;
}
.banner-box .banner a .nv_content {
	background-color: #fff2f2;
	padding: 0.2rem 0.28rem;
	border-radius: 3%;
}
.banner-box .banner a .nv_content img {
	display: inline-block;
	width: 1.65rem;
	height: 2.2rem;
	vertical-align: middle;
	margin-right: 0.2rem;
	-webkit-box-shadow: 0 0 0.16rem #ccc;
	box-shadow: 0 0 0.16rem #ccc;
	border-radius: 0.05rem;
}
.banner-box .banner a .nv_content .text {
	display: inline-block;
	width: 4.45rem;
	height: 2.3rem;
	vertical-align: middle;
	overflow: hidden;
	position: relative;
}
.banner-box .banner a .nv_content .text h2 {
	font-size: 0.3rem;
}
.banner-box .banner a .nv_content .text p {
	height: 2rem;
	overflow: hidden;
	font-size: 0.24rem;
	margin-top: 0.15rem;
	color: #666;
}
.banner-box .banner a .nv_content .text span {
	position: relative;
	display: inline-block;
	width: 0.52rem;
	height: 0.07rem;
	background-color: #dce9f2;
	bottom: -1.6rem;
	left: 1rem;
	margin-right: 0.1rem;
}
.banner-box .banner a .nv_content .text .active {
	background-color: @mainColor;
}
.banner-box .show {
	opacity: 1;
	z-index: 1;
}
.banner-box .search-box {
	height: 0.6rem;
	margin-top: 2.6rem;
}
.banner-box .search-box .search {
	float: left;
	width: 5.5rem;
	height: 0.67rem;
	margin-left: 0.2rem;
	background-color: #fff;
	padding-left: 0.2rem;
}
.banner-box .search-box .search input {
	width: 4.9rem;
	height: 0.35rem;
	line-height: 0.35rem;
	padding: 0.16rem 0;
	margin-left: 0.1rem;
}
.banner-box .search-box .search i {
	color: #999;
}
.banner-box .search-box a {
	float: left;
	width: 1.2rem;
	height: 0.35rem;
	line-height: 0.35rem;
	background-color: @mainColor;
	color: #fff;
	font-size: 0.28rem;
	text-align: center;
	margin-left: 0.2rem;
	border-radius: 0.08rem;
}
.banner-img {
	width: 100%;
	display: block;
	height: 2.8rem;
}
.classification {
	margin: 0.3rem 0 0 0;
}

.classification .ification li {
	display: inline-block;
	width: 1.4rem;
	margin: 0 0.01rem;
	text-align: center;
	line-height: 0.56rem;
}
.classification .ification li a {
	display: block;
	font-size: 0.26rem;
}
.classification .ification li a span {
	display: block;
	width: 0.8rem;
	height: 0.8rem;
	margin: 0 auto;
	border-radius: 0.2rem;
}
.classification .ification li:nth-child(1) span {
	background: url("../assets/nav1.png") no-repeat center;
	background-size: 0.8rem;
	-webkit-box-shadow: 0 0 0.5rem 0 #ffc1a1;
	box-shadow: 0 0 0.5rem 0 #ffc1a1;
}
.classification .ification li:nth-child(2) span {
	background: url("../assets/nav2.png") no-repeat center;
	background-size: 0.8rem;
	-webkit-box-shadow: 0 0 0.5rem 0 #ffe09d;
	box-shadow: 0 0 0.5rem 0 #ffe09d;
}
.classification .ification li:nth-child(3) span {
	background: url("../assets/nav3.png") no-repeat center;
	background-size: 0.8rem;
	-webkit-box-shadow: 0 0 0.5rem 0 #ffadc3;
	box-shadow: 0 0 0.5rem 0 #ffadc3;
}
.classification .ification li:nth-child(4) span {
	background: url("../assets/nav4.png") no-repeat center;
	background-size: 0.8rem;
	-webkit-box-shadow: 0 0 0.5rem 0 #add4fa;
	box-shadow: 0 0 0.5rem 0 #add4fa;
}
.classification .ification li:nth-child(5) span {
	background: url("../assets/nav5.png") no-repeat center;
	background-size: 0.8rem;
	-webkit-box-shadow: 0 0 0.5rem 0 #dabdff;
	box-shadow: 0 0 0.5rem 0 #dabdff;
}
.readRecord {
	background: #fff;
	overflow: hidden;
	height: 60px;
	border-bottom: 1px solid #f2f2f2;
	display: flex;
	.title {
		width: 28%;
		text-align: center;
		line-height: 60px;
		border-right: 1px solid #f2f2f2;
		color: @mainColor;
		font-size: 0.28rem;
	}
	.entry {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 9px 0 9px 14px;
		min-width: 4.5rem;
		.entry-item {
			width: 100%;
			text-align: left;
		}
		.bookname {
			font-size: 0.3rem;
			width: 80%;
			display: block;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.chapter {
			font-size: 0.24rem;
			color: #888;
		}
	}
	.arrow{
		display: flex;
		align-items: center;
		margin-right: .2rem;
		i{
			color: @mainColor;
			font-size: .24rem;
			font-weight: 600;
		}
	}
}
</style>

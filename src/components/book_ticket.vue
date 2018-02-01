<template>
    <div class="bookTicketContainer">
        <link-head><span>我的书券</span></link-head>
		<ul class="ticketList">
			<li class="ticketList-item" v-for="item in ticketList" :class="{hasUsed:item.source=='已使用',overTime:item.source=='已过期'}">
				<div class="item-tab1">
					<div class="left">{{item.name}}</div>
					<div class="right">
						<span>余额：</span>
						<span class="num">{{item.balance}}</span>
					</div>
				</div>
				<div class="item-tab2">
					<div class="left">
						<span>有效期至：</span>
						<span>{{item.endtime}}</span>
					</div>
					<div class="right">
						<span class="mainColor">{{item.type}}</span>获得
					</div>
				</div>
				<i class="sign-icon iconfont icon-yishiyong"></i>
			</li>
		</ul>
		<div class="more" v-show="page<pageCount" @click="loadMore">加载更多</div>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
export default {
	data() {
		return {
			ticketList:[],
			page:0,
			pageCount:0
		};
	},
	components: {
		linkHead,
		nFooter
	},
	methods:{
		loadMore(){
			axios.get(`/apis/0.1/User/Usercoin.php?page=${++this.page}`).then(res=>{
				this.ticketList.push(...res.data.data.data);
				this.page = res.data.data.page;
				this.pageCount = res.data.data.pageCount;
			})
		}
	},
	created(){
		axios.get('/apis/0.1/User/Usercoin.php').then(res=>{
			this.ticketList = res.data.data.data;
			this.page = res.data.data.page;
			this.pageCount = res.data.data.pageCount;
		})
	}
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
@grayColor:#a5a5a5;
.bookTicketContainer{
	.more{
		margin: 20px 0;
		text-align: center;
	}
}
.ticketList-item {
	padding: 0.28rem 0.32rem;
	border-bottom: 1px solid #e8e8e8;
	position: relative;
	color: #414141;
	&.hasUsed{
		.sign-icon{
			display: block;
		}
		.item-tab1,.item-tab2,.item-tab1 .num{
			color: @grayColor
		}
	}
	&.overTime{
		.sign-icon{
			display: block;
		}
		.item-tab1,.item-tab2,.item-tab1 .num{
			color: @grayColor
		}
	}
	.item-tab1 {
		font-size: 0.32rem;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.24rem;
		.num{
			color: @mainColor;
		}
	}
	.item-tab2 {
		display: flex;
		font-size: 0.28rem;
		justify-content: space-between;
	}
	.sign-icon{
		font-size: 1.6rem;
		position: absolute;
		right: 1.2rem;
		top: 50%;
		transform: translateY(-50%);
		z-index:-1;
		opacity: .8;
		display: none;
	}
	.hasUsed .sign-icon{color: @mainColor; }
	.overTime .sign-icon{color: @grayColor;}
}
</style>

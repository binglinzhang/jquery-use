<template>
    <div class="bookTicketContainer">
        <link-head><span>我的书券</span></link-head>
		<ul class="ticketList">
			<li class="ticketList-item hasUsed">
				<div class="item-tab1">
					<div class="left">7追书券</div>
					<div class="right">
						<span>余额：</span>
						<span class="num">7</span>
					</div>
				</div>
				<div class="item-tab2">
					<div class="left">
						<span>有效期至：</span>
						<span>2018-01-31 23:58:58</span>
					</div>
					<div class="right">
						<span>连续签到</span>
					</div>
				</div>
				<i class="hasUsed-icon iconfont icon-yishiyong"></i>
			</li>
			<li class="ticketList-item">
				<div class="item-tab1">
					<div class="left">7追书券</div>
					<div class="right">
						<span>余额：</span>
						<span class="num">7</span>
					</div>
				</div>
				<div class="item-tab2">
					<div class="left">
						<span>有效期至：</span>
						<span>2018-01-31 23:58:58</span>
					</div>
					<div class="right">
						<span>连续签到</span>
					</div>
				</div>
				<i class="hasUsed-icon iconfont icon-yishiyong"></i>
			</li>
			<li class="ticketList-item overTime">
				<div class="item-tab1">
					<div class="left">7追书券</div>
					<div class="right">
						<span>余额：</span>
						<span class="num">7</span>
					</div>
				</div>
				<div class="item-tab2">
					<div class="left">
						<span>有效期至：</span>
						<span>2018-01-31 23:58:58</span>
					</div>
					<div class="right">
						<span>连续签到</span>
					</div>
				</div>
				<i class="overTime-icon iconfont icon-yiguoqi"></i>
			</li>
		</ul>
		<div class="more">加载更多</div>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
export default {
	data() {
		return {};
	},
	components: {
		linkHead,
		nFooter
	}
};
</script>

<style lang="less" scoped>
@import url("../common/color.less");
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
		.hasUsed-icon{
			display: block;
		}
		.item-tab1,.item-tab2,.item-tab1 .num{
			color: @grayColor
		}
	}
	&.overTime{
		.overTime-icon{
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
	.hasUsed-icon,.overTime-icon{
		font-size: 1.6rem;

		position: absolute;
		right: 1.2rem;
		top: 50%;
		transform: translateY(-50%);
		z-index:-1;
		opacity: .8;
		display: none;
	}
	.hasUsed-icon{color: @mainColor; }
	.overTime-icon{color: @grayColor;}
}
</style>

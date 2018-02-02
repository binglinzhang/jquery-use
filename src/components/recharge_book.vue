<template>
	<div class="main">
		<div class="container user-pay-info">
			<div class="content">
				<p>充值账号：{{nickname}}</p>
				<p>购买书本：<span>《{{bookname}}》</span></p>
				<p>需付金额：{{price}}元</p>
			</div>
		</div>
		<div class="container online-pay">
			<div class="content">
				<p></p>
				<h2>选择支付方式</h2>
				<div class="way">
					<el-radio-group v-model="payType">
						<el-radio label="zfb">支付宝支付</el-radio>
						<el-radio label="wx">微信支付</el-radio>
					</el-radio-group>
				</div>
				<div class="btn submitBtn">
					<a>确认支付</a>
				</div>
			</div>
		</div>
		<div class="contact">
			<p>若充值遇到问题或充值失败，请联系客服。</p>
			<p>客服QQ：{{$config.qq}}</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { parseUrlQuery } from "../common/function";
export default {
	name: "app",
	data() {
		return {
			payType: "zfb",
			price: null,
			bookname: null,
			nickname: null
		};
	},
	methods: {
		init() {
			let queryObj = parseUrlQuery(window.location.hash);
			this.price = Number(queryObj.price) / 100;
			this.bookname = queryObj.bookname;
			axios.get("/apis/0.1/User/UserInfo.php").then(res => {
				this.nickname = res.data.data.nicker;
			});
		}
	},
	created() {
		this.init();
	}
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.submitBtn {
	a {
		background-color: @mainColor;
	}
}
</style>

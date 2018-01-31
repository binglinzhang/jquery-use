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
import axios from 'axios'
import {parseUrlQuery} from '../common/function'
export default {
  name: "app",
  data() {
    return {
		payType:'zfb',
		price:null,
		bookname:null,
		nickname:null
	};
  },
  methods:{

  },
  created(){
	  let queryObj = parseUrlQuery(window.location.hash);
	  this.price = queryObj.price;
	  this.bookname = queryObj.bookname;
	  this.nickname = queryObj.nickname;
  }
};
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.submitBtn{
	a{
		background-color: @mainColor;
	}
}
</style>


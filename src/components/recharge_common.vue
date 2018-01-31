<template>
	<div class="main">
		<div class="container user-pay-info">
			<div class="content">
				<p>充值账号：{{nickname}}</p>
				<p>账户余额：
					<span>{{lessCoin}}</span> {{$config.coinName}}</p>
			</div>
		</div>
		<div class="container online-pay">
			<div class="content">
				<h2>选择支付金额
					<span>（1元=100{{$config.coinName}}）</span>
				</h2>
				<div class="money">
					<label v-for="(item,index) in payChoose" :class="{active:index==activeIndex}" @click="activeIndex=index">
						<input name="money" hidden="hidden" value="50">
						<span>{{item.spend}}元</span>
						<br> {{item.get}}{{$config.coinName}}
					</label>
				</div>
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
		payChoose:[
			{spend:30,get:30},
			{spend:50,get:50},
			{spend:60,get:60},
			{spend:80,get:80},
			{spend:100,get:100}
		],
		activeIndex:0,
		lessCoin:null,
		nickname:null
	};
  },

  created(){
	  let queryObj = parseUrlQuery(window.location.hash);
	  this.nickname = queryObj.nickname;
	  this.lessCoin = queryObj.lesscoin;
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


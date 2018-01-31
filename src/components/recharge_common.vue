<template>
	<div class="main">
		<div class="container user-pay-info">
			<div class="content">
				<p>充值账号：{{nickname}}</p>
				<p>账户余额：
					<span>{{lessCoin}}</span> {{$config.coinName}}
					<span style="margin-left:20px">{{lessCoin}}</span> 书券
				</p>
			</div>
		</div>
		<div class="container online-pay">
			<div class="content">
				<h2>选择支付金额
					<span>（1元=100{{$config.coinName}}）</span>
				</h2>
				<div class="money">
					<label v-for="(item,index) in payChoose.egold" :class="{active:activeIndex==index}" @click="activeIndex=index">
						<p>{{item.cost}}元</p>
						<p class="get">{{item.egold}}<span>+{{item.coin}}</span></p>
						<p>{{$config.coinName}}</p>
					</label>
					<label
						v-for="(item,index) in payChoose.month"
						:class="{active:activeIndex==index+payChoose.egold.length}"
						@click="activeIndex=index+payChoose.egold.length">
						<p>{{item.cost}}元</p>
						<p>包月：{{item.month}}个月</p>
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
		payChoose:{
			egold:[],
			month:[]
		},
		activeIndex:0,
		lessCoin:null,
		nickname:null,
		lessTicket:null
	};
  },
  created(){
	  axios.get('/apis/0.1/User/UserInfo.php').then(res=>{
		  this.nickname = res.data.data.nicker;
		  this.lessCoin = res.data.data.amount;
		  this.lessTicket = res.data.data.coin;
	  });
	  axios.get('/apis/0.1/Pay/PayConfigs.php').then(res=>{
		  this.payChoose = res.data.data;
	  })
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


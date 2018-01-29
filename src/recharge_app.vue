<template>
  <div id="app">
        <div class="main">
			<header>
				<div class="left">
				<i class="fa fa-angle-left" onclick="history.back()"></i>
				</div>
				<div class="center">充值</div>
				<div class="right">
				<a href="/"><i class="fa fa-home"></i></a>
				</div>
			</header>
            <div class="container user-pay-info">
                <div class="content">
                    <p>充值账号：镇回来了</p>
                    <p>账户余额：
                        <span>0</span> 歪币</p>
                </div>
            </div>
            <div class="container online-pay">
                <div class="content">
                    <h2>选择支付金额
                        <span>（1元=100歪币）</span>
                    </h2>
                    <div class="money">
                        <label class="">
                            <input type="radio" name="money" hidden="hidden" value="30">
                            <span>30元</span>
                            <br> 3000
                            <!---->歪币
                        </label>
                        <label class="active">
                            <input type="radio" name="money" hidden="hidden" value="50">
                            <span>50元</span>
                            <br> 5000+750歪币
                        </label>
                        <label class="">
                            <input type="radio" name="money" hidden="hidden" value="100">
                            <span>100元</span>
                            <br> 10000+2000歪币
                        </label>
                        <label class="">
                            <input type="radio" name="money" hidden="hidden" value="200">
                            <span>200元</span>
                            <br> 20000+5000歪币
                        </label>
                        <label class="">
                            <input type="radio" name="money" hidden="hidden" value="1000">
                            <span>1000元</span>
                            <br> 100000+50000歪币
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
                <p>客服QQ：848696001</p>
            </div>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import linkHead from './components/link_header'
export default {
  name: "app",
  data() {
    return {
		payType:'zfb'
	};
  },

  created(){

  }
};
</script>

<style lang="less" scoped>
@import url('./common/color.less');
.submitBtn{
	a{
		background-color: @mainColor;
	}
}
</style>


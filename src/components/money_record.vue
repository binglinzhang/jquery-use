<template>
    <div class="account">
	  <link-head>财务记录</link-head>
      <div class="container">
        <div class="tabs">
          <a href="https://m.yyread.com/account">
            <span>充值记录</span>
          </a>
          <a href="https://m.yyread.com/account/consume" class="">
            <span>消费记录</span>
          </a>
        </div>
        <div class="recharge">
          <div class="tabs">
            <a class="active">全部记录</a>
            <a class="">成功记录</a>
          </div>
          <div class="no-notes" style="display: none;">暂无充值记录</div>
          <div class="content">
            <span>50元(5000歪币)</span>
            <span>微信H5支付</span>
            <span style="color: rgb(221, 75, 57);">充值失败</span>
            <span class="time">2018-01-09 17:20:28</span>
          </div>
          <div class="more" style="display: none;">加载更多</div>
        </div>
      </div>
	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from 'axios'
export default {
	name:'money_record',
	data(){
		return {

		}
	},
	components:{
		linkHead,
		nFooter
	}
}
</script>

<style lang="less" scoped>
.recharge {
  min-height: 7rem;
}
.recharge .tabs {
  margin-top: .2rem;
}
.recharge .tabs a {
  margin: 0 .5rem;
}
.recharge .tabs a.active {
  background-color: #32a1ff;
}
.recharge .content {
  height: .7rem;
}
.recharge .content span {
  display: inline-block;
  margin-right: .15rem;
}
.recharge .content .time {
  color: #999;
  float: right;
  margin-top: .1rem;
}
.container .tabs a {
    margin: 0 0.5rem;
}
</style>

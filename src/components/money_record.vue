<template>
    <div class="account">
	  <link-head>财务记录</link-head>
      <div class="container">
        <div class="tabs">
          <router-link to="recharge_record">
            <span>充值记录</span>
          </router-link>
          <router-link to="pay_record">
            <span>消费记录</span>
          </router-link>
        </div>
        <div class="recharge">
          <div class="no-notes" v-if="!recordList.length">暂无充值记录</div>
          <div class="content">
            <span>50元(5000歪币)</span>
            <span>微信H5支付</span>
            <span style="color: rgb(221, 75, 57);">充值失败</span>
            <span class="time">2018-01-09 17:20:28</span>
          </div>
          <div class="more" v-if='page<pageCount' @click="loadMore">加载更多</div>
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
      recordList:[],
      page:0,
      pageCount:0,
      requestUrl:null,
		}
  },
  methods:{
    init(){
      axios.get(this.requestUrl).then(res=>{
        this.recordList = res.data.data.list;
        this.page = res.data.data.page;
        this.pageCount = res.data.data.pageCount;
      })
    },
    loadMore(){
      axios.get(`${this.requestUrl}?page=${++this.page}`).then(res=>{
        this.recordList = res.data.data.list;
        this.page = res.data.data.page;
        this.pageCount = res.data.data.pageCount;
      })
    }
  },
	components:{
		linkHead,
		nFooter
  },
  created(){
    if(this.$route.meta.aimTab=='recharge'){
      this.requestUrl = '/apis/0.1/User/UserBuyLog.php';
    }else if(this.$route.meta.aimTab=='pay'){
      this.requestUrl = '/apis/0.1/User/UserPayLog.php';
    }
    this.init()
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

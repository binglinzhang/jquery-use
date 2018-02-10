<template>
    <div class="c-full-screen-page-wraper">
	  <link-head>畅读会员</link-head>
      <div class="c-full-screen-page-body">
        <div class="pay-monthly-wraper">
          <div class="top">
            <div class="user-info">
              <h4>{{userInfo.nicker}}<i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:userInfo.month}" style="font-size:14px;margin-left:6px"></i></h4>
              <p class="sub">
                <span>{{userInfo.month==1?'当前正在享受vip特权':'您还不是VIP用户'}}</span>
                <!-- <a href="http://m.zhuishushenqi.com/vip/descption">
					了解VIP
                  <i>&gt;</i>
                </a> -->
              </p>
			  <p v-if="userInfo.month" style="margin-top:20px;color:#999">会员过期时间：{{userInfo.overtime}}</p>
              <img :src="userInfo.im" class="avatar">
            </div>
          </div>
          <!-- <div class="tip">
            <i></i>
            <span>部分书籍因版权限制，不参与VIP</span>
          </div> -->
		  <el-button type="primary" class="openBtn" @click="goToRecharge">{{userInfo.month?'前往续费':'前往开通'}}</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
		userInfo:{}
	};
  },
  components: {
    linkHead,
    nFooter
  },
  methods:{
	goToRecharge(){
		window.location.href = `${this.$config.rechargeUrl}#/r_common?members=yes`
	}
  },
  created() {
	  axios.get('/apis/0.1/User/UserInfo.php').then(res=>{
		  this.userInfo = res.data.data;
	  })
  }
};
</script>
<style lang="less" scoped>
@import url("../common/mixin.less");
.c-full-screen-page-wraper {
  height: 100vh;
  background: #f4f4f4;
}
.pay-monthly-wraper {
  height: 100%;
  overflow-y: auto;

  * {
    box-sizing: border-box;
  }
}
.pay-monthly-wraper .top {
  padding: 0.4rem 0.3rem;
  margin-bottom: 0.2rem;
  background: white;
}
.pay-monthly-wraper .top .user-info {
  position: relative;
  height: 2rem;
  padding-right: 1.6rem;
}
.pay-monthly-wraper .top .user-info h4 {
  line-height: 0.6rem;
  color: #666;
  font-size: 16px;
}
.pay-monthly-wraper .top .user-info .sub {
  line-height: 0.4rem;
  color: #999;
  font-size: 12px;
}
.pay-monthly-wraper .top .user-info .sub a,
.pay-monthly-wraper .top .user-info .sub a:visited {
  margin-left: 0.1rem;
  color: #7dbfdf;
}
.pay-monthly-wraper .top .user-info .sub a:visited i,
.pay-monthly-wraper .top .user-info .sub a i {
  font-style: normal;
  font-family: monospace;
  margin-left: 0.06rem;
}
.pay-monthly-wraper .top .user-info .avatar {
  position: absolute;
  right: 0;
  top: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.pay-monthly-wraper .tip {
  padding: 0.2rem 0.3rem;
  background-color: #fff;
  color: #999;
  span {
    font-size: 12px;
  }
}
.pay-monthly-wraper .tip i {
  width: 0.4rem;
  height: 0.4rem;
  background: url('../assets/problems.png')
    no-repeat;
  background-size: cover;
  margin-right: 0.05rem;
}
.pay-monthly-wraper .tip i,
.pay-monthly-wraper .tip span {
  display: inline-block;
  vertical-align: middle;
}
.openBtn {
  width: 80%;
  display: block;
  margin: 0 auto;
  position: fixed;
  bottom: .6rem;
  left: 50%;
  transform: translateX(-50%)
}
</style>

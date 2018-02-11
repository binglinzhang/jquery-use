<template>
    <div class="user">

      <link-head><span>用户中心</span></link-head>

      <div class="user-info">
        <div class="user-detail">
          <div class="user-head">
            <img :src="userInfo.im">
          </div>
          <div class="user-name">
            <p>{{userInfo.nicker}}
              <i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:userInfo.month}" style="font-size:14px;margin-left:6px" v-if="$config.hasMembers"></i>
            </p>
            <p>ID {{userInfo.uid}}</p>
          </div>
        </div>
        <div class="user-money">
            <div class="left"><span>{{$config.coinName}}:</span><span class="num">{{userInfo.amount}}</span></div>
            <div class="right"><span>书券:</span><span class="num">{{userInfo.coin}}</span></div>
        </div>
      </div>
      <div class="container">
        <div class="content">
          <a @click="goToRecharge">
            <span class="fa fa-credit-card"></span> 快速充值
            <b></b>
            <i class="fa fa-angle-right  arrow"></i>
          </a>
        </div>
        <div class="content">
          <router-link to="/book_ticket">
            <i class="iconfont icon-linedesign-19 preIcon"></i> 我的书券
            <i class="fa fa-angle-right arrow"></i>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/recent_reading">
            <span class="fa fa-file-text-o"></span> 阅读记录
            <i class="fa fa-angle-right  arrow"></i>
          </router-link>
        </div>
        <div class="content" v-if="$config.hasMembers">
          <router-link to="/members">
            <span class="iconfont icon-user preIcon"></span> 畅读会员
            <i class="fa fa-angle-right  arrow"></i>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/book_save">
            <span class="fa fa-bar-chart"></span> 书架
            <i class="fa fa-angle-right  arrow"></i>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/recharge_record">
            <i class="iconfont icon-consumption preIcon"></i> 充值记录
            <i class="fa fa-angle-right  arrow"></i>
          </router-link>
        </div>
        <div class="content">
          <router-link to="/pay_record">
            <i class="iconfont icon-xiaofei01 preIcon"></i> 消费记录
            <i class="fa fa-angle-right arrow"></i>
          </router-link>
        </div>

        <div class="content">
          <router-link to="/help">
            <span class="fa fa-info-circle"></span> 帮助
            <i class="fa fa-angle-right  arrow"></i>
          </router-link>
        </div>
        <div class="btn">
          <a @click="loginOut">退出登录</a>
        </div>
      </div>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import axios from "axios";
import { setCookie } from "../common/function";
export default {
  name: "user",
  data() {
    return {
      userInfo: {
        username: null,
        im: null,
        overtime: null,
        uid: null,
        amount: null,
        coin: null
      }
    };
  },
  components: {
    linkHead
  },
  methods: {
    loginOut() {
      axios.get("/apis/0.1/User/Logout.php").then(res => {
        if (res.data.code == 200) {
          this.$userInfo.isLogin = false;
          this.$router.push("/");
        }
      });
    },
    goToRecharge() {
      if (!this.$userInfo.isLogin) {
        this.$router.push("/login");
        return;
      }
      window.location.href = this.$config.rechargeUrl + "#/r_common";
    }
  },
  created() {
    axios.get("/apis/0.1/User/UserInfo.php").then(res => {
      this.userInfo = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.user .user-info {
  height: 3.6rem;
  background-color: lighten(@mainColor, 30%);
}

.user .user-info .user-detail {
  padding: 0.3rem;
}

.user .user-info .user-detail .user-head {
  width: 1.2rem;
  margin: 0 auto;
}

.user .user-info .user-detail .user-head img {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1rem;
}

.user .user-info .user-asset {
  overflow: hidden;
  width: 6.6rem;
  margin: 0 auto;
  background-color: #fff;
  -webkit-box-shadow: 0 0 0.6rem 0 #fdeaea;
  box-shadow: 0 0 0.6rem 0 #fdeaea;
}

.user .user-info .user-asset span {
  float: left;
  width: 2.2rem;
  font-size: 0.26rem;
  text-align: center;
  padding-top: 0.8rem;
  padding-bottom: 0.2rem;
  background-size: 0.5rem;
  background-repeat: no-repeat;
  background-position: center 0.2rem;
}

.user .user-info .user-asset span:nth-child(1) {
  background-image: url(data:image/png;base64,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);
}

.user .user-info .user-asset span:nth-child(2) {
  background-image: url(data:image/png;base64,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);
}

.user .user-info .user-asset span:nth-child(3) {
  background-image: url(data:image/png;base64,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);
}

.user .user-info .user-detail .user-name {
  text-align: center;
}

.user .user-info .user-detail .user-name p {
  margin-top: 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user .user-info .user-money {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.user .user-info .user-money .num {
  margin-left: 6px;
  color: goldenrod;
}
.user .user-info .user-money .left,
.user .user-info .user-money .right {
  width: 50%;
}
.user .user-info .user-money .left {
  padding-right: 16px;
  text-align: right;
}
.user .user-info .user-money .right {
  padding-left: 16px;
  text-align: left;
}

.user .user-info .user-detail .user-name p img {
  display: inline-block;
  width: 0.7rem;
  margin-left: 0.1rem;
}

.user .container {
  margin-top: 0.1rem;
}

.user .content {
  padding: 0;
}

.user .content a {
  display: block;
  padding: 0.25rem 0.2rem;
  border-bottom: solid 0.02rem #ebebeb;
}

.user .content span {
  float: left;
  width: 0.4rem;
  margin-top: 0.05rem;
  margin-right: 0.1rem;
  font-size: 0.3rem;
  color: #666;
}

.user .content:nth-child(1) a {
  position: relative;
  color: #32a1ff;
}

.user .content:nth-child(1) b {
  position: absolute;
  margin-left: 0.1rem;
  top: 0.2rem;
  width: 0.4rem;
  height: 0.4rem;
  background: url("../assets/r_hot.png") no-repeat center;
  background-size: 0.4rem;
}

.user .content:nth-child(2) a,
.user .content:nth-child(3) a {
  color: #32a1ff;
}

.user .content:nth-child(1) i,
.user .content:nth-child(2) i,
.user .content:nth-child(3) i {
  color: #32a1ff;
}

.user .content:nth-child(1) span {
  font-size: 0.27rem;
  color: #32a1ff;
}

.user .content:nth-child(2) span {
  font-size: 0.28rem;
  margin-top: 0.03rem;
  color: #32a1ff;
}

.user .content:nth-child(3) span {
  font-size: 0.32rem;
  margin-top: 0.03rem;
  color: #32a1ff;
}

.user .content:nth-child(8) span {
  font-size: 0.33rem;
  margin-top: 0.03rem;
}

.user .content i.arrow {
  float: right;
  font-size: 0.3rem;
  color: #666;
  margin-top: 0.03rem;
  margin-right: 0.1rem;
}

.user .content i.preIcon {
  float: left;
  font-size: 0.34rem;
  margin-right: 0.16rem;
}

.user .btn a {
  display: block;
  width: 3.5rem;
  height: 0.8rem;
  border-radius: 0.05rem;
  line-height: 0.8rem;
  color: #fff;
  background-color: #999;
  margin: 0.5rem auto;
  text-align: center;
}
</style>


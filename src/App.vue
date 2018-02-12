<template>
  <div id="app">
	<navigation>
    	<router-view></router-view>
	</navigation>
  </div>
</template>

<script>
import Vue from "vue";
import { getCookie, setCookie,parseUrlQuery } from "./common/function";
import axios from "axios";
import wx from "weixin-js-sdk";
import md5 from "md5";
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    checkLogin() {
      const uidCookieName = "uid";
      const uid = getCookie(uidCookieName);
      if (uid) {
        this.$userInfo.isLogin = true;
        this.$userInfo.userId = uid;
      }
    },
    //如果是在微信环境，则会自动登录，如果用户退出登录，从此不在微信内自动登录
    weixinAutoLogin() {
      let canAuto =
        !this.$userInfo.isLogin &&
        !getCookie("user_uid");
      if (canAuto) {
        window.location.href = `/apis/0.1/User/wxLogin.php?backurl=${encodeURIComponent(
          window.location.href
        )}`;
      }
    },
    getWeiXinFunsStatus() {
      //如果存在web_uuid就话只需请求token
      if (getCookie("web_uuid")) {
        this.getTokens();
        return false;
      }

      if (!parseUrlQuery(window.location.search).code) {
        let targetUrl = `http://m.shengshixiwen.com/apis/0.1/User/weixin.html?appid=${this.$config.appid}&redirect_uri=${encodeURIComponent(
          window.location.href
        )}&response_type=code&scope=snsapi_base&state=${md5(
          new Date().getTime()
        )}#wechat_redirect`;
        console.log(targetUrl);
		window.location.href = targetUrl;
		return
      }

      axios
        .get(
          `/apis/0.1/User/Msg.php?a=mulu&code=${
            parseUrlQuery(window.location.search).code
          }`
        )
        .then(res => {
          if (res.data.code == 200) {
          }
        });
      this.getTokens();
    },
    getTokens() {
      axios.get("/apis/0.1/User/Msg.php?a=token").then(res => {
        if (res.data.code == 200) {
          this.$userInfo.isWeiXinFun = res.data.data.subscribe == 1;
          alert(JSON.stringify(res.data));
        }
      });
    }
  },
  created() {
    this.checkLogin();
    this.$nextTick(() => {
	  if(this.$userInfo.isWeiXin){
		  this.weixinAutoLogin();
		  this.getWeiXinFunsStatus()
	  }
    });
  }
};
</script>

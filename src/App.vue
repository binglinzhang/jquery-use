<template>
  <div id="app">
	<navigation>
    	<router-view></router-view>
	</navigation>
  </div>
</template>

<script>
import Vue from "vue";
import { getCookie, setCookie, parseUrlQuery } from "./common/function";
import axios from "axios";
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
      let canAuto = !this.$userInfo.isLogin && !getCookie("user_uid");
      if (canAuto) {
        window.location.href = `/apis/0.1/User/wxLogin.php?backurl=${encodeURIComponent(
          window.location.href
        )}`;
      }
    },
    storeIndexUrl() {
      let originIndex = `${location.protocol}//${location.host}`;
      setCookie('originurl', originIndex);
    }
  },
  created() {
    this.checkLogin();
    this.storeIndexUrl();
    this.$nextTick(() => {
      if (this.$userInfo.isWeiXin) {
        //this.weixinAutoLogin();
      }
    });
  }
};
</script>

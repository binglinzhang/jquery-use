<template>
  <div id="app">
        <div class="main">
			<header>
				<div class="left">
				<i class="fa fa-angle-left" onclick="history.back()"></i>
				</div>
				<div class="center">充值</div>
				<div class="right">
				<a :href="originUrl"><i class="fa fa-home"></i></a>
				</div>
			</header>
			<router-view></router-view>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCookie, setCookie, parseUrlQuery } from "./common/function";
import md5 from "md5";
export default {
  name: "app",
  data() {
    return {
      originUrl: null,
      openid: null
    };
  },
  methods: {
    getWeiXinFunsStatus() {
      //如果存在web_uuid就话只需请求token
      if (getCookie("user_uuid")) {
        return false;
      }
      if (!parseUrlQuery(window.location.search).code) {
        let targetUrl = `http://m.shengshixiwen.com/apis/0.1/User/weixin.html?appid=${
          this.$config.appid
        }&redirect_uri=${encodeURIComponent(
          window.location.href
        )}&response_type=code&scope=snsapi_base&state=${md5(
          new Date().getTime()
        )}#wechat_redirect`;
        window.location.href = targetUrl;
        return;
      }

      axios
        .get(
          `/apis/0.1/User/Msg.php?a=user&code=${
            parseUrlQuery(window.location.search).code
          }`
        )
        .then(res => {
          if (res.data.code == 200) {
          }
        });
    },
    getOriginUrl(){
      return getCookie('originurl')
    }
  },
  created() {
    this.originUrl = this.getOriginUrl();
    this.$nextTick(() => {
      if (this.$userInfo.isWeiXin) {
        this.getWeiXinFunsStatus();
      }
    });
  }
};
</script>

<template>
  <div id="app">
	<navigation>
    	<router-view></router-view>
	</navigation>
  </div>
</template>

<script>
import Vue from 'vue'
import {getCookie,setCookie} from './common/function'
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
  name: "app",
  data() {
    return {

	};
  },
  methods:{
	  checkLogin(){
		  const uidCookieName = 'uid';
		  const uid = getCookie(uidCookieName);
		  if(uid){
			  this.$userInfo.isLogin = true;
			  this.$userInfo.userId = uid;
		  }
	  },
	  //如果是在微信环境，则会自动登录，如果用户退出登录，从此不在微信内自动登录
	  weixinAutoLogin(){
		  let canAuto = this.$userInfo.isWeiXin&&getCookie(wxAutoLogin)!='no';
		  if(!canAuto) return
		  axios.get('/apis/0.1/User/wxLogin.php').then(res=>{

		  })
	  },
	  isWeiXinFun(){
		    if(!this.$userInfo.isWeiXin) return false
			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
				timestamp: 12312, // 必填，生成签名的时间戳
				nonceStr: '', // 必填，生成签名的随机串
				signature: '',// 必填，签名，见附录1
				jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
	  }
  },
  created(){
	  this.checkLogin();
	  this.weixinAutoLogin();
  }
};
</script>



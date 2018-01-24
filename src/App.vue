<template>
  <div id="app">
	<navigation>
    	<router-view></router-view>
	</navigation>
  </div>
</template>

<script>
import Vue from 'vue'
import {getCookie} from './common/common_fn'
export default {
  name: "app",
  data() {
    return {};
  },
  methods:{
	  checkLogin(){
		  const uidCookieName = 'ts_uid';
		  const uid = getCookie(uidCookieName);
		  if(uid){
			  this.$userInfo.isLogin = true;
			  this.$userInfo.userId = uid;
		  }
	  }
  },
  created(){
	  this.checkLogin();
  }
};
</script>



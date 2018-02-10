<template>
  <div id="app">
        <div class="main">
			<header>
				<div class="left">
				<i class="fa fa-angle-left" onclick="history.back()"></i>
				</div>
				<div class="center">充值</div>
				<div class="right">
				<a :href="originHost"><i class="fa fa-home"></i></a>
				</div>
			</header>
			<router-view></router-view>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "app",
  data() {
    return {
		originHost:null
	};
  },

  created(){
	axios.get("/apis/0.1/Url.php").then(res => {
		this.originHost = res.data;
	});
  }
};
</script>



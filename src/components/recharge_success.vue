<template>
	<div class="handdleSucessContainer">
		<div class="status">
			<i class="iconfont icon-ic_success status-icon"></i>
		</div>
		<p class="info">充值成功</p>
		<el-button @click="returnToTarget">点击返回</el-button>
		<v-dialog width="80%"></v-dialog>
	</div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import {getCookie,delCookie} from '../common/function'
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    returnToTarget() {
		const backUrl = getCookie('recharge_back_url') || location.host;
		delCookie('recharge_back_url');
		window.location.href = backUrl;
	}
  },
  created() {
    let fetchData = window.location.hash.split("?")[1];
    axios
      .get(`/apis/0.1/Pay/alipaysuccessnotyfy.php?${fetchData}`)
      .then(res => {});
    }
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.handdleSucessContainer {
  padding-top: 2rem;
  text-align: center;
  .info {
    margin: 16px 0;
    font-size: 0.36rem;
  }
}
.status {
  text-align: center;
  i.status-icon {
    color: #5cb85c;
    font-size: 1.6rem;
  }
}
</style>


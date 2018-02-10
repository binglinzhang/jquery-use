<template>
    <div class="account accountContainer">
	  <link-head>财务记录</link-head>
      <div class="container">
        <div class="tabs">
          <router-link to="recharge_record" replace>
            <span>充值记录</span>
          </router-link>
          <router-link to="pay_record" replace>
            <span>消费记录</span>
          </router-link>
        </div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
      </div>
	  <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
export default {
	name: "money_record",
	data() {
		return {
		};
	},
	components: {
		linkHead,
		nFooter
	},
};
</script>

<style lang="less">
.accountContainer{
	.no-notes{
		margin-top: 0;
	}
	.recharge {
		min-height: 7rem;
	}
	.recharge .tabs {
		margin-top: 0.2rem;
	}
	.recharge .tabs a {
		margin: 0 0.5rem;
	}
	.recharge .tabs a.active {
		background-color: #32a1ff;
	}
	.recharge .content {
		height: 0.7rem;
	}
	.recharge .content span {
		display: inline-block;
		margin-right: 0.15rem;
	}
	.recharge .content .time {
		color: #999;
		float: right;
	}
	.tabs a {
		margin: 0 0.5rem;
	}
}

</style>

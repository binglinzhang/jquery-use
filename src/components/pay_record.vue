<template>
	<div class="recharge">
		<div class="no-notes" v-if="!recordList.length">暂无充值记录</div>
		<div class="content" v-for="item in recordList">
			<span class="mainColor" style="width:1rem">{{item.price+item.coin_type}}</span>
			<span>{{item.type}}</span>
			<span class="time">{{item.create_time}}</span>
		</div>
		<div class="more" v-if='page<pageCount' @click="loadMore">加载更多</div>
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
      recordList: [],
      page: 0,
      pageCount: 0,
      requestUrl: null
    };
  },
  methods: {
    init() {
      axios.get("/apis/0.1/User/UserBuyLog.php").then(res => {
        this.recordList = res.data.data.list;
        this.page = res.data.data.page;
        this.pageCount = res.data.data.pageCount;
      });
    },
    loadMore() {
      axios
        .get(`/apis/0.1/User/UserBuyLog.php?page=${++this.page}`)
        .then(res => {
          this.recordList.push(res.data.data.list);
          this.page = res.data.data.page;
          this.pageCount = res.data.data.pageCount;
        });
    }
  },
  components: {
    linkHead,
    nFooter
  },
  created() {
    this.init();
  }
};
</script>


<style lang="less" scoped>
.recharge .content {
  display: flex;
  justify-content: space-between;
}
.recharge .content .time {
  margin-top: 0;
}
</style>

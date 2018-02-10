<template>
	<div class="recharge">
		<div class="no-notes" v-if="!recordList.length">暂无充值记录</div>
		<div class="content" v-for="item in recordList">
		<span>{{item.amount+$config.coinName}}</span>
		<span>{{item.description}}</span>
		<span class="mainColor">{{item.notify}}</span>
		<span class="time">{{item.createtime}}</span>
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
      axios.get("/apis/0.1/User/UserPayLog.php").then(res => {
        this.recordList = res.data.data.data;
        this.page = res.data.data.page;
        this.pageCount = res.data.data.pageCount;
      });
    },
    loadMore() {
      axios
        .get(`/apis/0.1/User/UserPayLog.php?page=${++this.page}`)
        .then(res => {
          this.recordList.push(...res.data.data.data);
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


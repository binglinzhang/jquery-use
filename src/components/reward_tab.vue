<template>
    <div class="reward-tab" keep-alive="">
        <div class="content no-content" v-if="!rewardList.length">
        没有打赏记录
        </div>
        <div class="comment-list">
			<div class="content comment-item" v-for="item in rewardList">
				<div class="user-head">
					<img v-lazy="item.avatar">
				</div>
				<div class="comment-info">
					<h2>
						<span>{{item.username}}</span>
						<i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:item.overtime==1}"></i>
					</h2>
					<div class="text">打赏了{{item.num}} 个 {{item.name}}！
						<span>{{item.time}}</span>
					</div>
				</div>
			</div>
        </div>
        <div class="more" v-show="page<pageCount" @click="loadMore">显示更多&gt;&gt;</div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "reward_tab",
  data() {
    return {
	  page:0,
	  pageCount:0,
      rewardList: []
    };
  },
  props: {
    bookId: {
      type: String
    }
  },
  methods:{
	loadMore(){
		console.log(1);
		axios
		.get(
			`/apis/0.1/UserLevel/BonusList.php?bookId=${this.bookId}&page=${++this.page}`
		)
		.then(res => {
			this.rewardList.push(...res.data.data.bonuslist);
			this.page = res.data.data.page;
			this.pageCount = res.data.data.pageCount;
		});
	}
  },
  created() {
    axios
      .get(
        `/apis/0.1/UserLevel/BonusList.php?bookId=${this.bookId}`
      )
      .then(res => {
		  this.rewardList = res.data.data.bonuslist;
		  this.page = res.data.data.page;
		  this.pageCount = res.data.data.pageCount;
      });
  }
};
</script>

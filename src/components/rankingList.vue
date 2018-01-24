<template>
	<div class="container ranking-list">
		<h1>
			<span class="nv_active">排行榜</span>
		</h1>
		<div class="button">
			<a :class="{active:activeFlag==0}" @click="activeFlag=0">
				<span>推荐榜</span>
			</a>
			<a :class="{active:activeFlag==1}" @click="activeFlag=1">
				<span>订阅榜</span>
			</a>
			<a :class="{active:activeFlag==2}" @click="activeFlag=2">
				<span>点击榜</span>
			</a>
		</div>
		<div class="content">
			<dl class="top" v-for="(item,index) in activeRank">
				<router-link :to="{name:'book',query:{bookId:item.bookId}}">
					<span :class="{hot:index<3}">{{index<3?"":index+1}}</span>
					<dt>{{item.name}}</dt>
					<dd v-if="false">{{item.num}}</dd>
				</router-link>
			</dl>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: "rankingList",
  data() {
    return {
      activeFlag: 0,
      recommendRank: [],
      orderRank: [],
      clickRank: []
    };
  },
  computed: {
    activeRank() {
      return this.activeFlag == 0
        ? this.recommendRank
        : this.activeFlag == 1 ? this.orderRank : this.clickRank;
    }
  },
  methods() {},
  created() {
    axios
      .get(
        "/apis/0.1/TopList.php?type=recommend_month"
      )
      .then(res => {
        this.recommendRank = res.data.data.bookinfo;
      });
    axios
      .get(
        "/apis/0.1/TopList.php?type=subscribe_month"
      )
      .then(res => {
        this.orderRank = res.data.data.bookinfo;
      });
    axios
      .get("/apis/0.1/TopList.php?type=click_month")
      .then(res => {
        this.clickRank = res.data.data.bookinfo;
      });
  }
};
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.ranking-list .button {
  height: 0.52rem;
  border-bottom: solid 0.02rem #f1f1f1;
}
.ranking-list .button a {
  float: left;
  width: 2.5rem;
  height: 0.52rem;
  text-align: center;
  font-size: 0.28rem;
  color: #333;
}
.ranking-list .button a span {
  display: inline-block;
  width: 0.5rem;
  height: 0.46rem;
  white-space: nowrap;
  border-bottom: solid 0.05rem #fff;
  text-indent: -0.13rem;
}
.ranking-list .button .active {
  color: #32a1ff;
}
.ranking-list .button .active span {
  border-color: #32a1ff;
}
.ranking-list .content {
  border-top: none;
  padding-top: 0;
}
.ranking-list dl {
  height: 0.4rem;
  line-height: 0.4rem;
  margin-top: 0.25rem;
}
.ranking-list dl a {
  display: block;
  font-size: 0.28rem;
}
.ranking-list dl span {
  float: left;
  width: 0.32rem;
  height: 0.32rem;
  line-height: 0.32rem;
  background-color: #ccc;
  color: #fff;
  border-radius: 0.2rem;
  text-align: center;
  font-size: 0.24rem;
  margin-top: 0.05rem;
}
.ranking-list dl dt {
  float: left;
  margin-left: 0.1rem;
}
.ranking-list dl.top dt,
.ranking-list dl.top dd {
  color: @mainColor;
}
.ranking-list dl .hot {
  height: 0.5rem;
  background: url("../assets/hot.png") no-repeat center center;
  background-size: 0.3rem 0.3rem;
  margin-top: -0.07rem;
}
.ranking-list dl dd {
  float: right;
  font-size: 0.28rem;
  color: #b3b3b3;
  text-align: right;
  background-size: 0.45rem;
}
.container.ranking-list .nv_active {
  color: @mainColor;
  border-left: solid 0.06rem @mainColor;
}
</style>

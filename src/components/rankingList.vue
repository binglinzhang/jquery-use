<template>
	<div class="container ranking-list">
		<h1>
			<span class="nv_active">排行榜</span>
		</h1>
		<div class="button">
			<a :class="{active:activeFlag==0}" @click="activeFlag=0">
				<span>点击榜</span>
			</a>
			<a :class="{active:activeFlag==1}" @click="activeFlag=1">
				<span>订阅榜</span>
			</a>
			<a :class="{active:activeFlag==2}" @click="activeFlag=2">
				<span>新书榜</span>
			</a>
		</div>
		<div class="content">
			<dl class="top" v-for="(item,index) in activeRank">
				<a href="https://m.yyread.com/book/779" class="">
					<span :class="{hot:index<3}">{{index<3?"":index+1}}</span>
					<dt>{{item.name}}</dt>
					<dd v-if="false">{{item.num}}</dd>
				</a>
			</dl>
		</div>
	</div>
</template>

<script>
export default {
  name: "rankingList",
  data() {
    return {
      activeFlag: 0,
      clickRank: [
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心", num: 98562, bookId: 123 }
      ],
      orderRank: [
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心2", num: 98562, bookId: 123 }
      ],
      newRank: [
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 },
        { name: "哈哈:爱情不走心3", bookId: 123 }
      ]
    };
  },
  computed: {
    activeRank() {
      return this.activeFlag == 0
        ? this.clickRank
        : this.activeFlag == 1 ? this.orderRank : this.newRank;
    }
  },
  methods() {}
};
</script>

<style lang="less" scoped>
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
  color: #ed6460;
}
.ranking-list dl .hot {
  height: 0.5rem;
  background: url('../assets/hot.png') no-repeat center center;
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
  color: #ff5858;
  border-left: solid 0.06rem #ff5858;
}
</style>

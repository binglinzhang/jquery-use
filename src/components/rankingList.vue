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
					<dd>{{item.num}}</dd>
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
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 },
        { name: "哈哈:爱情不走心3", num: 98562, bookId: 123 }
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
  background: url(data:image/png;base64,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umvhzhlxywu8aaadiwluwhrytuw6y29tlmfkb2jllnhtcaaaaaaapd94cgfja2v0igjlz2lupslvu78iiglkpsjxnu0wtxbdzwhpshpyzvn6tlrjemtjowqipz4gphg6eg1wbwv0ysb4bwxuczp4psjhzg9iztpuczptzxrhlyigedp4bxb0az0iqwrvymugwe1qienvcmugns41lwmwmtqgnzkumtuxndgxlcaymdezlzazlzezlteyoja5oje1icagicagicaipia8cmrmoljerib4bwxuczpyzgy9imh0dha6ly93d3cudzmub3jnlze5otkvmdivmjitcmrmlxn5bnrhec1ucymipia8cmrmokrlc2nyaxb0aw9uihjkzjphym91dd0iiib4bwxuczp4bxa9imh0dha6ly9ucy5hzg9izs5jb20vegfwlzeumc8iihhtbg5zonhtce1npsjodhrwoi8vbnmuywrvymuuy29tl3hhcc8xljavbw0viib4bwxuczpzdfjlzj0iahr0cdovl25zlmfkb2jllmnvbs94yxavms4wl3nuexbll1jlc291cmnlumvmiyigeg1woknyzwf0b3jub29spsjbzg9izsbqag90b3nob3agq0mgkfdpbmrvd3mpiib4bxbnttpjbnn0yw5jzulepsj4bxauawlkojczrdhfm0y3qkvbqjexrtdbmzvcreu0qjzemujgrejfiib4bxbnttpeb2n1bwvudelepsj4bxauzglkojczrdhfm0y4qkvbqjexrtdbmzvcreu0qjzemujgrejfij4gphhtce1nokrlcml2zwrgcm9tihn0umvmomluc3rhbmnlsuq9inhtcc5pawq6nzneoeuzrjvcrufcmtffn0eznujertrcnkqxqkzeqkuiihn0umvmomrvy3vtzw50suq9inhtcc5kawq6nzneoeuzrjzcrufcmtffn0eznujertrcnkqxqkzeqkuilz4gpc9yzgy6rgvzy3jpchrpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7c34QjAAACsUlEQVR42mL8//8/A1VARIwlkLzNsGLJG3KNYGKgHvgNxOeBjlIl1wBGqoUMJHSeAkkeIJYDhtDHgQwZEMgCYj4gvgB0GPNAO+YWlFYA4n0D7ZhvSGw7YOisH0jH/ATiP0j8AKCDqgbKMcxYzGwFOshuIBzDjcPMjUAHMdLbMZI4xAWAeCnljomIKQTiJCId449HLhJoji35jomIAcn3AXEQkY4JISA/i5KQmQalLYkIQSsgKUtAlQZQXTzpjomI0QeS6VCeEJDfTMCiiUSGXic5IYNueA3QQa44HA6ywIRIx4gD1XsQX1FGxGgCyWs4DCsBx/2KJZ+h6oqBOJnEXLcJqN+fWMesA5KBeAwDtVnuA7EpmUXAX2jN/gx/NEXECBFwCAiIUOAQWEntSUya8aJyQXgciP9hEbclxjGOVHTIMSBuxmEPRsiyEKOIAlAExC/wRDXBkBGikkPmAxPoSSCtiUOehxjHcFHBIdOADoHVZzI41PwjJpr+kmgxqDH1HYhBDfBL0DJoI5K8FLEFLguBpiMu8ASIu4H4IrTd+wWIvwIdgS3XiOIw4xcxjrkGLpBwg3NAbA+0+AuRIYerH/WImDSzCY/BoOI6mGiHRMSwAUkHHLI7iHHMSjzGvwI65AEJ6ckJiNlxyM0k7JgVS94ByQYcBvAR05ZFAsU4xCcB7blHXBNixZJGIHkDiwwnENcTGUXhQNIFi8x7IC4jtT3jDs2u6KAeaJEnAYdY4GiA/wF37lYs+Ul6xz8iBpSrTuBo9U8HN8BWLLmJpB5UpuTj8PkXcOW4YskF8kchImJEoBbjamzfBpcxDAxs0GzMikXNHiBOATrkIXWGRCBRA0ov5iQk4CtA3AR0xGrajM9ExNhAyw5Q4pQGYkFoqIDSAygnPgfi/WC8Ysl+UowGCDAASSmym4a5hdQAAAAASUVORK5CYII=)
    no-repeat center center;
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

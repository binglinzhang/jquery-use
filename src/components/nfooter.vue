<template>
	<lazy-component>
		<footer>
			<div class="nav">
				<router-link to="/index">首页</router-link>
				<router-link to="/library">书库</router-link>
				<router-link to="/search">搜索</router-link>
				<router-link to="/recharge">充值</router-link>
			</div>
			<div class="context">
			<img src="../assets/rcode.jpg">
			<p>
				<span class="qq">
				<i class="fa fa-qq"></i>&nbsp;&nbsp;848696001</span>
				<span class="tel">
				<i class="fa fa-phone"></i>&nbsp;&nbsp;17682489611</span>
			</p>
			<p>京ICP备16043940号-3</p>
			<p>北京太和凯旋信息技术有限公司</p>
			</div>
		</footer>
	</lazy-component>
</template>

<script>
export default {
    name:'nfooter',
    data(){
        return {

        }
    }
}
</script>


<style lang="less" scoped>
@import url('../common/color.less');
footer {
  margin-top: .5rem;
  background-color: #1b222c;
  padding: .4rem .2rem;
  color: #999;
}
footer .nav {
    text-align: center;
    font-size: 0;
}
footer .nav a {
      display: inline-block;
      height: .25rem;
      line-height: .25rem;
      font-size: .28rem;
      padding: 0 .25rem;
      border-right: solid 0.02rem #999;
      color: #f7f7f7;
}
footer .nav a:last-child {
        border-right: none;
}
footer .context {
    height: 2rem;
    margin-top: .4rem;
}
footer .context img {
      float: left;
      width: 2rem;
}
footer .context p {
      float: left;
      width: 4.6rem;
      margin-left: .3rem;
      margin-top: .1rem;
}
footer .context p:nth-child(2) {
        margin-top: .2rem;
}
footer .context p:nth-child(3) {
        margin-top: .4rem;
}
footer .context p span {
        display: inline-block;
        height: .46rem;
        line-height: .46rem;
        font-size: .26rem;
        text-align: center;
        color: #fff;
        border-radius: .1rem;
}
footer .context p .qq {
        width: 2rem;
        background-color: @mainColor;
}
footer .context p .tel {
        width: 2.2rem;
        background-color: #32a1ff;
        margin-left: .1rem;
}
</style>

<template>
        <footer>
        <div class="nav">
          <a href="https://m.yyread.com/" class="router-link-exact-active router-link-active">首页</a>
          <a href="https://m.yyread.com/library" class="">书库</a>
          <a href="https://m.yyread.com/search" class="">搜索</a>
          <a href="https://trade.yyread.com/v1.0/index">充值</a>
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
        background-color: #ff6060;
}
footer .context p .tel {
        width: 2.2rem;
        background-color: #32a1ff;
        margin-left: .1rem;
}
</style>
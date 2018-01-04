<template>
    <div>
      <link-head><span>{{book.name}}</span></link-head>

      <div class="container base-info">
        <div class="content">
          <div class="img">
            <img :src="book.img">
          </div>
          <div class="info">
            <h2>作者：{{book.author}}</h2>
            <h2>分类：{{book.label}}</h2>
            <h2>字数：{{book.wordNum}} 万字</h2>
            <h2>收藏：<span>{{book.orderNum}}</span> 次</h2>
            <div class="read-btn">
              <div class="btn">
                <a href="https://m.yyread.com/read/944/395460" class="">立即阅读</a>
              </div>
              <div class="btn">
                <a class="shelf">加入书架</a>
              </div>
            </div>
            <!---->
          </div>
        </div>
        <div class="content summary">
          {{book.shortIntro}}...
          <!-- <a>展开</a> -->
        </div>
        <div class="content new-chapter">
          <a href="https://m.yyread.com/read/944/400268" class="">
            <span>最新章节：</span>
            <span>{{book.newArticle}}</span>
            <i v-if="book.isVip==0">vip</i>
          </a>
        </div>
        <div class="content catalog">
          <a href="https://m.yyread.com/catalog/944" class="">查看目录：共{{book.allChapter}}章
            <span>{{book.status | statusFilter}} &gt;</span>
          </a>
        </div>
    
      </div>

      <funs-rank></funs-rank> 

      <reward></reward>

      <comment></comment>

      <n-footer></n-footer>
      <!---->
    </div> 
</template>

<script>
import linkHead from "./link_header.vue"
import nFooter from "./nfooter.vue"
import funsRank from './funsRank.vue'
import reward from './reward.vue'
import comment from './comment.vue'
export default {
  name: "book",
  data() {
    return {
      book: {
        name: "爱情不走心",
        img: "/static/book_id.jpg",
        author: "南风向晚",
        //0为连载   1为已完结
        status: 0,
        label: "都市情缘",
        wordNum: 7508326,
        newArticle: "第639章 最美不过遇见你19",
        //0为是，1为不是vip
        isVip: 0,
        //0为已出版   1为未出版
        publish: 0,
        //更新时间为时间戳，精确到毫秒
        updateTime: 1515037997832,
        shortIntro:"五年前，她为了爱放手。 五年后，他却将她，逼入深渊。 爱有余毒，唯情可解。...",
        allChapter:123,
        clickNum: 123123,
        orderNum: 123123,
        wordNum: 123123,
        bookId: 123
      }
    };
  },
  components: {
    linkHead,
    nFooter,
    funsRank,
    reward,
    comment
  }
};
</script>
<style lang="less">
.base-info {
  margin-top: 0;
}
.base-info .content {
  overflow: hidden;
}
.base-info .content .img {
  float: left;
  width: 1.8rem;
}
.base-info .content .img img {
  width: 1.8rem;
  height: 2.4rem;
  border-radius: .06rem;
  -webkit-box-shadow: 0 0 .05rem #bfbfbf;
          box-shadow: 0 0 .05rem #bfbfbf;
}
.base-info .content .info {
  float: left;
  width: 5rem;
  margin-left: .3rem;
  position: relative;
}
.base-info .content .info h2 {
  height: .43rem;
  font-size: .26rem;
}
.base-info .content .info h2 span {
  color: #32a1ff;
}
.base-info .content .info p {
  height: .45rem;
  font-size: .25rem;
  font-weight: bold;
  color: #999;
  margin-top: .2rem;
}
.base-info .content .info .buy-full-book {
  position: absolute;
  width: 1.3rem;
  height: 1.05rem;
  padding-top: .25rem;
  right: 0;
  top: .2rem;
  background-color: #ff6060;
  color: #fff;
  font-size: .24rem;
  border-radius: 1rem;
  text-align: center;
}
.base-info .content .info .share {
  position: absolute;
  right: .2rem;
  top: .2rem;
  font-size: .3rem;
  color: #646464;
}
.base-info .content .ticket .text span {
  font-size: .28rem;
  color: #999;
}
.base-info .read-btn {
  margin-top: .15rem;
  font-size: 0;
}
.base-info .read-btn .btn {
  display: inline-block;
  margin-right: .5rem;
}
.base-info .read-btn .btn a {
  display: table-cell;
  width: 1.8rem;
  height: .46rem;
  text-align: center;
  vertical-align: middle;
  font-size: .24rem;
  color: #fff;
  background-color: #ff6060;
  border-radius: .07rem;
  border: solid 0.02rem #ff6060;
}
.base-info .read-btn .btn .shelf {
  background-color: #fff;
  color: #ff6060;
}
.base-info .summary {
  font-size: .28rem;
  color: #646464;
  text-indent: .5rem;
  line-height: .4rem;
}
.base-info .summary a {
  color: #ff6060;
}
.base-info .new-chapter {
  height: .38rem;
  line-height: .38rem;
}
.base-info .new-chapter span:nth-child(1) {
  float: left;
  text-align: center;
  color: #5aacff;
  font-size: .26rem;
}
.base-info .new-chapter span:nth-child(2) {
  float: left;
  max-width: 4.05rem;
  font-size: .26rem;
  color: #5aacff;
  margin-left: .05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.base-info .new-chapter span:nth-child(4) {
  float: right;
  width: 2rem;
  font-size: .3rem;
  color: #999;
}
.base-info .new-chapter i {
  color: #dd4b39;
  font-size: .24rem;
}
.base-info .catalog a {
  display: block;
}
.base-info .catalog span {
  float: right;
}
.base-info .show-box {
  position: fixed;
  width: 7.1rem;
  padding: .2rem;
  background-color: #fff;
  z-index: 100;
  -webkit-transition: bottom ease-in 200ms;
  transition: bottom ease-in 200ms;
}
.base-info .show-box h2 {
  text-align: center;
}
.base-info .show-box .option {
  margin-top: .3rem;
}
.base-info .show-box span {
  display: inline-block;
  font-size: .28rem;
  padding: .15rem .33rem;
  background-color: #b3b3b3;
  color: #fff;
  border-radius: .05rem;
  margin: 0 .14rem;
}
.base-info .show-box p {
  margin-top: .4rem;
  color: #999;
  text-align: right;
}
.base-info .show-box p i {
  color: #ff6060;
}
.base-info .show-box p a {
  color: #58B7FF;
}
.base-info .show-box .btn {
  text-align: center;
  margin-top: .3rem;
}
.base-info .show-box .btn a {
  display: inline-block;
  font-size: .3rem;
  padding: .2rem 1rem;
  background-color: #ff6060;
  color: #fff;
}
.base-info .show-box .no-ticket {
  margin-top: .4rem;
  text-align: center;
  font-size: .4rem;
}
.base-info .share-box {
  width: 7rem;
  left: .25rem;
  position: fixed;
  z-index: 100;
  -webkit-transition: bottom ease-in 200ms;
  transition: bottom ease-in 200ms;
}
.base-info .share-box h2 {
  text-align: center;
}
.base-info .share-box .icon-box {
  background-color: #fff;
  margin-bottom: .2rem;
  border-radius: .1rem;
  padding: .25rem;
}
.base-info .share-box .icon-box .icons {
  height: 1.4rem;
}
.base-info .share-box .icon-box .icons a {
  float: left;
  width: 1rem;
  margin: .2rem .15rem;
  font-size: .24rem;
  text-align: center;
}


</style>

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
            <h2>字数：{{book.wordNum}} 字</h2>
            <div class="read-btn">
              <div class="btn">
                <a class="" @click="$router.push({name:'chapter',query:{bookId:$route.query.bookId,chapterId:book.read_chapter_id}})">{{book.read_status?'继续阅读':'立即阅读'}}</a>
              </div>
              <div class="btn">
                <a class="shelf" @click="toggleBookSelf">{{isOnSelf?'加入书架':'移出书架'}}</a>
              </div>
            </div>
            <!---->
          </div>
        </div>
        <div class="content summary">
          <span>{{showAllFlag?book.shortIntro:book.shortIntro.slice(0,43)}}...</span>
          <a @click="showAllFlag=!showAllFlag">{{showAllFlag?'收起':'展开'}}</a>
        </div>
        <div class="content new-chapter">
          <a @click="$router.push({name:'chapter',query:{bookId:$route.query.bookId,chapterId:book.last_chapter_id}})" class="">
            <span>最新章节：</span>
            <span>{{book.last_chapter_name}}</span>
            <i v-if="book.isVip==0">vip</i>
          </a>
        </div>
        <div class="content catalog">
          <a @click="$router.push({name:'menu',query:{bookId:$route.query.bookId}})">查看目录：共{{book.allChapter}}章
            <span>{{book.status | statusFilter}} &gt;</span>
          </a>
        </div>

      </div>

      <funs-rank :bookId="$route.query.bookId"></funs-rank>

      <reward :bookId="$route.query.bookId"></reward>

      <comment :bookId="$route.query.bookId"></comment>

      <n-footer></n-footer>
      <!---->
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import funsRank from "./funsRank.vue";
import reward from "./reward.vue";
import comment from "./comment.vue";
import axios from "axios";
export default {
  name: "book",
  data() {
    return {
	  showAllFlag: false,
	  isOnSelf:false,
      book: {
		  shortIntro:""
	  }
    };
  },
  created() {
    var bookId = this.$route.query.bookId;
    axios
      .get(`http://m.shengshixiwen.com/apis/0.1/BookInfo.php?bookId=${bookId}`)
      .then(res => {
		this.book = res.data.data;
		this.isOnSelf = this.book.bookself==2;
      });
  },
  components: {
    linkHead,
    nFooter,
    funsRank,
    reward,
    comment
  },
  methods:{
	  toggleBookSelf(){

	  }
  }
};
</script>
<style lang="less">
@import url('../common/color.less');
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
  border-radius: 0.06rem;
  -webkit-box-shadow: 0 0 0.05rem #bfbfbf;
  box-shadow: 0 0 0.05rem #bfbfbf;
}
.base-info .content .info {
  float: left;
  width: 5rem;
  margin-left: 0.3rem;
  position: relative;
}
.base-info .content .info h2 {
  height: 0.58rem;
  font-size: 0.26rem;
}
.base-info .content .info h2 span {
  color: #32a1ff;
}
.base-info .content .info p {
  height: 0.45rem;
  font-size: 0.25rem;
  font-weight: bold;
  color: #999;
  margin-top: 0.2rem;
}
.base-info .content .info .buy-full-book {
  position: absolute;
  width: 1.3rem;
  height: 1.05rem;
  padding-top: 0.25rem;
  right: 0;
  top: 0.2rem;
  background-color: @mainColor;
  color: #fff;
  font-size: 0.24rem;
  border-radius: 1rem;
  text-align: center;
}
.base-info .content .info .share {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  font-size: 0.3rem;
  color: #646464;
}
.base-info .content .ticket .text span {
  font-size: 0.28rem;
  color: #999;
}
.base-info .read-btn {
  margin-top: 0.15rem;
  font-size: 0;
}
.base-info .read-btn .btn {
  display: inline-block;
  margin-right: 0.5rem;
}
.base-info .read-btn .btn a {
  display: table-cell;
  width: 1.8rem;
  height: 0.46rem;
  text-align: center;
  vertical-align: middle;
  font-size: 0.24rem;
  color: #fff;
  background-color: @mainColor;
  border-radius: 0.07rem;
  border: solid 0.02rem @mainColor;
}
.base-info .read-btn .btn .shelf {
  background-color: #fff;
  color: @mainColor;
}
.base-info .summary {
  font-size: 0.28rem;
  color: #646464;
  text-indent: 0.5rem;
  line-height: 0.4rem;
}
.base-info .summary a {
  color: @mainColor;
}
.base-info .new-chapter {
  height: 0.38rem;
  line-height: 0.38rem;
}
.base-info .new-chapter span:nth-child(1) {
  float: left;
  text-align: center;
  color: #5aacff;
  font-size: 0.26rem;
}
.base-info .new-chapter span:nth-child(2) {
  float: left;
  max-width: 4.05rem;
  font-size: 0.26rem;
  color: #5aacff;
  margin-left: 0.05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.base-info .new-chapter span:nth-child(4) {
  float: right;
  width: 2rem;
  font-size: 0.3rem;
  color: #999;
}
.base-info .new-chapter i {
  color: @mainColor;
  font-size: 0.24rem;
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
  padding: 0.2rem;
  background-color: #fff;
  z-index: 100;
  -webkit-transition: bottom ease-in 200ms;
  transition: bottom ease-in 200ms;
}
.base-info .show-box h2 {
  text-align: center;
}
.base-info .show-box .option {
  margin-top: 0.3rem;
}
.base-info .show-box span {
  display: inline-block;
  font-size: 0.28rem;
  padding: 0.15rem 0.33rem;
  background-color: #b3b3b3;
  color: #fff;
  border-radius: 0.05rem;
  margin: 0 0.14rem;
}
.base-info .show-box p {
  margin-top: 0.4rem;
  color: #999;
  text-align: right;
}
.base-info .show-box p i {
  color: @mainColor;
}
.base-info .show-box p a {
  color: #58b7ff;
}
.base-info .show-box .btn {
  text-align: center;
  margin-top: 0.3rem;
}
.base-info .show-box .btn a {
  display: inline-block;
  font-size: 0.3rem;
  padding: 0.2rem 1rem;
  background-color: @mainColor;
  color: #fff;
}
.base-info .show-box .no-ticket {
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.4rem;
}
.base-info .share-box {
  width: 7rem;
  left: 0.25rem;
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
  margin-bottom: 0.2rem;
  border-radius: 0.1rem;
  padding: 0.25rem;
}
.base-info .share-box .icon-box .icons {
  height: 1.4rem;
}
.base-info .share-box .icon-box .icons a {
  float: left;
  width: 1rem;
  margin: 0.2rem 0.15rem;
  font-size: 0.24rem;
  text-align: center;
}
</style>

<template>
    <transition name="slideLeftToRight">
        <div class="book-menu catalog">
            <link-head><span>目录</span></link-head>
            <h4 class="chapter-head">
                <span class="total">共1070章</span> 
                <span class="sort">
                    <img src="../assets/daoxu.png" alt="">
                    <span @click="reverseFlag=!reverseFlag">{{reverseFlag?'正序':'倒序'}}</span>
                </span>
            </h4>
            <ul class="container">
                <li class="chapter-item" v-for="(item,index) in chapterList" :class='{record:readRecord==index}'>
                    <a href="https://m.yyread.com/read/779/345396" class="">
                        <span class="name">{{item.title}} </span>
                        <span class="vip" v-if="item.isvip"></span>
                        <!-- <span class="first" style="display: none;">抢先</span> -->
                        <!-- <span class="read">已读</span> -->
                    </a>
                </li>
            </ul>
            <div class="more" style="">加载更多</div>
        </div>
    </transition>
</template>
<script>
import linkHead from "./link_header.vue";
import axios from "axios";
export default {
  name: "book_menu",
  data() {
    return {
      readRecord:3,
      reverseFlag:false,
      chapterList: [
        {
          id: "212",
          title: "第一章：捣蛋鬼",
          updatetime: "2017-12-21 20:24:17",
          order: 1,
          isvip: 0
        },
        {
          id: "214",
          title: "第二章：龙凤相斗",
          updatetime: "2017-12-22 07:54:07",
          order: 2,
          isvip: 0
        },
        {
          id: "216",
          title: "第三章：龙凤相斗（2）",
          updatetime: "2017-12-23 06:10:47",
          order: 3,
          isvip: 0
        },
        {
          id: "219",
          title: "第四章：新同桌",
          updatetime: "2017-12-24 08:26:40",
          order: 4,
          isvip: 0
        },
        {
          id: "221",
          title: "第五章：礼物",
          updatetime: "2017-12-25 06:17:21",
          order: 5,
          isvip: 0
        },
        {
          id: "222",
          title: "第六章：打扮风波（1）",
          updatetime: "2017-12-25 19:53:26",
          order: 6,
          isvip: 0
        },
        {
          id: "224",
          title: "第七章：打扮风波（2）",
          updatetime: "2017-12-26 20:43:28",
          order: 7,
          isvip: 0
        }
      ], 
    };
  },
  components: {
    linkHead
  },
  created() {
    axios
    //   .get("http://m.shengshixiwen.com/apis/0.1/BookChapters.php?bookid=97")
    //   .then(res => {
    //     this.chapterList = res.data.data;
    //   });
  },
  watch:{
      reverseFlag(newVal,oldVal){
          this.chapterList.reverse()
      }
  }
};
</script>

<style lang="less" scoped>
.chapter-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
  padding: 0 0.4rem;
  line-height: 40px;
}
.chapter-head .sort {
  display: flex;
  align-items: center;
}
.chapter-head .sort img {
  height: 14px;
  margin-right: 2px;
}
.catalog .page .current-page {
  padding: 0.2rem;
  border-bottom: solid 0.03rem #f7f7f7;
}
.catalog .page .current-page i {
  float: right;
  font-size: 0.4rem;
  color: #999;
}
.catalog .page .page-list p {
  padding: 0.1rem 0.4rem;
  margin-top: 0.02rem;
}
.catalog .container {
  border-top: solid 0.12rem #f7f7f7;
}
.chapter-item {
  padding: 6px 20px 6px 0;
  border-top: 1px solid #f0f1f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.chapter-item.record .name{
    color: red;
}
.chapter-item a {
  display: block;
  height: 0.6rem;
  padding-left: 0.4rem;
}
.chapter-item a span.name {
  float: left;
  line-height: 0.6rem;
}
.chapter-item a span.read {
  float: right;
  background-color: #f39c12;
  color: #fff;
  padding: 0.05rem 0.15rem;
}
.chapter-item a span.vip {
  float: left;
  width: 0.36rem;
  height: 0.36rem;
  margin-left: 0.1rem;
  margin-top: 0.16rem;
  background: url("../assets/menu_vip.png") no-repeat center;
  background-size: 0.36rem;
}
.chapter-item a span.first {
  float: left;
  background-color: #09a456;
  color: #fff;
  font-size: 0.24rem;
  border-radius: 0.05rem;
  height: 0.36rem;
  line-height: 0.36rem;
  padding: 0 0.1rem;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
}
.catalog .more {
  text-align: center;
  padding: 0.2rem;
  margin-top: 0.02rem;
}
</style>


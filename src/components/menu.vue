<template>
    <transition name="slideLeftToRight">
        <div class="book-menu catalog">
            <link-head><span>目录</span></link-head>
            <h4 class="chapter-head">
                <span class="total">共1070章</span>
                <span class="sort">
                    <img src="../assets/daoxu.png" alt="">
                    <span @click="reverse">{{reverseFlag?'正序':'倒序'}}</span>
                </span>
            </h4>
			<div class="container" ref="menuContent">
				<div>
					<ul>
						<li class="chapter-item" v-for="(item,index) in chapterList" :class='{record:readRecordChapterId==item.chapter_id}'>
							<router-link :to="{name:'chapter',query:{chapterId:item.chapter_id,bookId:item.book_id}}">
								<span class="name">{{item.chapter_name}} </span>
								<span class="vip" v-if="item.is_vip"></span>
							</router-link>
						</li>
					</ul>
					<div class="more" v-show="page<pageCount" @click="loadMore"  v-loading="loading">加载更多</div>
				</div>

			</div>


        </div>
    </transition>
</template>
<script>
import linkHead from "./link_header.vue";
import axios from "axios";
import BScroll from "better-scroll";
export default {
  name: "book_menu",
  data() {
    return {
      readRecordChapterId: null,
      reverseFlag: false,
      chapterList: [],
      page: 0,
      pageCount: 0,
      loading: false
    };
  },
  components: {
    linkHead
  },
  methods: {
    init() {
      axios
        .get(
          `/apis/0.1/Chapter/ChapterList.php?bookId=${this.$route.query.bookId}`
        )
        .then(res => {
          this.chapterList = res.data.data.data;
          this.page = res.data.data.page;
          this.pageCount = res.data.data.pageCount;
        });
      this.getReadCordFromLocal();
    },
    getWeiXinFunsStatus() {
      let targetUrl = `/apis/0.1/User/weixin.html?appid=wxea6e68853a2b6e19&redirect_uri=${encodeURIComponent(
        window.location.href
      )}&response_type=code&scope=snsapi_userinfo&state=${md5(
        new Date().getTime()
      )}#wechat_redirect`;
      axios
        .get(`/apis/0.1/User/Msg.php?a=mulu?code=${this.$router.query.code}}`)
        .then(res => {
          if (res.data.code == 200) {
            this.$userInfo.isWeiXinFun = res.data.data.subscribe == 1;
          }
        });
    },
    reverse() {
      this.reverseFlag = !this.reverseFlag;

      axios
        .get(
          `/apis/0.1/Chapter/ChapterList.php?bookId=${
            this.$route.query.bookId
          }&order=${this.reverseFlag ? 1 : 0}`
        )
        .then(res => {
          this.chapterList = res.data.data.data;
          this.page = res.data.data.page;
          this.pageCount = res.data.data.pageCount;
        });
    },
    loadMore() {
      this.loading = true;
      axios
        .get(
          `/apis/0.1/Chapter/ChapterList.php?bookId=${
            this.$route.query.bookId
          }&order=${this.reverseFlag ? 1 : 0}&page=${++this.page}`
        )
        .then(res => {
          this.chapterList.push(...res.data.data.data);
          this.page = res.data.data.page;
          this.pageCount = res.data.data.pageCount;
          this.loading = false;
        });
    },
    getReadCordFromLocal() {
      this.readRecordChapterId = localStorage.getItem(
        `book${this.$route.query.bookId}ReadCord`
      );
    },
    scrollInit() {
      let scroll = new BScroll(this.$refs.menuContent, {
        click: true,
        tap: true
      });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollInit();
    });
  },
  activated() {
    this.getReadCordFromLocal();
  }
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
@chpaterHeadHeight: 40px;
.chapter-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
  padding: 0 0.4rem;
  line-height: @chpaterHeadHeight;
  height: @chpaterHeadHeight;
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
@hack: 0.2rem;
.catalog .container {
  border-top: solid 0.12rem #f7f7f7;
  box-sizing: border-box;
  height: calc(100vh + - @headerHeight + - @chpaterHeadHeight + - @hack);
  overflow: hidden;
}
.chapter-item {
  padding: 6px 20px 6px 0;
  border-top: 1px solid #f0f1f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
}
.chapter-item.record .name {
  color: @mainColor;
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
  padding: 0.4rem;
  margin-top: 0.02rem;
}
</style>

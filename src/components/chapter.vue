<template>
    <div class="chapter"  ref="content">
        <section class="read-content" :class="[{onNight:nightFlag},activeSkin]">
            <div class="read-action-mid">
            </div>

			<div class="read-content-content" @click="menuSetFlag=!menuSetFlag" :style="{fontSize:fontSize+'px'}">
				<h4 class="skin-default">{{chapter.bookname}}</h4>
				<div class="content-list">
					<h3>{{chapter.chapter_name}}</h3>
					<div v-html="chapter.content">
					</div>
				</div>

				<div class="container relative-recommend">
					<h1><span>热门推荐</span></h1>
					<p v-for="item in recommendList" @click="$router.push(`/book?bookId=${item.book_id}`)"><i class="iconfont icon-tuijian"></i> {{item.intro}}</p>
				</div>

				<div class="control-btns" v-if="chapter.nextChapter">
					<div class="prev" @click.stop="$router.replace({name:'chapter',query:{chapterId:chapter.prevChapter,bookId:$route.query.bookId}})">上一章</div>
					<div class="list"  @click="$router.push(`/menu?bookId=${$route.query.bookId}`)">目录</div>
					<div class="next" @click.stop="$router.replace({name:'chapter',query:{chapterId:chapter.nextChapter,bookId:$route.query.bookId}})">下一章</div>
				</div>
			</div>
			<div class="read-content-set" v-show="contentSetFlag">
				<ul class="read-set-bg-list">
					<li class="read-set-bg-item"><span class="skin-default" :class="{active:activeSkin=='skin-default'}" @click="activeSkin='skin-default'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
					<li class="read-set-bg-item"><span class="skin-blue" :class="{active:activeSkin=='skin-blue'}" @click="activeSkin='skin-blue'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
					<li class="read-set-bg-item"><span class="skin-green" :class="{active:activeSkin=='skin-green'}" @click="activeSkin='skin-green'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
					<li class="read-set-bg-item"><span class="skin-pink" :class="{active:activeSkin=='skin-pink'}" @click="activeSkin='skin-pink'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
					<li class="read-set-bg-item"><span class="skin-dark" :class="{active:activeSkin=='skin-dark'}" @click="activeSkin='skin-dark'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
					<li class="read-set-bg-item"><span class="skin-light" :class="{active:activeSkin=='skin-light'}" @click="activeSkin='skin-light'"><i class="iconfont icon-right" style="color:red;font-size:18px"></i></span></li>
				</ul>
				<div class="read-set-switch">
					<div class="read-set-switch-item" @click="fontSize==12?'':fontSize--">
						<i class="iconfont icon-zitijianxiao01" style="font-size:20px"></i>
					</div>
					<div class="read-set-switch-item" @click="fontSize++">
						<i class="iconfont icon-zitijiada01" style="font-size:20px"></i>
					</div>
				</div>
			</div>


			<v-dialog width="80%"></v-dialog>
        </section>
		<transition name="slideTopToBottom">
			<div class="read-content-header" v-show="menuSetFlag">
					<i class="iconfont icon-i-left" style="color:white;font-size:18px;" @click="$router.go(-1)"></i>
			</div>
			</transition>
		<transition name="slideRightToLeft">
			<div class="read-join-shelf" v-show="menuSetFlag" @click="joinBookself">
				<span>{{iscollected==2?'已在书架':'加入书架'}}</span>
			</div>
		</transition>
		<transition name="slideBottomToTop">
			<div class="read-content-footer" v-show="menuSetFlag">
			<ul class="footer-tab">
				<li class="footer-tab-item" @click="$router.push(`/menu?bookId=${$route.query.bookId}`)">
				<div class="footer-tab-icon">
					<i class="iconfont icon-Service-catalog" style="font-size:18px"></i>
				</div>
				<p class="footer-tab-label">
					目录
				</p>
				</li>
				<li class="footer-tab-item" @click="nightFlag=!nightFlag">
				<div class="footer-tab-icon">
					<i class="iconfont" style="font-size:18px" :class="[nightFlag?'icon-taiyang':'icon-yueliang']"></i>
				</div>
				<p class="footer-tab-label">
					{{nightFlag?'日间模式':'夜间模式'}}
				</p>
				</li>
				<li class="footer-tab-item" @click="contentSetFlag=!contentSetFlag">
				<div class="footer-tab-icon">
					<i class="iconfont icon-icon-yxj-font" style="font-size:18px"></i>
				</div>
				<p class="footer-tab-label">
					设置
				</p>
				</li>
			</ul>
			</div>
		</transition>
		<img src="../assets/page_loading.gif" alt=""  class="loadingIcon" v-show="isLoading">
    </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
export default {
  name: "chapter",
  data() {
    return {
      isLoading: true,
      menuSetFlag: false,
      contentSetFlag: false,
      nightFlag: false,
      activeSkin: "skin-default",
      fontSize: 16,
      iscollected: false,
      chapter: {},
      recommendList: []
    };
  },
  watch: {
    menuSetFlag(newOne, oldOne) {
      if (!newOne) {
        this.contentSetFlag = false;
      }
    },
    fontSize(newOne, oldOne) {
      localStorage.setItem("fontSize", newOne);
    },
    activeSkin(newOne, oldOne) {
      localStorage.setItem("activeSkin", newOne);
    },
    nightFlag(newOne, oldOne) {
      localStorage.setItem("nightFlag", newOne ? 1 : 0);
    }
  },
  methods: {
    init() {
      axios
        .get(
          `/apis/0.1/Chapter/ChapterInfo.php?bookId=${
            this.$route.query.bookId
          }&chapterId=${this.$route.query.chapterId}`
        )
        .then(res => {
          this.chapter = res.data.data;
          this.$refs.content.scrollTop = 0;
          this.isLoading = false;
          this.setReadCord();
        });

      axios.get("/apis/0.1/read-book-recommend.php").then(res => {
        this.recommendList = res.data.data;
      });
      axios
        .get(`/apis/0.1/User/Usercheck.php?bookId=${this.$route.query.bookId}`)
        .then(res => {
          this.iscollected = res.data.data.bookself;
        });
    },
    scrollInit() {
      let scroll = new BScroll(this.$refs.content, {
        click: true,
        tap: true
      });
    },
    getUserConfig() {
      this.fontSize = Number(localStorage.getItem("fontSize")) || 16;
      this.activeSkin = localStorage.getItem("activeSkin") || "skin-default";
      this.nightFlag = localStorage.getItem("nightFlag") == 1;
    },
    setReadCord() {
      localStorage.setItem(
        `book${this.$route.query.bookId}ReadCord`,
        this.$route.query.chapterId
      );
    },
    joinBookself() {
      if (!this.$userInfo.isLogin) {
        this.$turnToLogin(
          "请先登录",
          `chapter?bookId=${this.$route.query.bookId}&chapterId=${
            this.$route.query.chapterId
          }`
        );
        console.log(
          `chapter?bookId=${this.$route.query.bookId}&chapterId=${
            this.$route.query.chapterId
          }`
        );
        return;
      }
      if (this.iscollected != 1) return;
      axios
        .get(
          `/apis/0.1/Bookself.php?book_id=${this.$route.query.bookId}&auto=2`
        )
        .then(res => {
          if (res.data.status == 0) {
            this.iscollected = 2;
          }
        });
    }
  },
  created() {
    this.getUserConfig();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.init();
  },
  mounted() {
    this.init();
    this.scrollInit();
  }
};
</script>

<style lang="less" scoped>
@import url("../common/color.less");

.skin-default {
  background-color: #c4b395;
}
.skin-blue {
  background-color: #c3d4e6;
}
.skin-green {
  background-color: #c8e8c8;
}
.skin-pink {
  background-color: #f8c9c9;
}
.skin-dark {
  background-color: #3e4349;
}
.skin-light {
  background-color: #f6f7f9;
}
.relative-recommend p i {
  color: @mainColor;
}
.chapter {
  height: 100vh;
  // overflow: auto;
}
.loadingIcon {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  display: block;
}
.read-content {
  position: relative;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.85);
  min-height: 100%;
}
.read-content-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 99;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.read-join-shelf {
  position: fixed;
  top: 50px;
  right: 0;
  height: 30px;
  width: 70px;
  line-height: 30px;
  text-align: center;
  border-radius: 15px 0 0 15px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 99;
}
.read-content-content {
  position: relative;
  overflow: hidden;
  padding: 10px 15px 50px;
  font-size: 14px;
  box-sizing: border-box;
  min-height: 100vh;
}
.read-content-content h4 {
  font-size: 12px;
  color: #666;
  font-weight: 400;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 30px;
  padding-left: 15px;
  z-index: 9;
}
.read-content.onNight .read-content-content h4 {
  color: hsla(0, 0%, 100%, 0.5);
  background-color: #1a1a1a;
}
.read-content-content button.nextChapter {
  position: absolute;
  bottom: 20px;
  left: 10%;
  display: block;
  width: 80%;
  font-size: 16px;
  line-height: 36px;
  border: none;
  border-radius: 100px;
  color: #fff;
  background-color: #ed424b;
  z-index: 9999;
  outline: none;
}
.read-content .read-content-set {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  font-size: 14px;
  overflow: hidden;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 99;
}
.read-content-set .read-set-bg-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
}
.read-set-bg-list .read-set-bg-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}
.read-set-bg-item span.active {
  border-color: #ed424b;
}
.read-set-bg-item span {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.read-set-bg-item span i {
  display: none;
}
.read-set-bg-item span.active i {
  display: inherit;
}
.read-content-set .read-set-switch {
  padding: 10px;
  display: flex;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  justify-content: space-around;
}
.read-set-switch .read-set-switch-item {
  text-align: center;
  width: 40%;
  border: 1px solid white;
  border-radius: 20px;
  height: 38px;
  line-height: 38px;
}

.read-set-switch-item span {
  display: inline-block;
  width: 80%;
  margin: 0 10%;
  border: 1px solid #fff;
  border-radius: 100px;
  line-height: 36px;
  text-align: center;
  font-size: 20px;
  color: #fff;
}

.read-content-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  overflow: hidden;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
}
.read-content-footer .footer-tab {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 7px 0;
}
.read-content-footer .footer-tab-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}
</style>
<style lang="less">
.read-content.onNight {
  color: hsla(0, 0%, 100%, 0.5);
  background-color: #1a1a1a;
}
.read-content-content .content-list h3 {
  margin: 30px 0 20px;
  font-size: 20px;
  font-weight: bold;
}
.read-content-content .content-list p {
  text-indent: 2em;
  margin: 0.5em 0;
  letter-spacing: 0;
  line-height: 1.8;
}
.control-btns {
  //height: .88rem;
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.control-btns > div {
  display: block;
  width: 100%;
  font-size: 14px;
  line-height: 36px;
  border: none;
  border-radius: 100px;
  color: #fff;
  background-color: #ed424b;
  z-index: 9999;
  outline: none;
  text-align: center;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}
.relative-recommend {
  width: 7rem;
  margin-top: 0.5rem;
}

.relative-recommend p {
  font-size: 0.3rem;
  padding: 0.15rem 0;
  margin: 0 0.15rem;
  border-bottom: dashed 0.02rem #ebebeb;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

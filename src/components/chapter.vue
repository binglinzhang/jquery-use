<template>
    <div class="chapter"  ref="content" v-loading.fullscreen="isLoading">
        <section class="read-content" :class="[{onNight:nightFlag},activeSkin]">
            <div class="read-action-mid">
            </div>

            <div class="read-content-content" @click="menuSetFlag=!menuSetFlag" :style="{fontSize:fontSize+'px'}">
              <h4 class="skin-default">{{bookname}}</h4>
              <div class="content-list">
                <h3>{{chapter.chapter_name}}</h3>
                <div v-html="chapter.Buy==0?chapter.content:null" class="chapterText">
                </div>
              </div>

              <div class="purchase-wraper" v-if="chapter.Buy==1">
                <p class="wraper-tip">———&nbsp;&nbsp;后续为付费章节，购买后可继续阅读&nbsp;&nbsp;———</p>
                <div class="wraper-content">
                  <p class="pay-tit" v-if="charge_mode==3"><span>购买：{{chapter.chapter_name}}</span></p>
                  <p class="pay-price" v-if="charge_mode==3"><span>价格：</span> <span class="mainColor">{{realPrice}}</span> {{$config.coinName}}或书券</p>
                  <p class="pay-tit" v-if="charge_mode==2"><span>购买：{{bookname}}(整本)</span></p>
                  <p class="pay-price" v-if="charge_mode==2"><span>价格：</span> <span class="mainColor">{{realPrice}}</span> {{$config.coinName}}或书券</p>
                  <p class="pay-tit"><span>剩余{{$config.coinName}}：{{lessBookCoin}}</span></p>
                  <p class="pay-tit"><span>剩余书券：{{lessBookTicket}}</span></p>
                  <div class="auto-pay" v-if="charge_mode==3">
                    <span style="margin-right:10px">自动购买</span>
                    <el-checkbox v-model="isAutoBuy"></el-checkbox>
                  </div> <!---->
                </div>

                <el-button type="primary" style="width:80%;margin:0 auto;display:block" @click.stop.native="buyChapter">
                  {{isMoneyEnough?'立刻购买':'立即充值'}}
                </el-button>
              </div>

              <div class="container relative-recommend"  v-if="chapter.Buy==0">
                <h1><span>热门推荐</span></h1>
                <p v-for="item in recommendList" @click="$router.push(`/book?bookId=${item.book_id}`)"><i class="iconfont icon-tuijian"></i> {{item.intro}}</p>
              </div>

              <div class="control-btns" v-if="chapter.nextChapter">
                <div class="prev" @click.stop="$router.replace({name:'chapter',query:{chapterId:chapter.prevChapter,bookId:$route.query.bookId}})">上一章</div>
                <div class="list"  @click="$router.push(`/menu?bookId=${$route.query.bookId}`)">目录</div>
                <div class="next" @click.stop="$router.replace({name:'chapter',query:{chapterId:chapter.nextChapter,bookId:$route.query.bookId}})">下一章</div>
              </div>
            </div>
        </section>
		<tool-bar
			:menuSetFlag='menuSetFlag'
			:nightFlag='nightFlag'
			:activeSkin='activeSkin'
			:iscollected='iscollected'
			:fontSize='fontSize'
			:isLoading = 'isLoading'
			@collectedStatusChange='collectedStatusChange'
			@fontSizeChange='fontSizeChange'
			@nightFlagToggle='nightFlag=!nightFlag'
			@skinChange='skinChange'>
		</tool-bar>
    <transition name="fade">
      <div class="js_dialog" v-show="weixinAttentionFlag">
          <div class="weui-mask" @click="weixinAttentionFlag = false"></div>
          <div class="weui-dialog">
              <div class="weui-dialog__bd">
                <p style="margin-bottom:20px">长按识别作者授权公众号继续阅读</p>
                <p style="color:red;margin-bottom:8px">由于版权问题，</p>
                <p style="color:red;margin-bottom:16px">请扫描下方二维码进行阅读</p>
                <div>
                  <img :src="$config.qrCodeUrl" alt="" style="width:60%;display:block;margin:0 auto">
                </div>
                <p style="margin-top:20px;font-weight:600">长按上图识别二维码</p>
              </div>
              <div class="weui-dialog__ft" @click="weixinAttentionFlag = false">
                  <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
              </div>
          </div>
      </div>
    </transition>

		<v-dialog width="80%"></v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import toolBar from "./chapter_tool.vue";
import qs from "qs";
import { setCookie } from "../common/function";
export default {
  name: "chapter",
  data() {
    return {
      isLoading: true,
      menuSetFlag: false,
      nightFlag: false,
      activeSkin: "skin-default",
      fontSize: 16,
      iscollected: 0,
      chapter: {},
      recommendList: [],
      lessBookCoin: null,
      lessBookTicket: null,
      isAutoBuy: true,
      charge_mode: null,
      bookname: null,
      nickname: null,
      wholeBookPrice: null,
      isWeixinFun: true,
      weixinAttentionFlag: false
    };
  },
  computed: {
    realPrice() {
      return this.charge_mode == 2 ? this.wholeBookPrice : this.chapter.price;
    },
    isMoneyEnough() {
      return (
        Number(this.lessBookCoin) > Number(this.realPrice) ||
        Number(this.lessBookTicket) > Number(this.realPrice)
      );
    },
    canNotRead() {
      return this.$userInfo.isWeiXin && !this.isWeixinFun;
    }
  },
  components: {
    toolBar
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
          if (res.data.data.UserLogin == 1 && !this.$userInfo.isLogin) {
            this.$turnToLogin(
              "本章为扣费章节，是否前往登录",
              `chapter?bookId=${this.$route.query.bookId}&chapterId=${
                this.$route.query.chapterId
              }`
            );
          }
          if (this.canNotRead) {
            this.weixinAttentionFlag =
              Number(res.data.data.order_num) >
              this.$config.weixinNotFunChapterLimit;
          }
        });

      axios.get("/apis/0.1/read-book-recommend.php").then(res => {
        this.recommendList = res.data.data;
      });
      axios
        .get(`/apis/0.1/User/Usercheck.php?bookId=${this.$route.query.bookId}`)
        .then(res => {
          this.iscollected = res.data.data.bookself;
        });
      axios.get("/apis/0.1/User/UserInfo.php").then(res => {
        this.lessBookCoin = res.data.data.amount;
        this.lessBookTicket = res.data.data.coin;
        this.nickname = res.data.data.nicker;
      });
      axios
        .get(`/apis/0.1/BookInfo.php?bookId=${this.$route.query.bookId}`)
        .then(res => {
          this.charge_mode = res.data.data.charge_mode;
          this.bookname = res.data.data.name;
          this.wholeBookPrice = res.data.data.price;
        });
      axios
        .get(
          `/apis/0.1/User/Msg.php?a=mulu?backurl=${encodeURIComponent(
            window.location.href
          )}`
        )
        .then(res => {});
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
    buyChapter() {
      if (!this.isMoneyEnough) {
        this.goToRechargePage();
        return;
      }
      //钱足够时
      let data = {
        bookId: this.$route.query.bookId,
        chapterId: this.$route.query.chapterId,
        auto: this.isAutoBuy ? 2 : undefined,
        confirm: "yes"
      };
      axios
        .post("/apis/0.1/Chapter/BuyRead.php", qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.$router.go(0);
          }
        });
    },
    goToRechargePage() {
      setCookie("recharge_back_url", window.location.href, 60 * 60);
      if (this.charge_mode == 2) {
        window.location.href = `${this.$config.rechargeUrl}#/r_book?price=${
          this.realPrice
        }&bookId=${this.$route.query.bookId}`;
      } else if (this.charge_mode == 3) {
        window.location.href = `${this.$config.rechargeUrl}#/r_common`;
      }
    },
    collectedStatusChange(newVal) {
      this.iscollected = newVal;
    },
    skinChange(newVal) {
      this.activeSkin = newVal;
    },
    fontSizeChange(newVal) {
      this.fontSize = newVal;
    },
    getWxStatus() {
      //当微信环境内且开启限制的时候，获取状态
      if (this.$userInfo.isWeiXin && this.$config.isWeixinFunLimit) {
        this.$getWeiXinFunsStatus().then(isFun => {
          this.isWeixinFun = isFun;
          console.log(isFun);
        });
      }
    },
    created() {
      this.getUserConfig();
      this.getWxStatus()
    }
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.init();
    this.getWxStatus()
  },
  mounted() {
    console.log("mounted");
    this.init();
    this.scrollInit();
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem(
      "readRecord",
      JSON.stringify({
        //储存阅读记录
        chapterName: this.chapter.chapter_name,
        bookName: this.bookname,
        chapterId: this.$route.query.chapterId,
        bookId: this.$route.query.bookId
      })
    );
    next();
  }
};
</script>

<style lang="less" scoped>
@import url("../common/mixin.less");
.relative-recommend p i {
  color: lighten(@mainColor, 6%);
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
.purchase-wraper {
  .wraper-tip {
    font-size: 0.28rem;
    text-align: center;
    color: #666;
  }
  .wraper-content {
    width: 80%;
    margin: 16px auto;
    font-size: 0.28rem;
    line-height: 2em;
  }
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
.read-content-content .content-list .chapterText {
  min-height: 4rem;
}
.control-btns {
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
  box-sizing: border-box;
  max-width: 100%;
}
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
</style>

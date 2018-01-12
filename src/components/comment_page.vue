<template>
    <div class="comment-info comment-page">

      <link-head><span>评论</span></link-head>

      <div class="comment">
        <div class="user-comment">
          <div class="user-head">
            <img :src="reviewer.avatar">
          </div>
          <div class="comment-info">
            <h2>
              <span>{{reviewer.name}}</span>
              <i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:reviewer.overtime==1}"></i>
            </h2>
            <div class="text">
              {{reviewer.content}}
            </div>
            <p>
              {{reviewer.time}}
              <a class="icon to-reply" @click="reviewer.replayFlag = !reviewer.replayFlag"></a>
            </p>
          </div>
          <div class="comment-box" v-show="reviewer.replayFlag">
            <div class="reply-input">
              <textarea cols="28" rows="3" :placeholder="'回复@'+reviewer.name" style="width:6.3rem"></textarea>
            </div>
            <div class="comment-btn">
              <a @click="postCommentParent">回复</a>
            </div>
          </div>
        </div>
        <div class="container comment-list">
          <h1>
            <span>全部回复</span>
            <a style="font-size: 0.28rem; color: rgb(153, 153, 153);">共{{reviewer.childComment.length}}条</a>
          </h1>
          <div class="content comment-item" v-for="item in reviewer.childComment.data">
            <div class="user-head">
              <img v-lazy="item.avatar">
            </div>
            <div class="comment-info">
              <h2>
                <span>{{item.name}}</span>
                <i class="iconfont icon-VIP icon_vip" :class="{icon_isVip:item.overtime==1}"></i>
              </h2>
              <div class="text">回复
                <i>@{{item.to||reviewer.name}}</i>：{{item.content}}</div>
              <p>
                {{item.time}}
                <a class="icon to-reply" @click="item.replayFlag=!item.replayFlag"></a>
              </p>
              <div class="comment-box reply-box" v-show="item.replayFlag">
                <div class="reply-input">
                  <textarea cols="28" rows="3" :placeholder="'回复@'+item.name"></textarea>
                </div>
                <div class="comment-btn">
                  <a @click="postCommentChild(item)">回复</a>
                </div>
              </div>
            </div>
          </div>
          <div class="more" v-show="page<pageCount">查看更多&gt;&gt;</div>
        </div>
      </div>
      <n-footer></n-footer>
    </div>
</template>

<script>
import linkHead from "./link_header.vue";
import nFooter from "./nfooter.vue";
import axios from "axios";
import qs from "qs";
export default {
  name: "commentPage",
  data() {
    return {
      page: 0,
      pageCount: 0,
	  reviewer: {
		  childComment:[]
	  },
    };
  },
  methods: {
	init(){
		axios
		.get(
			"http://m.shengshixiwen.com/apis/0.1/Commit/Commit.php?bookId=229&cId=1821"
		)
		.then(res => {
			let obj = res.data.data.reviewer;
			Object.assign(obj, { replayFlag: false, commentContent: "" });
			obj.childComment.data.forEach(item => {
				Object.assign(item, { replayFlag: false, commentContent: "" });
			});
			this.reviewer = obj;
			this.page = obj.childComment.page;
			this.pageCount = obj.childComment.pageCount;
		});
	},
    postCommentParent() {
	  if(!this.reviewer.commentContent)  return;
      let data = {
        uid: this.$uId,
        bookid: this.$route.query.bookId,
        title: `${this.$userName}评论了`,
        content: this.reviewer.commentContent,
		parentid: this.$route.query.cId,
		tname:this.reviewer.name
      };
      axios
        .post(
          "http://m.shengshixiwen.com/apis/0.1/Commit/AddCommit.php",
          qs.stringify(data)
        )
        .then(res => {
          if(res.data.code==200){
			  this.init();
		  }
        });
    },
    postCommentChild(item) {
	  if(!item.commentContent)  return;
      let data = {
        uid: this.$uId,
        bookid: this.$route.query.bookId,
        title: `${this.$userName}评论了`,
        content: item.commentContent,
		parentid: item.id,
		tname:item.name
      };
      axios
        .post(
          "http://m.shengshixiwen.com/apis/0.1/Commit/AddCommit.php",
          qs.stringify(data)
        )
        .then(res => {
          if(res.data.code==200){
			  this.init();
		  }
        });
    }
  },
  components: {
    linkHead,
    nFooter
  },
  created() {
	  this.init()
  }
};
</script>

<style lang="less" scoped>
@import url('../common/color.less');
.comment-info .comment {
  min-height: 8rem;
}
.comment-info .user-comment {
  overflow: hidden;
  padding: 0.2rem;
  background-color: #fff;
}
.comment-page .comment-box {
  float: left;
  width: 6.5rem;
}
.comment-info .reply-box {
  width: 5.7rem;
}
.comment-info .text i {
  color: #58b7ff;
}
.comment-info .reply p {
  color: #808080;
}
</style>

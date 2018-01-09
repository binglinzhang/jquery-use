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
              <img :src="reviewer.levelImg">
              <i style="background-color: rgb(226, 179, 38);">{{reviewer.label}}</i>
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
                <img v-lazy="item.levelImg">
                <i style="background-color: rgb(226, 179, 38);">{{item.label}}</i>
              </h2>
              <div class="text">回复
                <i>@{{item.to}}</i>：{{item.content}}</div>
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
        name: "朕知道了",
        id: 123,
        avatar: "/static/avatar.jpg",
        levelImg: "/static/vip_level.png",
        id: "32562",
        label: "学渣",
        content: "这是一首简单的小情歌，唱着我们心中的百合",
        time: "2017-12-08 00:07:19",
        replayFlag: false,
        childComment: [
          {
            name: "朕知道了1",
            id: 123,
            avatar: "/static/avatar.jpg",
            levelImg: "/static/vip_level.png",
            id: "32562",
            label: "学渣",
            content: "这是一首简单的小情歌，唱着我们心中的百合",
            time: "2017-12-08 00:07:19",
            to: "仙气飘飘",
            replayFlag: false,
            childCommentNum: 5
          },
          {
            name: "朕知道了2",
            id: 123,
            avatar: "/static/avatar.jpg",
            levelImg: "/static/vip_level.png",
            id: "32562",
            label: "学渣",
            content: "这是一首简单的小情歌，唱着我们心中的百合",
            time: "2017-12-08 00:07:19",
            to: "仙气飘飘",
            replayFlag: false,
            childCommentNum: 5
          }
        ]
      }
    };
  },
  methods: {
    postCommentParent() {
      let data = {
        uid: this.$uId,
        bookid: this.$route.query.bookId,
        title: "",
        content: reviewer.commentContent,
        parentid: this.$route.query.cId
      };
      axios
        .post(
          "http://m.shengshixiwen.com/apis/0.1/Commit/AddCommit.php",
          qs.stringify(data)
        )
        .then(res => {
          console.log(res);
        });
    },
    postCommentChild(item) {
      let data = {
        uid: this.$uId,
        bookid: this.$route.query.bookId,
        title: "",
        content: item.commentContent,
        parentid: item.id
      };
      axios
        .post(
          "http://m.shengshixiwen.com/apis/0.1/Commit/AddCommit.php",
          qs.stringify(data)
        )
        .then(res => {
          console.log(res);
        });
    }
  },
  components: {
    linkHead,
    nFooter
  },
  created() {
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
        console.log(res);
      });
  }
};
</script>

<style lang="less" scoped>
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
